import { Link, NavLink } from 'react-router-dom';
import MenuToggle from './MenuToggle';
import useMobileMenu from './useMobileMenu';

const links = [
  { to: '/', label: 'Home' },
  { to: '/product', label: 'Features' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

function NavItems({ menu }) {
  return (
    <>
      <div className={`nav-links${menu.activeClass}`}>
        {links.map(({ to, label }) => (
          <NavLink key={to} to={to} end className={({ isActive }) => (isActive ? 'active' : '')}>
            {label}
          </NavLink>
        ))}
      </div>

      <div className={`nav-actions${menu.activeClass}`}>
        <Link to="/register" className="text-link">
          Register
        </Link>
        <Link to="/login" className="button button-small">
          Login
        </Link>
      </div>

      <MenuToggle open={menu.open} onToggle={menu.toggle} />
    </>
  );
}

// The home page and the inner pages (features / about / contact) wrap their
// navbar differently, and their stylesheets target those different shapes.
export default function PublicNavbar({ home }) {
  const menu = useMobileMenu();

  if (home) {
    return (
      <header className="site-header" id="home">
        <nav className="navbar container" aria-label="Primary navigation">
          <Link className="brand" to="/" aria-label="BookVerse home">
            <i className="fa-solid fa-book-open" />
            <span>BookVerse</span>
          </Link>
          <NavItems menu={menu} />
        </nav>
      </header>
    );
  }

  return (
    <header className="site-header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="brand">
            <i className="fa-solid fa-book-open" /> BookVerse
          </Link>
          <NavItems menu={menu} />
        </nav>
      </div>
    </header>
  );
}
