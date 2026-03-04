import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { SignOutButton } from "../SignOutButton";
import { Sparkles, Menu, X, LayoutDashboard, CalendarCheck } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => { setIsOpen(false); }, [location]);

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
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "py-2 bg-[#0F0F1A]/90 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "py-4 bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg brand-gradient flex items-center justify-center shadow-glow">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Event<span className="gradient-text">Sphere</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${isActive(link.path)
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                    }`}
                >
                  {isActive(link.path) && (
                    <span className="absolute inset-0 rounded-lg brand-gradient opacity-20" />
                  )}
                  <span className="relative">{link.name}</span>
                  {!isActive(link.path) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 brand-gradient rounded-full transition-all duration-300 group-hover:w-3/4" />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop auth */}
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                /* Glass pill grouping all auth controls */
                <div className="flex items-center gap-1 px-1.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-sm">
                  <Link
                    to="/my-bookings"
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${isActive("/my-bookings")
                        ? "text-violet-300 bg-violet-500/15 shadow-[inset_0_0_0_1px_rgba(139,92,246,0.25)]"
                        : "text-white/55 hover:text-white hover:bg-white/[0.07]"
                      }`}
                  >
                    <CalendarCheck className="w-4 h-4" />
                    My Bookings
                  </Link>

                  {user?.role === "admin" && (
                    <Link
                      to="/admin"
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${isActive("/admin")
                          ? "text-violet-300 bg-violet-500/15 shadow-[inset_0_0_0_1px_rgba(139,92,246,0.25)]"
                          : "text-white/55 hover:text-white hover:bg-white/[0.07]"
                        }`}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Admin
                    </Link>
                  )}

                  {/* Thin divider before sign-out */}
                  <span className="w-px h-5 bg-white/10 mx-1 shrink-0" />

                  <SignOutButton />
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-white brand-gradient shadow-glow hover:shadow-glow-pink transition-all duration-300 hover:scale-105 glow-ring"
                >
                  Get Started
                </Link>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-[#0F0F1A]/95 backdrop-blur-xl border-l border-white/5 shadow-2xl transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="p-6 pt-20 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${isActive(link.path)
                  ? "text-white bg-white/10 border border-white/10"
                  : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="border-t border-white/5 mt-4 pt-4 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/my-bookings"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    My Bookings
                  </Link>
                  {user?.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Admin
                    </Link>
                  )}
                  <div className="px-4 py-2">
                    <SignOutButton />
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="mx-4 py-3 text-center rounded-xl text-white font-semibold brand-gradient shadow-glow"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
