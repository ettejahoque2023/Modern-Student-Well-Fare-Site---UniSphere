import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LayoutDashboard, GraduationCap, Home, BookOpen, ShoppingBag, PaintBucket, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, name: 'Dashboard', path: '/dashboard' },
    { icon: <BookOpen size={20} />, name: 'Academics', path: '/dashboard/academics' },
    { icon: <Home size={20} />, name: 'Hostel', path: '/dashboard/hostel' },
    { icon: <ShoppingBag size={20} />, name: 'Marketplace', path: '/dashboard/marketplace' },
    { icon: <PaintBucket size={20} />, name: 'Art Showcase', path: '/dashboard/art-showcase' },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap size={28} className="text-blue-600" />
              <span className="text-lg font-bold text-gray-900">UniPortal</span>
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-grow px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="space-y-2">
              <Link
                to="/settings"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Settings size={20} className="mr-3" />
                Settings
              </Link>
              <button
                onClick={logout}
                className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={20} className="mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;