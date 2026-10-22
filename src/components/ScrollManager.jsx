import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Restores what the browser did for free on full page loads: jump to the
// #hash target if there is one, otherwise start the new page at the top.
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
