import { useCallback, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Captcha from '../../components/Captcha';
import PageStyles from '../../components/PageStyles';
import { ApiError, useLibrary } from '../../context/LibraryContext';
import css from '../../styles/login.css?inline';

const ROLES = [
  { id: 'student', name: 'Student', icon: 'fa-user-graduate', note: 'Borrow & read' },
  { id: 'librarian', name: 'Librarian', icon: 'fa-chalkboard-user', note: 'Run the desk' },
  { id: 'admin', name: 'Admin', icon: 'fa-user-shield', note: 'Manage library' },
];

// Asks the admin for a new temporary password. The request lands in the admin
// Inbox; the admin resets it and gets in touch.
export default function ForgotPassword() {
  const { requestPasswordReset } = useLibrary();
  const [params] = useSearchParams();
  const first = ROLES.some((r) => r.id === params.get('role')) ? params.get('role') : 'student';
  const [role, setRole] = useState(first);
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const captchaId = useRef('');
  const [captchaText, setCaptchaText] = useState('');
  const [captchaTry, setCaptchaTry] = useState(0);
  const rememberCaptcha = useCallback((id) => {
    captchaId.current = id;
  }, []);
  const captcha = () => ({ id: captchaId.current, answer: captchaText });
  const freshCaptcha = () => {
    setCaptchaText('');
    setCaptchaTry((n) => n + 1);
  };

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setCaptchaError('');
    try {
      await requestPasswordReset({ role, email, note, captcha: captcha() });
      setSent(true);
    } catch (err) {
      if (!(err instanceof ApiError)) throw err;
      setError(err.fields.email ?? err.fields.role ?? (err.fields.captcha ? '' : err.message));
      setCaptchaError(err.fields.captcha ?? '');
      freshCaptcha();
    }
    setBusy(false);
  }

  return (
    <>
      <title>Forgot password | BookVerse</title>

      <PageStyles css={css} />
      <video className="background-video" autoPlay muted loop playsInline>
        <source src="/assets/vid.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay" />
      <main className="login-page">
        <section className="login-card">
          {ROLES.map((r) => (
            <input
              key={r.id}
              type="radio"
              name="role"
              id={`role-${r.id}`}
              className="role-radio"
              checked={role === r.id}
              onChange={() => setRole(r.id)}
            />
          ))}
          <div className="login-top">
            <Link to="/" className="brand">
              <span className="brand-icon">
                <i className="fa-solid fa-book-open-reader" />
              </span>{' '}
              <span>BookVerse</span>
            </Link>
            <div className="secure-label">
              <i className="fa-solid fa-shield-halved" /> Secure Library Access
            </div>
          </div>
          {sent ? (
            <div className="form-heading" id="resetSent" role="status">
              <p className="small-title">
                <i className="fa-solid fa-paper-plane" /> REQUEST SENT
              </p>
              <h1>Check back soon.</h1>
              <p>
                If that email belongs to a {role} account, the library admin will set a temporary
                password and get in touch. You will choose your own when you next sign in.
              </p>
              <Link to="/login" className="login-button" style={{ marginTop: 18, textDecoration: 'none' }}>
                <span>Back to login</span> <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          ) : (
            <>
              <div className="form-heading">
                <p className="small-title">
                  <i className="fa-solid fa-key" /> FORGOT PASSWORD
                </p>
                <h1>Ask for a new password.</h1>
                <p>Choose your account type and enter the email you signed up with.</p>
              </div>
              <div className="role-section">
                <label className="section-label">ACCOUNT TYPE</label>
                <div className="role-grid">
                  {ROLES.map((r) => (
                    <label key={r.id} htmlFor={`role-${r.id}`} className="role-card">
                      <span className="role-icon">
                        <i className={`fa-solid ${r.icon}`} />
                      </span>{' '}
                      <span className="role-name">{r.name}</span>{' '}
                      <span className="role-description">{r.note}</span>
                    </label>
                  ))}
                </div>
              </div>
              <form id="forgotForm" onSubmit={submit} noValidate>
                <label>
                  <span className="field-label">EMAIL</span>
                  <div className="input-box">
                    <i className="fa-regular fa-envelope" />{' '}
                    <input
                      type="email"
                      id="forgotEmail"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </label>
                <label>
                  <span className="field-label">NOTE (OPTIONAL)</span>
                  <div className="input-box">
                    <i className="fa-regular fa-comment" />{' '}
                    <input
                      type="text"
                      id="forgotNote"
                      placeholder="Anything the admin should know"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                </label>
                <Captcha
                value={captchaText}
                onChange={setCaptchaText}
                onChallenge={rememberCaptcha}
                refreshKey={captchaTry}
                error={captchaError}
              />
                {error && (
                  <p className="auth-error" role="alert">
                    {error}
                  </p>
                )}
                <button type="submit" className="login-button" disabled={busy}>
                  <span>{busy ? 'Sending…' : 'Send request'}</span> <i className="fa-solid fa-arrow-right" />
                </button>
                <p className="auth-hint">
                  Remembered it? <Link to="/login">Back to login</Link>.
                </p>
              </form>
            </>
          )}
        </section>
      </main>
    </>
  );
}
