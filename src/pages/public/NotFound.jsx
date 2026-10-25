import { Link, useLocation } from 'react-router-dom';
import PageStyles from '../../components/PageStyles';
import { useLibrary } from '../../context/LibraryContext';
import contactCss from '../../styles/contact.css?inline';
import css from '../../styles/not-found.css?inline';

const HOME = {
  student: { to: '/student/dashboard', label: 'Your dashboard' },
  librarian: { to: '/librarian/dashboard', label: 'Your dashboard' },
  admin: { to: '/admin/dashboard', label: 'Your dashboard' },
};

export default function NotFound() {
  const { pathname } = useLocation();
  const { session } = useLibrary();
  const mine = session && HOME[session.role];

  return (
    <>
      <title>Page not found | BookVerse</title>
      <meta name="robots" content="noindex" />
      <PageStyles css={contactCss + css} />
      <main className="not-found">
        <div className="container">
          <p className="not-found-code">404</p>
          <h1>Page not found</h1>
          <p>
            There is nothing at <span className="not-found-path">{pathname}</span>. It may have moved,
            or the link may be mistyped.
          </p>
          <nav className="not-found-links" aria-label="Where to go next">
            {mine ? <Link to={mine.to}>{mine.label}</Link> : <Link to="/">Home</Link>}
            {mine ? <Link to="/">Home</Link> : <Link to="/login">Log in</Link>}
            <Link to="/contact">Contact us</Link>
          </nav>
        </div>
      </main>
    </>
  );
}
