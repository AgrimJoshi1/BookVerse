import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import { today } from '../../api/engine';
import {
  formatDate,
  lateness,
  plural,
  rupees,
  useLibrarian,
  waitingFor,
} from '../../context/LibraryContext';
import css from '../../styles/librarian-return-book.css?inline';

const LIST_SIZE = 4;

export default function ReturnBook() {
  const { state, getBook, getStudent, returnLoan, settings } = useLibrarian();
  const [params] = useSearchParams();

  const [loanId, setLoanId] = useState(() =>
    state.loans.some((l) => l.id === params.get('loan')) ? params.get('loan') : null,
  );
  const [query, setQuery] = useState('');
  const [returnDate, setReturnDate] = useState(today());
  const [done, setDone] = useState(null);
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState('');

  const loan = state.loans.find((l) => l.id === loanId) ?? null;
  const book = loan ? getBook(loan.bookId) : null;
  const student = loan ? getStudent(loan.studentId) : null;
  const late = loan && returnDate ? lateness(loan, returnDate, settings) : { days: 0, chargeable: 0, fine: 0 };

  const needle = query.trim().toLowerCase();
  const matches = state.loans
    .filter((l) => {
      if (!needle) return true;
      const b = getBook(l.bookId);
      return [b.title, b.isbn, getStudent(l.studentId).name].some((field) =>
        field.toLowerCase().includes(needle),
      );
    })
    .sort((a, b) => a.dueOn.localeCompare(b.dueOn));
  const list = matches.slice(0, LIST_SIZE);
  if (loan && !list.some((l) => l.id === loan.id)) list.unshift(loan);

  const blocker = !loan
    ? 'Pick a loan to return.'
    : !returnDate
      ? 'Choose a return date.'
      : returnDate < loan.issuedOn
        ? "The return date can't be before the issue date."
        : null;

  async function complete() {
    if (blocker || busy) return;
    // Whoever is first in the queue gets the copy that is about to come back.
    const next = waitingFor(state, loan.bookId)[0];
    const reserved = next ? getStudent(next.studentId) : null;
    setBusy(true);
    setFailure('');
    try {
      await returnLoan(loan.id, returnDate);
    } catch (error) {
      setFailure(error.message);
      return;
    } finally {
      setBusy(false);
    }
    setDone({
      book,
      student,
      fine: late.fine,
      days: late.days,
      reserved,
    });
    setLoanId(null);
    setQuery('');
  }

  return (
    <>
      <title>Return Book | BookVerse</title>
      <meta name="description" content="Process a book return in BookVerse." />
      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">RETURN BOOK</p>
            <h1>
              Process a <span>book return.</span>
            </h1>
            <p className="hero-description">
              Search or scan the book, confirm the borrower, and complete the return in a few
              seconds.
            </p>
          </div>
        </section>
        {/* CONTENT */}
        <section className="page-section">
          <div className="container page-grid">
            <div className="page-main">
              {/* FIND */}
              <section className="page-block">
                <div className="block-heading">
                  <div>
                    <p className="eyebrow">STEP 1</p>
                    <h2>Search or scan the book</h2>
                  </div>
                  <span className="panel-count">{plural(state.loans.length, 'book')} out on loan</span>
                </div>
                <form className="search-box" onSubmit={(event) => event.preventDefault()}>
                  <i className="fa-solid fa-barcode" />{' '}
                  <input
                    type="text"
                    placeholder="Search by title, ISBN, or student name"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />{' '}
                  {query ? (
                    <button type="button" onClick={() => setQuery('')}>
                      Clear
                    </button>
                  ) : (
                    <button type="submit">Search</button>
                  )}
                </form>
                <div className="select-list">
                  {list.map((l) => {
                    const b = getBook(l.bookId);
                    const overdue = l.dueOn < today();
                    return (
                      <div className={`select-row${l.id === loanId ? ' selected' : ''}`} key={l.id}>
                        <div className="mini-book">
                          <i className="fa-solid fa-book" />
                        </div>
                        <div className="select-info">
                          <h3>{b.title}</h3>
                          <p>
                            {b.author} · Borrowed by {getStudent(l.studentId).name}
                            {overdue && ' · Overdue'}
                          </p>
                        </div>
                        <button
                          className="select-pick"
                          type="button"
                          onClick={() => {
                            setLoanId(l.id);
                            setDone(null);
                          }}
                        >
                          {l.id === loanId ? 'Selected' : 'Select'}
                        </button>
                      </div>
                    );
                  })}
                  {list.length === 0 && (
                    <p className="empty-state">
                      <i className="fa-solid fa-magnifying-glass" />{' '}
                      {state.loans.length === 0
                        ? 'No books are out on loan.'
                        : `No borrowed books match “${query}”.`}
                    </p>
                  )}
                </div>
              </section>
              {/* BORROW DETAILS */}
              <section className="page-block">
                <div className="block-heading">
                  <div>
                    <p className="eyebrow">STEP 2</p>
                    <h2>Loan details</h2>
                  </div>
                  {loan && (
                    <span className={`badge badge-${late.days ? 'bad' : 'good'}`}>
                      {late.days ? 'Overdue' : 'On time'}
                    </span>
                  )}
                </div>
                {loan ? (
                  <>
                    <div className="data-table">
                      <div className="table-head cols-loan-details">
                        <span>Borrowed</span> <span>Due date</span> <span>Days overdue</span>
                      </div>
                      <div className="table-row cols-loan-details compact">
                        <strong>{formatDate(loan.issuedOn)}</strong>{' '}
                        <strong>{formatDate(loan.dueOn)}</strong>{' '}
                        <strong className={late.days ? 'text-bad' : undefined}>
                          {plural(late.days, 'day')}
                        </strong>
                      </div>
                    </div>
                    {late.days > 0 ? (
                      <div className="notice notice-warning">
                        <i className="fa-solid fa-triangle-exclamation" />
                        <p>
                          This book is overdue by {plural(late.days, 'day')}.{' '}
                          {late.fine > 0
                            ? `A fine will be applied automatically based on library policy (${rupees(settings.fineRate)} / day${settings.graceDays ? `, after ${plural(settings.graceDays, 'grace day')}` : ''}).`
                            : 'It is within the grace period, so no fine applies.'}
                        </p>
                      </div>
                    ) : (
                      <div className="notice notice-info">
                        <i className="fa-solid fa-circle-info" />
                        <p>Returned on time, so no fine applies.</p>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="empty-state">
                    <i className="fa-solid fa-book-open" /> Select a loan above to see its details.
                  </p>
                )}
              </section>
              {/* RETURN DATE */}
              <section className="page-block">
                <div className="block-heading">
                  <div>
                    <p className="eyebrow">STEP 3</p>
                    <h2>Confirm return date</h2>
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="return-date">Return date</label>{' '}
                    <input
                      type="date"
                      id="return-date"
                      value={returnDate}
                      onChange={(event) => setReturnDate(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fine-amount">Fine due</label>{' '}
                    <input type="text" id="fine-amount" value={rupees(late.fine)} readOnly />{' '}
                    <span className="field-hint">Calculated automatically from days overdue.</span>
                  </div>
                </div>
              </section>
            </div>
            {/* SUMMARY SIDEBAR */}
            <aside className="page-sidebar">
              <section className="side-card summary-card">
                <p className="eyebrow">CONFIRM RETURN</p>
                <h2>Summary</h2>
                <div className="summary-line first">
                  <span>Book</span> <strong>{book?.title ?? '—'}</strong>
                </div>
                <div className="summary-line">
                  <span>Student</span> <strong>{student?.name ?? '—'}</strong>
                </div>
                <div className="summary-line">
                  <span>Due date</span> <strong>{loan ? formatDate(loan.dueOn) : '—'}</strong>
                </div>
                <div className="summary-line">
                  <span>Return date</span> <strong>{returnDate ? formatDate(returnDate) : '—'}</strong>
                </div>
                <div className="summary-line">
                  <span>Fine due</span> <strong>{rupees(late.fine)}</strong>
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
                  onClick={complete}
                >
                  {busy ? 'Saving…' : 'Complete return'} <i className="fa-solid fa-check" />
                </button>
                {done ? (
                  <div className="notice notice-success">
                    <i className="fa-regular fa-circle-check" />
                    <p>
                      “{done.book.title}” returned by {done.student.name}.
                      {done.fine > 0 && ` A fine of ${rupees(done.fine)} was added to their account.`}
                      {done.reserved && ` It is now on hold for ${done.reserved.name}.`}
                      <span className="notice-links">
                        <Link to={`/librarian/students/${done.student.id}`}>View student</Link>
                      </span>
                    </p>
                  </div>
                ) : blocker ? (
                  <div className={`notice ${loan ? 'notice-warning' : 'notice-info'}`}>
                    <i className={`fa-solid ${loan ? 'fa-triangle-exclamation' : 'fa-circle-info'}`} />
                    <p>{blocker}</p>
                  </div>
                ) : (
                  <div className="notice notice-info">
                    <i className="fa-solid fa-circle-info" />
                    <p>
                      Completing the return will mark the book available
                      {late.fine > 0 ? " and add the fine to the student's account" : ''}.
                    </p>
                  </div>
                )}
              </section>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
