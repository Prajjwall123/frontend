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
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#05213b]/95 backdrop-blur-md shadow-xl' : 'bg-[#05213b]'}`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center space-x-3">
                <img
                  src={whiteLogo}
                  alt="Gradly Logo"
                  className="h-9 w-auto transition-transform duration-300 hover:scale-105"
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
                    ? 'text-[#05213b] bg-white shadow-md hover:shadow-lg'
                    : 'text-white/90 hover:text-white hover:bg-white/10 hover:shadow-inner'
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
              className="px-5 py-1.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 flex items-center border border-white/20 hover:border-white/30"
            >
              <LogIn size={18} className="mr-1.5" />
              Log In
            </Link>
            <Link
              to="/register"
              className="px-5 py-1.5 bg-white text-[#05213b] text-sm font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] transform"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-1.5 rounded-xl text-white/90 hover:text-white hover:bg-white/10 focus:outline-none transition-all duration-300 border border-white/20 hover:border-white/30"
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
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-3 pb-6 space-y-2 bg-[#05213b] border-t border-white/10 shadow-inner rounded-b-2xl">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`group flex items-center px-5 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                location.pathname === item.path
                  ? 'bg-white/10 text-white shadow-inner'
                  : 'text-white/90 hover:bg-white/10 hover:text-white hover:pl-6 transform'
              }`}
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
