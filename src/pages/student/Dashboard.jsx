import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import {
  formatDate,
  loanProgress,
  loanStatus,
  monthDay,
  pad,
  plural,
  rupees,
  useStudent,
  useStudentStats,
} from '../../context/LibraryContext';
import css from '../../styles/student-dashboard.css?inline';

const COVERS = ['cover-one', 'cover-two', 'cover-three'];

export default function Dashboard() {
  const { student, loans, getBook } = useStudent();
  const stats = useStudentStats();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const borrowed = loans.map((loan) => ({ loan, book: getBook(loan.bookId), status: loanStatus(loan) }));
  const upcoming = borrowed
    .filter(({ status }) => !status.overdue)
    .sort((a, b) => a.status.days - b.status.days);
  const overdue = borrowed.filter(({ status }) => status.overdue);

  function search(event) {
    event.preventDefault();
    const q = query.trim();
    navigate(q ? `/student/browse-books?q=${encodeURIComponent(q)}` : '/student/browse-books');
  }

  return (
    <>
      <title>Student Dashboard | BookVerse</title>
      <meta name="description" content="BookVerse student library dashboard." />
      <PageStyles css={css} />
      <main>
        {/* DASHBOARD HERO */}
        <section className="dashboard-hero">
          <div className="container">
            <div className="welcome-row">
              <div className="welcome-copy">
                <p className="eyebrow">STUDENT DASHBOARD</p>
                <h1>
                  Welcome back, <span>{student.name.split(' ')[0]}.</span>
                </h1>
                <p>
                  Keep track of your books, due dates, and everything you're reading in one place.
                </p>
              </div>
            </div>
            {/* QUICK STATS */}
            <div className="stats-grid">
              <Link to="/student/my-books" className="stat-card">
                <div className="stat-icon">
                  <i className="fa-solid fa-book-open" />
                </div>
                <div>
                  <span>Currently borrowed</span> <strong>{pad(stats.borrowed)}</strong>
                </div>
              </Link>
              <Link to="/student/my-books" className="stat-card">
                <div className="stat-icon">
                  <i className="fa-regular fa-calendar" />
                </div>
                <div>
                  <span>Due this week</span> <strong>{pad(stats.dueThisWeek)}</strong>
                </div>
              </Link>
              <Link
                to="/student/fines"
                className={`stat-card${stats.overdue ? ' stat-card-warning' : ''}`}
              >
                <div className="stat-icon">
                  <i className="fa-solid fa-clock" />
                </div>
                <div>
                  <span>Overdue books</span> <strong>{pad(stats.overdue)}</strong>
                </div>
              </Link>
              <Link to="/student/reservations" className="stat-card">
                <div className="stat-icon">
                  <i className="fa-solid fa-bookmark" />
                </div>
                <div>
                  <span>Reservations</span> <strong>{pad(stats.reservations)}</strong>
                </div>
              </Link>
            </div>
          </div>
        </section>
        {/* DASHBOARD CONTENT */}
        <section className="dashboard-section">
          <div className="container dashboard-grid">
            {/* LEFT COLUMN */}
            <div className="dashboard-main">
              {/* QUICK SEARCH */}
              <section className="dashboard-block">
                <div className="block-heading">
                  <div>
                    <p className="eyebrow">FIND A BOOK</p>
                    <h2>What are you looking for?</h2>
                  </div>
                  <Link to="/student/browse-books" className="text-arrow">
                    Browse all <i className="fa-solid fa-arrow-right" />
                  </Link>
                </div>
                <form className="search-box" onSubmit={search}>
                  <i className="fa-solid fa-magnifying-glass" />{' '}
                  <input
                    type="text"
                    placeholder="Search by title, author, or category"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />{' '}
                  <button type="submit">Search</button>
                </form>
              </section>
              {/* CURRENTLY BORROWED */}
              <section className="dashboard-block">
                <div className="block-heading">
                  <div>
                    <p className="eyebrow">YOUR BOOKS</p>
                    <h2>Currently borrowed</h2>
                  </div>
                  <Link to="/student/my-books" className="text-arrow">
                    My books <i className="fa-solid fa-arrow-right" />
                  </Link>
                </div>
                <div className="borrowed-list">
                  {borrowed.map(({ loan, book, status }, index) => (
                    <article className="book-row" key={loan.id}>
                      <div className={`book-cover ${COVERS[index % COVERS.length]}`}>
                        <i className="fa-solid fa-book" />
                      </div>
                      <div className="book-info">
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                        <span className="book-category">{book.category}</span>
                      </div>
                      <div className="book-due">
                        <span>Due date</span> <strong>{formatDate(loan.dueOn)}</strong>{' '}
                        <small>{status.label}</small>
                      </div>
                      <span
                        className={`status-badge ${status.overdue ? 'status-overdue' : 'status-good'}`}
                      >
                        {status.overdue ? 'Overdue' : 'On time'}
                      </span>
                    </article>
                  ))}
                  {borrowed.length === 0 && (
                    <p className="empty-state">
                      <i className="fa-solid fa-book-open" /> You have no books on loan right now.
                      <Link to="/student/browse-books">Find a book</Link>
                    </p>
                  )}
                </div>
              </section>
              {/* UPCOMING DUE DATES */}
              <section className="dashboard-block">
                <div className="block-heading">
                  <div>
                    <p className="eyebrow">STAY ON TRACK</p>
                    <h2>Upcoming due dates</h2>
                  </div>
                </div>
                {upcoming.map(({ loan, book, status }) => {
                  const { month, day } = monthDay(loan.dueOn);
                  return (
                    <div className="due-card" key={loan.id}>
                      <div className="calendar-day">
                        <span>{month}</span> <strong>{day}</strong>
                      </div>
                      <div className="due-copy">
                        <h3>{book.title}</h3>
                        <p>
                          {book.author} · {book.category}
                        </p>
                      </div>
                      <div className="due-progress">
                        <div className="progress-label">
                          <span>Loan period</span> <span>{status.label}</span>
                        </div>
                        <div className="progress-track">
                          <span
                            className="progress-fill"
                            style={{ width: `${loanProgress(loan)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
                {upcoming.length === 0 && (
                  <p className="empty-state">
                    <i className="fa-regular fa-calendar-check" /> Nothing coming due.
                  </p>
                )}
              </section>
            </div>
            {/* RIGHT COLUMN */}
            <aside className="dashboard-sidebar">
              {student.status === 'suspended' && (
                <section className="side-card overdue-card">
                  <div className="side-card-heading">
                    <div className="notice-icon">
                      <i className="fa-solid fa-ban" />
                    </div>
                    <span className="notice-label">ACCOUNT SUSPENDED</span>
                  </div>
                  <h2>Your membership is suspended.</h2>
                  <p>You can't reserve or borrow books until the library desk reactivates your account.</p>
                </section>
              )}
              {/* OVERDUE NOTICE */}
              {overdue.length > 0 && (
                <section className="side-card overdue-card">
                  <div className="side-card-heading">
                    <div className="notice-icon">
                      <i className="fa-solid fa-clock" />
                    </div>
                    <span className="notice-label">ACTION NEEDED</span>
                  </div>
                  <h2>
                    {overdue.length === 1
                      ? 'One book is overdue.'
                      : `${overdue.length} books are overdue.`}
                  </h2>
                  <p>
                    {overdue.length === 1
                      ? `${overdue[0].book.title} was due on ${formatDate(overdue[0].loan.dueOn)}.`
                      : `${plural(overdue.length, 'book')} are past their due date.`}{' '}
                    Please return {overdue.length === 1 ? 'it' : 'them'} to avoid additional fines.
                  </p>
                  <div className="fine-preview">
                    <span>{stats.finesDue ? 'Current fine' : 'Fines paid'}</span>{' '}
                    <strong>{rupees(stats.finesDue)}</strong>
                  </div>
                  <Link to="/student/fines" className="light-button">
                    View details <i className="fa-solid fa-arrow-right" />
                  </Link>
                </section>
              )}
              {overdue.length === 0 && (
                <section className="side-card">
                  <div className="side-card-heading">
                    <div className="notice-icon">
                      <i className="fa-regular fa-circle-check" />
                    </div>
                    <span className="notice-label">ALL CLEAR</span>
                  </div>
                  <h2 className="all-clear-title">Nothing overdue.</h2>
                  <p className="all-clear-copy">
                    Your account is in good standing. Reserve your next read while copies are on
                    the shelf.
                  </p>
                  <Link to="/student/reservations" className="outline-button">
                    View reservations <i className="fa-solid fa-arrow-right" />
                  </Link>
                </section>
              )}
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
