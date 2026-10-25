import { Link, useParams } from 'react-router-dom';
import BookCover from '../../components/BookCover';
import PageStyles from '../../components/PageStyles';
import {
  copiesOut,
  daysUntil,
  formatDate,
  plural,
  similarBooks,
  waitingFor,
  useLibrarian,
} from '../../context/LibraryContext';
import css from '../../styles/book-detail.css?inline';

export default function BookDetail() {
  const { id } = useParams();
  const { state, getBook, getStudent } = useLibrarian();
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
            <Link to="/librarian/books" className="bd-button primary">
              <i className="fa-solid fa-arrow-left" /> Back to books
            </Link>
          </div>
        </main>
      </>
    );
  }

  const index = state.books.findIndex((b) => b.id === book.id);
  const { out, held } = copiesOut(state, book.id);
  const loans = state.loans.filter((l) => l.bookId === book.id);
  const ready = state.reservations.filter((r) => r.bookId === book.id && r.status === 'ready');
  const queue = [...ready, ...waitingFor(state, book.id)];
  const similar = similarBooks(state, book);
  const nameOf = (studentId) => getStudent(studentId)?.name ?? studentId;

  return (
    <>
      <title>{book.title} | BookVerse</title>
      <meta name="description" content={`Copies and holds for ${book.title}.`} />
      <PageStyles css={css} />
      <main className="bd-page">
        <div className="container">
          <Link to="/librarian/books" className="bd-back">
            <i className="fa-solid fa-arrow-left" /> BOOKS
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
                <span className={`bd-pill ${book.available === 0 ? 'bad' : book.available === 1 ? 'warn' : 'good'}`}>
                  {book.available} of {book.copies} on the shelf
                </span>
              </div>
              <dl className="bd-facts">
                <div>
                  <dt>On shelf</dt>
                  <dd>{book.available}</dd>
                </div>
                <div>
                  <dt>Out on loan</dt>
                  <dd>{out}</dd>
                </div>
                <div>
                  <dt>Held for pickup</dt>
                  <dd>{held}</dd>
                </div>
                <div>
                  <dt>Total</dt>
                  <dd>{book.copies}</dd>
                </div>
                <div>
                  <dt>ISBN</dt>
                  <dd>{book.isbn}</dd>
                </div>
                <div>
                  <dt>Shelf</dt>
                  <dd>{book.shelf}</dd>
                </div>
              </dl>
              <div className="bd-actions">
                {book.available > 0 ? (
                  <Link to={`/librarian/issue-book?book=${book.id}`} className="bd-button primary">
                    Issue this book <i className="fa-solid fa-arrow-right" />
                  </Link>
                ) : (
                  <button type="button" className="bd-button" disabled title="No copies on the shelf">
                    Issue this book <i className="fa-solid fa-lock" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <section className="bd-block" aria-labelledby="loans-heading">
            <h2 id="loans-heading">Who has it ({loans.length})</h2>
            {loans.length === 0 ? (
              <p className="bd-empty">No copies are out right now.</p>
            ) : (
              <div className="bd-scroll">
                <table className="bd-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Issued</th>
                      <th>Due</th>
                      <th>Status</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {loans.map((loan) => {
                      const days = daysUntil(loan.dueOn);
                      return (
                        <tr key={loan.id}>
                          <td>
                            <Link to={`/librarian/students/${loan.studentId}`}>{nameOf(loan.studentId)}</Link>
                          </td>
                          <td>{formatDate(loan.issuedOn)}</td>
                          <td>{formatDate(loan.dueOn)}</td>
                          <td>{days < 0 ? `Overdue by ${plural(-days, 'day')}` : 'On time'}</td>
                          <td>
                            <Link to={`/librarian/return-book?loan=${loan.id}`}>Return</Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="bd-block" aria-labelledby="queue-heading">
            <h2 id="queue-heading">Hold queue ({queue.length})</h2>
            {queue.length === 0 ? (
              <p className="bd-empty">Nobody is waiting for this book.</p>
            ) : (
              <div className="bd-scroll">
                <table className="bd-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Student</th>
                      <th>Asked on</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queue.map((r, i) => (
                      <tr key={r.id}>
                        <td>{i + 1}</td>
                        <td>
                          <Link to={`/librarian/students/${r.studentId}`}>{nameOf(r.studentId)}</Link>
                        </td>
                        <td>{formatDate(r.placedOn)}</td>
                        <td>
                          {r.status === 'ready' ? `Ready · collect by ${formatDate(r.expiresOn)}` : 'Waiting'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="bd-block" aria-labelledby="similar-heading">
            <h2 id="similar-heading">Similar books</h2>
            {similar.length === 0 ? (
              <p className="bd-empty">Nothing similar in the catalog yet.</p>
            ) : (
              <div className="bd-similar">
                {similar.map((other) => (
                  <Link key={other.id} to={`/librarian/books/${other.id}`} className="bd-mini">
                    <BookCover book={other} index={state.books.findIndex((b) => b.id === other.id)} />
                    <strong>{other.title}</strong>
                    <small>{other.author}</small>
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
