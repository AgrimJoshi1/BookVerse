import RoleLayout from './RoleLayout';
import css from '../styles/admin-common.css?inline';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/books', label: 'Books', alsoActiveOn: ['/admin/add-book'] },
  { to: '/admin/members', label: 'Members' },
  { to: '/admin/staff', label: 'Staff' },
  { to: '/admin/transactions', label: 'Transactions' },
  { to: '/admin/fines', label: 'Fines' },
  { to: '/admin/reports', label: 'Reports' },
  { to: '/admin/settings', label: 'Settings' },
  { to: '/admin/profile', label: 'Profile' },
];

export default function AdminLayout() {
  return (
    <RoleLayout
      css={css}
      home="/admin/dashboard"
      brandSuffix="Admin"
      links={links}
      profile={{ to: '/admin/profile', initials: 'SV', name: 'Sunita' }}
      footerText="Administer your library, library-wide."
    />
  );
}
