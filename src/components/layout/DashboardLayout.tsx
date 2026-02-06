import { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { LayoutDashboard, Map, Calendar, User, LogOut, Image } from 'lucide-react';

export default function DashboardLayout() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login', { state: { from: location } });
    }
  }, [isAuthenticated, navigate, location]);

  if (!isAuthenticated) return null;

  const navigation = [
    { name: "Vue d'ensemble", href: '/dashboard', icon: LayoutDashboard },
    { name: 'Mon Profil', href: '/dashboard/profile', icon: User },
  ];

  if (user?.role === 'OPERATOR') {
    navigation.push(
      { name: 'Mes Établissements', href: '/dashboard/establishments', icon: Map },
      { name: 'Réservations', href: '/dashboard/bookings', icon: Calendar },
      { name: 'Média', href: '/dashboard/media', icon: Image }
    );
  } else if (user?.role === 'USER') {
    navigation.push(
      { name: 'Mes Réservations', href: '/dashboard/my-bookings', icon: Calendar },
      { name: 'Favoris', href: '/dashboard/favorites', icon: Map }
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 z-10 hidden bg-indigo-800 text-white md:flex md:w-64 md:flex-col">
        <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
          <div className="flex flex-shrink-0 items-center px-4">
            <span className="text-xl font-bold">KouilouHub</span>
          </div>
          <nav className="mt-5 flex-1 space-y-1 px-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  location.pathname === item.href
                    ? 'bg-indigo-900 text-white'
                    : 'text-indigo-100 hover:bg-indigo-700'
                } group flex items-center rounded-md px-2 py-2 text-sm font-medium`}
              >
                <item.icon
                  className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300"
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-shrink-0 border-t border-indigo-700 p-4">
          <button
            onClick={logout}
            className="group block w-full flex-shrink-0 text-indigo-100 hover:text-white"
          >
            <div className="flex items-center">
              <div>
                <LogOut className="inline-block h-9 w-9 rounded-full bg-indigo-700 p-1" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium group-hover:text-white">Se déconnecter</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
