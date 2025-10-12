import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Search, User } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home", ageRange: "" },
    { path: "/primary", label: "Primary", ageRange: "6-11 Years Old" },
    { path: "/preschool", label: "Pre-School", ageRange: "2-5 Years Old" },
    { path: "/11plus", label: "11+", ageRange: "11 Years Old" },
    { path: "/gcses", label: "GCSEs", ageRange: "14-16 Years Old" },
    { path: "/alevels", label: "A-Levels", ageRange: "16-18 Years Old" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value.trim().toLowerCase();
    if (!searchTerm) return;

    const matchedPage = navLinks.find(
      (link) =>
        link.label.toLowerCase().includes(searchTerm) ||
        link.path.toLowerCase().includes(searchTerm)
    );

    if (matchedPage) navigate(matchedPage.path);
    else alert("No matching page found.");

    setIsSearchOpen(false);
    e.target.reset();
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const getPageContent = () => {
    switch (location.pathname) {
      case "/":
        return {
          title: "Learning Simplified",
          items: ["Expert Tutoring", "Proven Results", "Personalized Learning"],
        };
      case "/preschool":
        return {
          title: "Pre-School Learning",
          items: ["Pre-School Apps", "Activity Books"],
        };
      case "/primary":
        return {
          title: "Primary Education",
          items: ["KS2 Maths", "KS2 English", "KS2 Science"],
        };
      case "/11plus":
        return {
          title: "11+ Preparation",
          items: ["11+ Apps", "Workbook Series", "Exam Packs"],
        };
      case "/gcses":
        return {
          title: "GCSE Programs",
          items: ["Maths", "Chemistry", "Physics", "Biology"],
        };
      case "/alevels":
        return {
          title: "A-Level Courses",
          items: ["Maths", "Chemistry", "Physics", "Biology"],
        };
      default:
        return {
          title: "Learning Simplified",
          items: ["Expert Tutoring", "Proven Results", "Personalized Learning"],
        };
    }
  };

  const pageContent = getPageContent();

  return (
    <>
      {/* ===== Top Navbar ===== */}
      <nav className="bg-gradient-to-r from-blue-600 to-blue-700 py-3 px-4 sm:px-6 md:px-8 lg:px-10 shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <img
              src="/images/leftIcon.png"
              alt="Edu Icon"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain hover:rotate-12 transition-transform duration-500 cursor-pointer"
              onClick={() => navigate("/")}
            />
            <div
              className="text-white font-bold text-lg sm:text-xl md:text-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => navigate("/")}
            >
              Learning Adventure
            </div>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex gap-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <button
                  onClick={() => navigate(link.path)}
                  className={`font-medium py-1 px-3 rounded-xl transition-all duration-300 ${
                    isActive(link.path)
                      ? "bg-white/30 text-white shadow-md"
                      : "text-blue-100 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-semibold">{link.label}</span>
                    {link.ageRange && (
                      <span className="text-[10px] text-blue-100 mt-1 leading-none">
                        {link.ageRange}
                      </span>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>

          {/* Right Icons */}
          <div className="hidden sm:flex items-center gap-3 md:gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                name="search"
                placeholder="Search..."
                className="pl-3 pr-8 py-1 rounded-full border border-blue-400 bg-blue-500/40 focus:outline-none focus:border-white text-white placeholder-blue-200 w-28 sm:w-36 md:w-48 text-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* User Icon */}
            <img
              src="/images/rightIcon.png"
              alt="User Icon"
              className="w-8 h-8 rounded-full border-2 border-blue-300 hover:border-white transition-colors cursor-pointer"
            />
          </div>

          {/* Mobile + Tablet Drawer Trigger */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:text-blue-200"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="lg:hidden mt-3 animate-fadeIn">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                name="search"
                placeholder="Search..."
                className="w-full pl-3 pr-10 py-2 rounded-full border border-blue-400 bg-blue-500/40 focus:outline-none focus:border-white text-white placeholder-blue-200 text-sm"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </nav>

      {/* ===== Drawer Menu for Tablets & Mobile ===== */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end lg:hidden transition-all duration-300">
          <div className="bg-blue-600 w-4/5 sm:w-3/5 md:w-2/5 h-full p-6 flex flex-col gap-4 transform translate-x-0 transition-transform duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white font-bold text-xl">Menu</h2>
              <X
                onClick={() => setIsMenuOpen(false)}
                className="w-6 h-6 text-white cursor-pointer hover:text-blue-200"
              />
            </div>

            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-300 ${
                      isActive(link.path)
                        ? "bg-white/30 text-white font-semibold shadow-lg"
                        : "text-blue-100 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-base font-semibold">
                        {link.label}
                      </span>
                      {link.ageRange && (
                        <span className="text-xs text-blue-200 mt-1">
                          {link.ageRange}
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ===== Bottom Info Banner ===== */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
            <div className="text-white font-bold text-base sm:text-lg md:text-xl flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              {pageContent.title}
            </div>
            <div className="flex flex-wrap gap-3 md:gap-6">
              {pageContent.items.map((item, i) => (
                <div key={i} className="text-white text-xs sm:text-sm font-medium">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
