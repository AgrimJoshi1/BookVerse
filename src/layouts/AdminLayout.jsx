import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import MenuToggle from '../components/MenuToggle';
import PageStyles from '../components/PageStyles';
import useMobileMenu from '../components/useMobileMenu';
import { initials, useLibrary } from '../context/LibraryContext';
import css from '../styles/admin.css?inline';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/books', label: 'Books', alsoActiveOn: ['/admin/add-book'] },
  { to: '/admin/members', label: 'Members' },
  { to: '/admin/staff', label: 'Staff' },
  { to: '/admin/transactions', label: 'Transactions' },
  { to: '/admin/fines', label: 'Fines' },
  { to: '/admin/messages', label: 'Inbox' },
  { to: '/admin/reports', label: 'Reports' },
  { to: '/admin/settings', label: 'Settings' },
  { to: '/admin/profile', label: 'Profile' },
];

// The admin area has its own shell instead of RoleLayout: a plain top bar
// with text links, no icons.
export default function AdminLayout() {
  const menu = useMobileMenu();
  const { pathname } = useLocation();
  const { admin, settings, unreadMessages } = useLibrary();

  const isActive = (to, extra = []) =>
    pathname === to || pathname.startsWith(`${to}/`) || extra.includes(pathname);

  return (
    <div className="admin-shell">
      <PageStyles css={css} />

      <header className={`ad-bar${menu.open ? ' open' : ''}`}>
        <div className="ad-wrap ad-bar-inner">
          <Link to="/admin/dashboard" className="ad-brand">
            <strong>BookVerse</strong>
            <span className="ad-tag">ADMIN</span>
          </Link>

          <div className="ad-collapse">
            <nav className="ad-nav" aria-label="Admin">
              {links.map(({ to, label, alsoActiveOn }) => (
                <NavLink key={to} to={to} className={isActive(to, alsoActiveOn) ? 'active' : ''}>
                  {label}
                  {to === '/admin/messages' && unreadMessages > 0 && (
                    <span className="ad-badge" aria-label={`${unreadMessages} unread`}>
                      {unreadMessages}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="ad-user">
              <Link to="/admin/profile" className="ad-user-link">
                <span className="ad-initials">{initials(admin.name)}</span>
                <span>{admin.name.split(' ')[0]}</span>
              </Link>
              <Link to="/login" className="ad-signout">
                Sign out
              </Link>
            </div>
          </div>

          <MenuToggle open={menu.open} onToggle={menu.toggle} />
        </div>
      </header>

      <Outlet />

      <footer className="ad-foot">
        <div className="ad-wrap ad-foot-inner">
          <span>{settings.library.name}</span>
          <span>
            {settings.library.hours} · {settings.library.phone}
          </span>
        </div>
      </footer>
    </div>
  );
}
