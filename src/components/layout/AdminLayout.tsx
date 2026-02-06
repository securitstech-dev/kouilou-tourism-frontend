import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { LayoutDashboard, Users, Building, LogOut, Settings } from 'lucide-react';

export default function AdminLayout() {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white shadow-xl">
        <div className="flex h-16 items-center justify-center border-b border-slate-700 bg-slate-800">
          <h1 className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-xl font-bold text-transparent">
            Admin Portal
          </h1>
        </div>

        <div className="p-4">
          <div className="mb-6 flex items-center space-x-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-bold text-white">
              {user?.firstName?.charAt(0) || 'A'}
            </div>
            <div>
              <p className="text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-400">Administrateur</p>
            </div>
          </div>

          <nav className="space-y-1">
            <Link
              to="/admin/dashboard"
              className={`flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive('/admin/dashboard')
                  ? 'border-l-4 border-indigo-500 bg-slate-800 text-white shadow-md'
                  : 'text-gray-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <LayoutDashboard className="mr-3 h-5 w-5 flex-shrink-0" />
              Vue d'ensemble
            </Link>

            <Link
              to="/admin/establishments"
              className={`flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive('/admin/establishments')
                  ? 'border-l-4 border-indigo-500 bg-slate-800 text-white shadow-md'
                  : 'text-gray-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Building className="mr-3 h-5 w-5 flex-shrink-0" />
              Établissements
            </Link>

            <Link
              to="/admin/users"
              className={`flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive('/admin/users')
                  ? 'border-l-4 border-indigo-500 bg-slate-800 text-white shadow-md'
                  : 'text-gray-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Users className="mr-3 h-5 w-5 flex-shrink-0" />
              Utilisateurs
            </Link>
            <Link
              to="/profile"
              className={`flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive('/profile')
                  ? 'border-l-4 border-indigo-500 bg-slate-800 text-white shadow-md'
                  : 'text-gray-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Settings className="mr-3 h-5 w-5 flex-shrink-0" />
              Mon Profil
            </Link>
          </nav>
        </div>

        <div className="absolute bottom-0 w-64 border-t border-slate-700 bg-slate-800 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-slate-700"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {isActive('/admin/dashboard') && 'Tableau de bord'}
              {isActive('/admin/establishments') && 'Gestion des Établissements'}
              {isActive('/admin/users') && 'Gestion des Utilisateurs'}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Retour au site
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
