import RoleLayout from './RoleLayout';
import { initials, useStudent } from '../context/LibraryContext';
import css from '../styles/student-common.css?inline';

const links = [
  { to: '/student/dashboard', label: 'Dashboard' },
  { to: '/student/browse-books', label: 'Browse' },
  { to: '/student/my-books', label: 'My Books' },
  { to: '/student/fines', label: 'Fines' },
  { to: '/student/reservations', label: 'Reservations' },
];

export default function StudentLayout() {
  const { student } = useStudent();

  return (
    <RoleLayout
      css={css}
      home="/student/dashboard"
      links={links}
      profile={{
        to: '/student/profile',
        initials: initials(student.name),
        name: student.name.split(' ')[0],
      }}
      footerText="A calmer, more organized way to use your library."
    />
  );
}
