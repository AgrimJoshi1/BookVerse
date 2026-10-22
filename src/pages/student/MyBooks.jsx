import PageStyles from '../../components/PageStyles';
import css from '../../styles/my-books.css?inline';

export default function MyBooks() {
  return (
    <>
      <title>My Books | BookVerse</title>
      <meta name="description" content="My Books - BookVerse student library." />
      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="my-books-hero">
          <div className="container">
            <p className="eyebrow">MY BOOKS</p>
            <div className="hero-heading-row">
              <div>
                <h1>
                  Your reading, <span>all in one place.</span>
                </h1>
                <p className="hero-description">
                  Keep track of what you're borrowing, what you've returned, and when your books are
                  due.
                </p>
              </div>
              <div className="book-count">
                <span>BOOKS WITH YOU</span> <strong>03</strong>
              </div>
            </div>
          </div>
        </section>
        {/* BOOKS CONTENT */}
        <section className="my-books-section">
          <div className="container">
            {/* TABS */}
            <div className="book-tabs">
              <a href="#" className="tab active-tab">
                Currently borrowed <span>03</span>
              </a>{' '}
              <a href="#" className="tab">
                Previously returned <span>12</span>
              </a>{' '}
              <a href="#" className="tab">
                Due dates <span>02</span>
              </a>
            </div>
            {/* CURRENTLY BORROWED */}
            <section className="books-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">CURRENTLY BORROWED</p>
                  <h2>Books you're reading</h2>
                </div>
                <span className="panel-count">3 active loans</span>
              </div>
              <div className="borrowed-books">
                {/* BOOK 1 */}
                <article className="borrowed-card">
                  <div className="book-cover cover-one">
                    <span className="cover-number">01</span> <i className="fa-solid fa-book-open" />
                  </div>
                  <div className="book-main">
                    <span className="category">PROGRAMMING</span>
                    <h3>Clean Code</h3>
                    <p className="author">Robert C. Martin</p>
                    <div className="loan-details">
                      <div>
                        <span>Borrowed</span> <strong>14 Aug 2026</strong>
                      </div>
                      <div>
                        <span>Due date</span> <strong>28 Aug 2026</strong>
                      </div>
                    </div>
                  </div>
                  <div className="book-status">
                    <span className="status on-time">On time</span>
                    <p>3 days left</p>
                  </div>
                  <a href="#" className="book-action">
                    View details <i className="fa-solid fa-arrow-right" />
                  </a>
                </article>
                {/* BOOK 2 */}
                <article className="borrowed-card">
                  <div className="book-cover cover-two">
                    <span className="cover-number">02</span> <i className="fa-solid fa-book-open" />
                  </div>
                  <div className="book-main">
                    <span className="category">SELF DEVELOPMENT</span>
                    <h3>Atomic Habits</h3>
                    <p className="author">James Clear</p>
                    <div className="loan-details">
                      <div>
                        <span>Borrowed</span> <strong>16 Aug 2026</strong>
                      </div>
                      <div>
                        <span>Due date</span> <strong>30 Aug 2026</strong>
                      </div>
                    </div>
                  </div>
                  <div className="book-status">
                    <span className="status on-time">On time</span>
                    <p>5 days left</p>
                  </div>
                  <a href="#" className="book-action">
                    View details <i className="fa-solid fa-arrow-right" />
                  </a>
                </article>
                {/* BOOK 3 */}
                <article className="borrowed-card overdue-book">
                  <div className="book-cover cover-three">
                    <span className="cover-number">03</span> <i className="fa-solid fa-book-open" />
                  </div>
                  <div className="book-main">
                    <span className="category">COMPUTER SCIENCE</span>
                    <h3>Introduction to Algorithms</h3>
                    <p className="author">Thomas H. Cormen</p>
                    <div className="loan-details">
                      <div>
                        <span>Borrowed</span> <strong>09 Aug 2026</strong>
                      </div>
                      <div>
                        <span>Due date</span> <strong>23 Aug 2026</strong>
                      </div>
                    </div>
                  </div>
                  <div className="book-status">
                    <span className="status overdue">Overdue</span>
                    <p>2 days overdue</p>
                  </div>
                  <a href="#" className="book-action">
                    View details <i className="fa-solid fa-arrow-right" />
                  </a>
                </article>
              </div>
            </section>
            {/* PREVIOUSLY RETURNED */}
            <section className="books-panel returned-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">PREVIOUSLY RETURNED</p>
                  <h2>Your reading history</h2>
                </div>
                <a href="#" className="text-arrow">
                  Full history <i className="fa-solid fa-arrow-right" />
                </a>
              </div>
              <div className="history-list">
                <article className="history-row">
                  <div className="history-book-icon">
                    <i className="fa-solid fa-book" />
                  </div>
                  <div className="history-book">
                    <h3>Python Crash Course</h3>
                    <p>Eric Matthes</p>
                  </div>
                  <div className="history-date">
                    <span>Borrowed</span> <strong>02 Aug 2026</strong>
                  </div>
                  <div className="history-date">
                    <span>Returned</span> <strong>15 Aug 2026</strong>
                  </div>
                  <span className="returned-status">Returned</span>
                </article>
                <article className="history-row">
                  <div className="history-book-icon icon-two">
                    <i className="fa-solid fa-book" />
                  </div>
                  <div className="history-book">
                    <h3>The Pragmatic Programmer</h3>
                    <p>David Thomas &amp; Andrew Hunt</p>
                  </div>
                  <div className="history-date">
                    <span>Borrowed</span> <strong>17 Jul 2026</strong>
                  </div>
                  <div className="history-date">
                    <span>Returned</span> <strong>31 Jul 2026</strong>
                  </div>
                  <span className="returned-status">Returned</span>
                </article>
                <article className="history-row">
                  <div className="history-book-icon icon-three">
                    <i className="fa-solid fa-book" />
                  </div>
                  <div className="history-book">
                    <h3>Deep Work</h3>
                    <p>Cal Newport</p>
                  </div>
                  <div className="history-date">
                    <span>Borrowed</span> <strong>05 Jul 2026</strong>
                  </div>
                  <div className="history-date">
                    <span>Returned</span> <strong>19 Jul 2026</strong>
                  </div>
                  <span className="returned-status">Returned</span>
                </article>
              </div>
            </section>
            {/* DUE DATES */}
            <section className="due-panel">
              <div className="due-panel-copy">
                <p className="eyebrow">DUE DATES</p>
                <h2>Stay ahead of your returns.</h2>
                <p>
                  You have two books due soon. Returning them on time helps keep your account clear.
                </p>
              </div>
              <div className="due-summary">
                <div className="due-item">
                  <div className="date-box">
                    <span>AUG</span> <strong>28</strong>
                  </div>
                  <div>
                    <h3>Clean Code</h3>
                    <p>3 days left</p>
                  </div>
                </div>
                <div className="due-item">
                  <div className="date-box">
                    <span>AUG</span> <strong>30</strong>
                  </div>
                  <div>
                    <h3>Atomic Habits</h3>
                    <p>5 days left</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
