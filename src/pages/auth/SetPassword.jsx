import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import PasswordChecklist from '../../components/PasswordChecklist';
import { ApiError, useLibrary } from '../../context/LibraryContext';
import css from '../../styles/login.css?inline';

const HOME = {
  student: '/student/dashboard',
  librarian: '/librarian/dashboard',
  admin: '/admin/dashboard',
};

// Where an account lands after an admin gave it a temporary password: it has to
// choose its own before it can use anything else.
export default function SetPassword() {
  const navigate = useNavigate();
  const { ready, session, me, setNewPassword } = useLibrary();
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (!ready) return null;
  if (!session || !me) return <Navigate to="/login" replace />;
  if (!me.mustChangePassword) return <Navigate to={HOME[session.role]} replace />;

  async function submit(event) {
    event.preventDefault();
    if (next !== confirm) {
      setError('The two passwords do not match.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      await setNewPassword(next);
      navigate(HOME[session.role], { replace: true });
    } catch (err) {
      if (!(err instanceof ApiError)) throw err;
      setError(err.fields.next ?? err.message);
      setBusy(false);
    }
  }

  return (
    <>
      <title>Set a new password | BookVerse</title>

      <PageStyles css={css} />
      <video className="background-video" autoPlay muted loop playsInline>
        <source src="/assets/vid.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay" />
      <main className="login-page">
        <section className="login-card">
          <div className="form-heading">
            <p className="small-title">
              <i className="fa-solid fa-key" /> ONE MORE STEP
            </p>
            <h1>Set a new password.</h1>
            <p>
              Hi {me.name.split(' ')[0]}, you signed in with a temporary password from the library
              admin. Choose your own to continue.
            </p>
          </div>
          <form id="setPasswordForm" onSubmit={submit}>
            <label>
              <span className="field-label">NEW PASSWORD</span>
              <div className="input-box">
                <i className="fa-solid fa-lock" />{' '}
                <input
                  type="password"
                  id="newPassword"
                  placeholder="Create a strong password"
                  required
                  value={next}
                  onChange={(e) => setNext(e.target.value)}
                />
              </div>
            </label>
            <PasswordChecklist value={next} />
            <label>
              <span className="field-label">CONFIRM PASSWORD</span>
              <div className="input-box">
                <i className="fa-solid fa-lock" />{' '}
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Repeat the new password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
            </label>
            {error && (
              <p className="auth-error" role="alert" style={{ marginTop: 12 }}>
                {error}
              </p>
            )}
            <button type="submit" className="login-button" disabled={busy} style={{ marginTop: 14 }}>
              <span>{busy ? 'Saving…' : 'Save password & continue'}</span>{' '}
              <i className="fa-solid fa-arrow-right" />
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
