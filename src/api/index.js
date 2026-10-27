import bcrypt from 'bcryptjs';
import * as db from './db';
import { captchaProblem, createCaptcha } from './captcha';
import { STARTER_BOOKS } from './starterBooks';
import {
  ROLE_CODE,
  archiveBlocker,
  emailTaken,
  pad,
  passwordProblem,
  reducer,
  today,
  trailing,
  validateBook,
  validateMember,
  validateMessage,
  validateResetRequest,
  validateSettings,
  validateStaff,
} from './engine';

// The fake server. Every function here returns a Promise that settles after a
// short delay, reads and writes localStorage through ./db, checks who is
// asking, and rejects with an ApiError when something is wrong.

const DELAY = 300;
const HASH_ROUNDS = 10;

export class ApiError extends Error {
  constructor(message, fields = {}) {
    super(message);
    this.name = 'ApiError';
    this.fields = fields;
  }
}

// Runs `work` after the delay, as if it were a network round trip.
function request(work) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      db.init().then(work).then(resolve, reject);
    }, DELAY);
  });
}

const uid = (prefix) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
const year = () => new Date().getFullYear();
const nextMemberId = (state) =>
  `BV${year()}CS${String(Math.max(0, ...state.students.map((s) => trailing(s.id))) + 1).padStart(3, '0')}`;

// ------------------------------------------------------------- identity
function findUser(state, userId) {
  return (
    state.students.find((s) => s.id === userId) ?? state.staff.find((s) => s.id === userId) ?? null
  );
}

// The signed-in user's record, or an error if nobody is signed in.
function signedIn(state) {
  const session = db.sessionStore.get();
  const user = session && findUser(state, session.userId);
  if (!user) throw new ApiError('Please log in first.');
  return user;
}

// ...and only if they are active, have the right role, and are not still on a
// temporary password (that account may only set a new one).
function requireRole(state, ...roles) {
  const user = signedIn(state);
  const role = user.role ?? 'student';
  if (user.status !== 'active' || !roles.includes(role)) {
    throw new ApiError('You are not allowed to do that.');
  }
  if (user.mustChangePassword) throw new ApiError('Set a new password first.');
  return user;
}

// Public forms need a solved captcha before anything else is looked at.
function requireCaptcha(captcha) {
  const why = captchaProblem(captcha);
  if (why) throw new ApiError('Please solve the captcha.', { captcha: why });
}

export const newCaptcha = () => createCaptcha();

const problems = (errors, message = 'Please check the highlighted fields.') => {
  if (Object.keys(errors).length) throw new ApiError(message, errors);
};

// Applies one action to the stored library and saves it.
function apply(state, action, actor) {
  const next = reducer(state, { ...action, actorId: actor.id, logId: uid('a') });
  db.save(next, state);
  return next;
}

// ----------------------------------------------------------------- auth
export function register({ captcha, ...fields }) {
  return request(async () => {
    requireCaptcha(captcha);
    const state = db.load();
    problems(validateMember(state, fields));
    const id = nextMemberId(state);
    const hash = await bcrypt.hash(fields.password, HASH_ROUNDS);
    const { password: _password, ...member } = fields;
    db.save(reducer(state, { type: 'addMember', fields: member, id, pending: true }), state);
    db.credentials.set(id, hash);
    return { id };
  });
}

export function login(email, password, role, remember = false, captcha = null) {
  return request(async () => {
    requireCaptcha(captcha);
    const state = db.load();
    const user = [...state.students, ...state.staff].find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
    );
    const hash = user && db.credentials.get(user.id);
    if (!hash || !(await bcrypt.compare(password, hash))) {
      throw new ApiError('Incorrect email or password.');
    }
    if ((user.role ?? 'student') !== role) {
      throw new ApiError(`This account is not a ${role}. Pick the right role above.`);
    }
    if (user.status === 'pending') {
      throw new ApiError('Your account is waiting for the library admin to approve it.');
    }
    if (user.status === 'suspended') throw new ApiError('Your membership is suspended. See the library desk.');
    if (user.status === 'inactive') throw new ApiError('This account has been deactivated.');
    db.sessionStore.set({ userId: user.id, role }, remember);
    return { id: user.id, role, mustChange: Boolean(user.mustChangePassword) };
  });
}

export function logout() {
  return request(async () => db.sessionStore.clear());
}

// Instant (no delay): used to restore the session when the page loads.
export const currentSession = () => db.sessionStore.get();
export const clearSession = () => db.sessionStore.clear();

export function changePassword(current, next) {
  return request(async () => {
    const state = db.load();
    const user = requireRole(state, 'student', 'librarian', 'admin');
    const errors = {};
    if (!current) errors.current = 'Enter your current password.';
    else if (!(await bcrypt.compare(current, db.credentials.get(user.id) ?? ''))) {
      errors.current = 'That is not your current password.';
    }
    if (passwordProblem(next)) errors.next = passwordProblem(next);
    else if (next === current) errors.next = 'Choose a password different from the current one.';
    problems(errors);
    db.credentials.set(user.id, await bcrypt.hash(next, HASH_ROUNDS));
  });
}

