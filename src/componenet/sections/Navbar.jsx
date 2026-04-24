import { memo, useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { LanguageContext } from "../../context/LanguageContext";
import { Logo } from "../ui/logo";

const Navbar = memo(() => {
  const { language, setLanguage, t } = useContext(LanguageContext);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isHome = location.pathname === "/";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  // Smooth scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navLinks = [
    { key: "home", href: "/", section: "home" },
    { key: "features", href: "#features", section: "features" },
    { key: "testimonials", href: "#testimonials", section: "testimonials" },
    { key: "team", href: "#team", section: "team" },
  ];

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "om", name: "Oromo", flag: "🇪🇹" },
  ];

  return (
    <>
      {/* Overlay when mobile menu is open */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-lg border-b border-gray-200"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" onClick={handleLinkClick} className="flex items-center gap-2">
              <Logo size="md" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => {
                    if (link.section && isHome) {
                      scrollToSection(link.section);
                    } else if (link.href.startsWith("/")) {
                      window.location.href = link.href;
                    }
                  }}
                  className="text-sm font-medium transition-colors hover:text-[#0056D2] text-gray-700"
                >
                  {t(link.key)}
                </button>
              ))}

              {/* Language Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#0056D2] text-gray-700"
                >
                  <span>{languages.find(l => l.code === language)?.flag}</span>
                  <span>{languages.find(l => l.code === language)?.name}</span>
                  <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                          language === lang.code ? "text-[#0056D2] font-semibold" : "text-gray-700"
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sign In Button */}
              <Link
                to="/login"
                className="px-5 py-2 rounded-full font-semibold transition-all duration-300 bg-[#0056D2] text-white hover:bg-[#0045a8] shadow-md"
              >
                {t("signIn")}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors text-gray-700"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-b border-gray-200 py-4 px-6 flex flex-col gap-4 z-50">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => {
                    if (link.section && isHome) {
                      scrollToSection(link.section);
                      handleLinkClick();
                    } else if (link.href.startsWith("/")) {
                      window.location.href = link.href;
                    }
                  }}
                  className="text-gray-700 text-base font-medium py-2 hover:text-[#0056D2] transition text-left"
                >
                  {t(link.key)}
                </button>
              ))}

              {/* Mobile Language Switcher */}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs text-gray-500 mb-2">Select Language</p>
                <div className="flex gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        handleLinkClick();
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                        language === lang.code
                          ? "bg-[#0056D2] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="text-sm">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Sign In Button */}
              <Link
                to="/login"
                onClick={handleLinkClick}
                className="bg-[#0056D2] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#0045a8] transition"
              >
                {t("JoinNow")}
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
});

Navbar.displayName = "Navbar";

export { Navbar };