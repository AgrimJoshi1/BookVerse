import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ScrollManager from './components/ScrollManager';
import PublicLayout from './layouts/PublicLayout';
import StudentLayout from './layouts/StudentLayout';
import LibrarianLayout from './layouts/LibrarianLayout';
import AdminLayout from './layouts/AdminLayout';
import RequireRole from './components/RequireRole';
import { LibraryProvider } from './context/LibraryContext';

// Public
const Home = lazy(() => import('./pages/public/Home'));
const Product = lazy(() => import('./pages/public/Product'));
const About = lazy(() => import('./pages/public/About'));
const Contact = lazy(() => import('./pages/public/Contact'));

// Auth
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const NotFound = lazy(() => import('./pages/public/NotFound'));
const StudentBookDetail = lazy(() => import('./pages/student/BookDetail'));
const LibrarianBookDetail = lazy(() => import('./pages/librarian/BookDetail'));
const SetPassword = lazy(() => import('./pages/auth/SetPassword'));

// Student
const StudentDashboard = lazy(() => import('./pages/student/Dashboard'));
const BrowseBooks = lazy(() => import('./pages/student/BrowseBooks'));
const MyBooks = lazy(() => import('./pages/student/MyBooks'));
const StudentFines = lazy(() => import('./pages/student/Fines'));
const Reservations = lazy(() => import('./pages/student/Reservations'));
const StudentProfile = lazy(() => import('./pages/student/Profile'));

// Librarian
const LibrarianDashboard = lazy(() => import('./pages/librarian/Dashboard'));
const LibrarianStudents = lazy(() => import('./pages/librarian/Students'));
const StudentDetail = lazy(() => import('./pages/librarian/StudentDetail'));
const LibrarianBooks = lazy(() => import('./pages/librarian/Books'));
const IssueBook = lazy(() => import('./pages/librarian/IssueBook'));
const ReturnBook = lazy(() => import('./pages/librarian/ReturnBook'));
const LibrarianTransactions = lazy(() => import('./pages/librarian/Transactions'));
const LibrarianProfile = lazy(() => import('./pages/librarian/Profile'));

// Admin
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminBooks = lazy(() => import('./pages/admin/Books'));
const AddBook = lazy(() => import('./pages/admin/AddBook'));
const AdminMembers = lazy(() => import('./pages/admin/Members'));
const MemberDetail = lazy(() => import('./pages/admin/MemberDetail'));
const AdminStaff = lazy(() => import('./pages/admin/Staff'));
const AdminTransactions = lazy(() => import('./pages/admin/Transactions'));
const AdminMessages = lazy(() => import('./pages/admin/Messages'));
const AdminFines = lazy(() => import('./pages/admin/Fines'));
const AdminReports = lazy(() => import('./pages/admin/Reports'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));
const AdminProfile = lazy(() => import('./pages/admin/Profile'));

export default function App() {
  return (
    <LibraryProvider>
      <ScrollManager />
      {/* Each page carries its own stylesheet, so nothing should paint before it has loaded. */}
      <Suspense fallback={null}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="product" element={<Product />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="set-password" element={<SetPassword />} />

          <Route
            path="student"
            element={
              <RequireRole role="student">
                <StudentLayout />
              </RequireRole>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="browse-books" element={<BrowseBooks />} />
            <Route path="books/:id" element={<StudentBookDetail />} />
            <Route path="my-books" element={<MyBooks />} />
            <Route path="fines" element={<StudentFines />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="profile" element={<StudentProfile />} />
          </Route>

          <Route
            path="librarian"
            element={
              <RequireRole role="librarian">
                <LibrarianLayout />
              </RequireRole>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<LibrarianDashboard />} />
            <Route path="students" element={<LibrarianStudents />} />
            <Route path="students/:id" element={<StudentDetail />} />
            <Route path="books" element={<LibrarianBooks />} />
            <Route path="books/:id" element={<LibrarianBookDetail />} />
            <Route path="issue-book" element={<IssueBook />} />
            <Route path="return-book" element={<ReturnBook />} />
            <Route path="transactions" element={<LibrarianTransactions />} />
            <Route path="profile" element={<LibrarianProfile />} />
          </Route>

          <Route
            path="admin"
            element={
              <RequireRole role="admin">
                <AdminLayout />
              </RequireRole>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="books" element={<AdminBooks />} />
            <Route path="add-book" element={<AddBook />} />
            <Route path="books/:id/edit" element={<AddBook />} />
            <Route path="members" element={<AdminMembers />} />
            <Route path="members/:id" element={<MemberDetail />} />
            <Route path="staff" element={<AdminStaff />} />
            <Route path="transactions" element={<AdminTransactions />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="fines" element={<AdminFines />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>

        </Routes>
      </Suspense>
    </LibraryProvider>
  );
}
