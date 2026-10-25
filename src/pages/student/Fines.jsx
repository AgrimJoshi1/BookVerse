import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import { formatDate, pad, plural, rupees, useStudent, studentSummary } from '../../context/LibraryContext';
import css from '../../styles/fines.css?inline';

const sum = (fines) => fines.reduce((total, fine) => total + fine.amount, 0);

export default function Fines() {
  const { fines, getBook, payAllFines, settings, state, student } = useStudent();
  const [justPaid, setJustPaid] = useState(false);

  const unpaid = fines.filter((fine) => fine.status === 'due');
  const balance = sum(unpaid);
  const accruing = studentSummary(state, student.id).accruing;
  const paidTotal = sum(fines.filter((fine) => fine.status === 'paid'));
  const unpaidLabel = plural(unpaid.length, 'unpaid fine');

  async function pay() {
    await payAllFines();
    setJustPaid(true);
  }

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
                <span>CURRENT BALANCE</span> <strong>{rupees(balance)}</strong>{' '}
                {accruing > 0 && (
                  <small className="accruing-note">
                    + {rupees(accruing)} still adding up on overdue books. It is charged when you return them.
                  </small>
                )}
                <small>{unpaidLabel}</small>
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
                  <span>Total fines</span> <strong>{rupees(sum(fines))}</strong>
                </div>
              </article>
              <article className="summary-card">
                <div className="summary-icon">
                  <i className="fa-regular fa-circle-check" />
                </div>
                <div>
                  <span>Paid</span> <strong>{rupees(paidTotal)}</strong>
                </div>
              </article>
              <article className={`summary-card${balance ? ' warning-card' : ''}`}>
                <div className="summary-icon">
                  <i className="fa-solid fa-clock" />
                </div>
                <div>
                  <span>Unpaid</span> <strong>{rupees(balance)}</strong>
                </div>
              </article>
              <article className="summary-card">
                <div className="summary-icon">
                  <i className="fa-solid fa-receipt" />
                </div>
                <div>
                  <span>Fine records</span> <strong>{pad(fines.length)}</strong>
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
                    <span className="panel-count">{unpaidLabel}</span>
                  </div>
                  {unpaid.map((fine, index) => {
                    const book = getBook(fine.bookId);
                    return (
                      <article className="fine-card" key={fine.id}>
                        <div className="fine-book">
                          <div className="book-cover">
                            <i className="fa-solid fa-book-open" /> <span>{pad(index + 1)}</span>
                          </div>
                        </div>
                        <div className="fine-info">
                          <span className="category">{book.category.toUpperCase()}</span>
                          <h3>{book.title}</h3>
                          <p className="author">{book.author}</p>
                          <div className="fine-details">
                            <div>
                              <span>Due date</span> <strong>{formatDate(fine.dueOn)}</strong>
                            </div>
                            <div>
                              <span>Days overdue</span> <strong>{plural(fine.days, 'day')}</strong>
                            </div>
                            <div>
                              <span>Fine rate</span> <strong>{rupees(settings.fineRate)} / day</strong>
                            </div>
                          </div>
                        </div>
                        <div className="fine-amount">
                          <span>AMOUNT DUE</span> <strong>{rupees(fine.amount)}</strong>{' '}
                          <small>Unpaid</small>
                        </div>
                      </article>
                    );
                  })}
                  {unpaid.length > 0 ? (
                    <div className="fine-notice">
                      <i className="fa-solid fa-circle-info" />
                      <p>
                        Return the overdue book as soon as possible. Additional charges may apply for
                        each extra overdue day. <Link to="/student/my-books">See your loans</Link>
                      </p>
                    </div>
                  ) : (
                    <p className="empty-state">
                      <i className="fa-regular fa-circle-check" /> No outstanding fines. Your account
                      is clear.
                    </p>
                  )}
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
                    {fines.map((fine) => {
                      const book = getBook(fine.bookId);
                      const paid = fine.status === 'paid';
                      const waived = fine.status === 'waived';
                      return (
                        <div className="history-row" key={fine.id}>
                          <div className="history-book">
                            <div className="mini-book">
                              <i className="fa-solid fa-book" />
                            </div>
                            <div>
                              <strong>{book.title}</strong> <small>{book.author}</small>
                            </div>
                          </div>
                          <span>{fine.reason}</span>{' '}
                          <span>{formatDate(paid ? fine.paidOn : waived ? fine.waivedOn : fine.dueOn)}</span>{' '}
                          <strong>{rupees(fine.amount)}</strong>{' '}
                          <span className={`history-status ${paid || waived ? 'paid' : 'unpaid'}`}>
                            {paid ? 'Paid' : waived ? 'Waived' : 'Unpaid'}
                          </span>
                        </div>
                      );
                    })}
                    <div className="history-empty">
                      <i className="fa-regular fa-circle-check" />{' '}
                      <span>{fines.length ? 'No other fine records.' : 'No fine records yet.'}</span>
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
                  <h2>{rupees(balance)}</h2>
                  <p>
                    {balance
                      ? `You currently have ${unpaidLabel} on your account.`
                      : 'You have no unpaid fines. Thanks for keeping your account clear.'}
                  </p>
                  <div className="payment-line">
                    <span>Outstanding</span> <strong>{rupees(balance)}</strong>
                  </div>
                  <button
                    className="payment-button"
                    type="button"
                    disabled={!balance}
                    onClick={pay}
                  >
                    {balance ? (
                      <>
                        Pay {rupees(balance)} <i className="fa-solid fa-arrow-right" />
                      </>
                    ) : (
                      <>
                        Nothing to pay <i className="fa-solid fa-check" />
                      </>
                    )}
                  </button>{' '}
                  <small className="payment-note">
                    {justPaid && !balance
                      ? 'Payment recorded. This is a demo, no money was charged.'
                      : 'Payment UI only. No transaction is processed.'}
                  </small>
                </section>
                <section className="side-card policy-card">
                  <p className="eyebrow">FINE POLICY</p>
                  <h2>How fines work</h2>
                  <div className="policy-item">
                    <span>01</span>
                    <p>
                      {rupees(settings.fineRate)} is charged for each overdue day
                      {settings.graceDays > 0 && ` after a ${plural(settings.graceDays, 'day')} grace period`}.
                    </p>
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
