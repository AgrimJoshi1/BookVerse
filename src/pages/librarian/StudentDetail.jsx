import { Link, useParams } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import {
  formatDate,
  initials,
  loanStatus,
  pad,
  plural,
  rupees,
  studentSummary,
  memberLine,
  useLibrarian,
} from '../../context/LibraryContext';
import css from '../../styles/librarian-students.css?inline';

function BookEntity({ book }) {
  return (
    <div className="table-entity">
      <div className="mini-book">
        <i className="fa-solid fa-book" />
      </div>
      <div>
        <strong>{book.title}</strong> <small>{book.author}</small>
      </div>
    </div>
  );
}

export default function StudentDetail() {
  const { id } = useParams();
  const { state, getBook, getStudent, sendReminder } = useLibrarian();
  const student = getStudent(id);

  if (!student) {
    return (
      <>
        <title>Student not found | BookVerse</title>
        <PageStyles css={css} />
        <main>
          <section className="page-hero compact">
            <div className="container">
              <p className="eyebrow">STUDENTS</p>
              <h1>
                Student <span>not found.</span>
              </h1>
              <p className="hero-description">We couldn't find a student with the ID "{id}".</p>
              <Link to="/librarian/students" className="light-button hero-search">
                Back to students <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          </section>
        </main>
      </>
    );
  }

  const summary = studentSummary(state, student.id);
  const loans = state.loans.filter((loan) => loan.studentId === student.id);
  const history = state.history.filter((entry) => entry.studentId === student.id);
  const fines = state.fines.filter((fine) => fine.studentId === student.id);
  const fineFor = (loanId) => fines.find((fine) => fine.loanId === loanId);

  return (
    <>
      <title>{student.name} | BookVerse</title>
      <meta name="description" content={`Borrowing activity for ${student.name}.`} />
      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">
              <Link to="/librarian/students" className="back-link">
                <i className="fa-solid fa-arrow-left" /> STUDENTS
              </Link>
            </p>
            <div className="hero-heading-row">
              <div className="profile-heading">
                <div className="large-avatar">{initials(student.name)}</div>
                <div>
                  <h1>{student.name}</h1>
                  <p>
                    {student.id} · {memberLine(student)} · {student.email}
                  </p>
                </div>
              </div>
              <span className={`badge badge-${summary.status.tone}`}>{summary.status.label}</span>
            </div>
            <div className="stats-grid">
              <article className="stat-card">
                <div className="stat-icon">
                  <i className="fa-solid fa-book-open" />
                </div>
                <div>
                  <span>Active loans</span> <strong>{pad(summary.active)}</strong>
                </div>
              </article>
              <article className={`stat-card${summary.overdue ? ' stat-card-warning' : ''}`}>
                <div className="stat-icon">
                  <i className="fa-solid fa-clock" />
                </div>
                <div>
                  <span>Overdue</span> <strong>{pad(summary.overdue)}</strong>
                </div>
              </article>
              <article className={`stat-card${summary.finesDue ? ' stat-card-warning' : ''}`}>
                <div className="stat-icon">
                  <i className="fa-solid fa-indian-rupee-sign" />
                </div>
                <div>
                  <span>Fines due</span> <strong>{rupees(summary.finesDue)}</strong>
                </div>
              </article>
              <article className="stat-card">
                <div className="stat-icon">
                  <i className="fa-regular fa-calendar-check" />
                </div>
                <div>
                  <span>Total loans</span> <strong>{pad(summary.totalLoans)}</strong>
                </div>
              </article>
            </div>
          </div>
        </section>
        {/* CONTENT */}
        <section className="page-section">
          <div className="container page-grid">
            <div className="page-main">
              {/* ACTIVE LOANS */}
              <section className="page-block">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">CURRENT LOANS</p>
                    <h2>Books with {student.name.split(' ')[0]}</h2>
                  </div>
                  <span className="panel-count">{plural(loans.length, 'active loan')}</span>
                </div>
                <div className="data-table">
                  <div className="table-head cols-student-loans">
                    <span>Book</span> <span>Issued</span> <span>Due date</span> <span>Fine</span>{' '}
                    <span>Status</span> <span />
                  </div>
                  {loans.map((loan) => {
                    const status = loanStatus(loan);
                    const fine = fineFor(loan.id);
                    return (
                      <div className="table-row cols-student-loans" key={loan.id}>
                        <BookEntity book={getBook(loan.bookId)} />
                        <span>{formatDate(loan.issuedOn)}</span>{' '}
                        <span>{formatDate(loan.dueOn)}</span>{' '}
                        <span>{rupees(fine?.amount ?? 0)}</span>
                        <span className={`badge badge-${status.overdue ? 'bad' : 'good'}`}>
                          {status.overdue ? status.label : 'On time'}
                        </span>{' '}
                        <div className="row-actions">
                          <Link to={`/librarian/return-book?loan=${loan.id}`} className="row-action">
                            Return <i className="fa-solid fa-arrow-right" />
                          </Link>
                          {status.overdue && (
                            <button
                              type="button"
                              className={`row-action as-link${loan.remindedOn ? ' is-done' : ''}`}
                              disabled={Boolean(loan.remindedOn)}
                              onClick={() => sendReminder(loan.id)}
                            >
                              {loan.remindedOn ? 'Reminded' : 'Remind'}{' '}
                              <i
                                className={`fa-solid ${loan.remindedOn ? 'fa-check' : 'fa-bell'}`}
                              />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {loans.length === 0 && (
                    <p className="empty-state table-empty-row">
                      <i className="fa-solid fa-book-open" /> {student.name.split(' ')[0]} has no
                      books on loan.
                      <Link to={`/librarian/issue-book?student=${student.id}`}>Issue a book</Link>
                    </p>
                  )}
                </div>
              </section>
              {/* HISTORY */}
              <section className="page-block">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">HISTORY</p>
                    <h2>Returned books</h2>
                  </div>
                  <span className="panel-count">{plural(history.length, 'record')}</span>
                </div>
                <div className="data-table">
                  <div className="table-head cols-student-history">
                    <span>Book</span> <span>Issued</span> <span>Due date</span>{' '}
                    <span>Returned</span> <span>Fine</span>
                  </div>
                  {history.map((entry) => (
                    <div className="table-row cols-student-history" key={entry.id}>
                      <BookEntity book={getBook(entry.bookId)} />
                      <span>{formatDate(entry.issuedOn)}</span>{' '}
                      <span>{formatDate(entry.dueOn ?? entry.issuedOn)}</span>{' '}
                      <span>{formatDate(entry.returnedOn)}</span>{' '}
                      <span>{rupees(entry.fine ?? 0)}</span>
                    </div>
                  ))}
                  {history.length === 0 && (
                    <p className="empty-state table-empty-row">
                      <i className="fa-regular fa-circle-check" /> No returned books yet.
                    </p>
                  )}
                </div>
              </section>
            </div>
            {/* SIDEBAR */}
            <aside className="page-sidebar">
              <section className="side-card summary-card">
                <p className="eyebrow">CONTACT</p>
                <h2>{student.name}</h2>
                <div className="summary-line first">
                  <span>Student ID</span> <strong>{student.id}</strong>
                </div>
                <div className="summary-line">
                  <span>Department</span> <strong>{memberLine(student)}</strong>
                </div>
                <div className="summary-line">
                  <span>Email</span> <strong>{student.email}</strong>
                </div>
                <div className="summary-line">
                  <span>Phone</span> <strong>{student.phone}</strong>
                </div>
                <Link
                  to={`/librarian/issue-book?student=${student.id}`}
                  className="light-button summary-action"
                >
                  Issue a book to {student.name.split(' ')[0]}{' '}
                  <i className="fa-solid fa-arrow-right" />
                </Link>
              </section>
              <section className="side-card">
                <p className="eyebrow">FINES</p>
                <h2>Fine records</h2>
                {fines.length === 0 ? (
                  <p className="side-note">No fines on this account.</p>
                ) : (
                  fines.map((fine, index) => (
                    <div className={`summary-line${index === 0 ? ' first' : ''}`} key={fine.id}>
                      <span>
                        {getBook(fine.bookId).title} · {plural(fine.days, 'day')}
                      </span>{' '}
                      <strong>
                        {rupees(fine.amount)} · {fine.status === 'paid' ? 'Paid' : fine.status === 'waived' ? 'Waived' : 'Unpaid'}
                      </strong>
                    </div>
                  ))
                )}
              </section>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
