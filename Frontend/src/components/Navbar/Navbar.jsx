import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";

function Navbar({ themeStyles, theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const DarkLogo = "/src/assets/DarkLogo.png";
  const LightLogo = "/src/assets/LightLogo.png";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/aboutus" },
    { name: "Pricing", href: "/Pricing" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contactus" },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <img
              src={theme === "dark" ? DarkLogo : LightLogo}
              alt="Logo"
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <span
              className={`text-lg md:text-2xl font-bold ${themeStyles.textPrimary}`}
            >
              TRACKTNP
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`nav-link ${themeStyles.textPrimary} font-medium hover:text-blue-600 transition-colors relative group`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonBorder} border ${themeStyles.buttonHover} transition-all`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className={`h-5 w-5 ${themeStyles.textPrimary}`} />
              ) : (
                <Moon className={`h-5 w-5 ${themeStyles.textPrimary}`} />
              )}
            </button>

            {/* Login Button - Desktop */}
            <div className="hidden md:flex items-center">
              <a href="/login">
                <button className="px-7 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                  Login
                </button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${themeStyles.buttonHover} transition-all`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className={`h-6 w-6 ${themeStyles.textPrimary}`} />
              ) : (
                <Menu className={`h-6 w-6 ${themeStyles.textPrimary}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden fixed inset-0 top-16 ${
              theme === "dark" ? "bg-gray-900" : "bg-white"
            } z-40 overflow-y-auto`}
          >
            <div className="px-4 py-6 space-y-4 flex flex-col items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`block ${themeStyles.textPrimary} hover:text-blue-600 transition-colors py-3 px-4 rounded-lg text-lg font-medium text-center ${themeStyles.buttonHover}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 w-full max-w-xs">
                <a href="/login">
                  <button
                    className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg font-medium text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
