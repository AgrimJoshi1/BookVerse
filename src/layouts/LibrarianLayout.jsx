import RoleLayout from './RoleLayout';
import { initials, useLibrarian } from '../context/LibraryContext';
import css from '../styles/librarian-common.css?inline';

const links = [
  { to: '/librarian/dashboard', label: 'Dashboard' },
  { to: '/librarian/students', label: 'Students' },
  { to: '/librarian/books', label: 'Books' },
  { to: '/librarian/issue-book', label: 'Issue Book' },
  { to: '/librarian/return-book', label: 'Return Book' },
  { to: '/librarian/transactions', label: 'Transactions' },
  { to: '/librarian/profile', label: 'Profile' },
];

export default function LibrarianLayout() {
  const { librarian } = useLibrarian();

  return (
    <RoleLayout
      css={css}
      home="/librarian/dashboard"
      links={links}
      profile={{
        to: '/librarian/profile',
        initials: initials(librarian.name),
        name: librarian.name.split(' ')[0],
      }}
      footerText="Run the circulation desk."
    />
  );
}
