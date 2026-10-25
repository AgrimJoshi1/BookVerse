import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import Pagination from '../../components/Pagination';
import { plural, useLibrarian } from '../../context/LibraryContext';
import css from '../../styles/librarian-books.css?inline';

const PAGE_SIZE = 8;

function stock(book) {
  if (book.available === 0) return { label: 'Unavailable', tone: 'bad' };
  if (book.available === 1) return { label: 'Limited', tone: 'warn' };
  return { label: 'Available', tone: 'good' };
}

export default function Books() {
  const { books, state, categories } = useLibrarian();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);

  const needle = query.trim().toLowerCase();
  const matching = books.filter(
    (book) =>
      !needle ||
      [book.title, book.author, book.isbn].some((field) => field.toLowerCase().includes(needle)),
  );
  const rows = matching.filter((book) => category === 'All' || book.category === category);

  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = rows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const borrowedOf = (book) => state.loans.filter((loan) => loan.bookId === book.id).length;

  function updateQuery(value) {
    setQuery(value);
    setPage(1);
  }

  function pickCategory(id) {
    setCategory(id);
    setPage(1);
  }

  return (
    <>
      <title>Books | BookVerse</title>
      <meta name="description" content="Browse the BookVerse book inventory as a librarian." />
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
            <form className="search-box hero-search" onSubmit={(event) => event.preventDefault()}>
              <i className="fa-solid fa-magnifying-glass" />{' '}
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
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
        {/* CONTENT */}
        <section className="page-section">
          <div className="container">
            <div className="filter-row">
              <span>Category</span>
              {['All', ...categories.map((c) => c.id)].map((id) => (
                <button
                  type="button"
                  key={id}
                  className={`filter-button${category === id ? ' active-filter' : ''}`}
                  onClick={() => pickCategory(id)}
                >
                  {id} ·{' '}
                  {matching.filter((book) => id === 'All' || book.category === id).length}
                </button>
              ))}
            </div>
            <section className="page-block">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">CATALOG</p>
                  <h2>Book inventory</h2>
                </div>
                <span className="panel-count">{plural(rows.length, 'book')}</span>
              </div>
              <div className="data-table">
                <div className="table-head cols-books">
                  <span>Title</span> <span>Category</span> <span>ISBN</span> <span>Available</span>{' '}
                  <span>Borrowed</span> <span>Total</span> <span>Status</span> <span />
                </div>
                {visible.map((book) => {
                  const badge = stock(book);
                  return (
                    <div className="table-row cols-books" key={book.id}>
                      <div className="table-entity">
                        <div className="mini-book">
                          <i className="fa-solid fa-book" />
                        </div>
                        <div>
                          <Link to={`/librarian/books/${book.id}`}>
                            <strong>{book.title}</strong>
                          </Link>{' '}
                          <small>{book.author}</small>
                        </div>
                      </div>
                      <span>{book.category}</span> <span>{book.isbn}</span>{' '}
                      <span>{book.available}</span> <span>{borrowedOf(book)}</span>{' '}
                      <span>{book.copies}</span>{' '}
                      <span className={`badge badge-${badge.tone}`}>{badge.label}</span>{' '}
                      {book.available > 0 ? (
                        <Link to={`/librarian/issue-book?book=${book.id}`} className="row-action">
                          Issue <i className="fa-solid fa-arrow-right" />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          className="row-action as-link"
                          disabled
                          title="No copies on the shelf"
                        >
                          Issue <i className="fa-solid fa-lock" />
                        </button>
                      )}
                    </div>
                  );
                })}
                {visible.length === 0 && (
                  <p className="empty-state table-empty-row">
                    <i className="fa-solid fa-magnifying-glass" /> No books match these filters.
                  </p>
                )}
              </div>
              <Pagination page={currentPage} pageCount={pageCount} onPage={setPage} />
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