// For an account on a temporary password: choose a real one before anything else.
export function setNewPassword(next) {
  return request(async () => {
    const state = db.load();
    const user = signedIn(state);
    const errors = {};
    if (passwordProblem(next)) errors.next = passwordProblem(next);
    else if (await bcrypt.compare(next, db.credentials.get(user.id) ?? '')) {
      errors.next = 'Choose a password different from the temporary one.';
    }
    problems(errors);
    db.credentials.set(user.id, await bcrypt.hash(next, HASH_ROUNDS));
    db.save(reducer(state, { type: 'passwordSet', actorId: user.id }), state);
  });
}

// Admin: give someone a new temporary password (they must change it at next login).
export const resetPassword = (id, temp) =>
  request(async () => {
    const state = db.load();
    const actor = requireRole(state, 'admin');
    if (id === actor.id) throw new ApiError('Change your own password from Profile.');
    if (!findUser(state, id)) throw new ApiError('That account no longer exists.');
    problems(passwordProblem(temp) ? { password: passwordProblem(temp) } : {});
    db.credentials.set(id, await bcrypt.hash(temp, HASH_ROUNDS));
    apply(state, { type: 'resetPassword', id }, actor);
  });

// ------------------------------------------------------------- contact
// Anyone (no login) can send a message; only admins can read it.
export function sendMessage({ captcha, ...fields }) {
  return request(async () => {
    requireCaptcha(captcha);
    const state = db.load();
    problems(validateMessage(fields));
    const message = {
      id: uid('m'),
      name: fields.name.trim(),
      email: fields.email.trim(),
      subject: fields.subject.trim(),
      message: fields.message.trim(),
      on: today(),
      read: false,
    };
    db.save(reducer(state, { type: 'addMessage', message }), state);
  });
}

// Anyone can ask for a password reset. It lands in the admin Inbox; the reply is
// the same whether or not the email matches, so nobody can probe for accounts.
export function requestPasswordReset({ role, email, note = '', captcha }) {
  return request(async () => {
    requireCaptcha(captcha);
    const state = db.load();
    problems(validateResetRequest({ role, email }));
    const wanted = email.trim().toLowerCase();
    const table = role === 'student' ? state.students : state.staff;
    const account = table.find(
      (a) => a.email.toLowerCase() === wanted && (role === 'student' || a.role === role),
    );
    const accountId = account?.id ?? null;
    const repeat = state.messages.some(
      (m) => m.kind === 'reset' && !m.read && m.accountId === accountId && m.email.toLowerCase() === wanted,
    );
    if (repeat) return;
    const message = {
      id: uid('m'),
      name: account?.name ?? 'Unknown account',
      email: email.trim(),
      subject: 'Password reset request',
      message: note.trim() || `Please reset the password for this ${role} account.`,
      on: today(),
      read: false,
      kind: 'reset',
      role,
      accountId,
    };
    db.save(reducer(state, { type: 'addMessage', message }), state);
  });
}

export const setMessageRead = (id, read) => adminAction({ type: 'setMessageRead', id, read });
export const deleteMessage = (id) => adminAction({ type: 'deleteMessage', id });

// ------------------------------------------------------------- snapshot
export function loadAll() {
  return request(async () => db.load());
}

// Instant read used to refresh the UI right after an action.
export const snapshot = () => db.load();

// ------------------------------------------------------------- student
const studentAction = (type, extra = {}) =>
  request(async () => {
    const state = db.load();
    const actor = requireRole(state, 'student');
    apply(state, { type, ...extra }, actor);
  });

export const reserveBook = (bookId) => studentAction('reserve', { bookId, id: uid('r') });
export const cancelReservation = (id) => studentAction('cancelReservation', { id });
export const payAllFines = () => studentAction('payAllFines');
export const togglePreference = (key) => studentAction('togglePreference', { key });

export function renewLoan(id) {
  return request(async () => {
    const state = db.load();
    const actor = requireRole(state, 'student');
    if (state.loans.find((l) => l.id === id)?.studentId !== actor.id) {
      throw new ApiError('That is not your loan.');
    }
    apply(state, { type: 'renew', id }, actor);
  });
}

export function updateProfile(fields) {
  return request(async () => {
    const state = db.load();
    const actor = requireRole(state, 'student');
    if (emailTaken(state, fields.email, actor.id)) {
      throw new ApiError('This email is already registered.', { email: 'This email is already registered.' });
    }
    apply(state, { type: 'updateProfile', fields }, actor);
  });
}

