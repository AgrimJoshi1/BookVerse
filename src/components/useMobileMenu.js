import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// State for the burger button that expands .nav-links / .nav-actions on mobile.
export default function useMobileMenu() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return {
    open,
    activeClass: open ? ' active' : '',
    toggle: () => setOpen((value) => !value),
  };
}
