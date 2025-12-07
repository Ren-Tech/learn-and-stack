import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Search, ChevronUp, ChevronDown } from "lucide-react";

const Navbar = ({ onMenuStateChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const navLinks = [
    { path: "/", label: "Home", ageRange: "" },
    { path: "/primary", label: "Primary", ageRange: "6-11 Years Old" },
    { path: "/preschool", label: "Pre-School", ageRange: "2-5 Years Old" },
    { path: "/11plus", label: "11+", ageRange: "11 Years Old" },
    { path: "/gcses", label: "GCSEs", ageRange: "14-16 Years Old" },
    { path: "/alevels", label: "A-Levels", ageRange: "16-18 Years Old" },
  ];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Notify parent component when menu state changes
  useEffect(() => {
    if (onMenuStateChange) {
      onMenuStateChange(isMenuOpen);
    }
  }, [isMenuOpen, onMenuStateChange]);

  // Scroll handling for drawer
  const checkScrollability = () => {
    const drawerContent = document.querySelector(".drawer-content");
    if (drawerContent) {
      const isContentScrollable =
        drawerContent.scrollHeight > drawerContent.clientHeight;
      setIsScrollable(isContentScrollable);
      updateScrollIndicators(drawerContent);
    }
  };

  const updateScrollIndicators = (element) => {
    if (!element) return;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;
    setShowScrollTop(scrollTop > 10);
    setShowScrollBottom(scrollTop + clientHeight < scrollHeight - 10);
  };

  const handleDrawerScroll = (e) => {
    updateScrollIndicators(e.target);
  };

  const scrollToTop = () => {
    const drawerContent = document.querySelector(".drawer-content");
    if (drawerContent)
      drawerContent.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    const drawerContent = document.querySelector(".drawer-content");
    if (drawerContent)
      drawerContent.scrollTo({
        top: drawerContent.scrollHeight,
        behavior: "smooth",
      });
  };

  useEffect(() => {
    if (isMenuOpen) {
      setTimeout(checkScrollability, 100);
      window.addEventListener("resize", checkScrollability);
      return () => window.removeEventListener("resize", checkScrollability);
    }
  }, [isMenuOpen]);

  const getPageContent = () => {
    switch (location.pathname) {
      case "/":
        return {
          title: "Learning Simplified",
          items: ["Expert Tutoring", "Proven Results", "Personalised Learning"],
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
      <nav className="bg-gradient-to-r from-blue-600 to-blue-700 py-3 px-4 sm:px-6 md:px-8 lg:px-10 shadow-2xl z-50">
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
          </div>

          {/* Mobile Menu Button */}
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

      {/* ===== Drawer Menu (Mobile) ===== */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end lg:hidden transition-all duration-300">
          <div className="bg-blue-600 w-4/5 sm:w-3/5 md:w-2/5 h-full flex flex-col relative">
            {isScrollable && showScrollTop && (
              <button
                onClick={scrollToTop}
                className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 bg-blue-700 hover:bg-blue-800 text-white p-1 rounded-full shadow-lg transition-all duration-200"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            )}

            <div
              className="drawer-content flex-1 p-6 overflow-y-auto"
              onScroll={handleDrawerScroll}
            >
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

              <div className="mt-6 pt-4 border-t border-blue-500">
                <h3 className="text-white font-semibold mb-3">Quick Links</h3>
                <div className="flex flex-col gap-2">
                  {[
                    "About Us",
                    "Contact",
                    "FAQ",
                    "Privacy Policy",
                    "Terms of Service",
                  ].map((item, index) => (
                    <button
                      key={index}
                      className="text-blue-100 hover:text-white hover:bg-blue-500/30 py-2 px-3 rounded-lg text-left text-sm transition-all duration-200"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {isScrollable && showScrollBottom && (
              <button
                onClick={scrollToBottom}
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10 bg-blue-700 hover:bg-blue-800 text-white p-1 rounded-full shadow-lg transition-all duration-200"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
