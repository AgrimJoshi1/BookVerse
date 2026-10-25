import { Link } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import {
  buildTransactions,
  daysUntil,
  formatDate,
  pad,
  plural,
  useLibrarian,
} from '../../context/LibraryContext';
import css from '../../styles/librarian-dashboard.css?inline';

const ACTIVITY = {
  issued: { type: 'Issued', label: 'On time', tone: 'good' },
  overdue: { type: 'Issued', label: 'Overdue', tone: 'bad' },
  returned: { type: 'Returned', label: 'Completed', tone: 'good' },
};

const ACTIONS = [
  { to: '/librarian/issue-book', icon: 'fa-right-to-bracket', title: 'Issue a book', text: 'Assign a book to a student' },
  { to: '/librarian/return-book', icon: 'fa-arrow-rotate-left', title: 'Return a book', text: "Process a student's return" },
  { to: '/librarian/students', icon: 'fa-user-graduate', title: 'View students', text: 'See borrowing status by student' },
  { to: '/librarian/transactions', icon: 'fa-clock-rotate-left', title: 'View transactions', text: 'Full borrowing & return history' },
];

const SHORTCUTS = [
  { to: '/librarian/issue-book', icon: 'fa-right-to-bracket', title: 'Issue Book', text: 'Assign a book to a student' },
  { to: '/librarian/return-book', icon: 'fa-arrow-rotate-left', title: 'Return Book', text: 'Process a returned book' },
  { to: '/librarian/books', icon: 'fa-layer-group', title: 'Book Inventory', text: 'Check availability' },
  { to: '/librarian/profile', icon: 'fa-id-card', title: 'My Profile', text: 'Account & settings' },
];

