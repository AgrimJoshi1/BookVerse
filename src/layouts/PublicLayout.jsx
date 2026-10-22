import { Outlet, useLocation } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

export default function PublicLayout() {
  const home = useLocation().pathname === '/';

  return (
    <>
      <PublicNavbar home={home} />
      <Outlet />
      <PublicFooter home={home} />
    </>
  );
}
