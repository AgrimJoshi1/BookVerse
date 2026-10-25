import { useState } from 'react';
import Field from '../../components/admin/Field';
import Notice from '../../components/admin/Notice';
import PageHeader from '../../components/admin/PageHeader';
import PasswordChecklist from '../../components/PasswordChecklist';
import { ApiError, formatDate, initials, useLibrary } from '../../context/LibraryContext';

const EMPTY_PASSWORDS = { current: '', next: '' };

export default function Profile() {
  const { admin, activity, updateAdmin, changePassword } = useLibrary();
  const [draft, setDraft] = useState(null);
  const [passwords, setPasswords] = useState(EMPTY_PASSWORDS);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [saved, setSaved] = useState(false);

  const editing = draft !== null;
  const mine = activity.filter((entry) => entry.actor === admin.name).slice(0, 6);

  function save(event) {
    event.preventDefault();
    const fields = { name: draft.name.trim(), email: draft.email.trim(), phone: draft.phone.trim() };
    if (!fields.name || !fields.email.includes('@') || !fields.phone) return;
    updateAdmin(fields);
    setDraft(null);
    setSaved(true);
  }

  async function updatePassword(event) {
    event.preventDefault();
    try {
      await changePassword(passwords.current, passwords.next);
      setPasswordMessage({ type: 'good', text: 'Password updated.' });
      setPasswords(EMPTY_PASSWORDS);
    } catch (error) {
      if (!(error instanceof ApiError)) throw error;
      setPasswordMessage({ type: 'bad', text: Object.values(error.fields)[0] ?? error.message });
    }
  }

  const edit = (key, label, type = 'text') => (
    <Field
      id={`admin-${key}`}
      label={label}
      type={type}
      value={draft[key]}
      onChange={(event) => setDraft({ ...draft, [key]: event.target.value })}
      error={!draft[key].trim() ? 'Required.' : undefined}
    />
  );

  return (
    <>
      <title>Profile | BookVerse Admin</title>
      <meta name="description" content="Your administrator account." />
      <main className="ad-main">
        <PageHeader
          title={admin.name}
          meta={
            <>
              Administrator · <span className="mono">{admin.id}</span>
            </>
          }
        >
          <span className="ad-initials" aria-hidden="true">
            {initials(admin.name)}
          </span>
        </PageHeader>

        {saved && (
          <Notice tone="good" onClose={() => setSaved(false)}>
            Profile saved.
          </Notice>
        )}

        <div className="ad-cols">
          <div>
            <section>
              <div className="ad-section-head">
                <h2>Your details</h2>
                {!editing && (
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => setDraft({ name: admin.name, email: admin.email, phone: admin.phone })}
                  >
                    Edit
                  </button>
                )}
              </div>

              {editing ? (
                <form className="ad-form" onSubmit={save} noValidate>
                  <div className="form-grid">
                    {edit('name', 'Full name')}
                    {edit('email', 'Email', 'email')}
                    {edit('phone', 'Phone', 'tel')}
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                    <button type="button" className="btn" onClick={() => setDraft(null)}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <dl className="dl">
                  <dt>Full name</dt>
                  <dd>{admin.name}</dd>
                  <dt>Admin ID</dt>
                  <dd className="mono">{admin.id}</dd>
                  <dt>Email</dt>
                  <dd>{admin.email}</dd>
                  <dt>Phone</dt>
                  <dd className="mono">{admin.phone}</dd>
                  <dt>Department</dt>
                  <dd>{admin.department}</dd>
                  <dt>Joined</dt>
                  <dd>{admin.joined}</dd>
                </dl>
              )}
            </section>

            <form className="ad-form ad-section" onSubmit={updatePassword} noValidate>
              <div className="ad-section-head">
                <h2>Password</h2>
              </div>
              <div className="form-grid">
                <Field
                  id="current-password"
                  label="Current password"
                  type="password"
                  value={passwords.current}
                  onChange={(event) => setPasswords({ ...passwords, current: event.target.value })}
                />
                <Field
                  id="new-password"
                  label="New password"
                  type="password"
                  value={passwords.next}
                  onChange={(event) => setPasswords({ ...passwords, next: event.target.value })}
                />
              </div>
              <PasswordChecklist value={passwords.next} />
              {passwordMessage && (
                <div className="pw-message">
                  <Notice tone={passwordMessage.type === 'bad' ? 'bad' : 'good'}>{passwordMessage.text}</Notice>
                </div>
              )}
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Update password
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setPasswords(EMPTY_PASSWORDS);
                    setPasswordMessage(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          <aside>
            <div className="ad-section-head">
              <h2>Your recent activity</h2>
            </div>
            {mine.length === 0 ? (
              <p className="muted">Nothing yet. Changes you make will be listed here.</p>
            ) : (
              <ul className="log">
                {mine.map((entry) => (
                  <li key={entry.id}>
                    <time dateTime={entry.on}>{formatDate(entry.on).slice(0, 6)}</time>
                    <div>{entry.text}</div>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </main>
    </>
  );
}
