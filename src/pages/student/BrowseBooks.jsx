import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import BookCover from '../../components/BookCover';
import PageStyles from '../../components/PageStyles';
import { pad, plural, useStudent } from '../../context/LibraryContext';
import css from '../../styles/browse-books.css?inline';

const VISUALS = ['visual-one', 'visual-two', 'visual-three', 'visual-four', 'visual-five', 'visual-six'];
const PAGE_SIZE = 6;

const SORTS = [
  { label: 'Recently added', compare: (a, b) => b.addedOn.localeCompare(a.addedOn) },
  { label: 'Title A–Z', compare: (a, b) => a.title.localeCompare(b.title) },
  { label: 'Author A–Z', compare: (a, b) => a.author.localeCompare(b.author) },
];

function availability(book) {
  if (book.available === 0) return { className: 'unavailable', label: 'Unavailable' };
  if (book.available === 1) return { className: 'limited', label: '1 copy left' };
  return { className: 'available', label: 'Available' };
}

// 1 … 4 5 6 … 21 style page list.
function pageList(current, total) {
  const pages = [];
  for (let page = 1; page <= total; page++) {
    if (page === 1 || page === total || Math.abs(page - current) <= 1) pages.push(page);
    else if (pages[pages.length - 1] !== '…') pages.push('…');
  }
  return pages;
}

