import PageStyles from '../../components/PageStyles';
import css from '../../styles/fines.css?inline';

export default function Fines() {
  return (
    <>
      <title>Fines | BookVerse</title>

      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="fines-hero">
          <div className="container">
            <p className="eyebrow">FINES &amp; PAYMENTS</p>
            <div className="hero-heading-row">
              <div>
                <h1>
                  Keep your account <span>clear and simple.</span>
                </h1>
                <p className="hero-description">
                  View overdue charges, payment status, and your complete fine history.
                </p>
              </div>
              <div className="balance-card">
                <span>CURRENT BALANCE</span> <strong>₹20</strong> <small>1 unpaid fine</small>
              </div>
            </div>
          </div>
        </section>
        {/* CONTENT */}
        <section className="fines-section">
          <div className="container">
            {/* SUMMARY */}
            <div className="summary-grid">
              <article className="summary-card">
                <div className="summary-icon">
                  <i className="fa-solid fa-indian-rupee-sign" />
                </div>
                <div>
                  <span>Total fines</span> <strong>₹20</strong>
                </div>
              </article>
              <article className="summary-card">
                <div className="summary-icon">
                  <i className="fa-regular fa-circle-check" />
                </div>
                <div>
                  <span>Paid</span> <strong>₹0</strong>
                </div>
              </article>
              <article className="summary-card warning-card">
                <div className="summary-icon">
                  <i className="fa-solid fa-clock" />
                </div>
                <div>
                  <span>Unpaid</span> <strong>₹20</strong>
                </div>
              </article>
              <article className="summary-card">
                <div className="summary-icon">
                  <i className="fa-solid fa-receipt" />
                </div>
                <div>
                  <span>Fine records</span> <strong>01</strong>
                </div>
              </article>
            </div>
            <div className="fines-layout">
              {/* MAIN PANEL */}
              <div className="fines-main">
                <section className="fines-panel">
                  <div className="panel-heading">
                    <div>
                      <p className="eyebrow">CURRENT FINES</p>
                      <h2>Outstanding charges</h2>
                    </div>
                    <span className="panel-count">1 unpaid fine</span>
                  </div>
                  <article className="fine-card">
                    <div className="fine-book">
                      <div className="book-cover">
                        <i className="fa-solid fa-book-open" /> <span>01</span>
                      </div>
                    </div>
                    <div className="fine-info">
                      <span className="category">COMPUTER SCIENCE</span>
                      <h3>Introduction to Algorithms</h3>
                      <p className="author">Thomas H. Cormen</p>
                      <div className="fine-details">
                        <div>
                          <span>Due date</span> <strong>23 Aug 2026</strong>
                        </div>
                        <div>
                          <span>Days overdue</span> <strong>2 days</strong>
                        </div>
                        <div>
                          <span>Fine rate</span> <strong>₹10 / day</strong>
                        </div>
                      </div>
                    </div>
                    <div className="fine-amount">
                      <span>AMOUNT DUE</span> <strong>₹20</strong> <small>Unpaid</small>
                    </div>
                  </article>
                  <div className="fine-notice">
                    <i className="fa-solid fa-circle-info" />
                    <p>
                      Return the overdue book as soon as possible. Additional charges may apply for
                      each extra overdue day.
                    </p>
                  </div>
                </section>
                {/* HISTORY */}
                <section className="history-panel">
                  <div className="panel-heading">
                    <div>
                      <p className="eyebrow">FINE HISTORY</p>
                      <h2>Previous charges</h2>
                    </div>
                    <span className="panel-count">All records</span>
                  </div>
                  <div className="history-table">
                    <div className="history-header">
                      <span>Book</span> <span>Reason</span> <span>Date</span> <span>Amount</span>{' '}
                      <span>Status</span>
                    </div>
                    <div className="history-row">
                      <div className="history-book">
                        <div className="mini-book">
                          <i className="fa-solid fa-book" />
                        </div>
                        <div>
                          <strong>Introduction to Algorithms</strong>{' '}
                          <small>Thomas H. Cormen</small>
                        </div>
                      </div>
                      <span>Overdue</span> <span>23 Aug 2026</span> <strong>₹20</strong>{' '}
                      <span className="history-status unpaid">Unpaid</span>
                    </div>
                    <div className="history-empty">
                      <i className="fa-regular fa-circle-check" />{' '}
                      <span>No other fine records.</span>
                    </div>
                  </div>
                </section>
              </div>
              {/* SIDEBAR */}
              <aside className="fines-sidebar">
                <section className="side-card payment-card">
                  <div className="payment-icon">
                    <i className="fa-solid fa-receipt" />
                  </div>
                  <p className="eyebrow">CURRENT BALANCE</p>
                  <h2>₹20</h2>
                  <p>You currently have one unpaid fine on your account.</p>
                  <div className="payment-line">
                    <span>Outstanding</span> <strong>₹20</strong>
                  </div>
                  <button className="payment-button" type="button">
                    Pay fine <i className="fa-solid fa-arrow-right" />
                  </button>{' '}
                  <small className="payment-note">
                    Payment UI only. No transaction is processed.
                  </small>
                </section>
                <section className="side-card policy-card">
                  <p className="eyebrow">FINE POLICY</p>
                  <h2>How fines work</h2>
                  <div className="policy-item">
                    <span>01</span>
                    <p>₹10 is charged for each overdue day.</p>
                  </div>
                  <div className="policy-item">
                    <span>02</span>
                    <p>Charges continue until the book is returned.</p>
                  </div>
                  <div className="policy-item">
                    <span>03</span>
                    <p>Returning books on time keeps your balance clear.</p>
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
