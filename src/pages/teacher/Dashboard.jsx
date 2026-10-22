import { Link } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import css from '../../styles/teacher-dashboard.css?inline';

export default function Dashboard() {
  return (
    <>
      <title>Teacher Dashboard | BookVerse</title>
      <meta name="description" content="BookVerse teacher dashboard." />
      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <div className="hero-heading-row">
              <div>
                <p className="eyebrow">TEACHER DASHBOARD</p>
                <h1>
                  Welcome back, <span>Priya.</span>
                </h1>
                <p className="hero-description">
                  Here's what's happening with your students' books, due dates, and library activity
                  today.
                </p>
              </div>
              <div className="hero-side-card">
                <span>TEACHER ID</span> <strong>BV2026TCH014</strong>
              </div>
            </div>
            {/* QUICK STATS */}
            <div className="stats-grid">
              <article className="stat-card">
                <div className="stat-icon">
                  <i className="fa-solid fa-user-graduate" />
                </div>
                <div>
                  <span>Total students</span> <strong>48</strong>
                </div>
              </article>
              <article className="stat-card">
                <div className="stat-icon">
                  <i className="fa-solid fa-book-open" />
                </div>
                <div>
                  <span>Books borrowed</span> <strong>27</strong>
                </div>
              </article>
              <article className="stat-card stat-card-warning">
                <div className="stat-icon">
                  <i className="fa-solid fa-clock" />
                </div>
                <div>
                  <span>Overdue books</span> <strong>05</strong>
                </div>
              </article>
              <article className="stat-card">
                <div className="stat-icon">
                  <i className="fa-regular fa-calendar-check" />
                </div>
                <div>
                  <span>Returned this week</span> <strong>11</strong>
                </div>
              </article>
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
                  <Link
                    to="/teacher/issue-book"
                    className="select-row"
                    style={{ border: '1px solid rgba(214,194,170,0.13)', borderRadius: '11px' }}
                  >
                    <span
                      className="stat-icon"
                      style={{ flex: '0 0 40px', width: '40px', height: '40px' }}
                    >
                      <i className="fa-solid fa-right-to-bracket" />
                    </span>
                    <div className="select-info">
                      <h3>Issue a book</h3>
                      <p>Assign a book to a student</p>
                    </div>
                  </Link>{' '}
                  <Link
                    to="/teacher/return-book"
                    className="select-row"
                    style={{ border: '1px solid rgba(214,194,170,0.13)', borderRadius: '11px' }}
                  >
                    <span
                      className="stat-icon"
                      style={{ flex: '0 0 40px', width: '40px', height: '40px' }}
                    >
                      <i className="fa-solid fa-arrow-rotate-left" />
                    </span>
                    <div className="select-info">
                      <h3>Return a book</h3>
                      <p>Process a student's return</p>
                    </div>
                  </Link>{' '}
                  <Link
                    to="/teacher/students"
                    className="select-row"
                    style={{ border: '1px solid rgba(214,194,170,0.13)', borderRadius: '11px' }}
                  >
                    <span
                      className="stat-icon"
                      style={{ flex: '0 0 40px', width: '40px', height: '40px' }}
                    >
                      <i className="fa-solid fa-user-graduate" />
                    </span>
                    <div className="select-info">
                      <h3>View students</h3>
                      <p>See borrowing status by student</p>
                    </div>
                  </Link>{' '}
                  <Link
                    to="/teacher/transactions"
                    className="select-row"
                    style={{ border: '1px solid rgba(214,194,170,0.13)', borderRadius: '11px' }}
                  >
                    <span
                      className="stat-icon"
                      style={{ flex: '0 0 40px', width: '40px', height: '40px' }}
                    >
                      <i className="fa-solid fa-clock-rotate-left" />
                    </span>
                    <div className="select-info">
                      <h3>View transactions</h3>
                      <p>Full borrowing &amp; return history</p>
                    </div>
                  </Link>
                </div>
              </section>
              {/* RECENT ACTIVITY */}
              <section className="page-block">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">RECENT ACTIVITY</p>
                    <h2>Latest borrowing &amp; returns</h2>
                  </div>
                  <Link to="/teacher/transactions" className="text-arrow">
                    View all <i className="fa-solid fa-arrow-right" />
                  </Link>
                </div>
                <div className="data-table">
                  <div
                    className="table-head"
                    style={{ gridTemplateColumns: 'minmax(170px,1.6fr) 1fr 0.8fr 0.7fr' }}
                  >
                    <span>Student &amp; Book</span> <span>Type</span> <span>Date</span>{' '}
                    <span>Status</span>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(170px,1.6fr) 1fr 0.8fr 0.7fr' }}
                  >
                    <div className="table-entity">
                      <div className="mini-book">
                        <i className="fa-solid fa-book" />
                      </div>
                      <div>
                        <strong>Rohan Mehta</strong> <small>Clean Code</small>
                      </div>
                    </div>
                    <span>Issued</span> <span>24 Aug 2026</span>{' '}
                    <span className="badge badge-good">On time</span>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(170px,1.6fr) 1fr 0.8fr 0.7fr' }}
                  >
                    <div className="table-entity">
                      <div className="mini-book">
                        <i className="fa-solid fa-book" />
                      </div>
                      <div>
                        <strong>Sara Khan</strong> <small>Atomic Habits</small>
                      </div>
                    </div>
                    <span>Returned</span> <span>25 Aug 2026</span>{' '}
                    <span className="badge badge-good">Completed</span>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(170px,1.6fr) 1fr 0.8fr 0.7fr' }}
                  >
                    <div className="table-entity">
                      <div className="mini-book">
                        <i className="fa-solid fa-book" />
                      </div>
                      <div>
                        <strong>Aditya Rao</strong> <small>Introduction to Algorithms</small>
                      </div>
                    </div>
                    <span>Issued</span> <span>09 Aug 2026</span>{' '}
                    <span className="badge badge-bad">Overdue</span>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(170px,1.6fr) 1fr 0.8fr 0.7fr' }}
                  >
                    <div className="table-entity">
                      <div className="mini-book">
                        <i className="fa-solid fa-book" />
                      </div>
                      <div>
                        <strong>Meera Iyer</strong> <small>Deep Work</small>
                      </div>
                    </div>
                    <span>Returned</span> <span>22 Aug 2026</span>{' '}
                    <span className="badge badge-good">Completed</span>
                  </div>
                </div>
              </section>
            </div>
            {/* RIGHT COLUMN */}
            <aside className="dashboard-sidebar">
              <section className="side-card overdue-card">
                <div className="side-card-heading">
                  <div className="notice-icon">
                    <i className="fa-solid fa-clock" />
                  </div>
                  <span className="notice-label">ACTION NEEDED</span>
                </div>
                <h2>5 books are overdue.</h2>
                <p>
                  5 students have books that are past their due date. Review them and send a
                  reminder if needed.
                </p>
                <Link to="/teacher/transactions" className="light-button" style={{ width: '100%' }}>
                  View overdue list <i className="fa-solid fa-arrow-right" />
                </Link>
              </section>
              <section className="side-card quick-links-card">
                <h2>Shortcuts</h2>
                <Link to="/teacher/issue-book" className="quick-link">
                  <span>
                    <i className="fa-solid fa-right-to-bracket" />
                  </span>
                  <div>
                    <strong>Issue Book</strong> <small>Assign a book to a student</small>
                  </div>
                  <i className="fa-solid fa-arrow-right" />
                </Link>{' '}
                <Link to="/teacher/return-book" className="quick-link">
                  <span>
                    <i className="fa-solid fa-arrow-rotate-left" />
                  </span>
                  <div>
                    <strong>Return Book</strong> <small>Process a returned book</small>
                  </div>
                  <i className="fa-solid fa-arrow-right" />
                </Link>{' '}
                <Link to="/teacher/books" className="quick-link">
                  <span>
                    <i className="fa-solid fa-layer-group" />
                  </span>
                  <div>
                    <strong>Book Inventory</strong> <small>Check availability</small>
                  </div>
                  <i className="fa-solid fa-arrow-right" />
                </Link>{' '}
                <Link to="/teacher/profile" className="quick-link">
                  <span>
                    <i className="fa-solid fa-id-card" />
                  </span>
                  <div>
                    <strong>My Profile</strong> <small>Account &amp; settings</small>
                  </div>
                  <i className="fa-solid fa-arrow-right" />
                </Link>
              </section>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
