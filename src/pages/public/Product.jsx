import { Link } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import css from '../../styles/product.css?inline';

export default function Product() {
  return (
    <>
      <title>Features | BookVerse</title>
      <meta
        name="description"
        content="Explore everything BookVerse can do — catalog, members, circulation, fines, reservations, and reporting in one organized system."
      />
      <PageStyles css={css} />
      <main>
        {/* FEATURES HERO */}
        <section className="features-hero">
          <div className="container features-hero-content">
            <p className="eyebrow">BOOKVERSE FEATURES</p>
            <h1>
              Everything your library needs. <span>Nothing it doesn't.</span>
            </h1>
            <p className="features-hero-description">
              Manage books. Track people. Keep everything moving. BookVerse brings your whole
              library — catalog, members, circulation, and records — into one organized system.
            </p>
            <div className="features-hero-tags">
              <span>
                <i className="fa-solid fa-book" />
                Catalog
              </span>{' '}
              <span>
                <i className="fa-solid fa-users" />
                Members
              </span>{' '}
              <span>
                <i className="fa-solid fa-right-left" />
                Circulation
              </span>{' '}
              <span>
                <i className="fa-solid fa-chart-line" />
                Reports
              </span>
            </div>
          </div>
        </section>
        {/* FEATURE INTRODUCTION */}
        <section className="feature-intro">
          <div className="container feature-intro-content">
            <p className="eyebrow">THE BIG PICTURE</p>
            <h2>
              One system for the everyday work <span>behind every library.</span>
            </h2>
            <p>
              Every feature below is part of the same organized space — no separate tools, no
              spreadsheets, nothing to reconcile by hand. Just books, people, and everything that
              happens between them.
            </p>
          </div>
        </section>
        {/* MANAGE YOUR LIBRARY */}
        <section className="feature-section" id="manage-your-library">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">MANAGE YOUR LIBRARY</p>
              <h2>Books and people, organized from day one.</h2>
              <p>
                Every title, every copy, and every member lives in one place — easy to find, easy to
                keep current.
              </p>
            </div>
            {/* SMART BOOK CATALOG */}
            <div className="feature-row">
              <div className="feature-row-copy">
                <span className="feature-tag">Smart Book Catalog</span>
                <h3>
                  Find any book, <span>in seconds.</span>
                </h3>
                <p>
                  Titles, authors, ISBNs, categories, copies, and shelf locations — all searchable
                  and filterable from one catalog view.
                </p>
                <ul className="feature-points">
                  <li>
                    <i className="fa-solid fa-check" />
                    Search by title, author, or ISBN
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    Filter by category or availability
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    Live status for every copy
                  </li>
                </ul>
              </div>
              <div className="feature-row-visual">
                <div className="app-window">
                  <div className="app-window-bar">
                    <span className="app-dot" /> <span className="app-dot" />{' '}
                    <span className="app-dot" />
                    <div className="app-search">
                      <i className="fa-solid fa-magnifying-glass" /> Search the catalog…
                    </div>
                  </div>
                  <div className="mock-table">
                    <div className="mock-table-head">
                      <span>Book</span> <span>Author</span> <span>Category</span>{' '}
                      <span>Copies</span> <span>Status</span>
                    </div>
                    <div className="mock-table-row">
                      <span className="mock-book">
                        <i className="fa-solid fa-book" />
                        Clean Code
                      </span>{' '}
                      <span>R. Martin</span> <span>Programming</span> <span>4</span>{' '}
                      <span className="badge badge-available">Available</span>
                    </div>
                    <div className="mock-table-row">
                      <span className="mock-book">
                        <i className="fa-solid fa-book" />
                        Atomic Habits
                      </span>{' '}
                      <span>J. Clear</span> <span>Self-help</span> <span>3</span>{' '}
                      <span className="badge badge-borrowed">Borrowed</span>
                    </div>
                    <div className="mock-table-row">
                      <span className="mock-book">
                        <i className="fa-solid fa-book" />
                        Intro to Algorithms
                      </span>{' '}
                      <span>T. Cormen</span> <span>Computer Science</span> <span>2</span>{' '}
                      <span className="badge badge-maintenance">Maintenance</span>
                    </div>
                    <div className="mock-table-row">
                      <span className="mock-book">
                        <i className="fa-solid fa-book" />
                        Sapiens
                      </span>{' '}
                      <span>Y. Harari</span> <span>History</span> <span>5</span>{' '}
                      <span className="badge badge-available">Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* MEMBER MANAGEMENT */}
            <div className="feature-row feature-row-reverse">
              <div className="feature-row-copy">
                <span className="feature-tag">Member Management</span>
                <h3>
                  A clean record <span>for every reader.</span>
                </h3>
                <p>
                  Profiles, contact details, active loans, holds, and full borrowing history — kept
                  together for every member.
                </p>
                <ul className="feature-points">
                  <li>
                    <i className="fa-solid fa-check" />
                    Membership status at a glance
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    Active loans and due dates
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    Complete borrowing history
                  </li>
                </ul>
              </div>
              <div className="feature-row-visual">
                <div className="member-card">
                  <div className="member-card-header">
                    <div className="member-avatar">AR</div>
                    <div>
                      <h4>Alex Rivera</h4>
                      <p>Member ID · BV-10245</p>
                    </div>
                    <span className="badge badge-available">Active</span>
                  </div>
                  <div className="member-card-meta">
                    <div>
                      <span>Email</span>
                      <p>alex.rivera@mail.com</p>
                    </div>
                    <div>
                      <span>Member since</span>
                      <p>March 2024</p>
                    </div>
                  </div>
                  <div className="member-card-block">
                    <h5>Active Loans</h5>
                    <div className="member-loan-row">
                      <span>Clean Code</span> <span className="due">Due Aug 28</span>{' '}
                      <span className="badge badge-borrowed">Borrowed</span>
                    </div>
                    <div className="member-loan-row">
                      <span>Atomic Habits</span> <span className="due overdue">Due Aug 19</span>{' '}
                      <span className="badge badge-overdue">Overdue</span>
                    </div>
                  </div>
                  <div className="member-card-block">
                    <h5>Borrowing History</h5>
                    <div className="member-history-row">
                      <span>Sapiens</span> <span>Returned Jul 02</span>
                    </div>
                    <div className="member-history-row">
                      <span>Deep Work</span> <span>Returned Jun 14</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* CATEGORIES & SHELVES + MULTIPLE COPY MANAGEMENT */}
            <div className="feature-mini-grid">
              <div className="mini-card">
                <span className="feature-tag">Categories &amp; Shelves</span>
                <h3>Organized by subject and shelf.</h3>
                <div className="category-tree">
                  <div className="category-group">
                    <h5>
                      <i className="fa-solid fa-layer-group" />
                      Computer Science <span>Shelf B2</span>
                    </h5>
                    <div className="category-tags">
                      <span>AI &amp; ML</span> <span>Programming</span> <span>Databases</span>{' '}
                      <span>Networks</span>
                    </div>
                  </div>
                  <div className="category-group">
                    <h5>
                      <i className="fa-solid fa-layer-group" />
                      Mathematics <span>Shelf C1</span>
                    </h5>
                    <div className="category-tags">
                      <span>Calculus</span> <span>Algebra</span> <span>Statistics</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mini-card">
                <span className="feature-tag">Multiple Copy Management</span>
                <h3>Every copy, tracked on its own.</h3>
                <div className="copy-list">
                  <div className="copy-list-title">
                    <i className="fa-solid fa-book" /> Harry Potter and the Sorcerer's Stone
                  </div>
                  <div className="copy-row">
                    <span>Copy #01</span> <span className="badge badge-borrowed">Borrowed</span>
                  </div>
                  <div className="copy-row">
                    <span>Copy #02</span> <span className="badge badge-available">Available</span>
                  </div>
                  <div className="copy-row">
                    <span>Copy #03</span> <span className="badge badge-available">Available</span>
                  </div>
                  <div className="copy-row">
                    <span>Copy #04</span>{' '}
                    <span className="badge badge-maintenance">Maintenance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* KEEP BOOKS MOVING */}
        <section className="feature-section feature-section-alt" id="keep-books-moving">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">KEEP BOOKS MOVING</p>
              <h2>Issue, return, and track — without the paperwork.</h2>
              <p>
                Circulation is the heart of any library. BookVerse keeps it simple, from the moment
                a book goes out to the moment it comes back.
              </p>
            </div>
            {/* BOOK ISSUE & RETURN */}
            <div className="issue-return-grid">
              <div className="circulation-card">
                <div className="circulation-card-head">
                  <i className="fa-solid fa-right-from-bracket" />
                  <h3>Book Issue</h3>
                </div>
                <div className="mock-field">
                  <span>Select member</span>
                  <div className="mock-select">
                    Alex Rivera — BV-10245 <i className="fa-solid fa-chevron-down" />
                  </div>
                </div>
                <div className="mock-field">
                  <span>Select book</span>
                  <div className="mock-select">
                    Clean Code — 2 copies available <i className="fa-solid fa-chevron-down" />
                  </div>
                </div>
                <div className="mock-field">
                  <span>Due date</span>
                  <div className="mock-select">
                    <i className="fa-regular fa-calendar" /> September 6, 2026
                  </div>
                </div>
                <button className="button mock-action">
                  Issue Book <i className="fa-solid fa-arrow-right" />
                </button>
              </div>
              <div className="circulation-flow">
                <div className="flow-step">
                  <span>Member</span>
                </div>
                <i className="fa-solid fa-arrow-right" />
                <div className="flow-step">
                  <span>Book</span>
                </div>
                <i className="fa-solid fa-arrow-right" />
                <div className="flow-step">
                  <span>Due Date</span>
                </div>
                <i className="fa-solid fa-arrow-right" />
                <div className="flow-step flow-step-end">
                  <span>Issued</span>
                </div>
              </div>
              <div className="circulation-card">
                <div className="circulation-card-head">
                  <i className="fa-solid fa-rotate-left" />
                  <h3>Book Return</h3>
                </div>
                <div className="mock-field">
                  <span>Book</span>
                  <div className="mock-select">
                    Atomic Habits — Alex Rivera <i className="fa-solid fa-chevron-down" />
                  </div>
                </div>
                <div className="return-summary">
                  <div>
                    <span>Overdue by</span>
                    <p>4 days</p>
                  </div>
                  <div>
                    <span>Fine</span>
                    <p className="fine-amount">₹40</p>
                  </div>
                </div>
                <button className="button mock-action">
                  Return Book <i className="fa-solid fa-check" />
                </button>
              </div>
            </div>
            {/* DUE DATE & OVERDUE TRACKING */}
            <div className="tracking-block">
              <span className="feature-tag">Due Date &amp; Overdue Tracking</span>
              <h3>Know what's due before it's late.</h3>
              <div className="stat-grid">
                <div className="stat-card">
                  <span className="stat-number">12</span>{' '}
                  <span className="stat-label">Due Today</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">24</span>{' '}
                  <span className="stat-label">Due Soon</span>
                </div>
                <div className="stat-card stat-card-danger">
                  <span className="stat-number">7</span> <span className="stat-label">Overdue</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">184</span>{' '}
                  <span className="stat-label">Active Loans</span>
                </div>
              </div>
              <div className="mock-table mock-table-overdue">
                <div className="mock-table-head">
                  <span>Book</span> <span>Member</span> <span>Due Date</span>{' '}
                  <span>Days Overdue</span> <span>Fine</span>
                </div>
                <div className="mock-table-row">
                  <span className="mock-book">
                    <i className="fa-solid fa-book" />
                    Atomic Habits
                  </span>{' '}
                  <span>Alex Rivera</span> <span>Aug 19</span>{' '}
                  <span className="overdue-days">4 days</span>{' '}
                  <span className="fine-amount">₹40</span>
                </div>
                <div className="mock-table-row">
                  <span className="mock-book">
                    <i className="fa-solid fa-book" />
                    Deep Work
                  </span>{' '}
                  <span>Priya Nair</span> <span>Aug 20</span>{' '}
                  <span className="overdue-days">3 days</span>{' '}
                  <span className="fine-amount">₹30</span>
                </div>
                <div className="mock-table-row">
                  <span className="mock-book">
                    <i className="fa-solid fa-book" />
                    The Pragmatic Programmer
                  </span>{' '}
                  <span>Sam Osei</span> <span>Aug 15</span>{' '}
                  <span className="overdue-days">8 days</span>{' '}
                  <span className="fine-amount">₹80</span>
                </div>
              </div>
            </div>
            {/* FINE MANAGEMENT + RESERVATIONS */}
            <div className="feature-mini-grid">
              <div className="mini-card">
                <span className="feature-tag">Fine Management</span>
                <h3>Overdue fines, tracked automatically.</h3>
                <div className="fine-list">
                  <div className="fine-item">
                    <div>
                      <h5>Clean Code</h5>
                      <p>Borrowed by Alex Rivera · 4 days overdue</p>
                    </div>
                    <div className="fine-item-right">
                      <span className="fine-amount">₹40</span>{' '}
                      <span className="badge badge-overdue">Unpaid</span>
                    </div>
                  </div>
                  <div className="fine-item">
                    <div>
                      <h5>Sapiens</h5>
                      <p>Borrowed by Priya Nair · 2 days overdue</p>
                    </div>
                    <div className="fine-item-right">
                      <span className="fine-amount">₹20</span>{' '}
                      <span className="badge badge-available">Paid</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mini-card">
                <span className="feature-tag">Reservations &amp; Holds</span>
                <h3>Never miss a book you're waiting on.</h3>
                <div className="hold-timeline">
                  <div className="hold-step">
                    <span className="hold-dot" />
                    <p>Book unavailable</p>
                  </div>
                  <div className="hold-step">
                    <span className="hold-dot" />
                    <p>Hold placed</p>
                  </div>
                  <div className="hold-step">
                    <span className="hold-dot" />
                    <p>Book returned</p>
                  </div>
                  <div className="hold-step">
                    <span className="hold-dot" />
                    <p>Member notified</p>
                  </div>
                  <div className="hold-step hold-step-end">
                    <span className="hold-dot" />
                    <p>Book reserved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* FIND EVERYTHING FASTER */}
        <section className="feature-section" id="find-everything-faster">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">FIND EVERYTHING FASTER</p>
              <h2>Search, filter, and look back — instantly.</h2>
              <p>
                Whether it's a book, a member, or something borrowed months ago, it's never more
                than a search away.
              </p>
            </div>
            {/* SEARCH & FILTERS */}
            <div className="search-block">
              <div className="search-bar-mock">
                <i className="fa-solid fa-magnifying-glass" /> Search books, members, ISBNs…
              </div>
              <div className="filter-chip-row">
                <span className="filter-chip filter-chip-active">Category</span>{' '}
                <span className="filter-chip">Availability</span>{' '}
                <span className="filter-chip">Overdue</span>{' '}
                <span className="filter-chip">Recently Added</span>{' '}
                <span className="filter-chip">Popular Books</span>
              </div>
            </div>
            {/* BORROWING HISTORY + DIGITAL RECORDS */}
            <div className="history-grid">
              <div className="mini-card">
                <span className="feature-tag">Borrowing History</span>
                <h3>Currently Borrowed</h3>
                <div className="simple-list">
                  <div className="simple-row">
                    <span>Clean Code</span> <span>Due Aug 28</span>{' '}
                    <span className="badge badge-borrowed">Borrowed</span>
                  </div>
                  <div className="simple-row">
                    <span>Atomic Habits</span> <span>Due Aug 19</span>{' '}
                    <span className="badge badge-overdue">Overdue</span>
                  </div>
                </div>
                <h3 className="simple-list-title">Borrowing History</h3>
                <div className="simple-list">
                  <div className="simple-row">
                    <span>Sapiens</span> <span>Borrowed Jun 18</span> <span>Returned Jul 02</span>
                  </div>
                  <div className="simple-row">
                    <span>Deep Work</span> <span>Borrowed May 30</span> <span>Returned Jun 14</span>
                  </div>
                </div>
              </div>
              <div className="mini-card">
                <span className="feature-tag">Digital Records</span>
                <h3>Every loan, on record.</h3>
                <p className="mini-card-description">
                  No filing cabinets, no paper logs — just a searchable digital record of everything
                  that's been borrowed and returned.
                </p>
                <div className="mock-table mock-table-compact">
                  <div className="mock-table-head">
                    <span>Member</span> <span>Book</span> <span>Issued</span> <span>Due</span>{' '}
                    <span>Status</span>
                  </div>
                  <div className="mock-table-row">
                    <span>Alex Rivera</span> <span>Clean Code</span> <span>Aug 14</span>{' '}
                    <span>Aug 28</span> <span className="badge badge-borrowed">Active</span>
                  </div>
                  <div className="mock-table-row">
                    <span>Priya Nair</span> <span>Sapiens</span> <span>Jun 18</span>{' '}
                    <span>Jul 02</span> <span className="badge badge-available">Returned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* KNOW YOUR LIBRARY */}
        <section className="feature-section feature-section-alt" id="know-your-library">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">KNOW YOUR LIBRARY</p>
              <h2>See how your library is really doing.</h2>
              <p>
                Dashboards and reports that turn everyday activity into a clear picture — no
                spreadsheets required.
              </p>
            </div>
            {/* LIBRARY DASHBOARD */}
            <div className="dashboard-block">
              <div className="stat-grid stat-grid-dashboard">
                <div className="stat-card">
                  <i className="fa-solid fa-book" /> <span className="stat-number">3,482</span>{' '}
                  <span className="stat-label">Total Books</span>
                </div>
                <div className="stat-card">
                  <i className="fa-solid fa-users" /> <span className="stat-number">1,206</span>{' '}
                  <span className="stat-label">Total Members</span>
                </div>
                <div className="stat-card">
                  <i className="fa-solid fa-right-left" /> <span className="stat-number">184</span>{' '}
                  <span className="stat-label">Active Loans</span>
                </div>
                <div className="stat-card stat-card-danger">
                  <i className="fa-solid fa-triangle-exclamation" />{' '}
                  <span className="stat-number">7</span>{' '}
                  <span className="stat-label">Overdue Books</span>
                </div>
              </div>
              <div className="chart-card">
                <div className="chart-card-head">
                  <h3>Borrowing Activity</h3>
                  <span>Last 6 months</span>
                </div>
                <div className="bar-chart">
                  <div className="bar-chart-col">
                    <div className="bar" style={{ '--h': '55%' }} />
                    <span>Mar</span>
                  </div>
                  <div className="bar-chart-col">
                    <div className="bar" style={{ '--h': '68%' }} />
                    <span>Apr</span>
                  </div>
                  <div className="bar-chart-col">
                    <div className="bar" style={{ '--h': '47%' }} />
                    <span>May</span>
                  </div>
                  <div className="bar-chart-col">
                    <div className="bar" style={{ '--h': '82%' }} />
                    <span>Jun</span>
                  </div>
                  <div className="bar-chart-col">
                    <div className="bar" style={{ '--h': '74%' }} />
                    <span>Jul</span>
                  </div>
                  <div className="bar-chart-col">
                    <div className="bar bar-active" style={{ '--h': '91%' }} />
                    <span>Aug</span>
                  </div>
                </div>
              </div>
            </div>
            {/* REPORTS & ANALYTICS */}
            <div className="feature-mini-grid feature-mini-grid-3">
              <div className="mini-card">
                <span className="feature-tag">Most Borrowed</span>
                <h3>Top titles this month</h3>
                <div className="rank-list">
                  <div className="rank-row">
                    <span className="rank-number">01</span>
                    <span>Atomic Habits</span>
                    <span>58 loans</span>
                  </div>
                  <div className="rank-row">
                    <span className="rank-number">02</span>
                    <span>Clean Code</span>
                    <span>44 loans</span>
                  </div>
                  <div className="rank-row">
                    <span className="rank-number">03</span>
                    <span>Sapiens</span>
                    <span>39 loans</span>
                  </div>
                </div>
              </div>
              <div className="mini-card">
                <span className="feature-tag">Category Popularity</span>
                <h3>Where readers spend time</h3>
                <div className="progress-list">
                  <div className="progress-row">
                    <span>Programming</span>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ '--w': '78%' }} />
                    </div>
                  </div>
                  <div className="progress-row">
                    <span>Self-help</span>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ '--w': '62%' }} />
                    </div>
                  </div>
                  <div className="progress-row">
                    <span>History</span>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ '--w': '41%' }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mini-card">
                <span className="feature-tag">Returned vs Issued</span>
                <h3>Circulation balance</h3>
                <div className="split-bar">
                  <div className="split-bar-issued" style={{ '--w': '58%' }}>
                    Issued 58%
                  </div>
                  <div className="split-bar-returned" style={{ '--w': '42%' }}>
                    Returned 42%
                  </div>
                </div>
                <p className="mini-card-description">
                  184 active loans against 268 returns processed this month.
                </p>
              </div>
            </div>
            {/* NOTIFICATIONS */}
            <div className="notif-block">
              <span className="feature-tag">Notifications &amp; Reminders</span>
              <h3>Nudges that keep things on time.</h3>
              <div className="notif-panel">
                <div className="notif-item">
                  <span className="notif-icon">
                    <i className="fa-solid fa-bell" />
                  </span>
                  <div>
                    <h5>Book due tomorrow</h5>
                    <p>"Clean Code" is due tomorrow.</p>
                  </div>
                </div>
                <div className="notif-item notif-item-danger">
                  <span className="notif-icon">
                    <i className="fa-solid fa-bell" />
                  </span>
                  <div>
                    <h5>Book overdue</h5>
                    <p>"Atomic Habits" is 3 days overdue.</p>
                  </div>
                </div>
                <div className="notif-item notif-item-success">
                  <span className="notif-icon">
                    <i className="fa-solid fa-bell" />
                  </span>
                  <div>
                    <h5>Reservation available</h5>
                    <p>"Introduction to Algorithms" is now available.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* FINAL CTA */}
        <section className="features-cta">
          <div className="container features-cta-content">
            <p className="eyebrow">READY TO GET STARTED?</p>
            <h2>
              Everything in one <span>organized place.</span>
            </h2>
            <p className="features-cta-description">
              Bring your books, members, borrowing, and returns together — and spend less time
              managing records.
            </p>
            <div className="features-cta-actions">
              <Link to="/register" className="button">
                Get Started <i className="fa-solid fa-arrow-right" />
              </Link>{' '}
              <Link to="/" className="features-cta-link">
                Explore BookVerse
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
