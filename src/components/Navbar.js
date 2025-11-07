import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Search, User, ChevronUp, ChevronDown } from "lucide-react";

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

  // Robot and Instant Assess States
  const [isHovered, setIsHovered] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [is3DButtonHovered, setIs3DButtonHovered] = useState(false);
  const [hoveredCircle, setHoveredCircle] = useState(null);
  const [showMiniCircles, setShowMiniCircles] = useState(false);

  const navLinks = [
    { path: "/", label: "Home", ageRange: "" },
    { path: "/primary", label: "Primary", ageRange: "6-11 Years Old" },
    { path: "/preschool", label: "Pre-School", ageRange: "2-5 Years Old" },
    { path: "/11plus", label: "11+", ageRange: "11 Years Old" },
    { path: "/gcses", label: "GCSEs", ageRange: "14-16 Years Old" },
    { path: "/alevels", label: "A-Levels", ageRange: "16-18 Years Old" },
  ];

  // Assessment categories for instant assess button
  const assessmentCategories = [
    { title: "Math", gradient: "from-purple-600 via-purple-500 to-pink-500", shadow: "shadow-purple-500/50", glow: "shadow-purple-400", angle: -60, href: "/math-assessment" },
    { title: "Science", gradient: "from-blue-600 via-blue-500 to-cyan-500", shadow: "shadow-blue-500/50", glow: "shadow-blue-400", angle: -20, href: "/science-assessment" },
    { title: "English", gradient: "from-green-600 via-green-500 to-emerald-500", shadow: "shadow-green-500/50", glow: "shadow-green-400", angle: 20, href: "/english-assessment" },
    { title: "Reading", gradient: "from-orange-600 via-orange-500 to-yellow-500", shadow: "shadow-orange-500/50", glow: "shadow-orange-400", angle: 60, href: "/reading-assessment" }
  ];

  // Check window size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowSize.width >= 1024;
  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isLandscape = windowSize.width > windowSize.height;

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

  // Robot dialog lines
  const dialogLines = ["I'm KAI", "Can I help?"];

  // KAI Robot typing animation
  useEffect(() => {
    if (currentLine < dialogLines.length) {
      const currentText = dialogLines[currentLine];
      
      if (isTyping) {
        if (displayedText.length < currentText.length) {
          const timer = setTimeout(() => {
            setDisplayedText(currentText.slice(0, displayedText.length + 1));
          }, 100);
          return () => clearTimeout(timer);
        } else {
          const timer = setTimeout(() => {
            setIsTyping(false);
            setTimeout(() => {
              if (currentLine === dialogLines.length - 1) {
                setCurrentLine(0);
                setDisplayedText('');
                setIsTyping(true);
              } else {
                setCurrentLine(prev => prev + 1);
                setDisplayedText('');
                setIsTyping(true);
              }
            }, 2000);
          }, 1000);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [displayedText, currentLine, isTyping, dialogLines]);

  // Instant Assessment Functions
  const handleInstantAssessmentTap = () => {
    setShowMiniCircles(prev => !prev);
  };

  const handleMiniCircleTap = (href) => {
    navigate(href);
    setShowMiniCircles(false);
  };

  const getCirclePosition = (angle, radius, index) => {
    if (isMobile) {
      const totalCircles = assessmentCategories.length;
      const spacing = 60;
      const startX = -((totalCircles - 1) * spacing) / 2;
      return { 
        x: startX + (index * spacing), 
        y: -60
      };
    }
    
    if (isTablet) {
      const totalCircles = assessmentCategories.length;
      const spacing = 80;
      const startX = -((totalCircles - 1) * spacing) / 2;
      return { 
        x: startX + (index * spacing), 
        y: -70
      };
    }
    
    const radian = (angle * Math.PI) / 180;
    return { x: Math.cos(radian) * radius, y: Math.sin(radian) * radius };
  };

  // Notify parent component when menu state changes
  useEffect(() => {
    if (onMenuStateChange) {
      onMenuStateChange(isMenuOpen);
    }
  }, [isMenuOpen, onMenuStateChange]);

  // Check if drawer content is scrollable
  const checkScrollability = () => {
    const drawerContent = document.querySelector('.drawer-content');
    if (drawerContent) {
      const isContentScrollable = drawerContent.scrollHeight > drawerContent.clientHeight;
      setIsScrollable(isContentScrollable);
      updateScrollIndicators(drawerContent);
    }
  };

  // Update scroll indicators
  const updateScrollIndicators = (element) => {
    if (!element) return;
    
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;
    
    setShowScrollTop(scrollTop > 10);
    setShowScrollBottom(scrollTop + clientHeight < scrollHeight - 10);
  };

  // Handle drawer scroll
  const handleDrawerScroll = (e) => {
    updateScrollIndicators(e.target);
  };

  // Scroll drawer to top
  const scrollToTop = () => {
    const drawerContent = document.querySelector('.drawer-content');
    if (drawerContent) {
      drawerContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Scroll drawer to bottom
  const scrollToBottom = () => {
    const drawerContent = document.querySelector('.drawer-content');
    if (drawerContent) {
      drawerContent.scrollTo({ 
        top: drawerContent.scrollHeight, 
        behavior: 'smooth' 
      });
    }
  };

  // Effect to check scrollability when menu opens/closes or window resizes
  useEffect(() => {
    if (isMenuOpen) {
      // Small delay to ensure DOM is updated
      setTimeout(checkScrollability, 100);
      
      // Add resize listener
      window.addEventListener('resize', checkScrollability);
      
      return () => {
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, [isMenuOpen]);

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
      <nav className="bg-gradient-to-r from-blue-600 to-blue-700 py-3 px-4 sm:px-6 md:px-8 lg:px-10 shadow-2xl z-50 relative">
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

          {/* Right Icons - Updated with Robot and Instant Assess */}
          <div className="hidden sm:flex items-center gap-3 md:gap-4">
            {/* Instant Assessment Button */}
            <div className="relative instant-assessment-container">
              <div className="relative" style={{ 
                width: isMobile ? '80px' : isTablet ? '100px' : '120px', 
                height: isMobile ? '80px' : isTablet ? '100px' : '120px' 
              }}>
                <div className="absolute inset-0">
                  {assessmentCategories.map((category, index) => {
                    const radius = isMobile ? 50 : isTablet ? 60 : 80;
                    const position = getCirclePosition(category.angle, radius, index);
                    const circleSize = isMobile ? '35px' : isTablet ? '45px' : '55px';
                    
                    return (
                      <div key={category.title} className={`absolute transition-all duration-700 ease-out ${showMiniCircles ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                        style={{ 
                          left: '50%', 
                          top: '50%', 
                          transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`, 
                          transitionDelay: showMiniCircles ? `${index * 120}ms` : '0ms' 
                        }}
                        onMouseEnter={() => setHoveredCircle(index)}
                        onMouseLeave={() => setHoveredCircle(null)}>
                        <div 
                          className={`relative rounded-full transform transition-all duration-400 cursor-pointer ${hoveredCircle === index ? 'scale-110 rotate-12' : 'scale-100 rotate-0'} bg-gradient-to-br ${category.gradient} shadow-xl ${category.shadow} ${hoveredCircle === index ? `${category.glow} shadow-2xl` : ''}`}
                          style={{ 
                            width: circleSize, 
                            height: circleSize, 
                            border: '3px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: hoveredCircle === index ? `0 12px 30px ${category.shadow.replace('/50', '/60')}, inset 0 -3px 8px rgba(0,0,0,0.3), inset 0 3px 8px rgba(255,255,255,0.3)` : '0 6px 20px rgba(0,0,0,0.3), inset 0 -2px 6px rgba(0,0,0,0.3), inset 0 2px 6px rgba(255,255,255,0.2)' 
                          }}
                          onClick={() => handleMiniCircleTap(category.href)}
                        >
                          <div className="absolute inset-1 rounded-full border border-white/20"></div>
                          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
                          <div className="relative z-10 flex flex-col items-center justify-center h-full p-1">
                            <span className="text-white font-black tracking-wider mb-0.5 drop-shadow-lg" style={{ 
                              textShadow: '2px 2px 4px rgba(0,0,0,0.5)', 
                              fontSize: isMobile ? '0.4rem' : isTablet ? '0.5rem' : '0.6rem' 
                            }}>
                              {category.title}
                            </span>
                          </div>
                          <div className={`absolute inset-0 rounded-full transition-all duration-500 ${hoveredCircle === index ? 'opacity-100' : 'opacity-0'}`} style={{ border: '1px dashed rgba(255, 255, 255, 0.4)', animation: hoveredCircle === index ? 'spin 3s linear infinite' : 'none' }}></div>
                          {hoveredCircle === index && (
                            <div className="absolute inset-0 rounded-full overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent shine-animation"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button 
                  className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ${is3DButtonHovered ? 'scale-110' : 'scale-100'} cursor-pointer group`}
                  style={{ 
                    width: isMobile ? '40px' : isTablet ? '50px' : '60px', 
                    height: isMobile ? '40px' : isTablet ? '50px' : '60px', 
                    background: 'linear-gradient(145deg, #fbbf24, #f59e0b, #d97706)', 
                    boxShadow: is3DButtonHovered ? '0 15px 35px rgba(251, 191, 36, 0.6), 0 0 60px rgba(251, 191, 36, 0.4), inset 0 -5px 12px rgba(0,0,0,0.4), inset 0 5px 12px rgba(255,255,255,0.3)' : '0 8px 20px rgba(251, 191, 36, 0.4), 0 0 30px rgba(251, 191, 36, 0.2), inset 0 -3px 10px rgba(0,0,0,0.3), inset 0 3px 10px rgba(255,255,255,0.2)', 
                    border: '3px solid rgba(255, 255, 255, 0.3)'
                  }}
                  onClick={handleInstantAssessmentTap}
                  onMouseEnter={() => setIs3DButtonHovered(true)}
                  onMouseLeave={() => {
                    setIs3DButtonHovered(false);
                    setHoveredCircle(null);
                  }}
                >
                  <div className="absolute inset-0 rounded-full" style={{ border: '2px solid rgba(0, 0, 0, 0.2)', boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.5), inset 0 -1px 3px rgba(0,0,0,0.3)' }}></div>
                  <div className={`absolute inset-0 rounded-full transition-opacity duration-500 ${is3DButtonHovered ? 'opacity-100' : 'opacity-60'}`} style={{ border: '1px dashed rgba(255, 255, 255, 0.3)', animation: is3DButtonHovered ? 'spin 4s linear infinite' : 'none' }}></div>
                  <div className={`absolute rounded-full transition-opacity duration-700 ${is3DButtonHovered ? 'opacity-100' : 'opacity-60'}`} style={{ inset: isMobile ? '0.4rem' : isTablet ? '0.6rem' : '0.8rem', background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)', animation: is3DButtonHovered ? 'pulse 1.5s ease-in-out infinite' : 'none' }}></div>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <div className="relative mb-0.5">
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
                      <svg className="text-white drop-shadow-lg relative z-10" style={{ 
                        width: isMobile ? '0.8rem' : isTablet ? '1rem' : '1.2rem', 
                        height: isMobile ? '0.8rem' : isTablet ? '1rem' : '1.2rem' 
                      }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <span className="text-white font-black tracking-wider drop-shadow-lg block" style={{ 
                        textShadow: '1px 1px 3px rgba(0,0,0,0.5), 0 0 8px rgba(255,255,255,0.3)', 
                        fontSize: isMobile ? '0.3rem' : isTablet ? '0.4rem' : '0.5rem' 
                      }}>
                        INSTANT
                      </span>
                      <div className="text-white font-bold tracking-wide drop-shadow-lg" style={{ 
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)', 
                        fontSize: isMobile ? '0.25rem' : isTablet ? '0.3rem' : '0.4rem' 
                      }}>
                        ASSESS
                      </div>
                    </div>
                  </div>
                  {is3DButtonHovered && (
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent shine-animation"></div>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Robot with Dialog */}
            <div className="relative flex items-center">
              {/* Cartoon Dialog */}
              <div 
                className="bg-white rounded-2xl px-3 py-2 shadow-lg border border-gray-200 mr-2 relative"
                style={{
                  minWidth: '100px',
                  minHeight: '35px'
                }}
              >
                <div 
                  className="font-medium text-gray-800 text-sm"
                >
                  {displayedText}
                  <span className="inline-block w-1 h-3 bg-gray-800 ml-1 animate-pulse"></span>
                </div>
                {/* Speech bubble tail */}
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-200"></div>
              </div>
              
              {/* Robot Image */}
              <img 
                src="/images/bot_kai.png" 
                alt="KAI Robot" 
                className="w-8 h-8 object-contain drop-shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300"
              />
            </div>

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

      {/* ===== Drawer Menu for Tablets & Mobile ===== */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end lg:hidden transition-all duration-300">
          <div className="bg-blue-600 w-4/5 sm:w-3/5 md:w-2/5 h-full flex flex-col relative">
            {/* Scroll to top indicator */}
            {isScrollable && showScrollTop && (
              <button
                onClick={scrollToTop}
                className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 bg-blue-700 hover:bg-blue-800 text-white p-1 rounded-full shadow-lg transition-all duration-200"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            )}

            {/* Drawer content with scroll */}
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

              {/* Additional content to demonstrate scrolling */}
              <div className="mt-6 pt-4 border-t border-blue-500">
                <h3 className="text-white font-semibold mb-3">Quick Links</h3>
                <div className="flex flex-col gap-2">
                  {["About Us", "Contact", "FAQ", "Privacy Policy", "Terms of Service"].map((item, index) => (
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

            {/* Scroll to bottom indicator */}
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

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .shine-animation { animation: shine 2s infinite; }
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
      `}</style>
    </>
  );
};

export default Navbar;