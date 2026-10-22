import PageStyles from '../../components/PageStyles';
import css from '../../styles/student-dashboard.css?inline';

export default function Dashboard() {
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
                  Welcome back, <span>Alex.</span>
                </h1>
                <p>
                  Keep track of your books, due dates, and everything you're reading in one place.
                </p>
              </div>
            </div>
            {/* QUICK STATS */}
            <div className="stats-grid">
              <article className="stat-card">
                <div className="stat-icon">
                  <i className="fa-solid fa-book-open" />
                </div>
                <div>
                  <span>Currently borrowed</span> <strong>03</strong>
                </div>
              </article>
              <article className="stat-card">
                <div className="stat-icon">
                  <i className="fa-regular fa-calendar" />
                </div>
                <div>
                  <span>Due this week</span> <strong>02</strong>
                </div>
              </article>
              <article className="stat-card stat-card-warning">
                <div className="stat-icon">
                  <i className="fa-solid fa-clock" />
                </div>
                <div>
                  <span>Overdue books</span> <strong>01</strong>
                </div>
              </article>
              <article className="stat-card">
                <div className="stat-icon">
                  <i className="fa-solid fa-bookmark" />
                </div>
                <div>
                  <span>Reservations</span> <strong>02</strong>
                </div>
              </article>
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
                </div>
                <div className="search-box">
                  <i className="fa-solid fa-magnifying-glass" />{' '}
                  <input type="text" placeholder="Search by title, author, or ISBN" />{' '}
                  <button type="button">Search</button>
                </div>
              </section>
              {/* CURRENTLY BORROWED */}
              <section className="dashboard-block">
                <div className="block-heading">
                  <div>
                    <p className="eyebrow">YOUR BOOKS</p>
                    <h2>Currently borrowed</h2>
                  </div>
                </div>
                <div className="borrowed-list">
                  <article className="book-row">
                    <div className="book-cover cover-one">
                      <i className="fa-solid fa-book" />
                    </div>
                    <div className="book-info">
                      <h3>Clean Code</h3>
                      <p>Robert C. Martin</p>
                      <span className="book-category">Programming</span>
                    </div>
                    <div className="book-due">
                      <span>Due date</span> <strong>28 Aug 2026</strong> <small>3 days left</small>
                    </div>
                    <span className="status-badge status-good">On time</span>
                  </article>
                  <article className="book-row">
                    <div className="book-cover cover-two">
                      <i className="fa-solid fa-book" />
                    </div>
                    <div className="book-info">
                      <h3>Atomic Habits</h3>
                      <p>James Clear</p>
                      <span className="book-category">Self Development</span>
                    </div>
                    <div className="book-due">
                      <span>Due date</span> <strong>30 Aug 2026</strong> <small>5 days left</small>
                    </div>
                    <span className="status-badge status-good">On time</span>
                  </article>
                  <article className="book-row">
                    <div className="book-cover cover-three">
                      <i className="fa-solid fa-book" />
                    </div>
                    <div className="book-info">
                      <h3>Introduction to Algorithms</h3>
                      <p>Thomas H. Cormen</p>
                      <span className="book-category">Computer Science</span>
                    </div>
                    <div className="book-due">
                      <span>Due date</span> <strong>23 Aug 2026</strong>{' '}
                      <small>2 days overdue</small>
                    </div>
                    <span className="status-badge status-overdue">Overdue</span>
                  </article>
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
                <div className="due-card">
                  <div className="calendar-day">
                    <span>AUG</span> <strong>28</strong>
                  </div>
                  <div className="due-copy">
                    <h3>Clean Code</h3>
                    <p>Robert C. Martin · Programming</p>
                  </div>
                  <div className="due-progress">
                    <div className="progress-label">
                      <span>Loan period</span> <span>3 days left</span>
                    </div>
                    <div className="progress-track">
                      <span className="progress-fill progress-three" />
                    </div>
                  </div>
                </div>
                <div className="due-card">
                  <div className="calendar-day">
                    <span>AUG</span> <strong>30</strong>
                  </div>
                  <div className="due-copy">
                    <h3>Atomic Habits</h3>
                    <p>James Clear · Self Development</p>
                  </div>
                  <div className="due-progress">
                    <div className="progress-label">
                      <span>Loan period</span> <span>5 days left</span>
                    </div>
                    <div className="progress-track">
                      <span className="progress-fill progress-five" />
                    </div>
                  </div>
                </div>
              </section>
            </div>
            {/* RIGHT COLUMN */}
            <aside className="dashboard-sidebar">
              {/* OVERDUE NOTICE */}
              <section className="side-card overdue-card">
                <div className="side-card-heading">
                  <div className="notice-icon">
                    <i className="fa-solid fa-clock" />
                  </div>
                  <span className="notice-label">ACTION NEEDED</span>
                </div>
                <h2>One book is overdue.</h2>
                <p>
                  Introduction to Algorithms was due on 23 August. Please return it to avoid
                  additional fines.
                </p>
                <div className="fine-preview">
                  <span>Current fine</span> <strong>₹20</strong>
                </div>
                <a href="#" className="light-button">
                  View details <i className="fa-solid fa-arrow-right" />
                </a>
              </section>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
