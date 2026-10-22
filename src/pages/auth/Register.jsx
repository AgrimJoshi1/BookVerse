import { Link } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import css from '../../styles/register.css?inline';

export default function Register() {
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
          {/* ROLE RADIOS */}
          <input
            type="radio"
            name="role"
            id="role-student"
            className="role-radio"
            defaultChecked
          />{' '}
          <input type="radio" name="role" id="role-teacher" className="role-radio" />{' '}
          <input type="radio" name="role" id="role-admin" className="role-radio" />
          {/* TOP */}
          <div className="register-top">
            <Link to="/" className="brand">
              <span className="brand-icon">
                <i className="fa-solid fa-book-open-reader" />
              </span>{' '}
              <span>BookVerse</span>
            </Link>
            <div className="secure-label">
              <i className="fa-solid fa-shield-halved" /> Create Your Library Account
            </div>
          </div>
          {/* HEADING */}
          <div className="form-heading">
            <p className="small-title">
              <i className="fa-solid fa-sparkles" /> JOIN BOOKVERSE
            </p>
            <h1>Create your library account.</h1>
            <p>
              Choose your account type and enter your details to start your journey with BookVerse.
            </p>
          </div>
          {/* ROLE SELECTOR */}
          <div className="role-section">
            <label className="section-label">SELECT YOUR ROLE</label>
            <div className="role-grid">
              {/* STUDENT */}
              <label htmlFor="role-student" className="role-card">
                <span className="role-icon">
                  <i className="fa-solid fa-user-graduate" />
                </span>{' '}
                <span className="role-name">Student</span>{' '}
                <span className="role-description">Borrow &amp; read</span>
              </label>
              {/* TEACHER */}
              <label htmlFor="role-teacher" className="role-card">
                <span className="role-icon">
                  <i className="fa-solid fa-chalkboard-user" />
                </span>{' '}
                <span className="role-name">Teacher</span>{' '}
                <span className="role-description">Faculty access</span>
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
          {/* ROLE INFO */}
          <div className="role-info role-info-student">
            <div className="role-info-icon">
              <i className="fa-solid fa-user-graduate" />
            </div>
            <div className="role-info-copy">
              <span>Student Account</span>
              <p>
                Create your account to borrow books, manage reservations, and explore BookVerse.
              </p>
            </div>
            <span className="platform-name">BookVerse Library</span>
          </div>
          <div className="role-info role-info-teacher">
            <div className="role-info-icon">
              <i className="fa-solid fa-chalkboard-user" />
            </div>
            <div className="role-info-copy">
              <span>Teacher Account</span>
              <p>Create your faculty account and manage reading lists and library resources.</p>
            </div>
            <span className="platform-name">BookVerse Library</span>
          </div>
          <div className="role-info role-info-admin">
            <div className="role-info-icon">
              <i className="fa-solid fa-user-shield" />
            </div>
            <div className="role-info-copy">
              <span>Admin Account</span>
              <p>Create an administrator account to manage users, books, and library operations.</p>
            </div>
            <span className="platform-name">BookVerse Library</span>
          </div>
          {/* REGISTER FORM */}
          <form onSubmit={(event) => event.preventDefault()}>
            {/* FULL NAME */}
            <label>
              <span className="field-label">FULL NAME</span>
              <div className="input-box">
                <i className="fa-regular fa-user" />{' '}
                <input type="text" placeholder="Enter your full name" required />
              </div>
            </label>
            {/* EMAIL */}
            <label>
              <span className="field-label">EMAIL ADDRESS</span>
              <div className="input-box">
                <i className="fa-regular fa-envelope" />{' '}
                <input type="email" placeholder="you@example.com" required />
              </div>
            </label>
            {/* USER ID */}
            <label>
              <span className="field-label">USER ID</span>
              <div className="input-box">
                <i className="fa-regular fa-id-card" />{' '}
                <input type="text" placeholder="Choose your user ID" required />
              </div>
            </label>
            {/* PASSWORD ROW */}
            <div className="password-row">
              {/* PASSWORD */}
              <label>
                <span className="field-label">PASSWORD</span>
                <div className="input-box">
                  <i className="fa-solid fa-lock" />{' '}
                  <input type="password" placeholder="Create password" required />
                </div>
              </label>
              {/* CONFIRM PASSWORD */}
              <label>
                <span className="field-label">CONFIRM PASSWORD</span>
                <div className="input-box">
                  <i className="fa-solid fa-lock" />{' '}
                  <input type="password" placeholder="Confirm password" required />
                </div>
              </label>
            </div>
            {/* TERMS */}
            <div className="form-options">
              <label className="remember">
                <input type="checkbox" required />{' '}
                <span>I agree to the Terms &amp; Conditions</span>
              </label>{' '}
              <span className="login-note">Secure account registration</span>
            </div>
            {/* REGISTER BUTTON */}
            <Link to="/" className="register-button">
              <span>Create My Account</span> <i className="fa-solid fa-arrow-right" />
            </Link>
            {/* LOGIN LINK */}
            <p className="signin-text">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </form>
          {/* SECURITY NOTE */}
          <div className="security-note">
            <i className="fa-solid fa-lock" />{' '}
            <span>Your information is protected by secure BookVerse access controls.</span>
          </div>
        </section>
      </main>
    </>
  );
}
