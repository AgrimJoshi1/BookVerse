import { Navigate, useLocation } from 'react-router-dom';
import PageStyles from './PageStyles';
import { useLibrary } from '../context/LibraryContext';

const css = `
.boot { min-height: 60vh; display: grid; place-items: center; font-family: system-ui, sans-serif; color: #8a7b70; }
`;

// Only lets `role` through. Anyone else goes to the login page and is sent
// back here after logging in.
export default function RequireRole({ role, children }) {
  const { ready, session, me } = useLibrary();
  const location = useLocation();

  if (!ready) {
    return (
      <>
        <PageStyles css={css} />
        <p className="boot">Loading BookVerse…</p>
      </>
    );
  }

  if (!session || session.role !== role || !me || me.status !== 'active') {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // an account on a temporary password must choose its own first
  if (me.mustChangePassword) return <Navigate to="/set-password" replace />;

  return children;
}
