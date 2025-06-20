import React, { useState } from "react";
import logo from "../assets/white_logo.png";

const navLinks = [
  { name: "About us", href: "#about" },
  { name: "Universities", href: "#universities" },
  { name: "Courses", href: "#courses" },
  { name: "AI Assistant", href: "#ai-assistant" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#05213b] shadow-md">
      <nav className="max-w-[90rem] mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <span className="text-2xl font-bold tracking-tight text-white">GRADLY</span>
        </div>
        <ul className="hidden md:flex gap-8 items-center text-base font-medium">
          {navLinks.map(link => (
            <li key={link.name}>
              <a href={link.href} className="hover:underline hover:text-[#ffd700] transition">{link.name}</a>
            </li>
          ))}
        </ul>
        <a href="#get-started" className="hidden md:inline border border-white px-5 py-2 rounded-lg hover:bg-white hover:text-[#05213b] transition font-semibold">Get Started</a>
        {/* Hamburger for mobile */}
        <button className="md:hidden flex flex-col gap-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
          <span className="w-7 h-1 bg-white rounded"></span>
          <span className="w-7 h-1 bg-white rounded"></span>
          <span className="w-7 h-1 bg-white rounded"></span>
        </button>
      </nav>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#05213b] px-6 pb-4">
          <ul className="flex flex-col gap-4 text-lg font-medium">
            {navLinks.map(link => (
              <li key={link.name}>
                <a href={link.href} className="block py-1 hover:underline hover:text-[#ffd700]" onClick={() => setMenuOpen(false)}>{link.name}</a>
              </li>
            ))}
            <li>
              <a href="#get-started" className="border border-white px-5 py-2 rounded-lg hover:bg-white hover:text-[#05213b] transition font-semibold block text-center mt-2">Get Started</a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
