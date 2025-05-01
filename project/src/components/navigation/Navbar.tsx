import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, GraduationCap } from 'lucide-react';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [academicsOpen, setAcademicsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Campus Map', path: '/map' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const academicPrograms = [
    { name: 'Undergraduate', programs: ['Engineering', 'Allied Health', 'Management', 'Pharmacy', 'Literature', 'Multimedia'] },
    { name: 'Postgraduate', programs: ['Law', 'MTech', 'MBA', 'Medical Sciences'] },
    { name: 'Diploma', programs: ['Computer Applications', 'Business Management', 'Healthcare'] },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap size={32} className="text-blue-600" />
            <span className="text-xl font-bold text-gray-900">UniPortal</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  location.pathname === link.path
                    ? 'text-blue-600'
                    : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Academics Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAcademicsOpen(!academicsOpen)}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Academics
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              <AnimatePresence>
                {academicsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="py-1">
                      {academicPrograms.map((category, idx) => (
                        <div key={idx} className="px-4 py-2">
                          <h3 className="text-sm font-semibold text-gray-900 mb-1">
                            {category.name}
                          </h3>
                          <div className="ml-2 space-y-1">
                            {category.programs.map((program, pidx) => (
                              <a
                                key={pidx}
                                href="#"
                                className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
                              >
                                {program}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Auth Buttons or Dashboard Link */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-2 text-base font-medium ${
                    location.pathname === link.path
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Academics Dropdown */}
              <div className="py-2">
                <button
                  onClick={() => setAcademicsOpen(!academicsOpen)}
                  className="flex items-center text-base font-medium text-gray-700 hover:text-blue-600"
                >
                  Academics
                  <ChevronDown size={16} className="ml-1" />
                </button>
                
                <AnimatePresence>
                  {academicsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 ml-4 space-y-2"
                    >
                      {academicPrograms.map((category, idx) => (
                        <div key={idx} className="py-1">
                          <h3 className="text-sm font-semibold text-gray-900 mb-1">
                            {category.name}
                          </h3>
                          <div className="ml-2 space-y-1">
                            {category.programs.map((program, pidx) => (
                              <a
                                key={pidx}
                                href="#"
                                className="block py-1 text-sm text-gray-700"
                              >
                                {program}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Auth Buttons for Mobile */}
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button fullWidth>Dashboard</Button>
                </Link>
              ) : (
                <div className="space-y-2">
                  <Link to="/login">
                    <Button variant="outline" fullWidth>
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button fullWidth>Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;