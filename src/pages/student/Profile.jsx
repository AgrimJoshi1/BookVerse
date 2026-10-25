import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import PasswordChecklist from '../../components/PasswordChecklist';
import {
  ApiError,
  formatDate,
  initials,
  memberLine,
  pad,
  rupees,
  useStudent,
  useStudentStats,
} from '../../context/LibraryContext';
import css from '../../styles/profile.css?inline';

const PREFERENCES = [
  {
    key: 'dueReminders',
    icon: 'fa-regular fa-bell',
    title: 'Due date reminders',
    text: 'Receive reminders before borrowed books are due.',
  },
  {
    key: 'reservationUpdates',
    icon: 'fa-solid fa-bookmark',
    title: 'Reservation updates',
    text: 'Get notified when a reserved book becomes available.',
  },
  {
    key: 'emailNotifications',
    icon: 'fa-solid fa-envelope',
    title: 'Email notifications',
    text: 'Receive important library account updates by email.',
  },
];

// Account actions that have no screen yet show a short note instead.
const ACCOUNT_NOTES = {
  help: 'For help, visit the library desk or email library@bookverse.edu.',
};

export default function Profile() {
  const { student, preferences, loans, history, updateProfile, togglePreference, changePassword } = useStudent();
  const stats = useStudentStats();
  const [draft, setDraft] = useState(null);
  const [note, setNote] = useState(null);
  const [passwords, setPasswords] = useState({ current: '', next: '' });
  const [passwordMessage, setPasswordMessage] = useState(null);

  async function updatePassword(event) {
    event.preventDefault();
    try {
      await changePassword(passwords.current, passwords.next);
      setPasswords({ current: '', next: '' });
      setPasswordMessage({ ok: true, text: 'Password updated.' });
    } catch (error) {
      if (!(error instanceof ApiError)) throw error;
      setPasswordMessage({ ok: false, text: Object.values(error.fields)[0] ?? error.message });
    }
  }

  const editing = draft !== null;

  function save(event) {
    event.preventDefault();
    const name = draft.name.trim();
    const email = draft.email.trim();
    if (!name || !email) return;
    updateProfile({ name, email });
    setDraft(null);
  }

  const field = (key) => (
    <input
      type={key === 'email' ? 'email' : 'text'}
      value={draft[key]}
      onChange={(event) => setDraft({ ...draft, [key]: event.target.value })}
      required
    />
  );

  return (
    <>
      <title>Profile | BookVerse</title>

      <PageStyles css={css} />
      <main>
        <section className="profile-hero">
          <div className="container">
            <p className="eyebrow">STUDENT PROFILE</p>
            <div className="profile-heading">
              <div className="large-avatar">{initials(student.name)}</div>
              <div>
                <h1>{student.name}</h1>
                <p>Student • {memberLine(student)}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="profile-section">
          <div className="container">
            <div className="profile-layout">
              <div className="profile-main">
                <form className="profile-card" onSubmit={save}>
                  <div className="card-heading">
                    <div>
                      <p className="eyebrow">PERSONAL INFORMATION</p>
                      <h2>Your details</h2>
                    </div>
                    {editing ? (
                      <div className="edit-actions">
                        <button className="edit-button" type="button" onClick={() => setDraft(null)}>
                          Cancel
                        </button>
                        <button className="edit-button" type="submit">
                          <i className="fa-solid fa-check" /> Save
                        </button>
                      </div>
                    ) : (
                      <button
                        className="edit-button"
                        type="button"
                        onClick={() => setDraft({ name: student.name, email: student.email })}
                      >
                        <i className="fa-regular fa-pen-to-square" /> Edit profile
                      </button>
                    )}
                  </div>
                  <div className="details-grid">
                    <label className="detail-item">
                      <span>Full name</span> {editing ? field('name') : <strong>{student.name}</strong>}
                    </label>
                    <div className="detail-item">
                      <span>Student ID</span> <strong>{student.id}</strong>
                    </div>
                    <label className="detail-item">
                      <span>Email address</span>{' '}
                      {editing ? field('email') : <strong>{student.email}</strong>}
                    </label>
                    <div className="detail-item">
                      <span>Department</span> <strong>{memberLine(student)}</strong>
                    </div>
                    <div className="detail-item">
                      <span>Phone</span> <strong>{student.phone}</strong>
                    </div>
                    <div className="detail-item">
                      <span>Member since</span> <strong>{formatDate(student.joinedOn)}</strong>
                    </div>
                  </div>
                </form>
                <section className="profile-card activity-card">
                  <div className="card-heading">
                    <div>
                      <p className="eyebrow">LIBRARY ACTIVITY</p>
                      <h2>Your reading snapshot</h2>
                    </div>
                  </div>
                  <div className="activity-grid">
                    <Link to="/student/my-books" className="activity-stat">
                      <i className="fa-solid fa-book-open" /> <span>Books borrowed</span>{' '}
                      <strong>{pad(loans.length + history.length)}</strong> <small>Total loans</small>
                    </Link>
                    <Link to="/student/reservations" className="activity-stat">
                      <i className="fa-solid fa-bookmark" /> <span>Reservations</span>{' '}
                      <strong>{pad(stats.reservations)}</strong> <small>Active holds</small>
                    </Link>
                    <Link to="/student/my-books" className="activity-stat">
                      <i className="fa-solid fa-clock" /> <span>Currently due</span>{' '}
                      <strong>{pad(stats.borrowed)}</strong> <small>Active books</small>
                    </Link>
                    <Link to="/student/fines" className="activity-stat">
                      <i className="fa-solid fa-indian-rupee-sign" /> <span>Current fines</span>{' '}
                      <strong>{rupees(stats.finesDue)}</strong> <small>Outstanding</small>
                    </Link>
                  </div>
                </section>
                <section className="profile-card preferences-card">
                  <div className="card-heading">
                    <div>
                      <p className="eyebrow">ACCOUNT PREFERENCES</p>
                      <h2>Library settings</h2>
                    </div>
                  </div>
                  {PREFERENCES.map(({ key, icon, title, text }) => (
                    <div className="preference-row" key={key}>
                      <div className="preference-icon">
                        <i className={icon} />
                      </div>
                      <div>
                        <h3>{title}</h3>
                        <p>{text}</p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={preferences[key]}
                        aria-label={title}
                        className={`toggle as-link${preferences[key] ? ' on' : ''}`}
                        onClick={() => togglePreference(key)}
                      >
                        <span />
                      </button>
                    </div>
                  ))}
                </section>
              </div>
              <aside className="profile-sidebar">
                <section className="side-card membership-card">
                  <div className="membership-icon">
                    <i className="fa-solid fa-id-card" />
                  </div>
                  <p className="eyebrow">LIBRARY MEMBERSHIP</p>
                  <h2>{stats.finesDue ? 'Fines outstanding' : 'Active member'}</h2>
                  <p>
                    {stats.finesDue
                      ? `Your membership is active. Clear your ${rupees(stats.finesDue)} balance to stay in good standing.`
                      : 'Your BookVerse library membership is active and in good standing.'}
                  </p>
                  <div className="membership-line">
                    <span>Member ID</span> <strong>{student.id}</strong>
                  </div>
                  <div className="membership-line">
                    <span>Membership type</span> <strong>Student</strong>
                  </div>
                  <div className="membership-line">
                    <span>Status</span> <strong>Active</strong>
                  </div>
                </section>
                <section className="side-card account-card">
                  <p className="eyebrow">ACCOUNT</p>
                  <button
                    type="button"
                    className="account-link as-link"
                    onClick={() => setNote(note === 'password' ? null : 'password')}
                  >
                    <span>
                      <i className="fa-solid fa-lock" /> Change password
                    </span>{' '}
                    <i className="fa-solid fa-arrow-right" />
                  </button>
                  {note === 'password' && (
                    <form className="account-note" onSubmit={updatePassword}>
                      <input
                        type="password"
                        id="current-password"
                        placeholder="Current password"
                        value={passwords.current}
                        onChange={(event) => setPasswords({ ...passwords, current: event.target.value })}
                      />
                      <input
                        type="password"
                        id="new-password"
                        placeholder="New password"
                        value={passwords.next}
                        onChange={(event) => setPasswords({ ...passwords, next: event.target.value })}
                      />
                      <PasswordChecklist value={passwords.next} />
                      {passwordMessage && (
                        <span role="status" className={passwordMessage.ok ? 'password-ok' : 'password-bad'}>
                          {passwordMessage.text}
                        </span>
                      )}
                      <button type="submit" className="light-button">
                        Update password
                      </button>
                    </form>
                  )}
                  <button
                    type="button"
                    className="account-link as-link"
                    onClick={() => setNote(note === 'help' ? null : 'help')}
                  >
                    <span>
                      <i className="fa-solid fa-circle-question" /> Help &amp; support
                    </span>{' '}
                    <i className="fa-solid fa-arrow-right" />
                  </button>
                  {note === 'help' && <p className="account-note">{ACCOUNT_NOTES.help}</p>}
                  <Link to="/login" className="account-link danger-link">
                    <span>
                      <i className="fa-solid fa-right-from-bracket" /> Sign out
                    </span>{' '}
                    <i className="fa-solid fa-arrow-right" />
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
