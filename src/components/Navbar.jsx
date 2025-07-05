import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, User, LogIn, BookOpen, School, Info, Mail, Home as HomeIcon, LogOut, User as UserIcon, FileText } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import whiteLogo from "../assets/white_logo.png";
import { isAuthenticated, getUserInfo, clearUserData } from "../utils/authHelper";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const user = getUserInfo();
  const isLoggedIn = isAuthenticated();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleLogout = () => {
    clearUserData();
    setUserDropdownOpen(false);
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <HomeIcon size={18} className="mr-2" /> },
    { name: 'Universities', path: '/universities', icon: <School size={18} className="mr-2" /> },
    { name: 'Programs', path: '/programs', icon: <BookOpen size={18} className="mr-2" /> },
    { name: 'About Us', path: '/about', icon: <Info size={18} className="mr-2" /> },
    { name: 'Contact', path: '/contact', icon: <Mail size={18} className="mr-2" /> },
  ];

  const userMenuItems = [
    {
      name: 'My Profile',
      path: '/profile',
      icon: <UserIcon size={16} className="mr-2 text-gray-500" />
    },
    {
      name: 'My Applications',
      path: '/my-applications',
      icon: <FileText size={16} className="mr-2 text-gray-500" />
    },
    {
      name: 'Logout',
      onClick: handleLogout,
      icon: <LogOut size={16} className="mr-2 text-gray-500" />,
      isDanger: true
    }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 bg-gray-900 border-b border-gray-800 ${scrolled ? 'bg-opacity-95 backdrop-blur-md shadow-xl' : ''}`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center space-x-3">
                <img
                  src={whiteLogo}
                  alt="Gradly Logo"
                  className="h-10 w-auto transition-transform duration-300 hover:scale-105"
                />
                <span className="text-xl font-extrabold text-white tracking-tight bg-clip-text bg-gradient-to-r from-white to-gray-200">
                  GRADLY
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-1.5 text-sm font-medium rounded-xl transition-all duration-300 flex items-center group ${location.pathname === item.path
                  ? 'text-white bg-gray-800 shadow-md hover:shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800 hover:shadow-inner'
                  }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden lg:flex items-center space-x-3 ml-6">
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-xl hover:bg-gray-800 transition-colors duration-200 focus:outline-none"
                >
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-medium">
                    {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <ChevronDown size={16} className={`text-gray-300 transition-transform duration-200 ${userDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-50">
                    <div className="py-1">
                      <div className="px-4 py-3 border-b border-gray-700">
                        <p className="text-sm font-medium text-white truncate">{user?.full_name}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                      </div>
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={(e) => {
                            if (item.onClick) {
                              e.preventDefault();
                              item.onClick();
                            }
                            setUserDropdownOpen(false);
                          }}
                          className={`flex items-center px-4 py-2.5 text-sm ${item.isDanger
                            ? 'text-red-400 hover:bg-red-900/50'
                            : 'text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-xl transition-all duration-300 flex items-center border border-gray-700 hover:border-gray-600"
                >
                  <LogIn size={18} className="mr-1.5" />
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] transform"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-1.5 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none transition-all duration-300 border border-gray-700 hover:border-gray-600"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X size={24} className="text-white" />
              ) : (
                <Menu size={24} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 text-base font-medium rounded-lg mx-2 ${location.pathname === item.path
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}

            {isLoggedIn ? (
              <div className="px-4 py-3 border-t border-gray-800">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-medium">
                    {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{user?.full_name}</p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                  </div>
                </div>
                {userMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center px-4 py-2.5 text-sm rounded-lg mx-2 ${item.isDanger
                      ? 'text-red-400 hover:bg-red-900/50'
                      : 'text-gray-300 hover:bg-gray-800'
                      }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="px-2 pt-2 pb-3 space-y-2">
                <Link
                  to="/login"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn size={18} className="mr-2" />
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-xl text-sm font-medium text-blue-700 bg-white hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