export default function Dashboard() {
  const { state, librarian, students, getBook, getStudent } = useLibrarian();

  const overdue = state.loans.filter((loan) => daysUntil(loan.dueOn) < 0);
  const overdueStudents = new Set(overdue.map((loan) => loan.studentId)).size;
  const returnedThisWeek = state.history.filter((h) => daysUntil(h.returnedOn) >= -7).length;
  const recent = buildTransactions(state).slice(0, 5);

  return (
    <>
      <title>Librarian Dashboard | BookVerse</title>
      <meta name="description" content="BookVerse librarian dashboard." />
      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <div className="hero-heading-row">
              <div>
                <p className="eyebrow">LIBRARIAN DASHBOARD</p>
                <h1>
                  Welcome back, <span>{librarian.name.split(' ')[0]}.</span>
                </h1>
                <p className="hero-description">
                  Here's what's happening with your students' books, due dates, and library activity
                  today.
                </p>
              </div>
              <div className="hero-side-card">
                <span>LIBRARIAN ID</span> <strong>{librarian.id}</strong>
              </div>
            </div>
            {/* QUICK STATS */}
            <div className="stats-grid">
              <Link to="/librarian/students" className="stat-card">
                <div className="stat-icon">
                  <i className="fa-solid fa-user-graduate" />
                </div>
                <div>
                  <span>Total students</span> <strong>{pad(students.length)}</strong>
                </div>
              </Link>
              <Link to="/librarian/transactions?status=issued" className="stat-card">
                <div className="stat-icon">
                  <i className="fa-solid fa-book-open" />
                </div>
                <div>
                  <span>Books borrowed</span> <strong>{pad(state.loans.length)}</strong>
                </div>
              </Link>
              <Link
                to="/librarian/transactions?status=overdue"
                className={`stat-card${overdue.length ? ' stat-card-warning' : ''}`}
              >
                <div className="stat-icon">
                  <i className="fa-solid fa-clock" />
                </div>
                <div>
                  <span>Overdue books</span> <strong>{pad(overdue.length)}</strong>
                </div>
              </Link>
              <Link to="/librarian/transactions?status=returned" className="stat-card">
                <div className="stat-icon">
                  <i className="fa-regular fa-calendar-check" />
                </div>
                <div>
                  <span>Returned this week</span> <strong>{pad(returnedThisWeek)}</strong>
                </div>
              </Link>
            </div>
          </div>
        </section>
        {/* DASHBOARD CONTENT */}
        <section className="page-section">
          <div className="container page-grid">
            {/* LEFT COLUMN */}
            <div className="page-main">
              {/* QUICK ACTIONS */}
              <section className="page-block">
                <div className="block-heading">
                  <div>
                    <p className="eyebrow">QUICK ACTIONS</p>
                    <h2>What would you like to do?</h2>
                  </div>
                </div>
                <div className="form-grid">
                  {ACTIONS.map(({ to, icon, title, text }) => (
                    <Link to={to} className="select-row action-card" key={to}>
                      <span className="stat-icon">
                        <i className={`fa-solid ${icon}`} />
                      </span>
                      <div className="select-info">
                        <h3>{title}</h3>
                        <p>{text}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
              {/* RECENT ACTIVITY */}
              <section className="page-block">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">RECENT ACTIVITY</p>
                    <h2>Latest borrowing &amp; returns</h2>
                  </div>
                  <Link to="/librarian/transactions" className="text-arrow">
                    View all <i className="fa-solid fa-arrow-right" />
                  </Link>
                </div>
                <div className="data-table">
                  <div className="table-head cols-activity">
                    <span>Student &amp; Book</span> <span>Type</span> <span>Date</span>{' '}
                    <span>Status</span>
                  </div>
                  {recent.map((row) => {
                    const activity = ACTIVITY[row.status];
                    return (
                      <div className="table-row cols-activity" key={row.key}>
                        <div className="table-entity">
                          <div className="mini-book">
                            <i className="fa-solid fa-book" />
                          </div>
                          <div>
                            <strong>{getStudent(row.studentId).name}</strong>{' '}
                            <small>{getBook(row.bookId).title}</small>
                          </div>
                        </div>
                        <span>{activity.type}</span> <span>{formatDate(row.date)}</span>{' '}
                        <span className={`badge badge-${activity.tone}`}>{activity.label}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
            {/* RIGHT COLUMN */}
            <aside className="dashboard-sidebar">
              {overdue.length > 0 ? (
                <section className="side-card overdue-card">
                  <div className="side-card-heading">
                    <div className="notice-icon">
                      <i className="fa-solid fa-clock" />
                    </div>
                    <span className="notice-label">ACTION NEEDED</span>
                  </div>
                  <h2>
                    {overdue.length === 1 ? '1 book is overdue.' : `${overdue.length} books are overdue.`}
                  </h2>
                  <p>
                    {plural(overdueStudents, 'student')}{' '}
                    {overdueStudents === 1 ? 'has' : 'have'} books that are past their due date. Review
                    them and send a reminder if needed.
                  </p>
                  <Link
                    to="/librarian/transactions?status=overdue"
                    className="light-button summary-action"
                  >
                    View overdue list <i className="fa-solid fa-arrow-right" />
                  </Link>
                </section>
              ) : (
                <section className="side-card">
                  <div className="side-card-heading">
                    <div className="notice-icon">
                      <i className="fa-regular fa-circle-check" />
                    </div>
                    <span className="notice-label">ALL CLEAR</span>
                  </div>
                  <h2>Nothing overdue.</h2>
                  <p className="side-note">Every borrowed book is within its due date.</p>
                </section>
              )}
              <section className="side-card quick-links-card">
                <h2>Shortcuts</h2>
                {SHORTCUTS.map(({ to, icon, title, text }) => (
                  <Link to={to} className="quick-link" key={to}>
                    <span>
                      <i className={`fa-solid ${icon}`} />
                    </span>
                    <div>
                      <strong>{title}</strong> <small>{text}</small>
                    </div>
                    <i className="fa-solid fa-arrow-right" />
                  </Link>
                ))}
              </section>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
