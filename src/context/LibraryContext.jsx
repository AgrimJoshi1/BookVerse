import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as api from '../api';
import { availableCopies, queuePosition, studentSummary, daysUntil } from '../api/engine';

// React's view of the library. The data and the rules live in src/api (a
// promise-based "server" on top of localStorage); this file loads a snapshot of
// it, hands it to the pages, and turns every action into an API call. Each
// action returns the API's promise, so a page can await it (to show "Saving...")
// and catch an ApiError (to show what was wrong).

export * from '../api/engine';
export { ApiError } from '../api';

const LibraryContext = createContext(null);

const PROGRESS_CSS = `
.api-bar{position:fixed;top:0;left:0;right:0;height:3px;z-index:9999;overflow:hidden;background:transparent;pointer-events:none}
.api-bar::before{content:'';position:absolute;inset:0;width:40%;background:#d9c9a8;animation:api-slide 0.9s ease-in-out infinite}
@keyframes api-slide{0%{transform:translateX(-100%)}100%{transform:translateX(260%)}}
`;

export function LibraryProvider({ children }) {
  const [snap, setSnap] = useState(null);
  const [session, setSession] = useState(() => api.currentSession());
  const [pending, setPending] = useState(0);

  // First load goes through the API like everything else (and creates the
  // first admin on a fresh browser).
  useEffect(() => {
    let live = true;
    api.loadAll().then((data) => live && setSnap(data));
    return () => {
      live = false;
    };
  }, []);

  // Another tab changed the data or logged out: follow it.
  useEffect(() => {
    const onStorage = () => {
      setSnap(api.snapshot());
      setSession(api.currentSession());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Runs an API call, tracks that something is in flight, and refreshes the
  // snapshot once it succeeds. The caller gets the same promise back.
  const run = useCallback((promise) => {
    setPending((n) => n + 1);
    return promise
      .then((result) => {
        setSnap(api.snapshot());
        return result;
      })
      .finally(() => setPending((n) => n - 1));
  }, []);

  const value = useMemo(() => {
    const actions = {
      // auth
      register: (fields) => run(api.register(fields)),
      login: (email, password, role, remember) =>
        run(api.login(email, password, role, remember)).then((result) => {
          setSession(api.currentSession());
          return result;
        }),
      logout: () =>
        run(api.logout()).then(() => {
          setSession(null);
        }),
      // instant sign-out, used when the login page opens
      endSession: () => {
        api.clearSession();
        setSession(null);
      },
      changePassword: (current, next) => run(api.changePassword(current, next)),
      setNewPassword: (next) => run(api.setNewPassword(next)),
      sendMessage: (fields) => run(api.sendMessage(fields)),
      requestPasswordReset: (fields) => run(api.requestPasswordReset(fields)),

      // student
      reserveBook: (bookId) => run(api.reserveBook(bookId)),
      cancelReservation: (id) => run(api.cancelReservation(id)),
      renewLoan: (id) => run(api.renewLoan(id)),
      payAllFines: () => run(api.payAllFines()),
      updateProfile: (fields) => run(api.updateProfile(fields)),
      togglePreference: (key) => run(api.togglePreference(key)),

      // librarian
      issueBook: (studentId, bookId, issuedOn) => run(api.issueBook(studentId, bookId, issuedOn)),
      returnLoan: (loanId, returnedOn) => run(api.returnLoan(loanId, returnedOn)),
      sendReminder: (loanId) => run(api.sendReminder(loanId)),
      updateLibrarian: (fields) => run(api.updateLibrarian(fields)),

      // admin
      addBook: (fields) => run(api.addBook(fields)),
      updateBook: (id, fields) => run(api.updateBook(id, fields)),
      archiveBook: (id) => run(api.archiveBook(id)),
      addMember: (fields) => run(api.addMember(fields)),
      approveMember: (id) => run(api.approveMember(id)),
      rejectMember: (id) => run(api.rejectMember(id)),
      setMemberStatus: (id, status) => run(api.setMemberStatus(id, status)),
      addStaff: (fields) => run(api.addStaff(fields)),
      updateStaffRole: (id, role) => run(api.updateStaffRole(id, role)),
      setStaffStatus: (id, status) => run(api.setStaffStatus(id, status)),
      markFinePaid: (id) => run(api.markFinePaid(id)),
      waiveFine: (id, reason) => run(api.waiveFine(id, reason)),
      updateSettings: (next) => run(api.updateSettings(next)),
      updateAdmin: (fields) => run(api.updateAdmin(fields)),
      resetPassword: (id, temp) => run(api.resetPassword(id, temp)),
      setMessageRead: (id, read) => run(api.setMessageRead(id, read)),
      deleteMessage: (id) => run(api.deleteMessage(id)),
    };

    if (!snap) return { ready: false, session, pending, ...actions };

    // Books as the pages see them: with the copies currently on the shelf.
    // Removed (archived) books drop out of `books` but still resolve by id, so
    // old loans and history keep their titles.
    const allBooks = snap.books.map((book) => ({ ...book, available: availableCopies(snap, book.id) }));
    const books = allBooks.filter((book) => !book.archived);
    const bookIndex = new Map(allBooks.map((book) => [book.id, book]));
    const studentIndex = new Map(snap.students.map((s) => [s.id, s]));
    const staffIndex = new Map(snap.staff.map((m) => [m.id, m]));
    const me = session ? (studentIndex.get(session.userId) ?? staffIndex.get(session.userId) ?? null) : null;

    return {
      ready: true,
      state: snap,
      session,
      pending,
      me,
      // the signed-in person, under the name each area uses
      librarian: me,
      admin: me,
      settings: snap.settings,
      staff: snap.staff,
      activity: snap.activity,
      messages: snap.messages,
      unreadMessages: snap.messages.filter((m) => !m.read).length,
      categories: snap.categories,
      students: snap.students,
      books,
      allBooks,
      getBook: (id) => bookIndex.get(id),
      getStudent: (id) => studentIndex.get(id),
      getStaff: (id) => staffIndex.get(id),
      ...actions,
    };
  }, [snap, session, pending, run]);

  return (
    <LibraryContext.Provider value={value}>
      {pending > 0 && (
        <>
          <style>{PROGRESS_CSS}</style>
          <div className="api-bar" role="progressbar" aria-label="Working" />
        </>
      )}
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) throw new Error('useLibrary must be used inside <LibraryProvider>');
  return context;
}

// The librarian side sees the whole library.
export const useLibrarian = useLibrary;

// The student side sees only the signed-in student's slice of it.
export function useStudent() {
  const library = useLibrary();
  const { state, me } = library;

  const slice = useMemo(() => {
    const mine = (item) => item.studentId === me?.id;
    return {
      student: me,
      preferences: me?.prefs ?? {},
      loans: state.loans.filter(mine),
      history: state.history.filter(mine),
      reservations: state.reservations
        .filter(mine)
        .map((reservation) => ({ ...reservation, position: queuePosition(state, reservation) })),
      fines: state.fines.filter(mine),
    };
  }, [state, me]);

  return { ...library, ...slice };
}

export function useStudentStats() {
  const { state, student, loans, reservations } = useStudent();
  const days = loans.map((loan) => daysUntil(loan.dueOn));
  return {
    borrowed: loans.length,
    dueThisWeek: days.filter((d) => d >= 0 && d <= 7).length,
    overdue: days.filter((d) => d < 0).length,
    reservations: reservations.length,
    // what is already on record plus what overdue books have earned so far
    finesDue: studentSummary(state, student.id).finesDue,
  };
}
