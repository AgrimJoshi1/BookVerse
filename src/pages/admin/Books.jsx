import { Link } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import css from '../../styles/admin-books.css?inline';

export default function Books() {
  return (
    <>
      <title>Books | BookVerse Admin</title>
      <meta name="description" content="Manage the BookVerse book inventory." />
      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">BOOKS</p>
            <h1>
              Manage the <span>full inventory.</span>
            </h1>
            <p className="hero-description">
              Search, filter, and manage every title in the BookVerse catalog — availability,
              copies, and categories.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                marginTop: '24px',
                flexWrap: 'wrap',
              }}
            >
              <div className="search-box" style={{ maxWidth: '560px', flex: '1' }}>
                <i className="fa-solid fa-magnifying-glass" />{' '}
                <input type="text" placeholder="Search by title, author, or ISBN" />{' '}
                <button type="button">Search</button>
              </div>
              <Link to="/admin/add-book" className="light-button">
                <i className="fa-solid fa-plus" /> Add book
              </Link>
            </div>
          </div>
        </section>
        {/* CONTENT */}
        <section className="page-section">
          <div className="container page-grid">
            <div className="page-main">
              <div className="filter-row" style={{ marginTop: '0' }}>
                <span>Category</span> <button className="filter-button active-filter">All</button>{' '}
                <button className="filter-button">Programming</button>{' '}
                <button className="filter-button">AI &amp; ML</button>{' '}
                <button className="filter-button">Databases</button>{' '}
                <button className="filter-button">Mathematics</button>{' '}
                <button className="filter-button">Fiction</button>{' '}
                <button className="filter-button">Self Development</button>
              </div>
              <section className="page-block">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">CATALOG</p>
                    <h2>Book inventory</h2>
                  </div>
                  <span className="panel-count">2,480 books</span>
                </div>
                <div className="data-table">
                  <div
                    className="table-head"
                    style={{
                      gridTemplateColumns:
                        'minmax(180px,1.7fr) 0.85fr 0.95fr 0.55fr 0.55fr 0.55fr 0.85fr auto',
                    }}
                  >
                    <span>Title</span> <span>Category</span> <span>ISBN</span> <span>Avail.</span>{' '}
                    <span>Borrowed</span> <span>Total</span> <span>Status</span> <span />
                  </div>
                  <div
                    className="table-row"
                    style={{
                      gridTemplateColumns:
                        'minmax(180px,1.7fr) 0.85fr 0.95fr 0.55fr 0.55fr 0.55fr 0.85fr auto',
                    }}
                  >
                    <div className="table-entity">
                      <div className="mini-book">
                        <i className="fa-solid fa-book" />
                      </div>
                      <div>
                        <strong>Clean Code</strong>
                        <small>Robert C. Martin</small>
                      </div>
                    </div>
                    <span>Programming</span> <span>978-0132350884</span> <span>2</span>{' '}
                    <span>2</span> <span>4</span>{' '}
                    <span className="badge badge-good">Available</span>{' '}
                    <a href={'admin-add-book.html?mode=edit&id=1'} className="row-action">
                      Edit <i className="fa-solid fa-arrow-right" />
                    </a>
                  </div>
                  <div
                    className="table-row"
                    style={{
                      gridTemplateColumns:
                        'minmax(180px,1.7fr) 0.85fr 0.95fr 0.55fr 0.55fr 0.55fr 0.85fr auto',
                    }}
                  >
                    <div className="table-entity">
                      <div className="mini-book">
                        <i className="fa-solid fa-book" />
                      </div>
                      <div>
                        <strong>Atomic Habits</strong>
                        <small>James Clear</small>
                      </div>
                    </div>
                    <span>Self Development</span> <span>978-0735211292</span> <span>2</span>{' '}
                    <span>1</span> <span>3</span>{' '}
                    <span className="badge badge-good">Available</span>{' '}
                    <a href={'admin-add-book.html?mode=edit&id=2'} className="row-action">
                      Edit <i className="fa-solid fa-arrow-right" />
                    </a>
                  </div>
                  <div
                    className="table-row"
                    style={{
                      gridTemplateColumns:
                        'minmax(180px,1.7fr) 0.85fr 0.95fr 0.55fr 0.55fr 0.55fr 0.85fr auto',
                    }}
                  >
                    <div className="table-entity">
                      <div className="mini-book">
                        <i className="fa-solid fa-book" />
                      </div>
                      <div>
                        <strong>Introduction to Algorithms</strong>
                        <small>Thomas H. Cormen</small>
                      </div>
                    </div>
                    <span>Computer Science</span> <span>978-0262046305</span> <span>0</span>{' '}
                    <span>1</span> <span>1</span>{' '}
                    <span className="badge badge-bad">Unavailable</span>{' '}
                    <a href={'admin-add-book.html?mode=edit&id=3'} className="row-action">
                      Edit <i className="fa-solid fa-arrow-right" />
                    </a>
                  </div>
                  <div
                    className="table-row"
                    style={{
                      gridTemplateColumns:
                        'minmax(180px,1.7fr) 0.85fr 0.95fr 0.55fr 0.55fr 0.55fr 0.85fr auto',
                    }}
                  >
                    <div className="table-entity">
                      <div className="mini-book">
                        <i className="fa-solid fa-book" />
                      </div>
                      <div>
                        <strong>Hands-On Machine Learning</strong>
                        <small>Aurélien Géron</small>
                      </div>
                    </div>
                    <span>AI &amp; ML</span> <span>978-1492032649</span> <span>1</span>{' '}
                    <span>1</span> <span>2</span> <span className="badge badge-warn">Limited</span>{' '}
                    <a href={'admin-add-book.html?mode=edit&id=4'} className="row-action">
                      Edit <i className="fa-solid fa-arrow-right" />
                    </a>
                  </div>
                  <div
                    className="table-row"
                    style={{
                      gridTemplateColumns:
                        'minmax(180px,1.7fr) 0.85fr 0.95fr 0.55fr 0.55fr 0.55fr 0.85fr auto',
                    }}
                  >
                    <div className="table-entity">
                      <div className="mini-book">
                        <i className="fa-solid fa-book" />
                      </div>
                      <div>
                        <strong>Database System Concepts</strong>
                        <small>Abraham Silberschatz</small>
                      </div>
                    </div>
                    <span>Databases</span> <span>978-0078022159</span> <span>0</span> <span>0</span>{' '}
                    <span>0</span> <span className="badge badge-bad">Unavailable</span>{' '}
                    <a href={'admin-add-book.html?mode=edit&id=5'} className="row-action">
                      Edit <i className="fa-solid fa-arrow-right" />
                    </a>
                  </div>
                  <div
                    className="table-row"
                    style={{
                      gridTemplateColumns:
                        'minmax(180px,1.7fr) 0.85fr 0.95fr 0.55fr 0.55fr 0.55fr 0.85fr auto',
                    }}
                  >
                    <div className="table-entity">
                      <div className="mini-book">
                        <i className="fa-solid fa-book" />
                      </div>
                      <div>
                        <strong>The Midnight Library</strong>
                        <small>Matt Haig</small>
                      </div>
                    </div>
                    <span>Fiction</span> <span>978-0525559474</span> <span>5</span> <span>0</span>{' '}
                    <span>5</span> <span className="badge badge-good">Available</span>{' '}
                    <a href={'admin-add-book.html?mode=edit&id=6'} className="row-action">
                      Edit <i className="fa-solid fa-arrow-right" />
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
                  <button className="filter-button">207</button>{' '}
                  <button className="filter-button">
                    <i className="fa-solid fa-arrow-right" />
                  </button>
                </div>
              </section>
            </div>
            {/* SIDEBAR: CATEGORIES */}
            <aside className="page-sidebar">
              <section className="side-card">
                <div className="block-heading" style={{ marginBottom: '16px' }}>
                  <div>
                    <p className="eyebrow">CATEGORIES</p>
                    <h2 style={{ fontSize: '1.05rem' }}>Manage categories</h2>
                  </div>
                </div>
                <div className="category-manage-list">
                  <div className="category-manage-row">
                    <span>
                      <i className="fa-solid fa-code" /> Programming
                    </span>{' '}
                    <strong>412</strong>{' '}
                    <button className="row-action danger" type="button">
                      <i className="fa-solid fa-xmark" />
                    </button>
                  </div>
                  <div className="category-manage-row">
                    <span>
                      <i className="fa-solid fa-brain" /> AI &amp; ML
                    </span>{' '}
                    <strong>286</strong>{' '}
                    <button className="row-action danger" type="button">
                      <i className="fa-solid fa-xmark" />
                    </button>
                  </div>
                  <div className="category-manage-row">
                    <span>
                      <i className="fa-solid fa-database" /> Databases
                    </span>{' '}
                    <strong>198</strong>{' '}
                    <button className="row-action danger" type="button">
                      <i className="fa-solid fa-xmark" />
                    </button>
                  </div>
                  <div className="category-manage-row">
                    <span>
                      <i className="fa-solid fa-calculator" /> Mathematics
                    </span>{' '}
                    <strong>224</strong>{' '}
                    <button className="row-action danger" type="button">
                      <i className="fa-solid fa-xmark" />
                    </button>
                  </div>
                  <div className="category-manage-row">
                    <span>
                      <i className="fa-solid fa-feather" /> Fiction
                    </span>{' '}
                    <strong>510</strong>{' '}
                    <button className="row-action danger" type="button">
                      <i className="fa-solid fa-xmark" />
                    </button>
                  </div>
                  <div className="category-manage-row">
                    <span>
                      <i className="fa-solid fa-lightbulb" /> Self Development
                    </span>{' '}
                    <strong>305</strong>{' '}
                    <button className="row-action danger" type="button">
                      <i className="fa-solid fa-xmark" />
                    </button>
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: '18px' }}>
                  <label htmlFor="new-category">Add a category</label>{' '}
                  <input type="text" id="new-category" placeholder="e.g. Biography" />
                </div>
                <button
                  className="outline-button"
                  type="button"
                  style={{ width: '100%', marginTop: '12px' }}
                >
                  <i className="fa-solid fa-plus" /> Add category
                </button>
              </section>
              <section className="side-card">
                <p className="eyebrow">INVENTORY SNAPSHOT</p>
                <h2 style={{ fontSize: '1.05rem' }}>At a glance</h2>
                <div className="summary-line" style={{ borderTop: 'none' }}>
                  <span>Total titles</span> <strong>2,480</strong>
                </div>
                <div className="summary-line">
                  <span>Total copies</span> <strong>4,120</strong>
                </div>
                <div className="summary-line">
                  <span>Currently borrowed</span> <strong>318</strong>
                </div>
                <div className="summary-line">
                  <span>Out of stock titles</span> <strong>46</strong>
                </div>
              </section>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
