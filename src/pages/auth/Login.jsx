import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import { ApiError, useLibrary } from '../../context/LibraryContext';
import css from '../../styles/login.css?inline';

const HOME = {
  student: '/student/dashboard',
  librarian: '/librarian/dashboard',
  admin: '/admin/dashboard',
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, endSession } = useLibrary();
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [remember, setRemember] = useState(false);

  // Arriving here means signing in again, so any old session ends.
  useEffect(() => {
    endSession();
  }, []);

  const selectRole = (nextRole) => {
    setRole(nextRole);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const result = await login(email, password, role, remember);
      if (result.mustChange) {
        navigate('/set-password', { replace: true });
        return;
      }
      const back = location.state?.from;
      navigate(back && back.startsWith('/' + role) ? back : HOME[role], { replace: true });
    } catch (err) {
      if (!(err instanceof ApiError)) throw err;
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <>
      <title>Login | BookVerse</title>

      <PageStyles css={css} />
      {/* BACKGROUND */}
      <video className="background-video" autoPlay muted loop playsInline>
        <source src="/assets/vid.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay" />
      {/* LOGIN PAGE */}
      <main className="login-page">
        <section className="login-card">
          {/* Hidden radio inputs power the role switch (pure CSS, no JS) */}
          <input
            type="radio"
            name="role"
            id="role-student"
            className="role-radio"
            checked={role === 'student'}
            onChange={() => selectRole('student')}
          />{' '}
          <input
            type="radio"
            name="role"
            id="role-librarian"
            className="role-radio"
            checked={role === 'librarian'}
            onChange={() => selectRole('librarian')}
          />{' '}
          <input
            type="radio"
            name="role"
            id="role-admin"
            className="role-radio"
            checked={role === 'admin'}
            onChange={() => selectRole('admin')}
          />
          {/* TOP */}
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
          {/* HEADING */}
          <div className="form-heading">
            <p className="small-title">
              <i className="fa-solid fa-sparkles" /> WELCOME BACK
            </p>
            <h1>Sign in to your library.</h1>
            <p>Choose your account type and enter your details to continue to BookVerse.</p>
          </div>
          {/* ROLE SELECTOR */}
          <div className="role-section">
            <label className="section-label">SELECT ROLE TO LOGIN</label>
            <div className="role-grid">
              {/* STUDENT */}
              <label htmlFor="role-student" className="role-card">
                <span className="role-icon">
                  <i className="fa-solid fa-user-graduate" />
                </span>{' '}
                <span className="role-name">Student</span>{' '}
                <span className="role-description">Borrow &amp; read</span>
              </label>
              {/* LIBRARIAN */}
              <label htmlFor="role-librarian" className="role-card">
                <span className="role-icon">
                  <i className="fa-solid fa-chalkboard-user" />
                </span>{' '}
                <span className="role-name">Librarian</span>{' '}
                <span className="role-description">Run the desk</span>
              </label>
              {/* ADMIN */}
              <label htmlFor="role-admin" className="role-card">
                <span className="role-icon">
                  <i className="fa-solid fa-user-shield" />
                </span>{' '}
                <span className="role-name">Admin</span>{' '}
                <span className="role-description">Manage library</span>
              </label>
            </div>
          </div>
          {/* SELECTED ROLE INFO */}
          {/* One block per role; CSS shows only the one matching the checked radio */}
          <div className="role-info role-info-student">
            <div className="role-info-icon">
              <i className="fa-solid fa-user-graduate" />
            </div>
            <div className="role-info-copy">
              <span>Student Portal</span>
              <p>Access your borrowed books, reservations, fines, and library profile.</p>
            </div>
            <span className="platform-name">BookVerse Library</span>
          </div>
          <div className="role-info role-info-librarian">
            <div className="role-info-icon">
              <i className="fa-solid fa-chalkboard-user" />
            </div>
            <div className="role-info-copy">
              <span>Librarian Portal</span>
              <p>Issue and return books, follow up on overdue loans, and keep the desk running.</p>
            </div>
            <span className="platform-name">BookVerse Library</span>
          </div>
          <div className="role-info role-info-admin">
            <div className="role-info-icon">
              <i className="fa-solid fa-user-shield" />
            </div>
            <div className="role-info-copy">
              <span>Admin Portal</span>
              <p>Manage the catalog, users, fines, and overall library operations.</p>
            </div>
            <span className="platform-name">BookVerse Library</span>
          </div>
          {/* FORM */}
          <form id="loginForm" onSubmit={handleSubmit}>
            <label>
              <span className="field-label">EMAIL / USER ID</span>
              <div className="input-box">
                <i className="fa-regular fa-envelope" />{' '}
                <input
                  type="text"
                  id="emailInput"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </label>{' '}
            <label>
              <span className="field-label-row">
                <span className="field-label">PASSWORD</span>{' '}
                <Link to={`/forgot-password?role=${role}`} className="forgot-link">
                  Forgot password?
                </Link>
              </span>
              <div className="input-box">
                <i className="fa-solid fa-lock" />{' '}
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="passwordInput"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />{' '}
                <button
                  type="button"
                  className="password-icon"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((shown) => !shown)}
                >
                  <i className={showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'} />
                </button>
              </div>
            </label>
            <div className="form-options">
              <label className="remember">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />{' '}
                <span>Remember me</span>
              </label>{' '}
              <span className="login-note">Use your registered account</span>
            </div>
            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="login-button" disabled={busy}>
              <span>{busy ? 'Signing in…' : 'Login & Access Portal'}</span>{' '}
              <i className="fa-solid fa-arrow-right" />
            </button>
            {role === 'admin' && (
              <p className="auth-hint">First time? Try admin@bookverse.edu / Admin@123.</p>
            )}
            {role === 'student' && (
              <p className="auth-hint">
                New here? <Link to="/register">Create a student account</Link>.
              </p>
            )}
          </form>
          {/* FOOTER INFO */}
          <div className="security-note">
            <i className="fa-solid fa-lock" />{' '}
            <span>Your library account information is protected by secure access controls.</span>
          </div>
        </section>
      </main>
    </>
  );
}
