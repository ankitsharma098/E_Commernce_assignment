import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Heart,
  Sun,
  Moon,
  Menu,
  X,
  User,
  LogOut,
  ShoppingBag,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import useAuthStore from '../../store/authStore';
import useCartStore from '../../store/cartStore';
import useWishlistStore from '../../store/wishlistStore';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuthStore();
  const totalItems = useCartStore((s) => s.getTotalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-sm border-b border-slate-200/60 dark:border-slate-800/60'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
              <ShoppingBag size={16} className="text-white" />
            </div>
            <span className="text-xl font-black text-gradient">ShopVibe</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              id="theme-toggle"
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              id="wishlist-link"
              className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              id="cart-link"
              className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
            >
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-violet-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  id="user-menu-btn"
                  onClick={() => setUserMenuOpen((p) => !p)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-7 h-7 rounded-full"
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 max-w-20 truncate">
                    {user?.name}
                  </span>
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                    >
                      <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {user?.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <button
                        id="logout-btn"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                      >
                        <LogOut size={15} />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-1">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMenuOpen((p) => !p)}
            className="md:hidden p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1 border-t border-slate-200 dark:border-slate-800">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400'
                          : 'text-slate-600 dark:text-slate-400'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="flex items-center justify-between px-4 pt-3">
                  <div className="flex items-center gap-3">
                    <Link
                      to="/wishlist"
                      onClick={() => setMenuOpen(false)}
                      className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800"
                    >
                      <Heart size={18} className="text-slate-600 dark:text-slate-400" />
                      {wishlistCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      to="/cart"
                      onClick={() => setMenuOpen(false)}
                      className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800"
                    >
                      <ShoppingCart size={18} className="text-slate-600 dark:text-slate-400" />
                      {totalItems > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-violet-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                          {totalItems}
                        </span>
                      )}
                    </Link>
                    <button onClick={toggleTheme} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                      {isDark ? <Sun size={18} className="text-slate-600 dark:text-slate-400" /> : <Moon size={18} className="text-slate-600 dark:text-slate-400" />}
                    </button>
                  </div>
                  {!isAuthenticated && (
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl"
                    >
                      Sign in
                    </Link>
                  )}
                  {isAuthenticated && (
                    <button
                      onClick={() => { handleLogout(); setMenuOpen(false); }}
                      className="flex items-center gap-1.5 text-sm text-rose-600"
                    >
                      <LogOut size={15} /> Sign out
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
