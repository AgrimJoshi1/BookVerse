import RoleLayout from './RoleLayout';

const links = [
  { to: '/student/dashboard', label: 'Dashboard' },
  { to: '/student/browse-books', label: 'Browse' },
  { to: '/student/my-books', label: 'My Books' },
  { to: '/student/fines', label: 'Fines' },
  { to: '/student/reservations', label: 'Reservations' },
];

export default function StudentLayout() {
  return (
    <RoleLayout
      home="/student/dashboard"
      links={links}
      profile={{ to: '/student/profile', initials: 'A', name: 'Alex' }}
      footerText="A calmer, more organized way to use your library."
    />
  );
}
