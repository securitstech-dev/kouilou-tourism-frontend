import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { useAuthStore } from '../store/authStore';

// Public Pages
import HomePage from '../pages/public/HomePage';
import SearchPage from '../pages/public/SearchPage';
import EstablishmentDetailsPage from '../pages/public/EstablishmentDetailsPage';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';

// User Pages
import ProfilePage from '../pages/user/ProfilePage';
import UserBookingsPage from '../pages/user/UserBookingsPage';
import PaymentPage from '../pages/booking/PaymentPage';

// Operator Pages
import OperatorEstablishmentsPage from '../pages/operator/OperatorEstablishmentsPage';
import OperatorBookingsPage from '../pages/operator/OperatorBookingsPage';

// Admin Pages
import AdminLayout from '../components/layout/AdminLayout';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminEstablishmentsPage from '../pages/admin/AdminEstablishmentsPage';
import AdminUsersPage from '../pages/admin/AdminUsersPage';

// Protection de route
const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: JSX.Element;
  allowedRoles?: string[];
}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/auth/login" replace />;

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes Publiques avec Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/establishments/:id" element={<EstablishmentDetailsPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
      </Route>

      {/* Routes Utilisateur */}
      <Route element={<MainLayout />}>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/my-bookings"
          element={
            <ProtectedRoute>
              <UserBookingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking/:id/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Routes Opérateur */}
      <Route element={<MainLayout />}>
        <Route
          path="/dashboard/establishments"
          element={
            <ProtectedRoute allowedRoles={['OPERATOR', 'ADMIN']}>
              <OperatorEstablishmentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/bookings-management"
          element={
            <ProtectedRoute allowedRoles={['OPERATOR', 'ADMIN']}>
              <OperatorBookingsPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Routes Admin */}
      <Route element={<AdminLayout />}>
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/establishments"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminEstablishmentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminUsersPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 404 */}
      <Route element={<MainLayout />}>
        <Route
          path="*"
          element={<div className="p-8 text-center text-red-500">404 - Page non trouvée</div>}
        />
      </Route>
    </Routes>
  );
};
