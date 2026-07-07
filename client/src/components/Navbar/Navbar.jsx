import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Community", path: "/community" },
  { label: "AI Chat", path: "/ai-chat" },
  { label: "Mood Tracker", path: "/mood-tracker" },
  { label: "Resources", path: "/resources" },
];

     
export default function Navbar() {
  // add near top of Navbar.jsx
  const [isLoggedIn] = useState(true); // TODO: pull from auth context
  const [profileOpen, setProfileOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  setUser(storedUser);
}, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-mark">S</span>
          <span className="navbar__logo-text">Sukoon</span>
        </Link>

        {/* Desktop links */}
        <nav className="navbar__links">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar__link ${location.pathname === link.path ? "navbar__link--active" : ""
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth buttons */}
        <div className="navbar__auth">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#f472b6] flex items-center justify-center text-white text-sm font-semibold"
              >
                 {user?.name?.charAt(0).toUpperCase() || "U"}
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl border border-black/[0.06] shadow-lg py-1.5 z-50">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-[#2d2a3d] hover:bg-[#faf9fc]">
                    Profile
                  </Link>
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-[#2d2a3d] hover:bg-[#faf9fc]">
                    Dashboard
                  </Link>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[#faf9fc]">
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn--ghost">Log in</Link>
              <Link to="/signup" className="btn btn--gradient">Sign up</Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className={`navbar__toggle ${isOpen ? "navbar__toggle--open" : ""}`}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile ${isOpen ? "navbar__mobile--open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`navbar__mobile-link ${location.pathname === link.path ? "navbar__mobile-link--active" : ""
              }`}
          >
            {link.label}
          </Link>
        ))}
        <div className="navbar__mobile-auth">
          <Link to="/login" className="btn btn--ghost btn--block">
            Log in
          </Link>
          <Link to="/signup" className="btn btn--gradient btn--block">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}