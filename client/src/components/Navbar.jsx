import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Menu, X, Heart, User, LogOut, Settings } from 'lucide-react';

function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 text-primary-600 hover:text-primary-700">
              <BookOpen className="h-8 w-8" />
              <span className="font-heading font-bold text-2xl">ספריית הנשר</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              בית
            </Link>
            <Link to="/books" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              ספרים
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              אודות
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/favorites" className="text-gray-700 hover:text-primary-600 font-medium transition-colors flex items-center gap-1">
                  <Heart className="h-5 w-5" />
                  <span>מועדפים</span>
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="text-gray-700 hover:text-primary-600 font-medium transition-colors flex items-center gap-1">
                    <Settings className="h-5 w-5" />
                    <span>ניהול</span>
                  </Link>
                )}
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 flex items-center gap-1">
                    <User className="h-5 w-5" />
                    {user?.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-600 font-medium transition-colors flex items-center gap-1"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>יציאה</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  התחברות
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  הרשמה
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-3">
            <Link to="/" className="block text-gray-700 hover:text-primary-600 font-medium">
              בית
            </Link>
            <Link to="/books" className="block text-gray-700 hover:text-primary-600 font-medium">
              ספרים
            </Link>
            <Link to="/about" className="block text-gray-700 hover:text-primary-600 font-medium">
              אודות
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/favorites" className="block text-gray-700 hover:text-primary-600 font-medium">
                  מועדפים
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="block text-gray-700 hover:text-primary-600 font-medium">
                    ניהול
                  </Link>
                )}
                <div className="pt-3 border-t">
                  <p className="text-gray-700 font-medium mb-2">{user?.name}</p>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 font-medium"
                  >
                    יציאה
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-gray-700 hover:text-primary-600 font-medium">
                  התחברות
                </Link>
                <Link to="/register" className="block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 text-center">
                  הרשמה
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
