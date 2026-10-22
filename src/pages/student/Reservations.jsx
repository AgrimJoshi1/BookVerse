import PageStyles from '../../components/PageStyles';
import css from '../../styles/reservations.css?inline';

export default function Reservations() {
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
                    <span className="request-count">02 active holds</span>
                  </div>
                  <div className="reservation-list">
                    {/* READY */}
                    <article className="reservation-card ready-card">
                      <div className="book-cover cover-one">
                        <i className="fa-solid fa-book-open" /> <span>01</span>
                      </div>
                      <div className="reservation-info">
                        <span className="category">COMPUTER SCIENCE</span>
                        <h3>Design Patterns</h3>
                        <p>Erich Gamma, Richard Helm &amp; others</p>
                        <div className="reservation-meta">
                          <div>
                            <span>Requested</span> <strong>18 Aug 2026</strong>
                          </div>
                          <div>
                            <span>Queue position</span> <strong>1st</strong>
                          </div>
                        </div>
                      </div>
                      <div className="reservation-status">
                        <span className="status ready">Ready for pickup</span>
                        <p>Available now</p>
                      </div>
                      <a href="#" className="action-link">
                        View details <i className="fa-solid fa-arrow-right" />
                      </a>
                    </article>
                    {/* WAITING */}
                    <article className="reservation-card">
                      <div className="book-cover cover-two">
                        <i className="fa-solid fa-book-open" /> <span>02</span>
                      </div>
                      <div className="reservation-info">
                        <span className="category">SELF DEVELOPMENT</span>
                        <h3>Deep Work</h3>
                        <p>Cal Newport</p>
                        <div className="reservation-meta">
                          <div>
                            <span>Requested</span> <strong>21 Aug 2026</strong>
                          </div>
                          <div>
                            <span>Queue position</span> <strong>3rd</strong>
                          </div>
                        </div>
                      </div>
                      <div className="reservation-status">
                        <span className="status waiting">Waiting</span>
                        <p>1 person ahead</p>
                      </div>
                      <a href="#" className="action-link">
                        View details <i className="fa-solid fa-arrow-right" />
                      </a>
                    </article>
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
                        <p>Request a book that isn't currently available.</p>
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
                    <span>Active requests</span> <strong>02</strong>
                  </div>
                  <div className="summary-stat">
                    <span>Ready for pickup</span> <strong>01</strong>
                  </div>
                  <div className="summary-stat">
                    <span>Currently waiting</span> <strong>01</strong>
                  </div>
                </section>
                <section className="side-card pickup-card">
                  <div className="pickup-icon">
                    <i className="fa-solid fa-bookmark" />
                  </div>
                  <p className="eyebrow">READY FOR PICKUP</p>
                  <h2>Design Patterns</h2>
                  <p>Your reserved copy is available. Pick it up before the hold expires.</p>
                  <div className="pickup-deadline">
                    <span>Hold expires</span> <strong>28 Aug 2026</strong>
                  </div>
                  <a href="#" className="light-button">
                    View pickup details <i className="fa-solid fa-arrow-right" />
                  </a>
                </section>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
