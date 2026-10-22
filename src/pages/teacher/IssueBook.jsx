import PageStyles from '../../components/PageStyles';
import css from '../../styles/teacher-issue-book.css?inline';

export default function IssueBook() {
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
                <div className="search-box">
                  <i className="fa-solid fa-magnifying-glass" />{' '}
                  <input
                    type="text"
                    placeholder="Search by name or student ID"
                    defaultValue="Rohan"
                  />{' '}
                  <button type="button">Search</button>
                </div>
                <div className="select-list">
                  <div className="select-row selected">
                    <div className="mini-person">RM</div>
                    <div className="select-info">
                      <h3>Rohan Mehta</h3>
                      <p>BV2026CS017 · Grade 10 - A</p>
                    </div>
                    <button className="select-pick" type="button">
                      Selected
                    </button>
                  </div>
                  <div className="select-row">
                    <div className="mini-person">RS</div>
                    <div className="select-info">
                      <h3>Riya Sinha</h3>
                      <p>BV2026CS028 · Grade 10 - B</p>
                    </div>
                    <button className="select-pick" type="button">
                      Select
                    </button>
                  </div>
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
                <div className="search-box">
                  <i className="fa-solid fa-magnifying-glass" />{' '}
                  <input
                    type="text"
                    placeholder="Search by title, author, or ISBN"
                    defaultValue="Atomic Habits"
                  />{' '}
                  <button type="button">Search</button>
                </div>
                <div className="select-list">
                  <div className="select-row selected">
                    <div className="mini-book">
                      <i className="fa-solid fa-book" />
                    </div>
                    <div className="select-info">
                      <h3>Atomic Habits</h3>
                      <p>James Clear · 2 of 3 copies available</p>
                    </div>
                    <button className="select-pick" type="button">
                      Selected
                    </button>
                  </div>
                </div>
                <p className="field-hint" style={{ marginTop: '12px' }}>
                  <i className="fa-solid fa-circle-info" /> 2 copies of this title are currently
                  available to issue.
                </p>
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
                    <input type="date" id="issue-date" defaultValue="2026-08-26" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="due-date">Due date (auto-calculated)</label>{' '}
                    <input type="text" id="due-date" defaultValue="09 Sep 2026" readOnly />{' '}
                    <span className="field-hint">
                      Standard loan period is 14 days from the issue date.
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
                <div className="summary-line" style={{ borderTop: 'none' }}>
                  <span>Student</span> <strong>Rohan Mehta</strong>
                </div>
                <div className="summary-line">
                  <span>Student ID</span> <strong>BV2026CS017</strong>
                </div>
                <div className="summary-line">
                  <span>Book</span> <strong>Atomic Habits</strong>
                </div>
                <div className="summary-line">
                  <span>Issue date</span> <strong>26 Aug 2026</strong>
                </div>
                <div className="summary-line">
                  <span>Due date</span> <strong>09 Sep 2026</strong>
                </div>
                <button
                  className="light-button"
                  type="button"
                  style={{ width: '100%', marginTop: '18px' }}
                >
                  Confirm &amp; issue book <i className="fa-solid fa-arrow-right" />
                </button>
                <div className="notice notice-success">
                  <i className="fa-regular fa-circle-check" />
                  <p>Student and book selected. Review the summary above, then confirm to issue.</p>
                </div>
              </section>
              <section className="side-card">
                <p className="eyebrow">NEEDS ATTENTION</p>
                <h2>Before you confirm</h2>
                <div className="notice notice-warning" style={{ marginTop: '0' }}>
                  <i className="fa-solid fa-triangle-exclamation" />
                  <p>
                    Make sure the student doesn't already have an overdue book before issuing a new
                    one.
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
