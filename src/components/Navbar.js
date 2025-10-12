import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Search, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home', ageRange: '' },
    { path: '/primary', label: 'Primary', ageRange: '6-11 Years Old' },
    { path: '/preschool', label: 'Pre-School', ageRange: '2-5 Years Old' },
    { path: '/11plus', label: '11+', ageRange: '11 Years Old' },
    { path: '/gcses', label: 'GCSEs', ageRange: '14-16 Years Old' },
    { path: '/alevels', label: 'A-Levels', ageRange: '16-18 Years Old' },
  ];

  const isActive = (path) => location.pathname === path;

  // ✅ Enhanced search handler
  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value.trim().toLowerCase();

    if (!searchTerm) return;

    // Try to match user input with one of the nav links
    const matchedPage = navLinks.find((link) =>
      link.label.toLowerCase().includes(searchTerm) ||
      link.path.toLowerCase().includes(searchTerm)
    );

    if (matchedPage) {
      navigate(matchedPage.path);
    } else {
      alert('No matching page found.');
    }

    setIsSearchOpen(false);
    e.target.reset();
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const getPageContent = () => {
    switch (location.pathname) {
      case '/':
        return { title: 'Learning Simplified', items: ['Expert Tutoring', 'Proven Results', 'Personalized Learning'] };
      case '/preschool':
        return { title: 'Pre-School Learning', items: ['Pre-School Apps', 'Pre-School Activity Books'] };
      case '/primary':
        return { title: 'Primary Education', items: ['KS2 Maths', 'KS2 English', 'KS2 Science'] };
      case '/11plus':
        return { title: '11+ Preparation', items: ['11+ Apps', '11+ Workbook Series', '11+ Exam Packs'] };
      case '/gcses':
        return { title: 'GCSE Programs', items: ['GCSE Maths', 'GCSE Chemistry', 'GCSE Physics', 'GCSE Biology'] };
      case '/alevels':
        return { title: 'A-Level Courses', items: ['Maths', 'Chemistry', 'Physics', 'Biology'] };
      default:
        return { title: 'Learning Simplified', items: ['Expert Tutoring', 'Proven Results', 'Personalized Learning'] };
    }
  };

  const pageContent = getPageContent();

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 to-blue-700 py-3 px-4 md:px-6 lg:px-8 shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left side - Logo */}
          <div className="flex items-center gap-2 md:gap-3">
            <img
              src="/images/leftIcon.png"
              alt="EduExcellence Icon"
              className="w-8 h-8 md:w-10 md:h-10 object-contain hover:rotate-12 transition-transform duration-500 cursor-pointer filter drop-shadow-lg"
              onError={(e) => (e.target.style.display = 'none')}
              onClick={() => navigate('/')}
            />
            <div
              className="text-base md:text-xl font-bold text-white cursor-pointer hover:scale-105 transform transition-all duration-300 drop-shadow-md"
              onClick={() => navigate('/')}
            >
              Learning Adventure
            </div>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex gap-6 list-none">
            {navLinks.map((link) => (
              <li key={link.path} className="text-center">
                <button
                  onClick={() => navigate(link.path)}
                  className={`font-medium transition-all duration-300 py-1 px-3 rounded-xl group text-white relative overflow-hidden ${
                    isActive(link.path)
                      ? 'bg-white/30 text-white font-semibold shadow-lg'
                      : 'text-blue-100 hover:bg-white/20 hover:text-white hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-semibold leading-tight">{link.label}</span>
                    {link.ageRange && (
                      <span className="text-xs text-blue-100 group-hover:text-white transition-colors duration-300 mt-1 leading-none">
                        {link.ageRange}
                      </span>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>

          {/* Right side - Desktop */}
          <div className="hidden md:flex items-center gap-3 md:gap-4">
            {/* ✅ Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                name="search"
                placeholder="Search..."
                className="pl-3 pr-8 py-1 rounded-full border border-blue-400 bg-blue-500/50 focus:outline-none focus:border-white w-32 md:w-40 text-white placeholder-blue-200 text-sm transition-colors duration-200 hover:border-blue-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white transition-colors duration-200"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* User Icon */}
            <div className="relative">
              <img
                src="/images/rightIcon.png"
                alt="User Icon"
                className="w-8 h-8 object-contain rounded-full border-2 border-blue-400 hover:border-white transition-colors duration-300 cursor-pointer"
                onError={(e) => (e.target.style.display = 'none')}
              />
              <div
                id="fallback-icon"
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 cursor-pointer hidden hover:scale-105 transition-transform duration-300"
              >
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Controls */}
          <div className="flex md:hidden items-center gap-3">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:text-blue-200 transition-colors duration-200"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-200 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden mt-3 animate-fadeIn">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                name="search"
                placeholder="Search..."
                className="w-full pl-3 pr-10 py-2 rounded-full border border-blue-400 bg-blue-500/50 focus:outline-none focus:border-white text-white placeholder-blue-200 text-sm"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white transition-colors duration-200"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-2 animate-fadeIn">
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-300 ${
                      isActive(link.path)
                        ? 'bg-white/30 text-white font-semibold shadow-lg'
                        : 'text-blue-100 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-base font-semibold">{link.label}</span>
                      {link.ageRange && <span className="text-xs text-blue-200 mt-1">{link.ageRange}</span>}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Bottom Container Box */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
            <div className="text-white font-bold text-base md:text-lg min-w-max flex items-center gap-2 md:gap-3">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              {pageContent.title}
            </div>
            <div className="flex flex-wrap items-center gap-3 md:gap-6">
              {pageContent.items.map((item, i) => (
                <div key={i} className="text-white text-xs md:text-sm font-medium">
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