export default function BrowseBooks() {
  const { books, loans, reservations, reserveBook, student, categories } = useStudent();
  const suspended = student.status === 'suspended';
  const [params, setParams] = useSearchParams();
  const [category, setCategory] = useState('All');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortIndex, setSortIndex] = useState(0);
  const [page, setPage] = useState(1);

  const query = params.get('q') ?? '';
  const needle = query.trim().toLowerCase();

  const matchesSearch = books.filter(
    (book) =>
      !needle ||
      [book.title, book.author, book.category].some((field) => field.toLowerCase().includes(needle)),
  );
  const results = matchesSearch
    .filter((book) => category === 'All' || book.category === category)
    .filter((book) => !onlyAvailable || book.available > 0)
    .sort(SORTS[sortIndex].compare);

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const borrowedIds = new Set(loans.map((loan) => loan.bookId));
  const reservedIds = new Set(reservations.map((r) => r.bookId));
  const countIn = (id) => matchesSearch.filter((book) => id === 'All' || book.category === id).length;

  function updateQuery(value) {
    setParams(value ? { q: value } : {}, { replace: true });
    setPage(1);
  }

  function pickCategory(id) {
    setCategory(id);
    setPage(1);
  }

  function pickAvailability(value) {
    setOnlyAvailable(value);
    setPage(1);
  }

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
            <form className="main-search" onSubmit={(event) => event.preventDefault()}>
              <i className="fa-solid fa-magnifying-glass" />{' '}
              <input
                type="text"
                placeholder="Search by title, author, or category"
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
              />{' '}
              {query ? (
                <button type="button" onClick={() => updateQuery('')}>
                  Clear
                </button>
              ) : (
                <button type="submit">Search</button>
              )}
            </form>
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
                <button
                  type="button"
                  className={`filter-button${onlyAvailable ? '' : ' active-filter'}`}
                  onClick={() => pickAvailability(false)}
                >
                  All books
                </button>{' '}
                <button
                  type="button"
                  className={`filter-button${onlyAvailable ? ' active-filter' : ''}`}
                  onClick={() => pickAvailability(true)}
                >
                  Available
                </button>
              </div>
            </div>
            {/* CATEGORIES */}
            <div className="category-list">
              {[{ id: 'All', icon: 'fa-layer-group' }, ...categories].map(({ id, icon }) => (
                <button
                  type="button"
                  key={id}
                  className={`category as-link${category === id ? ' active-category' : ''}`}
                  onClick={() => pickCategory(id)}
                >
                  <i className={`fa-solid ${icon}`} /> <span>{id}</span> <small>{countIn(id)}</small>
                </button>
              ))}
            </div>
            {/* RESULTS HEADING */}
            <div className="results-heading">
              <div>
                <span className="result-count">{plural(results.length, 'book')}</span>{' '}
                <span className="result-note">
                  {needle ? `matching “${query.trim()}”` : 'in the library'}
                </span>
              </div>
              <div className="sort-box">
                <span>Sort by</span>{' '}
                <button
                  type="button"
                  title="Change sort order"
                  onClick={() => setSortIndex((sortIndex + 1) % SORTS.length)}
                >
                  {SORTS[sortIndex].label} <i className="fa-solid fa-chevron-down" />
                </button>
              </div>
            </div>
            {/* BOOK GRID */}
            <div className="book-grid">
              {visible.map((book) => {
                const badge = availability(book);
                const index = books.indexOf(book);
                return (
                  <article className="book-card" key={book.id}>
                    <Link
                      to={`/student/books/${book.id}`}
                      className={`book-visual ${VISUALS[index % VISUALS.length]}`}
                      aria-label={`Details for ${book.title}`}
                    >
                      <BookCover book={book} index={index} className="card-cover" />
                      <span className={`availability ${badge.className}`}>{badge.label}</span>{' '}
                      <span className="book-spine">{pad(index + 1)}</span>
                    </Link>
                    <div className="book-card-content">
                      <span className="book-category">{book.category}</span>
                      <h3>
                        <Link to={`/student/books/${book.id}`}>{book.title}</Link>
                      </h3>
                      <p className="author">{book.author}</p>
                      <div className="book-meta">
                        <span>
                          <i className="fa-regular fa-copy" /> {plural(book.available, 'copy', 'copies')}
                        </span>{' '}
                        <span>
                          <i className="fa-solid fa-location-dot" /> {book.shelf}
                        </span>
                      </div>
                      {borrowedIds.has(book.id) ? (
                        <Link to="/student/my-books" className="details-link">
                          You're reading this <i className="fa-solid fa-arrow-right" />
                        </Link>
                      ) : reservedIds.has(book.id) ? (
                        <Link to="/student/reservations" className="details-link">
                          Reserved · view hold <i className="fa-solid fa-arrow-right" />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          className="details-link as-link"
                          disabled={suspended}
                          title={suspended ? 'Your account is suspended' : undefined}
                          onClick={() => reserveBook(book.id)}
                        >
                          {book.available > 0 ? 'Reserve a copy' : 'Join the waitlist'}{' '}
                          <i className="fa-solid fa-bookmark" />
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
            {results.length === 0 && (
              <p className="empty-state">
                <i className="fa-solid fa-magnifying-glass" /> No books match these filters.
                <button
                  type="button"
                  className="as-link"
                  onClick={() => {
                    updateQuery('');
                    pickCategory('All');
                    pickAvailability(false);
                  }}
                >
                  Reset filters
                </button>
              </p>
            )}
            {/* PAGINATION */}
            {pageCount > 1 && (
              <div className="pagination">
                <button
                  type="button"
                  className={`page-arrow${currentPage === 1 ? ' disabled' : ''}`}
                  disabled={currentPage === 1}
                  onClick={() => setPage(currentPage - 1)}
                  aria-label="Previous page"
                >
                  <i className="fa-solid fa-arrow-left" />
                </button>{' '}
                {pageList(currentPage, pageCount).map((item, i) =>
                  item === '…' ? (
                    <span key={`gap-${i}`}>...</span>
                  ) : (
                    <button
                      type="button"
                      key={item}
                      className={`page-number${item === currentPage ? ' current' : ''}`}
                      onClick={() => setPage(item)}
                    >
                      {item}
                    </button>
                  ),
                )}{' '}
                <button
                  type="button"
                  className={`page-arrow${currentPage === pageCount ? ' disabled' : ''}`}
                  disabled={currentPage === pageCount}
                  onClick={() => setPage(currentPage + 1)}
                  aria-label="Next page"
                >
                  <i className="fa-solid fa-arrow-right" />
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
