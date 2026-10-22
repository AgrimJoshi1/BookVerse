import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ScrollManager from './components/ScrollManager';
import PublicLayout from './layouts/PublicLayout';
import StudentLayout from './layouts/StudentLayout';
import TeacherLayout from './layouts/TeacherLayout';
import AdminLayout from './layouts/AdminLayout';

// Public
const Home = lazy(() => import('./pages/public/Home'));
const Product = lazy(() => import('./pages/public/Product'));
const About = lazy(() => import('./pages/public/About'));
const Contact = lazy(() => import('./pages/public/Contact'));

// Auth
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));

// Student
const StudentDashboard = lazy(() => import('./pages/student/Dashboard'));
const BrowseBooks = lazy(() => import('./pages/student/BrowseBooks'));
const MyBooks = lazy(() => import('./pages/student/MyBooks'));
const StudentFines = lazy(() => import('./pages/student/Fines'));
const Reservations = lazy(() => import('./pages/student/Reservations'));
const StudentProfile = lazy(() => import('./pages/student/Profile'));

// Teacher
const TeacherDashboard = lazy(() => import('./pages/teacher/Dashboard'));
const TeacherStudents = lazy(() => import('./pages/teacher/Students'));
const TeacherBooks = lazy(() => import('./pages/teacher/Books'));
const IssueBook = lazy(() => import('./pages/teacher/IssueBook'));
const ReturnBook = lazy(() => import('./pages/teacher/ReturnBook'));
const TeacherTransactions = lazy(() => import('./pages/teacher/Transactions'));
const TeacherProfile = lazy(() => import('./pages/teacher/Profile'));

// Admin
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminBooks = lazy(() => import('./pages/admin/Books'));
const AddBook = lazy(() => import('./pages/admin/AddBook'));
const AdminMembers = lazy(() => import('./pages/admin/Members'));
const AdminStaff = lazy(() => import('./pages/admin/Staff'));
const AdminTransactions = lazy(() => import('./pages/admin/Transactions'));
const AdminFines = lazy(() => import('./pages/admin/Fines'));
const AdminReports = lazy(() => import('./pages/admin/Reports'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));
const AdminProfile = lazy(() => import('./pages/admin/Profile'));

export default function App() {
  return (
    <>
      <ScrollManager />
      {/* Each page carries its own stylesheet, so nothing should paint before it has loaded. */}
      <Suspense fallback={null}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="product" element={<Product />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="student" element={<StudentLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="browse-books" element={<BrowseBooks />} />
            <Route path="my-books" element={<MyBooks />} />
            <Route path="fines" element={<StudentFines />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="profile" element={<StudentProfile />} />
          </Route>

          <Route path="teacher" element={<TeacherLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="students" element={<TeacherStudents />} />
            <Route path="books" element={<TeacherBooks />} />
            <Route path="issue-book" element={<IssueBook />} />
            <Route path="return-book" element={<ReturnBook />} />
            <Route path="transactions" element={<TeacherTransactions />} />
            <Route path="profile" element={<TeacherProfile />} />
          </Route>

          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="books" element={<AdminBooks />} />
            <Route path="add-book" element={<AddBook />} />
            <Route path="members" element={<AdminMembers />} />
            <Route path="staff" element={<AdminStaff />} />
            <Route path="transactions" element={<AdminTransactions />} />
            <Route path="fines" element={<AdminFines />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}