// ------------------------------------------------------------ circulation
export function issueBook(studentId, bookId, issuedOn) {
  return request(async () => {
    const state = db.load();
    const actor = requireRole(state, 'librarian', 'admin');
    const next = apply(state, { type: 'issue', studentId, bookId, issuedOn, id: uid('l') }, actor);
    if (next === state) throw new ApiError('This book cannot be issued to this member.');
  });
}

export function returnLoan(loanId, returnedOn) {
  return request(async () => {
    const state = db.load();
    const actor = requireRole(state, 'librarian', 'admin');
    const next = apply(
      state,
      { type: 'return', loanId, returnedOn, historyId: uid('h'), fineId: uid('f') },
      actor,
    );
    if (next === state) throw new ApiError('That return date is not valid for this loan.');
  });
}

export function sendReminder(loanId) {
  return request(async () => {
    const state = db.load();
    apply(state, { type: 'remind', loanId }, requireRole(state, 'librarian', 'admin'));
  });
}

export function updateLibrarian(fields) {
  return request(async () => {
    const state = db.load();
    apply(state, { type: 'updateLibrarian', fields }, requireRole(state, 'librarian'));
  });
}

// --------------------------------------------------------------- admin
const adminAction = (action, check = () => ({})) =>
  request(async () => {
    const state = db.load();
    const actor = requireRole(state, 'admin');
    problems(check(state));
    apply(state, action, actor);
  });

export const addBook = (fields) =>
  request(async () => {
    const state = db.load();
    const actor = requireRole(state, 'admin');
    problems(validateBook(state, fields));
    const id = `b${pad(Math.max(0, ...state.books.map((b) => trailing(b.id))) + 1)}`;
    apply(state, { type: 'addBook', fields, id }, actor);
  });

// Adds the ready-made catalog (starterBooks.js). Books whose ISBN is already in
// the library, or whose category was removed, are skipped.
export const addStarterBooks = () =>
  request(async () => {
    const state = db.load();
    const actor = requireRole(state, 'admin');
    const first = Math.max(0, ...state.books.map((b) => trailing(b.id))) + 1;
    const books = STARTER_BOOKS.map(([title, author, category, isbn, copies, shelf, description], i) => ({
      id: `b${pad(first + i)}`,
      title,
      author,
      category,
      isbn,
      copies,
      shelf,
      addedOn: today(),
      description,
    }));
    const next = apply(state, { type: 'addStarterBooks', books }, actor);
    const added = next.books.length - state.books.length;
    return { added, skipped: STARTER_BOOKS.length - added };
  });

export const updateBook = (id, fields) =>
  adminAction({ type: 'updateBook', id, fields }, (state) => validateBook(state, fields, id));

export const archiveBook = (id) =>
  adminAction({ type: 'archiveBook', id }, (state) => {
    const why = archiveBlocker(state, id);
    return why ? { book: `Cannot remove: ${why}.` } : {};
  });

export const addMember = ({ password, ...fields }) =>
  request(async () => {
    const state = db.load();
    const actor = requireRole(state, 'admin');
    problems(validateMember(state, { ...fields, password }));
    const id = nextMemberId(state);
    const hash = await bcrypt.hash(password, HASH_ROUNDS);
    apply(state, { type: 'addMember', fields, id }, actor);
    db.credentials.set(id, hash);
  });

export const setMemberStatus = (id, status) => adminAction({ type: 'setMemberStatus', id, status });
export const approveMember = (id) => adminAction({ type: 'approveMember', id });

export const rejectMember = (id) =>
  request(async () => {
    const state = db.load();
    apply(state, { type: 'rejectMember', id }, requireRole(state, 'admin'));
    db.credentials.remove(id);
  });

export const addStaff = ({ password, ...fields }) =>
  request(async () => {
    const state = db.load();
    const actor = requireRole(state, 'admin');
    problems(validateStaff(state, { ...fields, password }));
    const next = Math.max(0, ...state.staff.map((m) => trailing(m.id))) + 1;
    const id = `BV${year()}${ROLE_CODE[fields.role]}${String(next).padStart(3, '0')}`;
    const hash = await bcrypt.hash(password, HASH_ROUNDS);
    apply(state, { type: 'addStaff', fields, id }, actor);
    db.credentials.set(id, hash);
  });

export const updateStaffRole = (id, role) => adminAction({ type: 'updateStaffRole', id, role });
export const setStaffStatus = (id, status) => adminAction({ type: 'setStaffStatus', id, status });
export const markFinePaid = (id) => adminAction({ type: 'markFinePaid', id });
export const waiveFine = (id, reason) =>
  adminAction({ type: 'waiveFine', id, reason }, () => (reason.trim() ? {} : { reason: 'Give a reason.' }));
export const updateSettings = (next) =>
  adminAction({ type: 'updateSettings', next }, () => validateSettings(next));
export const updateAdmin = (fields) =>
  request(async () => {
    const state = db.load();
    apply(state, { type: 'updateAdmin', fields }, requireRole(state, 'admin'));
  });
