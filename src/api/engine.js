// The "server" rules: pure functions over a plain library snapshot
// ({ students, staff, books, loans, history, reservations, fines, activity,
// settings, categories }). The API (./index.js) runs the reducer against what
// is stored in localStorage; the React side reuses the selectors for previews.

const pad2 = (n) => String(n).padStart(2, '0');

// The real current date as 'YYYY-MM-DD' (local time).
export function today() {
  const now = new Date();
  return `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_MS = 24 * 60 * 60 * 1000;

// ---------------------------------------------------------------- dates
// Dates are kept as 'YYYY-MM-DD' strings and handled in UTC so the maths
// doesn't shift with the viewer's timezone.
function toTime(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
}

export function addDays(iso, days) {
  return new Date(toTime(iso) + days * DAY_MS).toISOString().slice(0, 10);
}

export function daysBetween(from, to) {
  return Math.round((toTime(to) - toTime(from)) / DAY_MS);
}

export function daysUntil(iso) {
  return daysBetween(today(), iso);
}

export function formatDate(iso) {
  const [y, m, d] = iso.split('-');
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function monthDay(iso) {
  const [, m, d] = iso.split('-');
  return { month: MONTHS[m - 1].toUpperCase(), day: d };
}

// ------------------------------------------------------------- formatting
export const pad = (n) => String(n).padStart(2, '0');
export const rupees = (n) => `₹${n}`;
export const plural = (n, word, words = `${word}s`) => `${n} ${n === 1 ? word : words}`;

export function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export function ordinal(n) {
  const suffix = { 1: 'st', 2: 'nd', 3: 'rd' }[n % 100 > 10 && n % 100 < 14 ? 0 : n % 10];
  return `${n}${suffix ?? 'th'}`;
}

// ----------------------------------------------------------------- loans
// { overdue, days, label } where label reads "3 days left" / "2 days overdue".
export function loanStatus(loan) {
  const days = daysUntil(loan.dueOn);
  if (days < 0) return { overdue: true, days, label: `${plural(-days, 'day')} overdue` };
  return { overdue: false, days, label: days === 0 ? 'Due today' : `${plural(days, 'day')} left` };
}

// Share of the loan period already used, for the progress bars.
export function loanProgress(loan) {
  const total = toTime(loan.dueOn) - toTime(loan.issuedOn);
  const used = toTime(today()) - toTime(loan.issuedOn);
  return Math.min(100, Math.max(0, Math.round((used / total) * 100)));
}

export function canRenew(loan, settings) {
  if (daysUntil(loan.dueOn) < 0) return { ok: false, reason: 'Return overdue books first' };
  if (loan.renewals >= settings.maxRenewals) return { ok: false, reason: 'Renewal limit reached' };
  return { ok: true, reason: `Adds ${settings.loanDays} days` };
}

// How late a loan is if it came back on `returnedOn`: `days` is the real
// lateness, `chargeable` is what is left after the grace period, and `fine`
// is the charge for those days.
export function lateness(loan, returnedOn, settings) {
  const days = Math.max(0, daysBetween(loan.dueOn, returnedOn));
  const chargeable = Math.max(0, days - settings.graceDays);
  return { days, chargeable, fine: chargeable * settings.fineRate };
}

// ------------------------------------------------------------- selectors
// All of these take the raw state (`useLibrary().state`).

// Copies on the shelf: owned, minus what is out on loan, minus holds set aside.
export function availableCopies(state, bookId) {
  const book = state.books.find((b) => b.id === bookId);
  const out = state.loans.filter((loan) => loan.bookId === bookId).length;
  const held = state.reservations.filter((r) => r.bookId === bookId && r.status === 'ready').length;
  return Math.max(0, book.copies - out - held);
}

// Students waiting for a book, in the order they asked.
export function waitingFor(state, bookId) {
  return state.reservations
    .map((reservation, index) => ({ reservation, index }))
    .filter(({ reservation }) => reservation.bookId === bookId && reservation.status === 'waiting')
    .sort(
      (a, b) =>
        a.reservation.placedOn.localeCompare(b.reservation.placedOn) || a.index - b.index,
    )
    .map(({ reservation }) => reservation);
}

export function queuePosition(state, reservation) {
  if (reservation.status === 'ready') return 1;
  return waitingFor(state, reservation.bookId).findIndex((r) => r.id === reservation.id) + 1;
}

// Hand freed-up copies to the people waiting, oldest request first.
function promoteWaiting(state) {
  let reservations = state.reservations;
  for (const book of state.books) {
    let free = availableCopies({ ...state, reservations }, book.id);
    for (const next of waitingFor({ ...state, reservations }, book.id)) {
      if (free < 1) break;
      free -= 1;
      reservations = reservations.map((r) =>
        r.id === next.id ? { ...r, status: 'ready', expiresOn: addDays(today(), state.settings.holdDays) } : r,
      );
    }
  }
  return reservations === state.reservations ? state : { ...state, reservations };
}

// Whether `bookId` can be issued to `studentId`, and if not, why.
export function canIssue(state, studentId, bookId) {
  const member = state.students.find((s) => s.id === studentId);
  if (member && member.status !== 'active') {
    return { ok: false, reason: `Member is ${member.status}` };
  }
  if (state.loans.some((l) => l.studentId === studentId && l.bookId === bookId)) {
    return { ok: false, reason: 'Student already has this title' };
  }
  if (state.loans.some((l) => l.studentId === studentId && daysUntil(l.dueOn) < 0)) {
    return { ok: false, reason: 'Student has an overdue book' };
  }
  const { maxBooks } = state.settings;
  if (state.loans.filter((l) => l.studentId === studentId).length >= maxBooks) {
    return { ok: false, reason: `Student has reached the limit of ${plural(maxBooks, 'book')}` };
  }
  const hold = state.reservations.find(
    (r) => r.studentId === studentId && r.bookId === bookId && r.status === 'ready',
  );
  if (hold) return { ok: true, reason: 'Uses their reserved copy', hold };
  if (availableCopies(state, bookId) < 1) return { ok: false, reason: 'No copies available' };
  return { ok: true, reason: '' };
}

// Fines still adding up on overdue loans (charged when each one is returned).
export function accruingTotal(state) {
  return state.loans
    .filter((loan) => daysUntil(loan.dueOn) < 0)
    .reduce((sum, loan) => sum + lateness(loan, today(), state.settings).fine, 0);
}

export function studentSummary(state, studentId) {
  const loans = state.loans.filter((loan) => loan.studentId === studentId);
  const overdue = loans.filter((loan) => daysUntil(loan.dueOn) < 0).length;
  const recorded = state.fines
    .filter((fine) => fine.studentId === studentId && fine.status === 'due')
    .reduce((sum, fine) => sum + fine.amount, 0);
  // Overdue books also earn a fine that is only charged when they come back.
  const accruing = loans
    .filter((loan) => daysUntil(loan.dueOn) < 0)
    .reduce((sum, loan) => sum + lateness(loan, today(), state.settings).fine, 0);
  const finesDue = recorded + accruing;
  const totalLoans = loans.length + state.history.filter((h) => h.studentId === studentId).length;

  let status = { label: 'None', tone: 'neutral' };
  if (state.students.find((s) => s.id === studentId)?.status === 'suspended') {
    status = { label: 'Suspended', tone: 'bad' };
  } else if (overdue) status = { label: 'Overdue', tone: 'bad' };
  else if (loans.length) status = { label: 'On time', tone: 'good' };

  return { active: loans.length, overdue, finesDue, recorded, accruing, totalLoans, status };
}

// Newest-first log: one "Issue" row per active loan, one "Return" row per
// returned loan.
export function buildTransactions(state) {
  const rows = [];
  for (const loan of state.loans) {
    const fine = state.fines.find((f) => f.loanId === loan.id);
    rows.push({
      key: `issue-${loan.id}`,
      kind: 'issue',
      loanId: loan.id,
      studentId: loan.studentId,
      bookId: loan.bookId,
      issuedOn: loan.issuedOn,
      dueOn: loan.dueOn,
      returnedOn: null,
      fine: fine?.amount ?? 0,
      remindedOn: loan.remindedOn,
      status: daysUntil(loan.dueOn) < 0 ? 'overdue' : 'issued',
      date: loan.issuedOn,
    });
  }
  for (const entry of state.history) {
    rows.push({
      key: `return-${entry.id}`,
      kind: 'return',
      loanId: null,
      studentId: entry.studentId,
      bookId: entry.bookId,
      issuedOn: entry.issuedOn,
      dueOn: entry.dueOn ?? addDays(entry.issuedOn, state.settings.loanDays),
      returnedOn: entry.returnedOn,
      fine: entry.fine ?? 0,
      status: 'returned',
      date: entry.returnedOn,
    });
  }
  return rows.sort((a, b) => b.date.localeCompare(a.date) || a.key.localeCompare(b.key));
}

// ------------------------------------------------------------ validation
// Each validator returns an object of field -> message, empty when all is well.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

export function copiesOut(state, bookId) {
  const out = state.loans.filter((l) => l.bookId === bookId).length;
  const held = state.reservations.filter((r) => r.bookId === bookId && r.status === 'ready').length;
  return { out, held, total: out + held };
}

export function validateBook(state, fields, bookId = null) {
  const errors = {};
  if (!fields.title.trim()) errors.title = 'Enter the book title.';
  if (!fields.author.trim()) errors.author = 'Enter the author.';
  if (!state.categories.some((c) => c.id === fields.category)) errors.category = 'Choose a category.';

  const isbn = fields.isbn.replace(/[\s-]/g, '');
  if (!/^\d{10}(\d{3})?$/.test(isbn)) errors.isbn = 'ISBN must be 10 or 13 digits.';
  else if (state.books.some((b) => b.id !== bookId && b.isbn.replace(/-/g, '') === isbn)) {
    errors.isbn = 'Another book already uses this ISBN.';
  }

  const copies = Number(fields.copies);
  if (!Number.isInteger(copies) || copies < 1) errors.copies = 'Copies must be a whole number, at least 1.';
  else if (bookId) {
    const { total } = copiesOut(state, bookId);
    if (copies < total) errors.copies = `${plural(total, 'copy', 'copies')} are out or on hold, so keep at least ${total}.`;
  }

  if (!fields.shelf.trim()) errors.shelf = 'Enter the shelf location.';
  if (!DATE.test(fields.addedOn) || fields.addedOn > today()) errors.addedOn = 'Use a date that is not in the future.';
  return errors;
}

export function archiveBlocker(state, bookId) {
  const { out, held } = copiesOut(state, bookId);
  if (out) return `${plural(out, 'copy', 'copies')} out on loan`;
  if (held) return `${plural(held, 'copy', 'copies')} held for a member`;
  return '';
}

const intIn = (value, min, max) => {
  const n = Number(value);
  return String(value).trim() !== '' && Number.isInteger(n) && n >= min && n <= max;
};

export function validateSettings(next) {
  const errors = {};
  if (!intIn(next.loanDays, 1, 60)) errors.loanDays = 'Use 1 to 60 days.';
  if (!intIn(next.maxBooks, 1, 20)) errors.maxBooks = 'Use 1 to 20 books.';
  if (!intIn(next.fineRate, 0, 1000)) errors.fineRate = 'Use ₹0 to ₹1000 per day.';
  if (!intIn(next.graceDays, 0, 14)) errors.graceDays = 'Use 0 to 14 days.';
  if (!intIn(next.maxRenewals, 0, 5)) errors.maxRenewals = 'Use 0 to 5 renewals.';
  if (!intIn(next.holdDays, 1, 14)) errors.holdDays = 'Use 1 to 14 days.';
  const lib = next.library;
  if (!lib.name.trim()) errors.name = 'Enter the library name.';
  if (!lib.address.trim()) errors.address = 'Enter the address.';
  if (!EMAIL.test(lib.email.trim())) errors.email = 'Enter a valid email address.';
  if (!lib.phone.trim()) errors.phone = 'Enter a phone number.';
  if (!lib.hours.trim()) errors.hours = 'Enter the opening hours.';
  for (const kind of ['student', 'staff']) {
    const list = (next.departments?.[kind] ?? []).map((d) => d.trim().toLowerCase());
    if (!list.length) errors.departments = `Keep at least one ${kind} department.`;
    else if (list.some((d) => !d)) errors.departments = 'A department name cannot be blank.';
    else if (new Set(list).size !== list.length) errors.departments = `The ${kind} list has a repeated name.`;
  }
  return errors;
}

export const emailTaken = (state, email, exceptId = null) =>
  [...state.students, ...state.staff].some(
    (u) => u.id !== exceptId && u.email.toLowerCase() === email.trim().toLowerCase(),
  );

export const DEFAULT_PREFS = { dueReminders: true, reservationUpdates: true, emailNotifications: false };

// A strong password has all of these. The checklist under each password field
// shows the same list, so the UI and the API can never disagree.
export const PASSWORD_RULES = [
  { label: 'At least 8 characters', test: (pw) => pw.length >= 8 },
  { label: 'An uppercase letter', test: (pw) => /[A-Z]/.test(pw) },
  { label: 'A lowercase letter', test: (pw) => /[a-z]/.test(pw) },
  { label: 'A number', test: (pw) => /\d/.test(pw) },
  { label: 'A symbol such as ! @ # $', test: (pw) => /[^A-Za-z0-9\s]/.test(pw) },
];

export const passwordProblem = (pw) =>
  PASSWORD_RULES.every((rule) => rule.test(pw ?? ''))
    ? ''
    : 'Use 8+ characters with an uppercase letter, a lowercase letter, a number and a symbol.';

export const YEARS = ['1st year', '2nd year', '3rd year', '4th year'];

// "CSE · 2nd year"; older records that only have a class still show something.
export const memberLine = (s) =>
  s.department ? [s.department, s.year].filter(Boolean).join(' · ') : s.class || '—';

export function validateMember(state, fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Enter the member’s name.';
  if (!EMAIL.test(fields.email.trim())) errors.email = 'Enter a valid email address.';
  else if (emailTaken(state, fields.email)) errors.email = 'This email is already registered.';
  if (fields.password !== undefined && passwordProblem(fields.password)) {
    errors.password = passwordProblem(fields.password);
  }
  if (!fields.phone.trim()) errors.phone = 'Enter a phone number.';
  if (!fields.department.trim()) errors.department = 'Choose or write the department.';
  if (!YEARS.includes(fields.year)) errors.year = 'Choose the year.';
  return errors;
}

export function validateStaff(state, fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Enter the name.';
  if (!EMAIL.test(fields.email.trim())) errors.email = 'Enter a valid email address.';
  else if (emailTaken(state, fields.email)) errors.email = 'This email is already registered.';
  if (fields.password !== undefined && passwordProblem(fields.password)) {
    errors.password = passwordProblem(fields.password);
  }
  if (!fields.department.trim()) errors.department = 'Choose or write the department.';
  return errors;
}

export function validateMessage(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Enter your name.';
  if (!EMAIL.test(fields.email.trim())) errors.email = 'Enter a valid email address.';
  if (!fields.subject.trim()) errors.subject = 'Enter a subject.';
  if (fields.message.trim().length < 10) errors.message = 'Write at least 10 characters.';
  return errors;
}

export function validateResetRequest(fields) {
  const errors = {};
  if (!['student', 'librarian', 'admin'].includes(fields.role)) errors.role = 'Choose your role.';
  if (!EMAIL.test(fields.email.trim())) errors.email = 'Enter a valid email address.';
  return errors;
}

// Other books worth a look: same category first, then same author, with copies
// on the shelf ahead of the ones that are out.
export function similarBooks(state, book, limit = 4) {
  const score = (b) => (b.category === book.category ? 2 : 0) + (b.author === book.author ? 1 : 0);
  return state.books
    .filter((b) => b.id !== book.id && !b.archived && score(b) > 0)
    .map((b) => ({ ...b, available: availableCopies(state, b.id) }))
    .sort((a, b) => score(b) - score(a) || Number(b.available > 0) - Number(a.available > 0))
    .slice(0, limit);
}

export const ROLE_CODE = { librarian: 'LIB', admin: 'ADM' };
export const trailing = (id) => Number(id.match(/(\d+)$/)?.[1] ?? 0);

// ---------------------------------------------------------------- reducer

const staffName = (state, id) => state.staff.find((s) => s.id === id)?.name ?? 'Staff';
const bookTitle = (state, id) => state.books.find((b) => b.id === id)?.title ?? 'a book';
const memberName = (state, id) => state.students.find((s) => s.id === id)?.name ?? 'a member';

// Puts an entry at the front of the activity log, under the acting staff member's name.
function logged(state, action, text, kind) {
  const entry = { id: action.logId, on: today(), actor: staffName(state, action.actorId), text, kind };
  return { ...state, activity: [entry, ...state.activity] };
}

export function reducer(state, action) {
  switch (action.type) {
    case 'reserve': {
      const { bookId, id } = action;
      if (state.students.find((s) => s.id === action.actorId)?.status !== 'active') return state;
      const taken =
        state.loans.some((l) => l.studentId === action.actorId && l.bookId === bookId) ||
        state.reservations.some((r) => r.studentId === action.actorId && r.bookId === bookId);
      if (taken) return state;

      // A copy on the shelf is set aside straight away; otherwise join the queue.
      const ready = availableCopies(state, bookId) > 0;
      const reservation = ready
        ? { id, studentId: action.actorId, bookId, placedOn: today(), status: 'ready', expiresOn: addDays(today(), state.settings.holdDays) }
        : { id, studentId: action.actorId, bookId, placedOn: today(), status: 'waiting' };
      return { ...state, reservations: [...state.reservations, reservation] };
    }

    case 'cancelReservation': {
      if (!state.reservations.some((r) => r.id === action.id)) return state;
      return promoteWaiting({
        ...state,
        reservations: state.reservations.filter((r) => r.id !== action.id),
      });
    }

    case 'renew':
      return {
        ...state,
        loans: state.loans.map((loan) =>
          loan.id === action.id && canRenew(loan, state.settings).ok
            ? { ...loan, dueOn: addDays(loan.dueOn, state.settings.loanDays), renewals: loan.renewals + 1 }
            : loan,
        ),
      };

    case 'payAllFines':
      return {
        ...state,
        fines: state.fines.map((fine) =>
          fine.studentId === action.actorId && fine.status === 'due'
            ? { ...fine, status: 'paid', paidOn: today() }
            : fine,
        ),
      };

    case 'updateProfile':
      return {
        ...state,
        students: state.students.map((s) =>
          s.id === action.actorId ? { ...s, ...action.fields } : s,
        ),
      };

    case 'togglePreference':
      return {
        ...state,
        students: state.students.map((s) =>
          s.id === action.actorId ? { ...s, prefs: { ...s.prefs, [action.key]: !s.prefs?.[action.key] } } : s,
        ),
      };

    case 'issue': {
      const { studentId, bookId, issuedOn, id } = action;
      if (!canIssue(state, studentId, bookId).ok) return state;
      return logged(
        {
          ...state,
          loans: [
            ...state.loans,
            { id, studentId, bookId, issuedOn, dueOn: addDays(issuedOn, state.settings.loanDays), renewals: 0 },
          ],
          // Whatever hold the student had on this title has done its job.
          reservations: state.reservations.filter(
            (r) => !(r.studentId === studentId && r.bookId === bookId),
          ),
        },
        action,
        `Issued “${bookTitle(state, bookId)}” to ${memberName(state, studentId)}`,
        'issue',
      );
    }

    case 'return': {
      const loan = state.loans.find((l) => l.id === action.loanId);
      if (!loan || action.returnedOn < loan.issuedOn) return state;

      const { chargeable: days, fine } = lateness(loan, action.returnedOn, state.settings);
      const existing = state.fines.find((f) => f.loanId === loan.id);
      let fines = state.fines;
      if (existing && existing.status === 'due') {
        // The fine that had been accruing is settled to its final amount.
        fines = fine > 0
          ? fines.map((f) => (f.id === existing.id ? { ...f, days, amount: fine } : f))
          : fines.filter((f) => f.id !== existing.id);
      } else if (!existing && fine > 0) {
        fines = [
          ...fines,
          {
            id: action.fineId,
            studentId: loan.studentId,
            loanId: loan.id,
            bookId: loan.bookId,
            reason: 'Overdue',
            dueOn: loan.dueOn,
            days,
            amount: fine,
            status: 'due',
          },
        ];
      }

      const returned = promoteWaiting({
        ...state,
        loans: state.loans.filter((l) => l.id !== loan.id),
        history: [
          {
            id: action.historyId,
            studentId: loan.studentId,
            bookId: loan.bookId,
            issuedOn: loan.issuedOn,
            dueOn: loan.dueOn,
            returnedOn: action.returnedOn,
            fine,
          },
          ...state.history,
        ],
        fines,
      });
      return logged(
        returned,
        action,
        `Returned “${bookTitle(state, loan.bookId)}” from ${memberName(state, loan.studentId)}${fine ? ` (fine ₹${fine})` : ''}`,
        'return',
      );
    }

    case 'remind':
      return {
        ...state,
        loans: state.loans.map((loan) =>
          loan.id === action.loanId ? { ...loan, remindedOn: today() } : loan,
        ),
      };

    case 'updateLibrarian':
      return {
        ...state,
        staff: state.staff.map((m) => (m.id === action.actorId ? { ...m, ...action.fields } : m)),
      };

    // ------------------------------------------------------------ admin
    case 'addBook': {
      if (Object.keys(validateBook(state, action.fields)).length) return state;
      const f = action.fields;
      const book = {
        id: action.id,
        title: f.title.trim(),
        author: f.author.trim(),
        category: f.category,
        isbn: f.isbn.trim(),
        copies: Number(f.copies),
        shelf: f.shelf.trim(),
        addedOn: f.addedOn,
        description: f.description.trim(),
      };
      return logged({ ...state, books: [book, ...state.books] }, action, `Added “${book.title}” to the catalog`, 'book');
    }

    case 'updateBook': {
      if (Object.keys(validateBook(state, action.fields, action.id)).length) return state;
      const f = action.fields;
      return logged(
        {
          ...state,
          books: state.books.map((b) =>
            b.id === action.id
              ? {
                  ...b,
                  title: f.title.trim(),
                  author: f.author.trim(),
                  category: f.category,
                  isbn: f.isbn.trim(),
                  copies: Number(f.copies),
                  shelf: f.shelf.trim(),
                  addedOn: f.addedOn,
                  description: f.description.trim(),
                }
              : b,
          ),
        },
        action,
        `Updated “${f.title.trim()}”`,
        'book',
      );
    }

    case 'archiveBook': {
      if (archiveBlocker(state, action.id)) return state;
      return logged(
        {
          ...state,
          books: state.books.map((b) => (b.id === action.id ? { ...b, archived: true } : b)),
          // Nobody can still be queued for a title that is no longer lent.
          reservations: state.reservations.filter((r) => r.bookId !== action.id),
        },
        action,
        `Removed “${bookTitle(state, action.id)}” from the catalog`,
        'book',
      );
    }

    case 'addMember': {
      if (Object.keys(validateMember(state, action.fields)).length) return state;
      const f = action.fields;
      const member = {
        id: action.id,
        name: f.name.trim(),
        department: f.department.trim(),
        year: f.year,
        email: f.email.trim(),
        phone: f.phone.trim(),
        role: 'student',
        status: action.pending ? 'pending' : 'active',
        // an admin-made account starts on a temporary password
        ...(action.pending ? {} : { mustChangePassword: true }),
        joinedOn: today(),
        prefs: DEFAULT_PREFS,
      };
      if (action.pending) return { ...state, students: [...state.students, member] };
      return logged({ ...state, students: [...state.students, member] }, action, `Added member ${member.name}`, 'member');
    }

    case 'approveMember':
      return logged(
        {
          ...state,
          students: state.students.map((s) =>
            s.id === action.id && s.status === 'pending' ? { ...s, status: 'active' } : s,
          ),
        },
        action,
        `Approved ${memberName(state, action.id)}`,
        'member',
      );

    case 'rejectMember':
      if (state.students.find((s) => s.id === action.id)?.status !== 'pending') return state;
      return logged(
        { ...state, students: state.students.filter((s) => s.id !== action.id) },
        action,
        `Declined sign-up from ${memberName(state, action.id)}`,
        'member',
      );

    case 'setMemberStatus':
      return logged(
        {
          ...state,
          students: state.students.map((s) => (s.id === action.id ? { ...s, status: action.status } : s)),
        },
        action,
        `${action.status === 'suspended' ? 'Suspended' : 'Reactivated'} ${memberName(state, action.id)}`,
        'member',
      );

    case 'addStaff': {
      if (Object.keys(validateStaff(state, action.fields)).length) return state;
      const f = action.fields;
      const member = {
        id: action.id,
        name: f.name.trim(),
        role: f.role,
        department: f.department.trim(),
        email: f.email.trim(),
        phone: '',
        addedOn: today(),
        joined: formatDate(today()).slice(3),
        status: 'active',
        mustChangePassword: true,
      };
      return logged({ ...state, staff: [...state.staff, member] }, action, `Added ${member.role} ${member.name}`, 'staff');
    }

    // The new password itself is hashed by the API; the reducer only flags the account.
    case 'resetPassword': {
      const member = [...state.students, ...state.staff].find((u) => u.id === action.id);
      if (!member || member.id === action.actorId) return state;
      const flag = (list) => list.map((u) => (u.id === action.id ? { ...u, mustChangePassword: true } : u));
      return logged(
        { ...state, students: flag(state.students), staff: flag(state.staff) },
        action,
        `Reset the password for ${member.name}`,
        member.role === 'student' ? 'member' : 'staff',
      );
    }

    case 'passwordSet': {
      const clear = (list) =>
        list.map((u) => {
          if (u.id !== action.actorId) return u;
          const { mustChangePassword: _done, ...rest } = u;
          return rest;
        });
      return { ...state, students: clear(state.students), staff: clear(state.staff) };
    }

    case 'addMessage':
      return { ...state, messages: [action.message, ...state.messages] };

    case 'setMessageRead':
      return {
        ...state,
        messages: state.messages.map((m) => (m.id === action.id ? { ...m, read: action.read } : m)),
      };

    case 'deleteMessage':
      return { ...state, messages: state.messages.filter((m) => m.id !== action.id) };

    case 'updateStaffRole':
      if (action.id === action.actorId) return state;
      return logged(
        { ...state, staff: state.staff.map((m) => (m.id === action.id ? { ...m, role: action.role } : m)) },
        action,
        `Changed ${staffName(state, action.id)} to ${action.role}`,
        'staff',
      );

    case 'setStaffStatus':
      if (action.id === action.actorId && action.status === 'inactive') return state;
      return logged(
        { ...state, staff: state.staff.map((m) => (m.id === action.id ? { ...m, status: action.status } : m)) },
        action,
        `${action.status === 'inactive' ? 'Deactivated' : 'Reactivated'} ${staffName(state, action.id)}`,
        'staff',
      );

    case 'markFinePaid': {
      const fine = state.fines.find((f) => f.id === action.id);
      if (!fine || fine.status !== 'due') return state;
      return logged(
        {
          ...state,
          fines: state.fines.map((f) => (f.id === fine.id ? { ...f, status: 'paid', paidOn: today() } : f)),
        },
        action,
        `Recorded ₹${fine.amount} paid by ${memberName(state, fine.studentId)}`,
        'fine',
      );
    }

    case 'waiveFine': {
      const fine = state.fines.find((f) => f.id === action.id);
      if (!fine || fine.status !== 'due' || !action.reason.trim()) return state;
      return logged(
        {
          ...state,
          fines: state.fines.map((f) =>
            f.id === fine.id ? { ...f, status: 'waived', waivedOn: today(), waivedReason: action.reason.trim() } : f,
          ),
        },
        action,
        `Waived ₹${fine.amount} fine for ${memberName(state, fine.studentId)} (${action.reason.trim()})`,
        'fine',
      );
    }

    case 'updateSettings': {
      if (Object.keys(validateSettings(action.next)).length) return state;
      const n = action.next;
      const settings = {
        loanDays: Number(n.loanDays),
        maxBooks: Number(n.maxBooks),
        fineRate: Number(n.fineRate),
        graceDays: Number(n.graceDays),
        maxRenewals: Number(n.maxRenewals),
        holdDays: Number(n.holdDays),
        library: Object.fromEntries(Object.entries(n.library).map(([k, v]) => [k, v.trim()])),
        departments: {
          student: n.departments.student.map((d) => d.trim()),
          staff: n.departments.staff.map((d) => d.trim()),
        },
      };
      return logged({ ...state, settings }, action, 'Updated library settings', 'settings');
    }

    case 'updateAdmin':
      return logged(
        {
          ...state,
          staff: state.staff.map((m) => (m.id === action.actorId ? { ...m, ...action.fields } : m)),
        },
        action,
        'Updated own profile',
        'staff',
      );

    default:
      return state;
  }
}

