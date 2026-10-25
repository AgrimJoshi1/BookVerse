import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import DepartmentSelect from '../../components/DepartmentSelect';
import PasswordChecklist from '../../components/PasswordChecklist';
import { ApiError, YEARS, useLibrary } from '../../context/LibraryContext';
import { DEFAULT_SETTINGS } from '../../api/defaults';
import css from '../../styles/register.css?inline';

const BLANK = { name: '', email: '', phone: '', department: '', year: '', password: '', confirm: '' };

// Only students sign themselves up. Their account stays pending until an
// admin approves it; librarians and admins are created by an admin.
export default function Register() {
  const { register, settings } = useLibrary();
  const departments = (settings ?? DEFAULT_SETTINGS).departments.student;
  const [fields, setFields] = useState(BLANK);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const set = (key) => (event) => setFields({ ...fields, [key]: event.target.value });

  async function submit(event) {
    event.preventDefault();
    if (fields.password !== fields.confirm) {
      setErrors({ confirm: 'The two passwords do not match.' });
      return;
    }
    setBusy(true);
    setErrors({});
    try {
      const { confirm: _confirm, ...account } = fields;
      await register(account);
      setDone(true);
    } catch (error) {
      if (!(error instanceof ApiError)) throw error;
      setErrors(error.fields);
    } finally {
      setBusy(false);
    }
  }

  const input = (key, label, icon, props = {}) => (
    <label>
      <span className="field-label">{label}</span>
      <div className="input-box">
        <i className={icon} />{' '}
        <input value={fields[key]} onChange={set(key)} required {...props} />
      </div>
      {errors[key] && (
        <span className="auth-error" role="alert">
          {errors[key]}
        </span>
      )}
    </label>
  );

  return (
    <>
      <title>Register | BookVerse</title>

      <PageStyles css={css} />
      {/* BACKGROUND */}
      <video className="background-video" autoPlay muted loop playsInline>
        <source src="/assets/vid.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay" />
      {/* REGISTER PAGE */}
      <main className="register-page">
        <section className="register-card">
          <input type="radio" name="role" id="role-student" className="role-radio" defaultChecked />
          {/* TOP */}
          <div className="register-top">
            <Link to="/" className="brand">
              <span className="brand-icon">
                <i className="fa-solid fa-book-open-reader" />
              </span>{' '}
              <span>BookVerse</span>
            </Link>
            <div className="secure-label">
              <i className="fa-solid fa-shield-halved" /> Student Registration
            </div>
          </div>
          {/* HEADING */}
          <div className="form-heading">
            <p className="small-title">
              <i className="fa-solid fa-sparkles" /> JOIN BOOKVERSE
            </p>
            <h1>Create your library account.</h1>
            <p>Enter your details. The library admin approves new accounts before you can log in.</p>
          </div>
          {/* ROLE INFO */}
          <div className="role-info role-info-student">
            <div className="role-info-icon">
              <i className="fa-solid fa-user-graduate" />
            </div>
            <div className="role-info-copy">
              <span>Student Account</span>
              <p>Borrow books, manage reservations, and explore BookVerse.</p>
            </div>
            <span className="platform-name">BookVerse Library</span>
          </div>

          {done ? (
            <div className="auth-success" role="status">
              <h2>Account created</h2>
              <p>
                Thanks, {fields.name.trim().split(' ')[0]}. Your account is waiting for the library
                admin to approve it. You can log in once it has been approved.
              </p>
              <Link to="/login" className="register-button">
                <span>Go to login</span> <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          ) : (
            <form onSubmit={submit}>
              {input('name', 'FULL NAME', 'fa-regular fa-user', { type: 'text', placeholder: 'Enter your full name' })}
              {input('email', 'EMAIL ADDRESS', 'fa-regular fa-envelope', { type: 'email', placeholder: 'you@example.com' })}
              {input('phone', 'PHONE', 'fa-solid fa-phone', { type: 'tel', placeholder: '+91 98200 00000' })}
              <div className="password-row">
                <label>
                  <span className="field-label">DEPARTMENT</span>
                  <div className="input-box stack">
                    <i className="fa-solid fa-building-columns" />{' '}
                    <DepartmentSelect
                      id="reg-department"
                      options={departments}
                      value={fields.department}
                      onChange={(department) => setFields({ ...fields, department })}
                    />
                  </div>
                  {errors.department && (
                    <span className="auth-error" role="alert">
                      {errors.department}
                    </span>
                  )}
                </label>
                <label>
                  <span className="field-label">YEAR</span>
                  <div className="input-box">
                    <i className="fa-regular fa-id-card" />{' '}
                    <select id="reg-year" value={fields.year} onChange={set('year')} required>
                      <option value="">Choose year</option>
                      {YEARS.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.year && (
                    <span className="auth-error" role="alert">
                      {errors.year}
                    </span>
                  )}
                </label>
              </div>
              <div className="password-row">
                {input('password', 'PASSWORD', 'fa-solid fa-lock', { type: 'password', placeholder: 'Create a strong password' })}
                {input('confirm', 'CONFIRM PASSWORD', 'fa-solid fa-lock', { type: 'password', placeholder: 'Confirm password' })}
              </div>
              <PasswordChecklist value={fields.password} />
              <div className="form-options">
                <label className="remember">
                  <input type="checkbox" required /> <span>I agree to the Terms &amp; Conditions</span>
                </label>{' '}
                <span className="login-note">Secure account registration</span>
              </div>
              <button type="submit" className="register-button" disabled={busy}>
                <span>{busy ? 'Creating account…' : 'Create My Account'}</span>{' '}
                <i className="fa-solid fa-arrow-right" />
              </button>
              <p className="signin-text">
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </form>
          )}
          {/* SECURITY NOTE */}
          <div className="security-note">
            <i className="fa-solid fa-lock" />{' '}
            <span>Your password is stored securely. Librarian and admin accounts are created by an admin.</span>
          </div>
        </section>
      </main>
    </>
  );
}
