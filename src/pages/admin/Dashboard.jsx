import { Link } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import css from '../../styles/admin-dashboard.css?inline';

export default function Dashboard() {
  return (
    <>
      <title>Admin Dashboard | BookVerse</title>
      <meta name="description" content="BookVerse administrator dashboard." />
      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <div className="hero-heading-row">
              <div>
                <p className="eyebrow">ADMINISTRATOR DASHBOARD</p>
                <h1>
                  Welcome back, <span>Sunita.</span>
                </h1>
                <p className="hero-description">
                  A library-wide view of books, members, staff, and everything moving through
                  BookVerse today.
                </p>
              </div>
              <div className="hero-side-card">
                <span>ADMIN ID</span> <strong>BV2026ADM002</strong>
              </div>
            </div>
            {/* QUICK STATS */}
            <div className="stats-grid">
              <article className="stat-card">
                <div className="stat-icon">
                  <i className="fa-solid fa-layer-group" />
                </div>
                <div>
                  <span>Total books</span> <strong>2,480</strong>
                </div>
              </article>
              <article className="stat-card">
                <div className="stat-icon">
                  <i className="fa-solid fa-users" />
                </div>
                <div>
                  <span>Total members</span> <strong>612</strong>
                </div>
              </article>
              <article className="stat-card">
                <div className="stat-icon">
                  <i className="fa-solid fa-user-tie" />
                </div>
                <div>
                  <span>Total staff</span> <strong>24</strong>
                </div>
              </article>
              <article className="stat-card">
                <div className="stat-icon">
                  <i className="fa-solid fa-right-to-bracket" />
                </div>
                <div>
                  <span>Active loans</span> <strong>318</strong>
                </div>
              </article>
              <article className="stat-card stat-card-warning">
                <div className="stat-icon">
                  <i className="fa-solid fa-clock" />
                </div>
                <div>
                  <span>Overdue books</span> <strong>37</strong>
                </div>
              </article>
              <article className="stat-card">
                <div className="stat-icon">
                  <i className="fa-solid fa-indian-rupee-sign" />
                </div>
                <div>
                  <span>Fines collected</span> <strong>₹18,420</strong>
                </div>
              </article>
              <article className="stat-card stat-card-warning">
                <div className="stat-icon">
                  <i className="fa-solid fa-hourglass-half" />
                </div>
                <div>
                  <span>Fines outstanding</span> <strong>₹4,760</strong>
                </div>
              </article>
              <article className="stat-card">
                <div className="stat-icon">
                  <i className="fa-solid fa-chart-line" />
                </div>
                <div>
                  <span>Circulation this month</span> <strong>1,042</strong>
                </div>
              </article>
            </div>
          </div>
        </section>
        {/* CONTENT */}
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
                    to="/admin/add-book"
                    className="select-row"
                    style={{ border: '1px solid rgba(214,194,170,0.13)', borderRadius: '11px' }}
                  >
                    <span
                      className="stat-icon"
                      style={{ flex: '0 0 40px', width: '40px', height: '40px' }}
                    >
                      <i className="fa-solid fa-book-medical" />
                    </span>
                    <div className="select-info">
                      <h3>Add a book</h3>
                      <p>Add a new title to the catalog</p>
                    </div>
                  </Link>{' '}
                  <Link
                    to="/admin/members"
                    className="select-row"
                    style={{ border: '1px solid rgba(214,194,170,0.13)', borderRadius: '11px' }}
                  >
                    <span
                      className="stat-icon"
                      style={{ flex: '0 0 40px', width: '40px', height: '40px' }}
                    >
                      <i className="fa-solid fa-user-plus" />
                    </span>
                    <div className="select-info">
                      <h3>Add a member</h3>
                      <p>Register a new library member</p>
                    </div>
                  </Link>{' '}
                  <Link
                    to="/admin/staff"
                    className="select-row"
                    style={{ border: '1px solid rgba(214,194,170,0.13)', borderRadius: '11px' }}
                  >
                    <span
                      className="stat-icon"
                      style={{ flex: '0 0 40px', width: '40px', height: '40px' }}
                    >
                      <i className="fa-solid fa-user-tie" />
                    </span>
                    <div className="select-info">
                      <h3>Add staff</h3>
                      <p>Onboard a new staff account</p>
                    </div>
                  </Link>{' '}
                  <Link
                    to="/admin/reports"
                    className="select-row"
                    style={{ border: '1px solid rgba(214,194,170,0.13)', borderRadius: '11px' }}
                  >
                    <span
                      className="stat-icon"
                      style={{ flex: '0 0 40px', width: '40px', height: '40px' }}
                    >
                      <i className="fa-solid fa-chart-pie" />
                    </span>
                    <div className="select-info">
                      <h3>View reports</h3>
                      <p>Circulation &amp; library statistics</p>
                    </div>
                  </Link>
                </div>
              </section>
              {/* RECENT ACTIVITY */}
              <section className="page-block">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">RECENT ACTIVITY</p>
                    <h2>Library-wide activity</h2>
                  </div>
                  <Link to="/admin/transactions" className="text-arrow">
                    View all <i className="fa-solid fa-arrow-right" />
                  </Link>
                </div>
                <div className="data-table">
                  <div
                    className="table-head"
                    style={{ gridTemplateColumns: 'minmax(150px,1.4fr) 1fr 0.9fr 0.8fr 0.7fr' }}
                  >
                    <span>Member / Staff</span> <span>Book</span> <span>Type</span>{' '}
                    <span>Date</span> <span>Status</span>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(150px,1.4fr) 1fr 0.9fr 0.8fr 0.7fr' }}
                  >
                    <div className="table-entity">
                      <div className="mini-person">RM</div>
                      <div>
                        <strong>Rohan Mehta</strong>
                        <small>Student</small>
                      </div>
                    </div>
                    <span>Clean Code</span> <span>Issued</span> <span>24 Aug 2026</span>{' '}
                    <span className="badge badge-good">On time</span>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(150px,1.4fr) 1fr 0.9fr 0.8fr 0.7fr' }}
                  >
                    <div className="table-entity">
                      <div className="mini-person">PN</div>
                      <div>
                        <strong>Priya Nair</strong>
                        <small>Teacher</small>
                      </div>
                    </div>
                    <span>Design Patterns</span> <span>Issued</span> <span>25 Aug 2026</span>{' '}
                    <span className="badge badge-good">On time</span>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(150px,1.4fr) 1fr 0.9fr 0.8fr 0.7fr' }}
                  >
                    <div className="table-entity">
                      <div className="mini-person">AR</div>
                      <div>
                        <strong>Aditya Rao</strong>
                        <small>Student</small>
                      </div>
                    </div>
                    <span>Intro to Algorithms</span> <span>Issued</span> <span>09 Aug 2026</span>{' '}
                    <span className="badge badge-bad">Overdue</span>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(150px,1.4fr) 1fr 0.9fr 0.8fr 0.7fr' }}
                  >
                    <div className="table-entity">
                      <div className="mini-person">MI</div>
                      <div>
                        <strong>Meera Iyer</strong>
                        <small>Student</small>
                      </div>
                    </div>
                    <span>Deep Work</span> <span>Returned</span> <span>22 Aug 2026</span>{' '}
                    <span className="badge badge-good">Completed</span>
                  </div>
                  <div
                    className="table-row"
                    style={{ gridTemplateColumns: 'minmax(150px,1.4fr) 1fr 0.9fr 0.8fr 0.7fr' }}
                  >
                    <div className="table-entity">
                      <div className="mini-person">KJ</div>
                      <div>
                        <strong>Karan Joshi</strong>
                        <small>Librarian</small>
                      </div>
                    </div>
                    <span>The Midnight Library</span> <span>Added</span> <span>20 Aug 2026</span>{' '}
                    <span className="badge badge-neutral">Catalog</span>
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
                <h2>37 books are overdue.</h2>
                <p>
                  Across all classes and members, 37 loans are past their due date. Review
                  outstanding fines and send reminders where needed.
                </p>
                <Link to="/admin/fines" className="light-button" style={{ width: '100%' }}>
                  View outstanding fines <i className="fa-solid fa-arrow-right" />
                </Link>
              </section>
              <section className="side-card">
                <p className="eyebrow">LIBRARY HEALTH</p>
                <h2>This month</h2>
                <div className="summary-line" style={{ borderTop: 'none' }}>
                  <span>New members</span> <strong>18</strong>
                </div>
                <div className="summary-line">
                  <span>Books added</span> <strong>32</strong>
                </div>
                <div className="summary-line">
                  <span>Total returns</span> <strong>724</strong>
                </div>
                <div className="summary-line">
                  <span>Avg. loan length</span> <strong>11 days</strong>
                </div>
              </section>
              <section className="side-card quick-links-card">
                <h2>Shortcuts</h2>
                <Link to="/admin/books" className="quick-link">
                  <span>
                    <i className="fa-solid fa-layer-group" />
                  </span>
                  <div>
                    <strong>Book Inventory</strong> <small>Manage the catalog</small>
                  </div>
                  <i className="fa-solid fa-arrow-right" />
                </Link>{' '}
                <Link to="/admin/members" className="quick-link">
                  <span>
                    <i className="fa-solid fa-users" />
                  </span>
                  <div>
                    <strong>Members</strong> <small>Manage accounts</small>
                  </div>
                  <i className="fa-solid fa-arrow-right" />
                </Link>{' '}
                <Link to="/admin/settings" className="quick-link">
                  <span>
                    <i className="fa-solid fa-gear" />
                  </span>
                  <div>
                    <strong>Library Settings</strong> <small>Loan rules &amp; fine rates</small>
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
