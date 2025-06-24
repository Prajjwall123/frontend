import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, User, LogIn, BookOpen, School, Info, Mail, Home as HomeIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import whiteLogo from "../assets/white_logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  const navLinks = [
    { name: 'Home', path: '/', icon: <HomeIcon size={18} className="mr-2" /> },
    { name: 'Universities', path: '/universities', icon: <School size={18} className="mr-2" /> },
    { name: 'Programs', path: '/programs', icon: <BookOpen size={18} className="mr-2" /> },
    { name: 'About Us', path: '/about', icon: <Info size={18} className="mr-2" /> },
    { name: 'Contact', path: '/contact', icon: <Mail size={18} className="mr-2" /> },
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
                className={`px-4 py-1.5 text-sm font-medium rounded-xl transition-all duration-300 flex items-center group ${
                  location.pathname === item.path
                    ? 'text-white bg-gray-800 shadow-md hover:shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800 hover:shadow-inner'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3 ml-6">
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
      <div
        className={`lg:hidden fixed inset-0 bg-gray-900 border-r border-gray-800 z-40 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center w-full px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${location.pathname === item.path ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center">
                {React.cloneElement(item.icon, { className: 'mr-3' })}
                {item.name}
              </span>
            </Link>
          ))}
          <div className="pt-2 mt-2 border-t border-gray-100">
            <Link
              to="/login"
              className="flex items-center px-5 py-3 text-base font-medium text-white/90 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30"
              onClick={() => setMobileMenuOpen(false)}
            >
              <LogIn size={18} className="mr-3" />
              Log In
            </Link>
            <Link
              to="/register"
              className="flex items-center justify-center mx-4 mt-3 px-6 py-3 bg-white text-[#05213b] text-base font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
