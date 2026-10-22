import PageStyles from '../../components/PageStyles';
import css from '../../styles/admin-settings.css?inline';

export default function Settings() {
  return (
    <>
      <title>Library Settings | BookVerse Admin</title>
      <meta name="description" content="BookVerse library settings." />
      <PageStyles css={css} />
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">LIBRARY SETTINGS</p>
            <h1>
              Configure how <span>BookVerse runs.</span>
            </h1>
            <p className="hero-description">
              Loan rules, fine rates, and library contact information used across the whole system.
            </p>
          </div>
        </section>
        {/* CONTENT */}
        <section className="page-section">
          <div className="container page-grid">
            <div className="page-main">
              <section className="page-block">
                <div className="block-heading">
                  <div>
                    <p className="eyebrow">LOAN POLICY</p>
                    <h2>Borrowing rules</h2>
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="loan-duration">Standard loan duration (days)</label>{' '}
                    <input type="number" id="loan-duration" defaultValue="14" min="1" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="max-books">Max books per member</label>{' '}
                    <input type="number" id="max-books" defaultValue="3" min="1" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fine-rate">Fine rate (₹ per day overdue)</label>{' '}
                    <input type="number" id="fine-rate" defaultValue="10" min="0" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="grace-period">Grace period (days)</label>{' '}
                    <input type="number" id="grace-period" defaultValue="0" min="0" />{' '}
                    <span className="field-hint">
                      Days after the due date before fines start accruing.
                    </span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="max-renewals">Max renewals per loan</label>{' '}
                    <input type="number" id="max-renewals" defaultValue="1" min="0" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reservation-hold">Reservation hold period (days)</label>{' '}
                    <input type="number" id="reservation-hold" defaultValue="3" min="1" />
                  </div>
                </div>
              </section>
              <section className="page-block">
                <div className="block-heading">
                  <div>
                    <p className="eyebrow">LIBRARY INFORMATION</p>
                    <h2>Contact &amp; identity</h2>
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group full">
                    <label htmlFor="library-name">Library name</label>{' '}
                    <input type="text" id="library-name" defaultValue="BookVerse Central Library" />
                  </div>
                  <div className="form-group full">
                    <label htmlFor="library-address">Address</label>{' '}
                    <input
                      type="text"
                      id="library-address"
                      defaultValue="Block C, BookVerse Academy Campus, Mohali, Punjab"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="library-email">Contact email</label>{' '}
                    <input type="email" id="library-email" defaultValue="library@bookverse.edu" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="library-phone">Contact phone</label>{' '}
                    <input type="text" id="library-phone" defaultValue="+91 172 456 7890" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="library-hours">Operating hours</label>{' '}
                    <input
                      type="text"
                      id="library-hours"
                      defaultValue="Mon–Sat, 8:00 AM – 6:00 PM"
                    />
                  </div>
                </div>
                <div className="notice notice-success">
                  <i className="fa-regular fa-circle-check" />
                  <p>All settings are valid. Save to apply these changes library-wide.</p>
                </div>
                <div className="form-actions">
                  <button className="outline-button" type="button">
                    Cancel
                  </button>{' '}
                  <button className="light-button" type="button">
                    Save settings <i className="fa-solid fa-check" />
                  </button>
                </div>
              </section>
            </div>
            {/* SIDEBAR */}
            <aside className="page-sidebar">
              <section className="side-card summary-card">
                <p className="eyebrow">CURRENT POLICY</p>
                <h2 style={{ fontSize: '1.05rem' }}>At a glance</h2>
                <div className="summary-line" style={{ borderTop: 'none' }}>
                  <span>Loan duration</span> <strong>14 days</strong>
                </div>
                <div className="summary-line">
                  <span>Fine rate</span> <strong>₹10 / day</strong>
                </div>
                <div className="summary-line">
                  <span>Grace period</span> <strong>0 days</strong>
                </div>
                <div className="summary-line">
                  <span>Max books/member</span> <strong>3</strong>
                </div>
              </section>
              <section className="side-card">
                <p className="eyebrow">HEADS UP</p>
                <h2 style={{ fontSize: '1.05rem' }}>Changing loan rules</h2>
                <div className="notice notice-warning" style={{ marginTop: '0' }}>
                  <i className="fa-solid fa-triangle-exclamation" />
                  <p>
                    Updating the fine rate or loan duration only applies to new loans issued after
                    saving — active loans keep their original terms.
                  </p>
                </div>
              </section>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
