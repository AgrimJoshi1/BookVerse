import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import MenuToggle from '../components/MenuToggle';
import PageStyles from '../components/PageStyles';
import useMobileMenu from '../components/useMobileMenu';

// Shared shell for the student, librarian and admin areas: top navbar, the page
// (via <Outlet />), and a footer. `css` is stylesheet shared by every page of
// the role, if the role has one.
export default function RoleLayout({ css, home, brandSuffix, links, profile, footerText }) {
  const menu = useMobileMenu();
  const { pathname } = useLocation();

  return (
    <>
      {css && <PageStyles css={css} />}

      <header className="site-header">
        <nav className="navbar container">
          <Link to={home} className="brand">
            <i className="fa-solid fa-book-open" />
            <span>
              BookVerse{' '}
              {brandSuffix && (
                <small style={{ color: '#6f645d', fontWeight: 500, fontSize: '0.6rem' }}>
                  / {brandSuffix}
                </small>
              )}
            </span>
          </Link>

          <div className={`nav-links${menu.activeClass}`}>
            {links.map(({ to, label, alsoActiveOn = [] }) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  isActive || alsoActiveOn.includes(pathname) ? 'active' : ''
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          <div className={`nav-actions${menu.activeClass}`}>
            <Link to={profile.to} className="profile-mini">
              <span className="avatar">{profile.initials}</span>
              <span className="profile-name">{profile.name}</span>
              <i className="fa-solid fa-chevron-down" />
            </Link>

            <Link to="/login" className="logout-btn">
              <i className="fa-solid fa-right-from-bracket" />
              <span>Logout</span>
            </Link>
          </div>

          <MenuToggle open={menu.open} onToggle={menu.toggle} />
        </nav>
      </header>

      <Outlet />

      <footer className="site-footer">
        <div className="container footer-inner">
          <Link to={home} className="brand">
            <i className="fa-solid fa-book-open" />
            <span>BookVerse</span>
          </Link>
          <p>{footerText}</p>
          <span className="footer-copy">© 2026 BookVerse</span>
        </div>
      </footer>
    </>
  );
}
