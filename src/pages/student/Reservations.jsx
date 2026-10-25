import { Link } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import { formatDate, ordinal, pad, plural, useStudent } from '../../context/LibraryContext';
import css from '../../styles/reservations.css?inline';

const COVERS = ['cover-one', 'cover-two'];

function waitingNote(position) {
  const ahead = position - 1;
  return ahead === 0 ? 'Next in line' : `${plural(ahead, 'person', 'people')} ahead`;
}

export default function Reservations() {
  const { reservations, getBook, cancelReservation } = useStudent();

  // Ready holds first, then the queue in the order they were placed.
  const holds = [...reservations]
    .sort((a, b) => (a.status === b.status ? 0 : a.status === 'ready' ? -1 : 1))
    .map((reservation) => ({ reservation, book: getBook(reservation.bookId) }));
  const ready = holds.filter(({ reservation }) => reservation.status === 'ready');
  const pickup = ready[0];

  return (
    <>
      <title>Reservations | BookVerse</title>

      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="reservation-hero">
          <div className="container">
            <p className="eyebrow">RESERVATIONS / HOLDS</p>
            <h1>
              Keep your place <span>in the queue.</span>
            </h1>
            <p className="hero-description">
              Track the books you've requested and see when they're ready for you.
            </p>
          </div>
        </section>
        {/* RESERVATIONS */}
        <section className="reservation-section">
          <div className="container">
            <div className="reservation-layout">
              {/* MAIN */}
              <div className="reservation-main">
                <section className="reservation-panel">
                  <div className="panel-heading">
                    <div>
                      <p className="eyebrow">YOUR REQUESTS</p>
                      <h2>Books you've requested</h2>
                    </div>
                    <span className="request-count">
                      {pad(holds.length)} active {holds.length === 1 ? 'hold' : 'holds'}
                    </span>
                  </div>
                  <div className="reservation-list">
                    {holds.map(({ reservation, book }, index) => {
                      const isReady = reservation.status === 'ready';
                      return (
                        <article
                          className={`reservation-card${isReady ? ' ready-card' : ''}`}
                          key={reservation.id}
                        >
                          <div className={`book-cover ${COVERS[index % COVERS.length]}`}>
                            <i className="fa-solid fa-book-open" /> <span>{pad(index + 1)}</span>
                          </div>
                          <div className="reservation-info">
                            <span className="category">{book.category.toUpperCase()}</span>
                            <h3>{book.title}</h3>
                            <p>{book.author}</p>
                            <div className="reservation-meta">
                              <div>
                                <span>Requested</span>{' '}
                                <strong>{formatDate(reservation.placedOn)}</strong>
                              </div>
                              <div>
                                <span>Queue position</span>{' '}
                                <strong>{ordinal(reservation.position)}</strong>
                              </div>
                            </div>
                          </div>
                          <div className="reservation-status">
                            <span className={`status ${isReady ? 'ready' : 'waiting'}`}>
                              {isReady ? 'Ready for pickup' : 'Waiting'}
                            </span>
                            <p>{isReady ? 'Available now' : waitingNote(reservation.position)}</p>
                          </div>
                          <button
                            type="button"
                            className="action-link as-link"
                            onClick={() => cancelReservation(reservation.id)}
                          >
                            Cancel hold <i className="fa-solid fa-xmark" />
                          </button>
                        </article>
                      );
                    })}
                    {holds.length === 0 && (
                      <p className="empty-state">
                        <i className="fa-solid fa-bookmark" /> You have no active holds.
                        <Link to="/student/browse-books">Browse books</Link>
                      </p>
                    )}
                  </div>
                </section>
                {/* HOW IT WORKS */}
                <section className="how-panel">
                  <div className="how-copy">
                    <p className="eyebrow">HOW IT WORKS</p>
                    <h2>From hold to your hands.</h2>
                    <p>
                      When a requested book is returned, it moves to the next student in the queue.
                    </p>
                  </div>
                  <div className="steps">
                    <div className="step">
                      <div className="step-number">01</div>
                      <div>
                        <h3>Place a hold</h3>
                        <p>
                          Request a book from <Link to="/student/browse-books">Browse</Link>.
                        </p>
                      </div>
                    </div>
                    <div className="step-line" />
                    <div className="step">
                      <div className="step-number">02</div>
                      <div>
                        <h3>Wait your turn</h3>
                        <p>Your position is tracked automatically.</p>
                      </div>
                    </div>
                    <div className="step-line" />
                    <div className="step">
                      <div className="step-number">03</div>
                      <div>
                        <h3>Pick it up</h3>
                        <p>Once available, the book is ready for you.</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              {/* SIDEBAR */}
              <aside className="reservation-sidebar">
                <section className="side-card summary-card">
                  <p className="eyebrow">RESERVATION SUMMARY</p>
                  <h2>Your holds</h2>
                  <div className="summary-stat">
                    <span>Active requests</span> <strong>{pad(holds.length)}</strong>
                  </div>
                  <div className="summary-stat">
                    <span>Ready for pickup</span> <strong>{pad(ready.length)}</strong>
                  </div>
                  <div className="summary-stat">
                    <span>Currently waiting</span>{' '}
                    <strong>{pad(holds.length - ready.length)}</strong>
                  </div>
                </section>
                <section className="side-card pickup-card">
                  <div className="pickup-icon">
                    <i className="fa-solid fa-bookmark" />
                  </div>
                  <p className="eyebrow">READY FOR PICKUP</p>
                  {pickup ? (
                    <>
                      <h2>{pickup.book.title}</h2>
                      <p>Your reserved copy is available. Pick it up before the hold expires.</p>
                      <div className="pickup-deadline">
                        <span>Hold expires</span>{' '}
                        <strong>{formatDate(pickup.reservation.expiresOn)}</strong>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2>Nothing ready yet</h2>
                      <p>We'll show your book here as soon as a reserved copy is available.</p>
                    </>
                  )}
                  <Link to="/student/browse-books" className="light-button">
                    Find another book <i className="fa-solid fa-arrow-right" />
                  </Link>
                </section>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
