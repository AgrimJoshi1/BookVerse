import PageStyles from '../../components/PageStyles';
import css from '../../styles/teacher-books.css?inline';

export default function Books() {
  return (
    <>
      <title>Books | BookVerse</title>
      <meta name="description" content="Browse the BookVerse book inventory as a teacher." />
      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">BOOKS</p>
            <h1>
              Manage the <span>book inventory.</span>
            </h1>
            <p className="hero-description">
              Check what's available, what's borrowed, and how many copies remain for every title in
              the catalog.
            </p>
            <div className="search-box" style={{ maxWidth: '560px', marginTop: '24px' }}>
              <i className="fa-solid fa-magnifying-glass" />{' '}
              <input type="text" placeholder="Search by title, author, or ISBN" />{' '}
              <button type="button">Search</button>
            </div>
          </div>
        </section>
        {/* CONTENT */}
        <section className="page-section">
          <div className="container">
            <div className="filter-row">
              <span>Category</span> <button className="filter-button active-filter">All</button>{' '}
              <button className="filter-button">Programming</button>{' '}
              <button className="filter-button">AI &amp; ML</button>{' '}
              <button className="filter-button">Databases</button>{' '}
              <button className="filter-button">Fiction</button>{' '}
              <button className="filter-button">Self Development</button>
            </div>
            <section className="page-block">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">CATALOG</p>
                  <h2>Book inventory</h2>
                </div>
                <span className="panel-count">248 books</span>
              </div>
              <div className="data-table">
                <div
                  className="table-head"
                  style={{
                    gridTemplateColumns:
                      'minmax(190px,1.8fr) 0.9fr 0.9fr 0.6fr 0.6fr 0.6fr 0.9fr auto',
                  }}
                >
                  <span>Title</span> <span>Category</span> <span>ISBN</span> <span>Available</span>{' '}
                  <span>Borrowed</span> <span>Total</span> <span>Status</span> <span />
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(190px,1.8fr) 0.9fr 0.9fr 0.6fr 0.6fr 0.6fr 0.9fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-book">
                      <i className="fa-solid fa-book" />
                    </div>
                    <div>
                      <strong>Clean Code</strong> <small>Robert C. Martin</small>
                    </div>
                  </div>
                  <span>Programming</span> <span>978-0132350884</span> <span>2</span> <span>2</span>{' '}
                  <span>4</span> <span className="badge badge-good">Available</span>{' '}
                  <a href="#" className="row-action">
                    View <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(190px,1.8fr) 0.9fr 0.9fr 0.6fr 0.6fr 0.6fr 0.9fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-book">
                      <i className="fa-solid fa-book" />
                    </div>
                    <div>
                      <strong>Atomic Habits</strong> <small>James Clear</small>
                    </div>
                  </div>
                  <span>Self Development</span> <span>978-0735211292</span> <span>2</span>{' '}
                  <span>1</span> <span>3</span> <span className="badge badge-good">Available</span>{' '}
                  <a href="#" className="row-action">
                    View <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(190px,1.8fr) 0.9fr 0.9fr 0.6fr 0.6fr 0.6fr 0.9fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-book">
                      <i className="fa-solid fa-book" />
                    </div>
                    <div>
                      <strong>Introduction to Algorithms</strong> <small>Thomas H. Cormen</small>
                    </div>
                  </div>
                  <span>Computer Science</span> <span>978-0262046305</span> <span>0</span>{' '}
                  <span>1</span> <span>1</span> <span className="badge badge-bad">Unavailable</span>{' '}
                  <a href="#" className="row-action">
                    View <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(190px,1.8fr) 0.9fr 0.9fr 0.6fr 0.6fr 0.6fr 0.9fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-book">
                      <i className="fa-solid fa-book" />
                    </div>
                    <div>
                      <strong>Hands-On Machine Learning</strong> <small>Aurélien Géron</small>
                    </div>
                  </div>
                  <span>AI &amp; ML</span> <span>978-1492032649</span> <span>1</span> <span>1</span>{' '}
                  <span>2</span> <span className="badge badge-warn">Limited</span>{' '}
                  <a href="#" className="row-action">
                    View <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(190px,1.8fr) 0.9fr 0.9fr 0.6fr 0.6fr 0.6fr 0.9fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-book">
                      <i className="fa-solid fa-book" />
                    </div>
                    <div>
                      <strong>Database System Concepts</strong> <small>Abraham Silberschatz</small>
                    </div>
                  </div>
                  <span>Databases</span> <span>978-0078022159</span> <span>0</span> <span>0</span>{' '}
                  <span>0</span> <span className="badge badge-bad">Unavailable</span>{' '}
                  <a href="#" className="row-action">
                    View <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
                <div
                  className="table-row"
                  style={{
                    gridTemplateColumns:
                      'minmax(190px,1.8fr) 0.9fr 0.9fr 0.6fr 0.6fr 0.6fr 0.9fr auto',
                  }}
                >
                  <div className="table-entity">
                    <div className="mini-book">
                      <i className="fa-solid fa-book" />
                    </div>
                    <div>
                      <strong>The Midnight Library</strong> <small>Matt Haig</small>
                    </div>
                  </div>
                  <span>Fiction</span> <span>978-0525559474</span> <span>5</span> <span>0</span>{' '}
                  <span>5</span> <span className="badge badge-good">Available</span>{' '}
                  <a href="#" className="row-action">
                    View <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
              </div>
              <div
                className="pagination-row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '22px',
                }}
              >
                <button className="filter-button" disabled>
                  <i className="fa-solid fa-arrow-left" />
                </button>{' '}
                <button className="filter-button active-filter">1</button>{' '}
                <button className="filter-button">2</button>{' '}
                <button className="filter-button">3</button>{' '}
                <span style={{ color: '#6f645d', fontSize: '0.65rem' }}>...</span>{' '}
                <button className="filter-button">21</button>{' '}
                <button className="filter-button">
                  <i className="fa-solid fa-arrow-right" />
                </button>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
