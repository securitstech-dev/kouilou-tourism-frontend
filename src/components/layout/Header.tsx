import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../common/Button';
import { LogOut, User as UserIcon, Menu } from 'lucide-react';
import { useState } from 'react';

export const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold gradient-text">KouilouHub</span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/search" className="text-gray-600 hover:text-primary-600">
              Explorer
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-primary-600">
              À propos
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-primary-600">
                  <UserIcon size={20} />
                  <span className="font-medium">{user?.firstName}</span>
                </Link>
                {user?.role === 'OPERATOR' && (
                  <Link to="/operator/dashboard">
                    <Button variant="outline" size="sm">Dashboard</Button>
                  </Link>
                )}
                {user?.role === 'ADMIN' && (
                  <Link to="/admin/dashboard">
                    <Button variant="danger" size="sm">Admin</Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={logout} leftIcon={<LogOut size={16} />}>
                  Déconnexion
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Se connecter</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">S'inscrire</Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu (Simplifié pour Phase 6) */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white p-4">
          <nav className="flex flex-col gap-4">
             <Link to="/search" className="text-gray-600">Explorer</Link>
             {!isAuthenticated && (
               <>
                 <Link to="/login" className="text-primary-600 font-medium">Se connecter</Link>
                 <Link to="/register" className="text-primary-600 font-medium">S'inscrire</Link>
               </>
             )}
          </nav>
        </div>
      )}
    </header>
  );
};
