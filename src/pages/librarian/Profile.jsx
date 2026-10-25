import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import PasswordChecklist from '../../components/PasswordChecklist';
import { ApiError, daysUntil, initials, pad, useLibrarian } from '../../context/LibraryContext';
import css from '../../styles/librarian-profile.css?inline';

const EMPTY_PASSWORDS = { current: '', next: '' };

export default function Profile() {
  const { state, librarian, students, updateLibrarian, changePassword } = useLibrarian();
  const [draft, setDraft] = useState(null);
  const [passwords, setPasswords] = useState(EMPTY_PASSWORDS);
  const [passwordMessage, setPasswordMessage] = useState(null);

  const editing = draft !== null;
  const overdue = state.loans.filter((loan) => daysUntil(loan.dueOn) < 0).length;

  function save(event) {
    event.preventDefault();
    const fields = {
      name: draft.name.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim(),
    };
    if (!fields.name || !fields.email || !fields.phone) return;
    updateLibrarian(fields);
    setDraft(null);
  }

  async function updatePassword(event) {
    event.preventDefault();
    try {
      await changePassword(passwords.current, passwords.next);
      setPasswordMessage({ type: 'success', text: 'Password updated.' });
      setPasswords(EMPTY_PASSWORDS);
    } catch (error) {
      if (!(error instanceof ApiError)) throw error;
      setPasswordMessage({ type: 'error', text: Object.values(error.fields)[0] ?? error.message });
    }
  }

  function cancelPassword() {
    setPasswords(EMPTY_PASSWORDS);
    setPasswordMessage(null);
  }

  const field = (key, type = 'text') => (
    <input
      type={type}
      value={draft[key]}
      onChange={(event) => setDraft({ ...draft, [key]: event.target.value })}
      required
    />
  );

  return (
    <>
      <title>Librarian Profile | BookVerse</title>
      <meta name="description" content="Librarian profile and account settings in BookVerse." />
      <PageStyles css={css} />
      <main>
        <section className="page-hero compact">
          <div className="container">
            <p className="eyebrow">LIBRARIAN PROFILE</p>
            <div className="profile-heading">
              <div className="large-avatar">{initials(librarian.name)}</div>
              <div>
                <h1>{librarian.name}</h1>
                <p>Librarian · {librarian.department}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="page-section tight">
          <div className="container page-grid">
            <div className="page-main">
              <form className="page-block" onSubmit={save}>
                <div className="block-heading">
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
                      onClick={() =>
                        setDraft({ name: librarian.name, email: librarian.email, phone: librarian.phone })
                      }
                    >
                      <i className="fa-regular fa-pen-to-square" /> Edit profile
                    </button>
                  )}
                </div>
                <div className="detail-grid">
                  <label className="detail-item">
                    <span>Full name</span> {editing ? field('name') : <strong>{librarian.name}</strong>}
                  </label>
                  <div className="detail-item">
                    <span>Librarian ID</span> <strong>{librarian.id}</strong>
                  </div>
                  <label className="detail-item">
                    <span>Email address</span>{' '}
                    {editing ? field('email', 'email') : <strong>{librarian.email}</strong>}
                  </label>
                  <div className="detail-item">
                    <span>Department</span> <strong>{librarian.department}</strong>
                  </div>
                  <label className="detail-item">
                    <span>Phone</span> {editing ? field('phone', 'tel') : <strong>{librarian.phone}</strong>}
                  </label>
                  <div className="detail-item">
                    <span>Joined</span> <strong>{librarian.joined}</strong>
                  </div>
                </div>
              </form>
              <section className="page-block">
                <div className="block-heading">
                  <div>
                    <p className="eyebrow">LIBRARY ACTIVITY</p>
                    <h2>Desk snapshot</h2>
                  </div>
                </div>
                <div className="stats-grid flush">
                  <Link to="/librarian/students" className="stat-card">
                    <div className="stat-icon">
                      <i className="fa-solid fa-user-graduate" />
                    </div>
                    <div>
                      <span>Members served</span> <strong>{pad(students.length)}</strong>
                    </div>
                  </Link>
                  <Link to="/librarian/transactions" className="stat-card">
                    <div className="stat-icon">
                      <i className="fa-solid fa-right-to-bracket" />
                    </div>
                    <div>
                      <span>Books issued</span>{' '}
                      <strong>{pad(state.loans.length + state.history.length)}</strong>
                    </div>
                  </Link>
                  <Link
                    to="/librarian/transactions?status=overdue"
                    className={`stat-card${overdue ? ' stat-card-warning' : ''}`}
                  >
                    <div className="stat-icon">
                      <i className="fa-solid fa-clock" />
                    </div>
                    <div>
                      <span>Overdue books</span> <strong>{pad(overdue)}</strong>
                    </div>
                  </Link>
                  <Link to="/librarian/transactions?status=returned" className="stat-card">
                    <div className="stat-icon">
                      <i className="fa-regular fa-calendar-check" />
                    </div>
                    <div>
                      <span>Returns processed</span> <strong>{pad(state.history.length)}</strong>
                    </div>
                  </Link>
                </div>
              </section>
              <form className="page-block" onSubmit={updatePassword}>
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
                      value={passwords.current}
                      onChange={(event) => setPasswords({ ...passwords, current: event.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="new-password">New password</label>{' '}
                    <input
                      type="password"
                      id="new-password"
                      placeholder="Enter new password"
                      value={passwords.next}
                      onChange={(event) => setPasswords({ ...passwords, next: event.target.value })}
                    />
                    <PasswordChecklist value={passwords.next} />
                  </div>
                </div>
                {passwordMessage?.type === 'error' && (
                  <p className="form-error" role="alert">
                    {passwordMessage.text}
                  </p>
                )}
                {passwordMessage?.type === 'success' && (
                  <div className="notice notice-success" role="status">
                    <i className="fa-regular fa-circle-check" />
                    <p>{passwordMessage.text}</p>
                  </div>
                )}
                <div className="form-actions">
                  <button className="outline-button" type="button" onClick={cancelPassword}>
                    Cancel
                  </button>{' '}
                  <button className="light-button" type="submit">
                    Update password <i className="fa-solid fa-check" />
                  </button>
                </div>
              </form>
            </div>
            <aside className="page-sidebar">
              <section className="side-card summary-card">
                <div className="stat-icon icon-spaced">
                  <i className="fa-solid fa-id-card" />
                </div>
                <p className="eyebrow">STAFF MEMBERSHIP</p>
                <h2>Active librarian</h2>
                <p className="side-note">
                  Your BookVerse staff account is active and in good standing.
                </p>
                <div className="summary-line first">
                  <span>Staff ID</span> <strong>{librarian.id}</strong>
                </div>
                <div className="summary-line">
                  <span>Role</span> <strong>Librarian</strong>
                </div>
                <div className="summary-line">
                  <span>Department</span> <strong>{librarian.department}</strong>
                </div>
              </section>
              <section className="side-card quick-links-card">
                <p className="eyebrow">ACCOUNT</p>
                <Link to="/librarian/students" className="quick-link">
                  <span>
                    <i className="fa-solid fa-user-graduate" />
                  </span>
                  <div>
                    <strong>Members</strong> <small>View all members</small>
                  </div>
                  <i className="fa-solid fa-arrow-right" />
                </Link>{' '}
                <Link to="/librarian/transactions" className="quick-link">
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
