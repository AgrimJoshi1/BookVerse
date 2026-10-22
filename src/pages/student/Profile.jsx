import PageStyles from '../../components/PageStyles';
import css from '../../styles/profile.css?inline';

export default function Profile() {
  return (
    <>
      <title>Profile | BookVerse</title>

      <PageStyles css={css} />
      <main>
        <section className="profile-hero">
          <div className="container">
            <p className="eyebrow">STUDENT PROFILE</p>
            <div className="profile-heading">
              <div className="large-avatar">AS</div>
              <div>
                <h1>Alex Sharma</h1>
                <p>Student • Computer Science</p>
              </div>
            </div>
          </div>
        </section>
        <section className="profile-section">
          <div className="container">
            <div className="profile-layout">
              <div className="profile-main">
                <section className="profile-card">
                  <div className="card-heading">
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
                      <span>Full name</span> <strong>Alex Sharma</strong>
                    </div>
                    <div className="detail-item">
                      <span>Student ID</span> <strong>BV2026CS041</strong>
                    </div>
                    <div className="detail-item">
                      <span>Email address</span> <strong>alex.sharma@student.edu</strong>
                    </div>
                    <div className="detail-item">
                      <span>Department</span> <strong>Computer Science</strong>
                    </div>
                    <div className="detail-item">
                      <span>Year</span> <strong>3rd Year</strong>
                    </div>
                    <div className="detail-item">
                      <span>Member since</span> <strong>August 2024</strong>
                    </div>
                  </div>
                </section>
                <section className="profile-card activity-card">
                  <div className="card-heading">
                    <div>
                      <p className="eyebrow">LIBRARY ACTIVITY</p>
                      <h2>Your reading snapshot</h2>
                    </div>
                  </div>
                  <div className="activity-grid">
                    <div className="activity-stat">
                      <i className="fa-solid fa-book-open" /> <span>Books borrowed</span>{' '}
                      <strong>15</strong> <small>Total loans</small>
                    </div>
                    <div className="activity-stat">
                      <i className="fa-solid fa-bookmark" /> <span>Reservations</span>{' '}
                      <strong>02</strong> <small>Active holds</small>
                    </div>
                    <div className="activity-stat">
                      <i className="fa-solid fa-clock" /> <span>Currently due</span>{' '}
                      <strong>03</strong> <small>Active books</small>
                    </div>
                    <div className="activity-stat">
                      <i className="fa-solid fa-indian-rupee-sign" /> <span>Current fines</span>{' '}
                      <strong>₹20</strong> <small>Outstanding</small>
                    </div>
                  </div>
                </section>
                <section className="profile-card preferences-card">
                  <div className="card-heading">
                    <div>
                      <p className="eyebrow">ACCOUNT PREFERENCES</p>
                      <h2>Library settings</h2>
                    </div>
                  </div>
                  <div className="preference-row">
                    <div className="preference-icon">
                      <i className="fa-regular fa-bell" />
                    </div>
                    <div>
                      <h3>Due date reminders</h3>
                      <p>Receive reminders before borrowed books are due.</p>
                    </div>
                    <span className="toggle on">
                      <span />
                    </span>
                  </div>
                  <div className="preference-row">
                    <div className="preference-icon">
                      <i className="fa-solid fa-bookmark" />
                    </div>
                    <div>
                      <h3>Reservation updates</h3>
                      <p>Get notified when a reserved book becomes available.</p>
                    </div>
                    <span className="toggle on">
                      <span />
                    </span>
                  </div>
                  <div className="preference-row">
                    <div className="preference-icon">
                      <i className="fa-solid fa-envelope" />
                    </div>
                    <div>
                      <h3>Email notifications</h3>
                      <p>Receive important library account updates by email.</p>
                    </div>
                    <span className="toggle">
                      <span />
                    </span>
                  </div>
                </section>
              </div>
              <aside className="profile-sidebar">
                <section className="side-card membership-card">
                  <div className="membership-icon">
                    <i className="fa-solid fa-id-card" />
                  </div>
                  <p className="eyebrow">LIBRARY MEMBERSHIP</p>
                  <h2>Active member</h2>
                  <p>Your BookVerse library membership is active and in good standing.</p>
                  <div className="membership-line">
                    <span>Member ID</span> <strong>BV2026CS041</strong>
                  </div>
                  <div className="membership-line">
                    <span>Membership type</span> <strong>Student</strong>
                  </div>
                  <div className="membership-line">
                    <span>Valid until</span> <strong>31 Jul 2027</strong>
                  </div>
                </section>
                <section className="side-card account-card">
                  <p className="eyebrow">ACCOUNT</p>
                  <a href="#" className="account-link">
                    <span>
                      <i className="fa-solid fa-lock" /> Change password
                    </span>{' '}
                    <i className="fa-solid fa-arrow-right" />
                  </a>{' '}
                  <a href="#" className="account-link">
                    <span>
                      <i className="fa-solid fa-circle-question" /> Help &amp; support
                    </span>{' '}
                    <i className="fa-solid fa-arrow-right" />
                  </a>{' '}
                  <a href="#" className="account-link danger-link">
                    <span>
                      <i className="fa-solid fa-right-from-bracket" /> Sign out
                    </span>{' '}
                    <i className="fa-solid fa-arrow-right" />
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
