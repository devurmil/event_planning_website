import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth, Authenticated, Unauthenticated } from "@/lib/auth";
import { SignOutButton } from "../SignOutButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-full px-2">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 items-center leading-none rounded-2xl max-w-6xl mx-auto px-6 py-2 bg-slate-900/50 backdrop-blur-md border border-white/10 shadow-sm text-white">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-white">EventSphere</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-purple-600 bg-purple-50"
                    : "text-white hover:text-purple-600 hover:bg-purple-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex justify-end items-center space-x-4">
              <Authenticated>
                <Link
                  to="/admin"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Admin
                </Link>
                <SignOutButton />
              </Authenticated>
              <Unauthenticated>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Login
                </Link>
              </Unauthenticated>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none"
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

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(link.path)
                      ? "text-purple-600 bg-purple-50"
                      : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Authenticated>
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-md"
                >
                  Admin
                </Link>
              </Authenticated>
              <Unauthenticated>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-md"
                >
                  Login
                </Link>
              </Unauthenticated>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
