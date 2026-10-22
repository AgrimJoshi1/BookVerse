import PageStyles from '../../components/PageStyles';
import css from '../../styles/browse-books.css?inline';

export default function BrowseBooks() {
  return (
    <>
      <title>Browse Books | BookVerse</title>
      <meta name="description" content="Browse books in BookVerse." />
      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="browse-hero">
          <div className="container">
            <p className="eyebrow">BROWSE BOOKS</p>
            <h1>
              Find something <span>worth reading.</span>
            </h1>
            <p className="hero-description">
              Search the BookVerse catalog, explore categories, and find your next book.
            </p>
            {/* SEARCH */}
            <div className="main-search">
              <i className="fa-solid fa-magnifying-glass" />{' '}
              <input type="text" placeholder="Search by title, author, or ISBN" />{' '}
              <button type="button">Search</button>
            </div>
          </div>
        </section>
        {/* CATALOG */}
        <section className="catalog-section">
          <div className="container">
            {/* CATEGORY BAR */}
            <div className="catalog-top">
              <div>
                <p className="eyebrow">EXPLORE</p>
                <h2>Browse the collection</h2>
              </div>
              <div className="availability-filter">
                <span>Availability</span>{' '}
                <button className="filter-button active-filter">All books</button>{' '}
                <button className="filter-button">Available</button>
              </div>
            </div>
            {/* CATEGORIES */}
            <div className="category-list">
              <a href="#" className="category active-category">
                <i className="fa-solid fa-layer-group" /> <span>All</span> <small>248</small>
              </a>{' '}
              <a href="#" className="category">
                <i className="fa-solid fa-code" /> <span>Programming</span> <small>46</small>
              </a>{' '}
              <a href="#" className="category">
                <i className="fa-solid fa-brain" /> <span>AI &amp; ML</span> <small>32</small>
              </a>{' '}
              <a href="#" className="category">
                <i className="fa-solid fa-database" /> <span>Databases</span> <small>24</small>
              </a>{' '}
              <a href="#" className="category">
                <i className="fa-solid fa-calculator" /> <span>Mathematics</span> <small>28</small>
              </a>{' '}
              <a href="#" className="category">
                <i className="fa-solid fa-feather" /> <span>Fiction</span> <small>51</small>
              </a>{' '}
              <a href="#" className="category">
                <i className="fa-solid fa-lightbulb" /> <span>Self Development</span>{' '}
                <small>31</small>
              </a>
            </div>
            {/* RESULTS HEADING */}
            <div className="results-heading">
              <div>
                <span className="result-count">248 books</span>{' '}
                <span className="result-note">in the library</span>
              </div>
              <div className="sort-box">
                <span>Sort by</span>{' '}
                <button>
                  Recently added <i className="fa-solid fa-chevron-down" />
                </button>
              </div>
            </div>
            {/* BOOK GRID */}
            <div className="book-grid">
              {/* BOOK 1 */}
              <article className="book-card">
                <div className="book-visual visual-one">
                  <span className="availability available">Available</span>{' '}
                  <i className="fa-solid fa-book-open" /> <span className="book-spine">01</span>
                </div>
                <div className="book-card-content">
                  <span className="book-category">Programming</span>
                  <h3>Clean Code</h3>
                  <p className="author">Robert C. Martin</p>
                  <div className="book-meta">
                    <span>
                      <i className="fa-regular fa-copy" /> 4 copies
                    </span>{' '}
                    <span>
                      <i className="fa-solid fa-location-dot" /> A-12
                    </span>
                  </div>
                  <a href="#" className="details-link">
                    View details <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
              </article>
              {/* BOOK 2 */}
              <article className="book-card">
                <div className="book-visual visual-two">
                  <span className="availability available">Available</span>{' '}
                  <i className="fa-solid fa-book-open" /> <span className="book-spine">02</span>
                </div>
                <div className="book-card-content">
                  <span className="book-category">Self Development</span>
                  <h3>Atomic Habits</h3>
                  <p className="author">James Clear</p>
                  <div className="book-meta">
                    <span>
                      <i className="fa-regular fa-copy" /> 3 copies
                    </span>{' '}
                    <span>
                      <i className="fa-solid fa-location-dot" /> B-07
                    </span>
                  </div>
                  <a href="#" className="details-link">
                    View details <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
              </article>
              {/* BOOK 3 */}
              <article className="book-card">
                <div className="book-visual visual-three">
                  <span className="availability limited">1 copy left</span>{' '}
                  <i className="fa-solid fa-book-open" /> <span className="book-spine">03</span>
                </div>
                <div className="book-card-content">
                  <span className="book-category">Computer Science</span>
                  <h3>Introduction to Algorithms</h3>
                  <p className="author">Thomas H. Cormen</p>
                  <div className="book-meta">
                    <span>
                      <i className="fa-regular fa-copy" /> 1 copy
                    </span>{' '}
                    <span>
                      <i className="fa-solid fa-location-dot" /> C-21
                    </span>
                  </div>
                  <a href="#" className="details-link">
                    View details <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
              </article>
              {/* BOOK 4 */}
              <article className="book-card">
                <div className="book-visual visual-four">
                  <span className="availability available">Available</span>{' '}
                  <i className="fa-solid fa-book-open" /> <span className="book-spine">04</span>
                </div>
                <div className="book-card-content">
                  <span className="book-category">AI &amp; ML</span>
                  <h3>Hands-On Machine Learning</h3>
                  <p className="author">Aurélien Géron</p>
                  <div className="book-meta">
                    <span>
                      <i className="fa-regular fa-copy" /> 2 copies
                    </span>{' '}
                    <span>
                      <i className="fa-solid fa-location-dot" /> D-04
                    </span>
                  </div>
                  <a href="#" className="details-link">
                    View details <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
              </article>
              {/* BOOK 5 */}
              <article className="book-card">
                <div className="book-visual visual-five">
                  <span className="availability unavailable">Unavailable</span>{' '}
                  <i className="fa-solid fa-book-open" /> <span className="book-spine">05</span>
                </div>
                <div className="book-card-content">
                  <span className="book-category">Databases</span>
                  <h3>Database System Concepts</h3>
                  <p className="author">Abraham Silberschatz</p>
                  <div className="book-meta">
                    <span>
                      <i className="fa-regular fa-copy" /> 0 copies
                    </span>{' '}
                    <span>
                      <i className="fa-solid fa-location-dot" /> E-09
                    </span>
                  </div>
                  <a href="#" className="details-link">
                    View details <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
              </article>
              {/* BOOK 6 */}
              <article className="book-card">
                <div className="book-visual visual-six">
                  <span className="availability available">Available</span>{' '}
                  <i className="fa-solid fa-book-open" /> <span className="book-spine">06</span>
                </div>
                <div className="book-card-content">
                  <span className="book-category">Fiction</span>
                  <h3>The Midnight Library</h3>
                  <p className="author">Matt Haig</p>
                  <div className="book-meta">
                    <span>
                      <i className="fa-regular fa-copy" /> 5 copies
                    </span>{' '}
                    <span>
                      <i className="fa-solid fa-location-dot" /> F-16
                    </span>
                  </div>
                  <a href="#" className="details-link">
                    View details <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
              </article>
            </div>
            {/* PAGINATION */}
            <div className="pagination">
              <button className="page-arrow disabled">
                <i className="fa-solid fa-arrow-left" />
              </button>{' '}
              <button className="page-number current">1</button>{' '}
              <button className="page-number">2</button> <button className="page-number">3</button>{' '}
              <span>...</span> <button className="page-number">21</button>{' '}
              <button className="page-arrow">
                <i className="fa-solid fa-arrow-right" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
