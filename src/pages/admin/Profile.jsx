import { Link } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import css from '../../styles/admin-profile.css?inline';

export default function Profile() {
  return (
    <>
      <title>Admin Profile | BookVerse</title>
      <meta name="description" content="Administrator profile and account settings in BookVerse." />
      <PageStyles css={css} />
      <main>
        <section className="page-hero" style={{ paddingBottom: '62px' }}>
          <div className="container">
            <p className="eyebrow">ADMINISTRATOR PROFILE</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <div className="large-avatar">SV</div>
              <div>
                <h1 style={{ marginBottom: '5px', fontSize: 'clamp(2rem,4vw,3.1rem)' }}>
                  Sunita Verma
                </h1>
                <p style={{ color: '#95887e', fontSize: '0.72rem' }}>
                  Administrator · Library Administration
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="page-section" style={{ paddingTop: '28px' }}>
          <div className="container page-grid">
            <div className="page-main">
              <section className="page-block">
                <div className="block-heading">
                  <div>
                    <p className="eyebrow">PERSONAL INFORMATION</p>
                    <h2>Your details</h2>
                  </div>
                  <button className="edit-button" type="button">
                    <i className="fa-regular fa-pen-to-square" /> Edit profile
                  </button>
                </div>
                <div className="details-grid">
                  <div className="detail-item">
                    <span>Full name</span> <strong>Sunita Verma</strong>
                  </div>
                  <div className="detail-item">
                    <span>Admin ID</span> <strong>BV2026ADM002</strong>
                  </div>
                  <div className="detail-item">
                    <span>Email address</span> <strong>sunita.v@bookverse.edu</strong>
                  </div>
                  <div className="detail-item">
                    <span>Department</span> <strong>Library Administration</strong>
                  </div>
                  <div className="detail-item">
                    <span>Phone</span> <strong>+91 98110 22345</strong>
                  </div>
                  <div className="detail-item">
                    <span>Joined</span> <strong>April 2019</strong>
                  </div>
                </div>
              </section>
              <section className="page-block">
                <div className="block-heading">
                  <div>
                    <p className="eyebrow">LIBRARY ACTIVITY</p>
                    <h2>Your admin snapshot</h2>
                  </div>
                </div>
                <div className="stats-grid" style={{ marginTop: '0' }}>
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fa-solid fa-book-medical" />
                    </div>
                    <div>
                      <span>Books added</span> <strong>186</strong>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fa-solid fa-user-plus" />
                    </div>
                    <div>
                      <span>Members added</span> <strong>94</strong>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fa-solid fa-user-tie" />
                    </div>
                    <div>
                      <span>Staff onboarded</span> <strong>11</strong>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fa-solid fa-gear" />
                    </div>
                    <div>
                      <span>Settings updates</span> <strong>7</strong>
                    </div>
                  </div>
                </div>
              </section>
              <section className="page-block">
                <div className="block-heading">
                  <div>
                    <p className="eyebrow">SECURITY</p>
                    <h2>Password &amp; login</h2>
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="current-password">Current password</label>{' '}
                    <input
                      type="password"
                      id="current-password"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="new-password">New password</label>{' '}
                    <input type="password" id="new-password" placeholder="Enter new password" />
                  </div>
                </div>
                <div className="form-actions">
                  <button className="outline-button" type="button">
                    Cancel
                  </button>{' '}
                  <button className="light-button" type="button">
                    Update password <i className="fa-solid fa-check" />
                  </button>
                </div>
              </section>
            </div>
            <aside className="page-sidebar">
              <section className="side-card summary-card">
                <div className="stat-icon" style={{ marginBottom: '17px' }}>
                  <i className="fa-solid fa-shield-halved" />
                </div>
                <p className="eyebrow">ROLE &amp; PERMISSIONS</p>
                <h2>Full administrator</h2>
                <p
                  style={{
                    margin: '9px 0 18px',
                    color: '#81756d',
                    fontSize: '0.65rem',
                    lineHeight: '1.65',
                  }}
                >
                  Your account has full read &amp; write access across books, members, staff,
                  transactions, fines, and library settings.
                </p>
                <div className="summary-line" style={{ borderTop: 'none' }}>
                  <span>Admin ID</span> <strong>BV2026ADM002</strong>
                </div>
                <div className="summary-line">
                  <span>Role</span> <strong>Administrator</strong>
                </div>
                <div className="summary-line">
                  <span>Access level</span> <strong>Full access</strong>
                </div>
                <div className="summary-line">
                  <span>Status</span> <span className="badge badge-good">Active</span>
                </div>
              </section>
              <section className="side-card quick-links-card">
                <p className="eyebrow">ACCOUNT</p>
                <Link to="/admin/settings" className="quick-link">
                  <span>
                    <i className="fa-solid fa-gear" />
                  </span>
                  <div>
                    <strong>Library settings</strong> <small>Loan rules &amp; fine rates</small>
                  </div>
                  <i className="fa-solid fa-arrow-right" />
                </Link>{' '}
                <Link to="/admin/transactions" className="quick-link">
                  <span>
                    <i className="fa-solid fa-clock-rotate-left" />
                  </span>
                  <div>
                    <strong>Transaction history</strong> <small>Full issue &amp; return log</small>
                  </div>
                  <i className="fa-solid fa-arrow-right" />
                </Link>{' '}
                <Link to="/login" className="quick-link">
                  <span>
                    <i className="fa-solid fa-right-from-bracket" />
                  </span>
                  <div>
                    <strong>Sign out</strong> <small>End your session</small>
                  </div>
                  <i className="fa-solid fa-arrow-right" />
                </Link>
              </section>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
