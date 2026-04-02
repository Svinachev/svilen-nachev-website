import { Link, useLocation } from "react-router-dom";
import { Instagram, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const navLinks = [
    { path: "/series", label: "Series" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex justify-between items-center">
        <Link to="/" className="text-sm lg:text-base font-semibold tracking-wider hover:opacity-60 transition-opacity">
          SVILEN NACHEV
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs lg:text-sm ${
                isActive(link.path) ? "font-semibold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/book-order"
            className={`text-xs lg:text-sm px-3 lg:px-4 py-2 border border-foreground hover:bg-foreground hover:text-background transition-colors ${
              isActive("/book-order") ? "font-semibold bg-foreground text-background" : ""
            }`}
          >
            Order My Book
          </Link>
          <a
            href="https://www.instagram.com/svilen.nachev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs lg:text-sm hover:opacity-60 transition-opacity"
          >
            <Instagram size={18} />
          </a>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-4">
          <a
            href="https://www.instagram.com/svilen.nachev/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity"
          >
            <Instagram size={18} />
          </a>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:opacity-60 transition-opacity"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Full-Viewport Mobile Menu */}
      {isOpen && (
        <>
          {/* Overlay backdrop */}
          <div
            className="fixed inset-0 bg-background z-40 animate-fade-in"
            onClick={() => setIsOpen(false)}
            style={{
              top: "var(--header-height, 0px)",
            }}
          />
          
          {/* Menu content */}
          <div
            className="fixed inset-0 z-50 px-6 animate-fade-in overflow-y-auto flex flex-col items-center justify-center"
            style={{
              top: "var(--header-height, 0px)",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-6 p-2 hover:opacity-60 transition-opacity"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <div className="w-full max-w-md flex flex-col gap-12 items-center">
              <div className="w-full flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={handleNavClick}
                    className={`text-center text-xl font-light transition-opacity hover:opacity-60 ${
                      isActive(link.path) ? "font-semibold" : ""
                    }`}
                    style={{
                      animation: isOpen ? `slideInUp 0.5s ease-out ${index * 0.08}s both` : "none",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="w-full text-center pt-8 border-t border-border">
                <Link
                  to="/book-order"
                  onClick={handleNavClick}
                  className={`inline-block text-lg font-light px-6 py-3 border border-foreground hover:bg-foreground hover:text-background transition-colors ${
                    isActive("/book-order") ? "font-semibold bg-foreground text-background" : ""
                  }`}
                  style={{
                    animation: isOpen ? "slideInUp 0.5s ease-out 0.3s both" : "none",
                  }}
                >
                  Order My Book
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
