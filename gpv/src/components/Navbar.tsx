// components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GPVLOGO from '../assets/GPV logo.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    // Reset scrolled state when route changes
    setScrolled(window.scrollY > 10);
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  // Transparent only on homepage when not scrolled; solid everywhere else
  const isTransparent = isHome && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent ? 'bg-transparent' : 'bg-amber-950 shadow-2xl'
      }`}
    >
      {/* Top accent line — only visible when solid */}
      <div
        className={`h-0.5 bg-linear-to-r from-amber-400 via-yellow-300 to-amber-400 transition-opacity duration-300 ${
          isTransparent ? 'opacity-0' : 'opacity-100'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-3">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400 rounded-full opacity-20 group-hover:opacity-30 transition-opacity blur-sm" />
              <img src={GPVLOGO} alt="GPV logo" className="w-10 h-10 relative object-contain" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-amber-300 font-bold text-sm tracking-widest uppercase">Golden Premium</span>
              <span className="text-amber-100 text-xs tracking-[0.2em] uppercase font-light">Ventures</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 rounded-lg group ${
                  isActive(to)
                    ? 'text-amber-300'
                    : 'text-amber-100 hover:text-amber-300'
                }`}
              >
                {label}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-amber-400 transition-all duration-200 ${
                    isActive(to) ? 'w-4/5' : 'w-0 group-hover:w-4/5'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/admin"
                  className="flex items-center gap-2 bg-amber-400 text-amber-950 px-5 py-2 rounded-full text-sm font-bold hover:bg-amber-300 transition-all hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  Admin Panel
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-amber-300 border border-amber-700 hover:border-amber-400 px-4 py-2 rounded-full text-sm font-medium hover:text-amber-200 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-amber-400 text-amber-950 px-5 py-2 rounded-full text-sm font-bold hover:bg-amber-300 transition-all hover:scale-105"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Admin Login
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-amber-300 p-2 rounded-lg hover:bg-amber-800 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-amber-950 border-t border-amber-800 px-4 pb-4 pt-2 flex flex-col gap-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive(to)
                  ? 'bg-amber-800 text-amber-300'
                  : 'text-amber-100 hover:bg-amber-800 hover:text-amber-300'
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="mt-2 pt-2 border-t border-amber-800">
            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <Link
                  to="/admin"
                  className="bg-amber-400 text-amber-950 px-4 py-3 rounded-xl text-sm font-bold text-center"
                >
                  Admin Panel
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-amber-300 border border-amber-700 px-4 py-3 rounded-xl text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="block bg-amber-400 text-amber-950 px-4 py-3 rounded-xl text-sm font-bold text-center"
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;