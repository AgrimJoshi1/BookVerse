import RoleLayout from './RoleLayout';
import css from '../styles/teacher-common.css?inline';

const links = [
  { to: '/teacher/dashboard', label: 'Dashboard' },
  { to: '/teacher/students', label: 'Students' },
  { to: '/teacher/books', label: 'Books' },
  { to: '/teacher/issue-book', label: 'Issue Book' },
  { to: '/teacher/return-book', label: 'Return Book' },
  { to: '/teacher/transactions', label: 'Transactions' },
  { to: '/teacher/profile', label: 'Profile' },
];

export default function TeacherLayout() {
  return (
    <RoleLayout
      css={css}
      home="/teacher/dashboard"
      links={links}
      profile={{ to: '/teacher/profile', initials: 'PN', name: 'Priya' }}
      footerText="Manage your classroom's library activity."
    />
  );
}
