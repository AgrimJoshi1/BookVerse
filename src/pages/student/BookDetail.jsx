import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BookCover from '../../components/BookCover';
import PageStyles from '../../components/PageStyles';
import {
  ApiError,
  formatDate,
  plural,
  similarBooks,
  waitingFor,
  useStudent,
} from '../../context/LibraryContext';
import css from '../../styles/book-detail.css?inline';

export default function BookDetail() {
  const { id } = useParams();
  const { state, getBook, loans, reservations, reserveBook, student } = useStudent();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const book = getBook(id);

  if (!book || book.archived) {
    return (
      <>
        <title>Book not found | BookVerse</title>
        <PageStyles css={css} />
        <main className="bd-page">
          <div className="container">
            <h1 style={{ color: '#f5eee7' }}>This book isn't in the catalog.</h1>
            <p className="bd-empty">It may have been removed, or the link is wrong.</p>
            <Link to="/student/browse-books" className="bd-button primary">
              <i className="fa-solid fa-arrow-left" /> Back to Browse Books
            </Link>
          </div>
        </main>
      </>
    );
  }

  const index = state.books.findIndex((b) => b.id === book.id);
  const loan = loans.find((l) => l.bookId === book.id);
  const hold = reservations.find((r) => r.bookId === book.id);
  const waiting = waitingFor(state, book.id).length;
  const suspended = student.status === 'suspended';
  const similar = similarBooks(state, book);

  const stock =
    book.available === 0
      ? { tone: 'bad', label: waiting ? `All copies out · ${waiting} waiting` : 'All copies out' }
      : book.available === 1
        ? { tone: 'warn', label: `1 of ${book.copies} on the shelf` }
        : { tone: 'good', label: `${book.available} of ${book.copies} on the shelf` };

  async function reserve() {
    setBusy(true);
    setError('');
    try {
      await reserveBook(book.id);
    } catch (err) {
      if (!(err instanceof ApiError)) throw err;
      setError(err.message);
    }
    setBusy(false);
  }

  return (
    <>
      <title>{book.title} | BookVerse</title>
      <meta name="description" content={`${book.title} by ${book.author}`} />
      <PageStyles css={css} />
      <main className="bd-page">
        <div className="container">
          <Link to="/student/browse-books" className="bd-back">
            <i className="fa-solid fa-arrow-left" /> BROWSE BOOKS
          </Link>
          <div className="bd-top">
            <div className="bd-cover-wrap">
              <BookCover book={book} index={index} />
            </div>
            <div className="bd-info">
              <p className="bd-category">{book.category}</p>
              <h1>{book.title}</h1>
              <p className="bd-author">by {book.author}</p>
              <p className="bd-description">{book.description || 'No description has been added yet.'}</p>
              <div className="bd-stock">
                <span className={`bd-pill ${stock.tone}`}>{stock.label}</span>
              </div>
              <dl className="bd-facts">
                <div>
                  <dt>ISBN</dt>
                  <dd>{book.isbn}</dd>
                </div>
                <div>
                  <dt>Shelf</dt>
                  <dd>{book.shelf}</dd>
                </div>
                <div>
                  <dt>Copies</dt>
                  <dd>{book.copies}</dd>
                </div>
                <div>
                  <dt>Added</dt>
                  <dd>{formatDate(book.addedOn)}</dd>
                </div>
              </dl>
              <div className="bd-actions">
                {loan ? (
                  <Link to="/student/my-books" className="bd-button">
                    You're reading this · due {formatDate(loan.dueOn)}
                  </Link>
                ) : hold ? (
                  <Link to="/student/reservations" className="bd-button">
                    {hold.status === 'ready'
                      ? 'Ready to collect'
                      : `Reserved · position ${hold.position}`}{' '}
                    <i className="fa-solid fa-arrow-right" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="bd-button primary"
                    disabled={suspended || busy}
                    title={suspended ? 'Your account is suspended' : undefined}
                    onClick={reserve}
                  >
                    <i className="fa-solid fa-bookmark" />{' '}
                    {busy ? 'Reserving…' : book.available > 0 ? 'Reserve a copy' : 'Join the waitlist'}
                  </button>
                )}
              </div>
              {error && (
                <p className="bd-error" role="alert">
                  {error}
                </p>
              )}
            </div>
          </div>

          <section className="bd-block" aria-labelledby="similar-heading">
            <h2 id="similar-heading">Similar books</h2>
            {similar.length === 0 ? (
              <p className="bd-empty">Nothing similar in the catalog yet.</p>
            ) : (
              <div className="bd-similar">
                {similar.map((other) => (
                  <Link key={other.id} to={`/student/books/${other.id}`} className="bd-mini">
                    <BookCover book={other} index={state.books.findIndex((b) => b.id === other.id)} />
                    <strong>{other.title}</strong>
                    <small>
                      {other.author} · {plural(other.available, 'copy', 'copies')} left
                    </small>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
