import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import { today } from '../../api/engine';
import {
  addDays,
  availableCopies,
  canIssue,
  formatDate,
  initials,
  plural,
  rupees,
  studentSummary,
  memberLine,
  useLibrarian,
} from '../../context/LibraryContext';
import css from '../../styles/librarian-issue-book.css?inline';

const LIST_SIZE = 4;

// The matches for a search, always including whatever is already picked.
function shortlist(items, selected, matches) {
  const list = items.filter(matches).slice(0, LIST_SIZE);
  if (selected && !list.some((item) => item.id === selected.id)) list.unshift(selected);
  return list;
}

export default function IssueBook() {
  const { state, students, books, getStudent, getBook, issueBook, settings } = useLibrarian();
  const [params] = useSearchParams();

  const [studentId, setStudentId] = useState(() => (getStudent(params.get('student')) ? params.get('student') : null));
  const [bookId, setBookId] = useState(() => (getBook(params.get('book')) ? params.get('book') : null));
  const [studentQuery, setStudentQuery] = useState('');
  const [bookQuery, setBookQuery] = useState('');
  const [issueDate, setIssueDate] = useState(today());
  const [done, setDone] = useState(null);
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState('');

  const student = studentId ? getStudent(studentId) : null;
  const book = bookId ? getBook(bookId) : null;
  const summary = student ? studentSummary(state, student.id) : null;
  const check = student && book ? canIssue(state, student.id, book.id) : null;
  const dueOn = issueDate ? addDays(issueDate, settings.loanDays) : null;

  const sq = studentQuery.trim().toLowerCase();
  const bq = bookQuery.trim().toLowerCase();
  const studentList = shortlist(
    students,
    student,
    (s) => !sq || s.name.toLowerCase().includes(sq) || s.id.toLowerCase().includes(sq),
  );
  const bookList = shortlist(
    books,
    book,
    (b) => !bq || [b.title, b.author, b.isbn].some((field) => field.toLowerCase().includes(bq)),
  );

  const blocker = !student || !book
    ? 'Pick a student and a book to continue.'
    : !issueDate
      ? 'Choose an issue date.'
      : !check.ok
        ? check.reason
        : null;

  const warnings = [];
  if (summary?.overdue) {
    warnings.push(`${student.name} has ${plural(summary.overdue, 'overdue book')}.`);
  }
  if (summary?.finesDue) warnings.push(`${student.name} has ${rupees(summary.finesDue)} in unpaid fines.`);

  async function confirm() {
    if (blocker || busy) return;
    setBusy(true);
    setFailure('');
    try {
      await issueBook(student.id, book.id, issueDate);
    } catch (error) {
      setFailure(error.message);
      return;
    } finally {
      setBusy(false);
    }
    setDone({ student, book, dueOn });
    setBookId(null);
    setBookQuery('');
  }

  function reset() {
    setDone(null);
    setStudentId(null);
    setBookId(null);
    setStudentQuery('');
    setBookQuery('');
    setIssueDate(today());
  }

  return (
    <>
      <title>Issue Book | BookVerse</title>
      <meta name="description" content="Issue a library book to a student in BookVerse." />
      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">ISSUE BOOK</p>
            <h1>
              Issue a book <span>to a student.</span>
            </h1>
            <p className="hero-description">
              Find the student and the book, confirm the details, and the due date will be
              calculated for you.
            </p>
          </div>
        </section>
        {/* CONTENT */}
        <section className="page-section">
          <div className="container page-grid">
            <div className="page-main">
              {/* STEP 1: STUDENT */}
              <section className="page-block">
                <div className="block-heading">
                  <div>
                    <p className="eyebrow">STEP 1</p>
                    <h2>Find the student</h2>
                  </div>
                </div>
                <form className="search-box" onSubmit={(event) => event.preventDefault()}>
                  <i className="fa-solid fa-magnifying-glass" />{' '}
                  <input
                    type="text"
                    placeholder="Search by name or student ID"
                    value={studentQuery}
                    onChange={(event) => setStudentQuery(event.target.value)}
                  />{' '}
                  {studentQuery ? (
                    <button type="button" onClick={() => setStudentQuery('')}>
                      Clear
                    </button>
                  ) : (
                    <button type="submit">Search</button>
                  )}
                </form>
                <div className="select-list">
                  {studentList.map((s) => {
                    const sum = studentSummary(state, s.id);
                    return (
                      <div className={`select-row${s.id === studentId ? ' selected' : ''}`} key={s.id}>
                        <div className="mini-person">{initials(s.name)}</div>
                        <div className="select-info">
                          <h3>{s.name}</h3>
                          <p>
                            {s.id} · {memberLine(s)}
                            {sum.overdue > 0 && ` · ${sum.overdue} overdue`}
                          </p>
                        </div>
                        <button
                          className="select-pick"
                          type="button"
                          onClick={() => {
                            setStudentId(s.id);
                            setDone(null);
                          }}
                        >
                          {s.id === studentId ? 'Selected' : 'Select'}
                        </button>
                      </div>
                    );
                  })}
                  {studentList.length === 0 && (
                    <p className="empty-state">
                      <i className="fa-solid fa-magnifying-glass" /> No students match “{studentQuery}”.
                    </p>
                  )}
                </div>
              </section>
              {/* STEP 2: BOOK */}
              <section className="page-block">
                <div className="block-heading">
                  <div>
                    <p className="eyebrow">STEP 2</p>
                    <h2>Find the book</h2>
                  </div>
                </div>
                <form className="search-box" onSubmit={(event) => event.preventDefault()}>
                  <i className="fa-solid fa-magnifying-glass" />{' '}
                  <input
                    type="text"
                    placeholder="Search by title, author, or ISBN"
                    value={bookQuery}
                    onChange={(event) => setBookQuery(event.target.value)}
                  />{' '}
                  {bookQuery ? (
                    <button type="button" onClick={() => setBookQuery('')}>
                      Clear
                    </button>
                  ) : (
                    <button type="submit">Search</button>
                  )}
                </form>
                <div className="select-list">
                  {bookList.map((b) => {
                    const rowCheck = student ? canIssue(state, student.id, b.id) : null;
                    const blocked = rowCheck ? !rowCheck.ok : b.available === 0;
                    return (
                      <div
                        className={`select-row${b.id === bookId ? ' selected' : ''}${blocked ? ' is-blocked' : ''}`}
                        key={b.id}
                      >
                        <div className="mini-book">
                          <i className="fa-solid fa-book" />
                        </div>
                        <div className="select-info">
                          <h3>{b.title}</h3>
                          <p>
                            {b.author} · {b.available} of {plural(b.copies, 'copy', 'copies')} available
                            {rowCheck && !rowCheck.ok && ` · ${rowCheck.reason}`}
                          </p>
                        </div>
                        <button
                          className="select-pick"
                          type="button"
                          onClick={() => {
                            setBookId(b.id);
                            setDone(null);
                          }}
                        >
                          {b.id === bookId ? 'Selected' : 'Select'}
                        </button>
                      </div>
                    );
                  })}
                  {bookList.length === 0 && (
                    <p className="empty-state">
                      <i className="fa-solid fa-magnifying-glass" /> No books match “{bookQuery}”.
                    </p>
                  )}
                </div>
                {book && (
                  <p className="field-hint spaced">
                    <i className="fa-solid fa-circle-info" />{' '}
                    {plural(availableCopies(state, book.id), 'copy', 'copies')} of this title{' '}
                    {availableCopies(state, book.id) === 1 ? 'is' : 'are'} currently available to
                    issue.
                  </p>
                )}
              </section>
              {/* STEP 3: DATES */}
              <section className="page-block">
                <div className="block-heading">
                  <div>
                    <p className="eyebrow">STEP 3</p>
                    <h2>Loan period</h2>
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="issue-date">Issue date</label>{' '}
                    <input
                      type="date"
                      id="issue-date"
                      value={issueDate}
                      onChange={(event) => setIssueDate(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="due-date">Due date (auto-calculated)</label>{' '}
                    <input
                      type="text"
                      id="due-date"
                      value={dueOn ? formatDate(dueOn) : '—'}
                      readOnly
                    />{' '}
                    <span className="field-hint">
                      Standard loan period is {settings.loanDays} days from the issue date.
                    </span>
                  </div>
                </div>
              </section>
            </div>
            {/* SUMMARY SIDEBAR */}
            <aside className="page-sidebar">
              <section className="side-card summary-card">
                <p className="eyebrow">CONFIRM ISSUE</p>
                <h2>Summary</h2>
                <div className="summary-line first">
                  <span>Student</span> <strong>{student?.name ?? '—'}</strong>
                </div>
                <div className="summary-line">
                  <span>Student ID</span> <strong>{student?.id ?? '—'}</strong>
                </div>
                <div className="summary-line">
                  <span>Book</span> <strong>{book?.title ?? '—'}</strong>
                </div>
                <div className="summary-line">
                  <span>Issue date</span> <strong>{issueDate ? formatDate(issueDate) : '—'}</strong>
                </div>
                <div className="summary-line">
                  <span>Due date</span> <strong>{dueOn ? formatDate(dueOn) : '—'}</strong>
                </div>
                {failure && (
                  <p className="form-error" role="alert">
                    {failure}
                  </p>
                )}
                <button
                  className="light-button summary-action"
                  type="button"
                  disabled={Boolean(blocker) || busy}
                  onClick={confirm}
                >
                  {busy ? 'Issuing…' : 'Confirm & issue book'} <i className="fa-solid fa-arrow-right" />
                </button>
                {done ? (
                  <div className="notice notice-success">
                    <i className="fa-regular fa-circle-check" />
                    <p>
                      Issued “{done.book.title}” to {done.student.name}. Due {formatDate(done.dueOn)}.
                      <span className="notice-links">
                        <Link to={`/librarian/students/${done.student.id}`}>View student</Link>
                        <button type="button" className="as-link notice-link" onClick={reset}>
                          Issue another
                        </button>
                      </span>
                    </p>
                  </div>
                ) : blocker ? (
                  <div className={`notice ${student && book ? 'notice-warning' : 'notice-info'}`}>
                    <i
                      className={`fa-solid ${student && book ? 'fa-triangle-exclamation' : 'fa-circle-info'}`}
                    />
                    <p>{blocker}</p>
                  </div>
                ) : (
                  <div className="notice notice-success">
                    <i className="fa-regular fa-circle-check" />
                    <p>
                      Student and book selected.
                      {check.reason && ` ${check.reason}.`} Review the summary above, then confirm to
                      issue.
                    </p>
                  </div>
                )}
              </section>
              <section className="side-card">
                <p className="eyebrow">NEEDS ATTENTION</p>
                <h2>Before you confirm</h2>
                <div className="notice notice-warning flush">
                  <i className="fa-solid fa-triangle-exclamation" />
                  <p>
                    {warnings.length
                      ? warnings.join(' ')
                      : "Make sure the student doesn't already have an overdue book before issuing a new one."}
                  </p>
                </div>
              </section>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
