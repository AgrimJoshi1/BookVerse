import { Link } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import css from '../../styles/teacher-profile.css?inline';

export default function Profile() {
  return (
    <>
      <title>Teacher Profile | BookVerse</title>
      <meta name="description" content="Teacher profile and account settings in BookVerse." />
      <PageStyles css={css} />
      <main>
        <section className="page-hero" style={{ paddingBottom: '62px' }}>
          <div className="container">
            <p className="eyebrow">TEACHER PROFILE</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <div className="large-avatar">PN</div>
              <div>
                <h1 style={{ marginBottom: '5px', fontSize: 'clamp(2rem,4vw,3.1rem)' }}>
                  Priya Nair
                </h1>
                <p style={{ color: '#95887e', fontSize: '0.72rem' }}>
                  Teacher · Computer Science Department
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
                <div className="form-grid" style={{ gap: '0 35px' }}>
                  <div style={{ padding: '16px 0', borderTop: '1px solid rgba(214,194,170,0.09)' }}>
                    <span
                      style={{
                        display: 'block',
                        marginBottom: '4px',
                        color: '#6f645d',
                        fontSize: '0.55rem',
                      }}
                    >
                      Full name
                    </span>{' '}
                    <strong style={{ color: '#cfc1b6', fontSize: '0.68rem', fontWeight: '500' }}>
                      Priya Nair
                    </strong>
                  </div>
                  <div style={{ padding: '16px 0', borderTop: '1px solid rgba(214,194,170,0.09)' }}>
                    <span
                      style={{
                        display: 'block',
                        marginBottom: '4px',
                        color: '#6f645d',
                        fontSize: '0.55rem',
                      }}
                    >
                      Teacher ID
                    </span>{' '}
                    <strong style={{ color: '#cfc1b6', fontSize: '0.68rem', fontWeight: '500' }}>
                      BV2026TCH014
                    </strong>
                  </div>
                  <div style={{ padding: '16px 0', borderTop: '1px solid rgba(214,194,170,0.09)' }}>
                    <span
                      style={{
                        display: 'block',
                        marginBottom: '4px',
                        color: '#6f645d',
                        fontSize: '0.55rem',
                      }}
                    >
                      Email address
                    </span>{' '}
                    <strong style={{ color: '#cfc1b6', fontSize: '0.68rem', fontWeight: '500' }}>
                      priya.nair@bookverse.edu
                    </strong>
                  </div>
                  <div style={{ padding: '16px 0', borderTop: '1px solid rgba(214,194,170,0.09)' }}>
                    <span
                      style={{
                        display: 'block',
                        marginBottom: '4px',
                        color: '#6f645d',
                        fontSize: '0.55rem',
                      }}
                    >
                      Department
                    </span>{' '}
                    <strong style={{ color: '#cfc1b6', fontSize: '0.68rem', fontWeight: '500' }}>
                      Computer Science
                    </strong>
                  </div>
                  <div style={{ padding: '16px 0', borderTop: '1px solid rgba(214,194,170,0.09)' }}>
                    <span
                      style={{
                        display: 'block',
                        marginBottom: '4px',
                        color: '#6f645d',
                        fontSize: '0.55rem',
                      }}
                    >
                      Class assigned
                    </span>{' '}
                    <strong style={{ color: '#cfc1b6', fontSize: '0.68rem', fontWeight: '500' }}>
                      Grade 10 - A &amp; B
                    </strong>
                  </div>
                  <div style={{ padding: '16px 0', borderTop: '1px solid rgba(214,194,170,0.09)' }}>
                    <span
                      style={{
                        display: 'block',
                        marginBottom: '4px',
                        color: '#6f645d',
                        fontSize: '0.55rem',
                      }}
                    >
                      Phone
                    </span>{' '}
                    <strong style={{ color: '#cfc1b6', fontSize: '0.68rem', fontWeight: '500' }}>
                      +91 98765 43210
                    </strong>
                  </div>
                  <div style={{ padding: '16px 0', borderTop: '1px solid rgba(214,194,170,0.09)' }}>
                    <span
                      style={{
                        display: 'block',
                        marginBottom: '4px',
                        color: '#6f645d',
                        fontSize: '0.55rem',
                      }}
                    >
                      Joined
                    </span>{' '}
                    <strong style={{ color: '#cfc1b6', fontSize: '0.68rem', fontWeight: '500' }}>
                      July 2021
                    </strong>
                  </div>
                </div>
              </section>
              <section className="page-block">
                <div className="block-heading">
                  <div>
                    <p className="eyebrow">LIBRARY ACTIVITY</p>
                    <h2>Your class snapshot</h2>
                  </div>
                </div>
                <div className="stats-grid" style={{ marginTop: '0' }}>
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fa-solid fa-user-graduate" />
                    </div>
                    <div>
                      <span>Students managed</span> <strong>48</strong>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fa-solid fa-right-to-bracket" />
                    </div>
                    <div>
                      <span>Books issued</span> <strong>312</strong>
                    </div>
                  </div>
                  <div className="stat-card stat-card-warning">
                    <div className="stat-icon">
                      <i className="fa-solid fa-clock" />
                    </div>
                    <div>
                      <span>Overdue books</span> <strong>05</strong>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fa-regular fa-calendar-check" />
                    </div>
                    <div>
                      <span>Returns processed</span> <strong>267</strong>
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
                  <i className="fa-solid fa-id-card" />
                </div>
                <p className="eyebrow">STAFF MEMBERSHIP</p>
                <h2>Active teacher</h2>
                <p
                  style={{
                    margin: '9px 0 18px',
                    color: '#81756d',
                    fontSize: '0.65rem',
                    lineHeight: '1.65',
                  }}
                >
                  Your BookVerse staff account is active and in good standing.
                </p>
                <div className="summary-line" style={{ borderTop: 'none' }}>
                  <span>Staff ID</span> <strong>BV2026TCH014</strong>
                </div>
                <div className="summary-line">
                  <span>Role</span> <strong>Teacher</strong>
                </div>
                <div className="summary-line">
                  <span>Department</span> <strong>Computer Science</strong>
                </div>
              </section>
              <section className="side-card quick-links-card">
                <p className="eyebrow">ACCOUNT</p>
                <Link to="/teacher/students" className="quick-link">
                  <span>
                    <i className="fa-solid fa-user-graduate" />
                  </span>
                  <div>
                    <strong>My students</strong> <small>View class roster</small>
                  </div>
                  <i className="fa-solid fa-arrow-right" />
                </Link>{' '}
                <Link to="/teacher/transactions" className="quick-link">
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
