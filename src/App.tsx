import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import SearchPage from './pages/public/SearchPage';
import EstablishmentDetailsPage from './pages/public/EstablishmentDetailsPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Dashboard Pages
import DashboardOverview from './pages/user/DashboardOverview';
import ProfilePage from './pages/user/ProfilePage';
import UserBookingsPage from './pages/user/UserBookingsPage';
import OperatorEstablishmentsPage from './pages/operator/OperatorEstablishmentsPage';
import OperatorBookingsPage from './pages/operator/OperatorBookingsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'establishment/:id', element: <EstablishmentDetailsPage /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardOverview /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'my-bookings', element: <UserBookingsPage /> },
      { path: 'establishments', element: <OperatorEstablishmentsPage /> },
      { path: 'bookings', element: <OperatorBookingsPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
