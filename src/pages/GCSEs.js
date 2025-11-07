import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

const GCSEs = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [ninjaText, setNinjaText] = useState('');
  const [isNinjaTyping, setIsNinjaTyping] = useState(true);
  const [is3DButtonHovered, setIs3DButtonHovered] = useState(false);
  const [hoveredCircle, setHoveredCircle] = useState(null);
  const [showMiniCircles, setShowMiniCircles] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPortraitLock, setShowPortraitLock] = useState(false);

  const navigate = useNavigate();

  const dialogLines = ["I'm KAI", "Can I help?"];
  const ninjaLines = ["Ready", "Steady", "Succeed"];

  // GCSEs specific images for mobile - using PNGs
  const gcseImages = [
    { src: '/images/landscape/gc1.png', alt: 'GCSE Preparation 1', title: 'Math Revision' },
    { src: '/images/landscape/gc2.jpg', alt: 'GCSE Preparation 2', title: 'Science Labs' },
    { src: '/images/landscape/gc3.png', alt: 'GCSE Preparation 3', title: 'English Literature' },
    { src: '/images/landscape/gc4.png', alt: 'GCSE Preparation 4', title: 'History Studies' },
    { src: '/images/landscape/gc5.png', alt: 'GCSE Preparation 5', title: 'Geography Research' },
    { src: '/images/landscape/gc6.png', alt: 'GCSE Preparation 6', title: 'Language Skills' },
    { src: '/images/landscape/gc7.png', alt: 'GCSE Preparation 7', title: 'Exam Techniques' }
  ];

  // Navigation menu items - same as home page
  const menuItems = [
    { href: "/primary", text: "Primary", description: "6-11 Years Old" },
    { href: "/preschool", text: "Pre-School", description: "2-5 Years Old" },
    { href: "/11plus", text: "11+", description: "11 Years Old" },
    { href: "/gcses", text: "GCSEs", description: "14-16 Years Old" },
    { href: "/alevels", text: "A-Levels", description: "16-18 Years Old" },
  ];

  // Assessment categories for instant assess button (Mobile Only)
  const assessmentCategories = [
    { title: "Math", gradient: "from-purple-600 via-purple-500 to-pink-500", shadow: "shadow-purple-500/50", glow: "shadow-purple-400", angle: -60, href: "/math-assessment" },
    { title: "Science", gradient: "from-blue-600 via-blue-500 to-cyan-500", shadow: "shadow-blue-500/50", glow: "shadow-blue-400", angle: -20, href: "/science-assessment" },
    { title: "English", gradient: "from-green-600 via-green-500 to-emerald-500", shadow: "shadow-green-500/50", glow: "shadow-green-400", angle: 20, href: "/english-assessment" },
    { title: "History", gradient: "from-orange-600 via-orange-500 to-yellow-500", shadow: "shadow-orange-500/50", glow: "shadow-orange-400", angle: 60, href: "/history-assessment" }
  ];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      
      // Check if device is in portrait mode and is mobile
      const isMobile = window.innerWidth < 1100;
      const isPortrait = window.innerHeight > window.innerWidth;
      
      if (isMobile && isPortrait) {
        setShowPortraitLock(true);
      } else {
        setShowPortraitLock(false);
      }
    };

    const preventTouch = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    document.addEventListener('touchstart', preventTouch, { passive: false });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      document.removeEventListener('touchstart', preventTouch);
    };
  }, []);

  // Responsive calculations
  const isMobile = windowSize.width < 1100;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isDesktop = windowSize.width >= 1024;
  const isLandscape = windowSize.width > windowSize.height;
  const isMobileLandscape = isMobile && isLandscape;
  const isMobilePortrait = isMobile && !isLandscape;
  const isSmallMobileLandscape = isMobileLandscape && windowSize.width < 700;
  const isDesktopLandscape = isDesktop && isLandscape;
  const isTabletPortrait = isTablet && !isLandscape;

  // Use BBC-style layout for both mobile landscape and portrait
  const useBbcLayout = isMobileLandscape || isMobilePortrait;

  // Show instant assess only on mobile screens
  const showInstantAssess = isMobile || isTablet;

  // Navigation handler
  const handleNavigation = (href) => {
    navigate(href);
  };

  // Get background image based on screen size
  const getBackgroundImage = () => {
    if (useBbcLayout) return "/images/landscape/gc1.png";
    if (isMobile) return "/images/gcse_mob.png";
    if (isTabletPortrait) return "/images/tab_gcse.png";
    return "/images/GCSEs.png";
  };

  // Responsive sizes
  const getResponsiveSize = (mobile, tablet, desktop, landscapeMobile = null, smallLandscape = null) => {
    if (isSmallMobileLandscape && smallLandscape !== null) return smallLandscape;
    if (isMobileLandscape && landscapeMobile !== null) return landscapeMobile;
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  // Circle position calculation for mobile only
  const getCirclePosition = (angle, radius, index) => {
    // For mobile portrait, position circles in a grid
    if (isMobilePortrait && showMiniCircles) {
      const cols = 2; // 2 columns
      const rows = 2; // 2 rows
      const col = index % cols;
      const row = Math.floor(index / cols);
      const spacingX = 80; // Horizontal spacing
      const spacingY = 80; // Vertical spacing
      return { 
        x: (col * spacingX) - (spacingX * (cols - 1) / 2), 
        y: (row * spacingY) - (spacingY * (rows - 1) / 2) - 100 // Move up from center
      };
    }
    
    // For mobile landscape, position in a horizontal line
    if (isMobileLandscape && showMiniCircles) {
      const totalCircles = assessmentCategories.length;
      const spacing = 70;
      const startX = -((totalCircles - 1) * spacing) / 2;
      return { 
        x: startX + (index * spacing), 
        y: -80
      };
    }
    
    if (isTablet) {
      const totalCircles = assessmentCategories.length;
      const spacing = 180;
      const startX = -((totalCircles - 1) * spacing) / 2;
      return { 
        x: startX + (index * spacing), 
        y: -80
      };
    }
    
    const radian = (angle * Math.PI) / 180;
    return { x: Math.cos(radian) * radius, y: Math.sin(radian) * radius };
  };

  const handleInstantAssessmentTap = () => {
    if (showInstantAssess) {
      setShowMiniCircles(prev => !prev);
    }
  };

  const handleMiniCircleTap = (href) => {
    if (showInstantAssess) {
      handleNavigation(href);
      setShowMiniCircles(false);
    } else {
      handleNavigation(href);
    }
  };

  const handleMenuStateChange = (isOpen) => {
    setIsMenuOpen(isOpen);
    if (isOpen) {
      setIs3DButtonHovered(false);
      setShowMiniCircles(false);
    }
  };

  const handleContainerClick = (e) => {
    if (e.target === e.currentTarget && showInstantAssess) {
      setShowMiniCircles(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showInstantAssess && showMiniCircles) {
        const buttonContainer = document.querySelector('.instant-assessment-container');
        if (buttonContainer && !buttonContainer.contains(e.target)) {
          setShowMiniCircles(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showMiniCircles, showInstantAssess]);

  // Function to determine ninja position
  const getNinjaPosition = () => {
    if (useBbcLayout) return 'mb-[-5px] scale-75';
    if (isMobile) return isLandscape ? 'mb-[-5px] scale-90' : 'mb-[-15px]';
    if (isTablet) return 'mb-[20px]';
    return 'mb-[-40px]';
  };

  // Function to determine ninja dialog position
  const getNinjaDialogPosition = () => {
    if (isDesktopLandscape) return 'bottom-1/2 left-full transform translate-y-1/2 ml-4 scale-50';
    if (useBbcLayout) return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2 scale-90';
    if (isMobile) return isLandscape ? 'bottom-full left-1/2 transform -translate-x-1/2 mb-2' : 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
    if (isTablet) return 'bottom-full left-1/2 transform -translate-x-1/2 mb-3';
    return 'bottom-full left-1/2 transform -translate-x-1/2 mb-4';
  };

  // Function to determine plus menu position
  const getPlusMenuPosition = () => {
    if (useBbcLayout) return 'bottom-2 left-2 scale-85';
    if (isMobile) return isLandscape ? 'bottom-4 left-4' : 'bottom-20 left-4';
    if (isTablet) return 'bottom-16 right-10';
    return 'bottom-16 right-10';
  };

  // Function to determine instant assess button position (Mobile only)
  const getInstantAssessButtonPosition = () => {
    if (isDesktopLandscape) return 'top-1/2 right-32 transform -translate-y-1/2 scale-100';
    if (isMobilePortrait) return 'bottom-4 right-4 transform scale-75';
    if (isMobileLandscape) return 'bottom-4 right-4 transform scale-65';
    if (isTablet) return 'bottom-6 right-6 transform scale-90';
    return 'bottom-8 right-8 transform scale-100';
  };

  const getJellyMenuMaxHeight = () => {
    if (useBbcLayout) return 'max-h-32';
    return 'max-h-96';
  };

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

  // Ninja dialog typing animation
  useEffect(() => {
    if (isNinjaTyping) {
      const fullText = ninjaLines.join('\n');
      if (ninjaText.length < fullText.length) {
        const timer = setTimeout(() => {
          setNinjaText(fullText.slice(0, ninjaText.length + 1));
        }, 50);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setNinjaText('');
          setIsNinjaTyping(true);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [ninjaText, isNinjaTyping, ninjaLines]);

  return (
    <div className={`min-h-screen bg-white relative overflow-x-hidden ${showPortraitLock ? 'backdrop-blur-sm' : ''}`} onClick={handleContainerClick}>
      {/* Portrait Lock Dialog */}
      {showPortraitLock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl border border-gray-200">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Portrait Mode Locked</h3>
            <p className="text-gray-600 mb-4">Please switch to landscape mode for the best experience.</p>
            <div className="w-12 h-12 mx-auto mb-4 animate-bounce">
              <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <p className="text-sm text-gray-500">Rotate your device to continue</p>
          </div>
        </div>
      )}

      {useBbcLayout ? (
        // BBC-style Layout for Mobile (Both Landscape and Portrait)
        <div className={`w-full h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-y-auto ${showPortraitLock ? 'blur-sm' : ''}`}>
          {/* Green Navbar - Now part of scrollable content */}
          <div className="relative z-50">
            <Navbar onMenuStateChange={handleMenuStateChange} />
          </div>

          {/* BBC-style header bar */}
          <div className="sticky top-0 left-0 right-0 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 z-40 flex items-center px-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
              <span className="text-white font-bold text-sm tracking-tight">GCSE PREPARATION</span>
            </div>
            <div className="ml-auto flex items-center space-x-3">
              <div className="w-4 h-4 bg-white/20 rounded"></div>
              <div className="w-4 h-4 bg-white/20 rounded"></div>
              <div className="w-4 h-4 bg-white/20 rounded"></div>
            </div>
          </div>

          {/* BBC-style main content grid - Adjusted for portrait */}
          <div className="p-4">
            {/* Main featured story - BBC style */}
            <div className="mb-6">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <div className={`relative w-full ${isMobilePortrait ? 'h-64' : 'h-48'} overflow-hidden`}>
                  <img
                    src="/images/landscape/gc1.png"
                    alt="GCSE Preparation Hero"
                    className="w-full h-full object-contain"
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                      WebkitBackfaceVisibility: 'hidden',
                      backfaceVisibility: 'hidden'
                    }}
                  />
                </div>
                <div className="p-4">
                  <h1 className={`${isMobilePortrait ? 'text-2xl' : 'text-xl'} font-bold text-gray-900 mb-2`}>GCSE Exam Preparation</h1>
                  <p className="text-gray-600 text-sm mb-3">Comprehensive revision and exam strategies for Key Stage 4</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>Ages 14-16</span>
                    <span className="mx-2">•</span>
                    <span>Key Stage 4</span>
                    <span className="mx-2">•</span>
                    <span>Core Subjects</span>
                  </div>
                </div>
              </div>
            </div>

            {/* BBC-style secondary stories grid - Adjusted columns for portrait */}
            <div className={`grid ${isMobilePortrait ? 'grid-cols-2' : 'grid-cols-2'} gap-4 mb-6`}>
              {gcseImages.slice(1, isMobilePortrait ? 5 : 3).map((image, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
                  <div className={`relative w-full ${isMobilePortrait ? 'h-40' : 'h-32'} overflow-hidden`}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-contain"
                      style={{
                        imageRendering: '-webkit-optimize-contrast',
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden'
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">{image.title}</h3>
                    <div className="w-8 h-1 bg-red-500 mb-2"></div>
                    <p className="text-xs text-gray-600">Essential exam preparation</p>
                  </div>
                </div>
              ))}
            </div>

            {/* BBC-style more stories section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">More GCSE Subjects</h2>
                <div className="w-12 h-1 bg-blue-500"></div>
              </div>
              
              <div className="space-y-4">
                {gcseImages.slice(isMobilePortrait ? 5 : 3).map((image, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    <div className="flex">
                      <div className={`relative ${isMobilePortrait ? 'w-32 h-32' : 'w-24 h-24'} overflow-hidden flex-shrink-0`}>
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-contain"
                          style={{
                            imageRendering: '-webkit-optimize-contrast',
                            WebkitBackfaceVisibility: 'hidden',
                            backfaceVisibility: 'hidden'
                          }}
                        />
                      </div>
                      <div className="p-3 flex-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-2">{image.title}</h3>
                        <p className="text-xs text-gray-600 line-clamp-2">Master key concepts and exam techniques for success</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <span>Revision</span>
                          <span className="mx-2">•</span>
                          <span>Practice</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BBC-style trending section */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-6">
              <div className="flex items-center mb-3">
                <div className="w-3 h-6 bg-blue-600 mr-2"></div>
                <h3 className="text-md font-bold text-gray-900">Core Subjects</h3>
              </div>
              <div className={`grid ${isMobilePortrait ? 'grid-cols-2' : 'grid-cols-2'} gap-2`}>
                {['Mathematics', 'Science', 'English', 'Languages'].map((item, index) => (
                  <div key={index} className="bg-white rounded p-2 text-center border border-gray-300">
                    <span className="text-xs font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* BBC-style footer section */}
            <div className="border-t border-gray-300 pt-4">
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
                  <span className="text-xs text-gray-600 font-medium">GCSE PREPARATION</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-600">AGES 14-16</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation - Now part of scrollable content */}
          <div className="sticky bottom-0 left-0 right-0 z-40 mt-6">
            <BottomNav />
          </div>
        </div>
      ) : (
        // Original layout for other screen sizes
        <div className={`relative ${showPortraitLock ? 'blur-sm' : ''}`}>
          {/* Green Navbar */}
          <div className="relative z-50">
            <Navbar onMenuStateChange={handleMenuStateChange} />
          </div>

          {/* Background Image */}
          <div className="relative z-0 w-full" style={{ height: 'calc(100vh - 120px)' }}>
            <img 
              src={getBackgroundImage()} 
              alt="GCSEs Background" 
              className="w-full h-full object-cover"
              style={{
                imageRendering: '-webkit-optimize-contrast',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden'
              }}
            />
          </div>

          {/* Bottom Navigation */}
          <div className="relative z-40">
            <BottomNav />
          </div>
        </div>
      )}

      {/* Interactive Elements - Fixed position elements that stay visible */}
      <div className="fixed inset-0 z-40 pointer-events-none">
        {/* Instant Assessment Button - MOBILE ONLY */}
        {showInstantAssess && !isMenuOpen && (
          <div 
            className={`fixed instant-assessment-container ${getInstantAssessButtonPosition()} pointer-events-auto`}
            style={{ touchAction: 'manipulation' }}
            onMouseEnter={() => !isMobile && setIs3DButtonHovered(true)}
            onMouseLeave={() => {
              if (!isMobile) {
                setIs3DButtonHovered(false);
                setHoveredCircle(null);
              }
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative" style={{ 
              width: getResponsiveSize('120px', '150px', '180px', '80px', '70px'), 
              height: getResponsiveSize('120px', '150px', '180px', '80px', '70px') 
            }}>
              <div className="absolute inset-0">
                {assessmentCategories.map((category, index) => {
                  const radius = getResponsiveSize(80, 100, 120, 50, 45);
                  const position = getCirclePosition(category.angle, radius, index);
                  const circleSize = getResponsiveSize('50px', '60px', '70px', '35px', '30px');
                  
                  const shouldShowMiniCircles = isMobile || isTablet ? showMiniCircles : is3DButtonHovered;
                  
                  return (
                    <div key={category.title} className={`absolute transition-all duration-700 ease-out ${shouldShowMiniCircles ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                      style={{ 
                        left: '50%', 
                        top: '50%', 
                        transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`, 
                        transitionDelay: shouldShowMiniCircles ? `${index * 120}ms` : '0ms' 
                      }}
                      onMouseEnter={() => !isMobile && setHoveredCircle(index)}
                      onMouseLeave={() => !isMobile && setHoveredCircle(null)}>
                      {!isMobile && !isMobilePortrait && (
                        <svg className={`absolute transition-all duration-500 ${shouldShowMiniCircles ? 'opacity-100' : 'opacity-0'}`}
                          style={{ 
                            left: '50%', 
                            top: '50%', 
                            transform: `translate(-50%, -50%)`, 
                            width: isTablet ? `${Math.abs(position.x) * 2 + 50}px` : `${radius + 50}px`, 
                            height: isTablet ? '100px' : `${radius + 50}px`, 
                            pointerEvents: 'none', 
                            transitionDelay: shouldShowMiniCircles ? `${index * 120 + 200}ms` : '0ms' 
                          }}>
                          {isTablet && (
                            <path 
                              d={`M ${(Math.abs(position.x) * 2 + 50) / 2} ${50} L ${(Math.abs(position.x) * 2 + 50) / 2 + position.x} ${50 + position.y}`} 
                              stroke="rgba(251, 191, 36, 0.6)" 
                              strokeWidth="3" 
                              fill="none" 
                              strokeDasharray="5,5" 
                            />
                          )}
                          {!isTablet && (
                            <path 
                              d={`M ${(radius + 50) / 2} ${(radius + 50) / 2} L ${(radius + 50) / 2 - position.x} ${(radius + 50) / 2 - position.y}`} 
                              stroke="rgba(251, 191, 36, 0.6)" 
                              strokeWidth="3" 
                              fill="none" 
                              strokeDasharray="5,5" 
                            />
                          )}
                          <circle 
                            cx={isTablet ? `${(Math.abs(position.x) * 2 + 50) / 2 + position.x}` : `${(radius + 50) / 2 - position.x}`} 
                            cy={isTablet ? `${50 + position.y}` : `${(radius + 50) / 2 - position.y}`} 
                            r="4" 
                            fill="#fbbf24" 
                            className="drop-shadow-lg" 
                            style={{ filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.8))' }} 
                          />
                        </svg>
                      )}
                      <div 
                        className={`relative rounded-full transform transition-all duration-400 cursor-pointer ${!isMobile && hoveredCircle === index ? 'scale-110 rotate-12' : 'scale-100 rotate-0'} bg-gradient-to-br ${category.gradient} shadow-xl ${category.shadow} ${!isMobile && hoveredCircle === index ? `${category.glow} shadow-2xl` : ''}`}
                        style={{ 
                          width: circleSize, 
                          height: circleSize, 
                          border: '3px solid rgba(255, 255, 255, 0.3)',
                          boxShadow: !isMobile && hoveredCircle === index ? `0 12px 30px ${category.shadow.replace('/50', '/60')}, inset 0 -3px 8px rgba(0,0,0,0.3), inset 0 3px 8px rgba(255,255,255,0.3)` : '0 6px 20px rgba(0,0,0,0.3), inset 0 -2px 6px rgba(0,0,0,0.3), inset 0 2px 6px rgba(255,255,255,0.2)' 
                        }}
                        onClick={() => handleMiniCircleTap(category.href)}
                      >
                        <div className="absolute inset-1 rounded-full border border-white/20"></div>
                        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
                        <div className="relative z-10 flex flex-col items-center justify-center h-full p-1">
                          <span className="text-white font-black tracking-wider mb-0.5 drop-shadow-lg" style={{ 
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)', 
                            fontSize: getResponsiveSize('0.5rem', '0.6rem', '0.7rem', '0.4rem', '0.35rem') 
                          }}>
                            {category.title}
                          </span>
                        </div>
                        {!isMobile && <div className={`absolute inset-0 rounded-full transition-all duration-500 ${hoveredCircle === index ? 'opacity-100' : 'opacity-0'}`} style={{ border: '1px dashed rgba(255, 255, 255, 0.4)', animation: hoveredCircle === index ? 'spin 3s linear infinite' : 'none' }}></div>}
                        {!isMobile && hoveredCircle === index && (
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
                className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ${!isMobile && is3DButtonHovered ? 'scale-110' : 'scale-100'} ${isDesktop ? 'cursor-default' : 'cursor-pointer'} group`}
                style={{ 
                  width: getResponsiveSize('60px', '70px', '80px', '40px', '35px'), 
                  height: getResponsiveSize('60px', '70px', '80px', '40px', '35px'), 
                  background: 'linear-gradient(145deg, #fbbf24, #f59e0b, #d97706)', 
                  boxShadow: !isMobile && is3DButtonHovered ? '0 15px 35px rgba(251, 191, 36, 0.6), 0 0 60px rgba(251, 191, 36, 0.4), inset 0 -5px 12px rgba(0,0,0,0.4), inset 0 5px 12px rgba(255,255,255,0.3)' : '0 8px 20px rgba(251, 191, 36, 0.4), 0 0 30px rgba(251, 191, 36, 0.2), inset 0 -3px 10px rgba(0,0,0,0.3), inset 0 3px 10px rgba(255,255,255,0.2)', 
                  border: '3px solid rgba(255, 255, 255, 0.3)'
                }}
                onClick={handleInstantAssessmentTap}
                onMouseEnter={() => !isMobile && setIs3DButtonHovered(true)}
                onMouseLeave={() => !isMobile && setIs3DButtonHovered(false)}
              >
                <div className="absolute inset-0 rounded-full" style={{ border: '2px solid rgba(0, 0, 0, 0.2)', boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.5), inset 0 -1px 3px rgba(0,0,0,0.3)' }}></div>
                {!isMobile && <div className={`absolute inset-0 rounded-full transition-opacity duration-500 ${is3DButtonHovered ? 'opacity-100' : 'opacity-60'}`} style={{ border: '1px dashed rgba(255, 255, 255, 0.3)', animation: is3DButtonHovered ? 'spin 4s linear infinite' : 'none' }}></div>}
                <div className={`absolute rounded-full transition-opacity duration-700 ${!isMobile && is3DButtonHovered ? 'opacity-100' : 'opacity-60'}`} style={{ inset: getResponsiveSize('0.8rem', '1rem', '1rem', '0.4rem', '0.35rem'), background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)', animation: !isMobile && is3DButtonHovered ? 'pulse 1.5s ease-in-out infinite' : 'none' }}></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <div className="relative mb-0.5">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
                    <svg className="text-white drop-shadow-lg relative z-10" style={{ 
                      width: getResponsiveSize('1rem', '1.25rem', '1.5rem', '0.6rem', '0.5rem'), 
                      height: getResponsiveSize('1rem', '1.25rem', '1.5rem', '0.6rem', '0.5rem') 
                    }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <span className="text-white font-black tracking-wider drop-shadow-lg block" style={{ 
                      textShadow: '1px 1px 3px rgba(0,0,0,0.5), 0 0 8px rgba(255,255,255,0.3)', 
                      fontSize: getResponsiveSize('0.5rem', '0.6rem', '0.7rem', '0.3rem', '0.28rem') 
                    }}>
                      INSTANT
                    </span>
                    <div className="text-white font-bold tracking-wide drop-shadow-lg" style={{ 
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)', 
                      fontSize: getResponsiveSize('0.4rem', '0.5rem', '0.6rem', '0.25rem', '0.22rem') 
                    }}>
                      ASSESS
                    </div>
                    <span className="text-white/90 font-semibold mt-0.5 block" style={{ 
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)', 
                      fontSize: getResponsiveSize('0.3rem', '0.4rem', '0.4rem', '0.2rem', '0.18rem') 
                    }}>
                      Powered by KAI
                    </span>
                  </div>
                </div>
                {!isMobile && (
                  <div className={`absolute inset-0 rounded-full overflow-hidden transition-opacity duration-500 ${is3DButtonHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent shine-animation"></div>
                  </div>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Floating Plus Menu with Robot and Dialog - Responsive Positioning */}
        <nav 
          className={`btn-pluss-wrapper fixed z-50 flex flex-col items-center transition-all duration-300 pointer-events-auto ${getPlusMenuPosition()}`}
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
          onClick={() => isMobile && setIsHovered(!isHovered)}
        >
          {/* Robot Image with Cartoon Dialog - Always Visible */}
          <div className="flex flex-col items-center mb-2">
            {/* Cartoon Dialog */}
            <div 
              className="bg-white rounded-2xl px-3 py-2 shadow-lg border border-gray-200 mb-2 relative"
              style={{
                minWidth: getResponsiveSize('100px', '120px', '120px', '90px', '80px'),
                minHeight: getResponsiveSize('35px', '40px', '40px', '30px', '25px')
              }}
            >
              <div 
                className="font-medium text-gray-800"
                style={{
                  fontSize: getResponsiveSize('0.75rem', '0.875rem', '0.875rem', '0.7rem', '0.65rem')
                }}
              >
                {displayedText}
                <span className="inline-block w-1 h-3 bg-gray-800 ml-1 animate-pulse"></span>
              </div>
              {/* Speech bubble tail */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-200"></div>
            </div>
            
            {/* Robot Image */}
            <img 
              src="/images/bot_kai.png" 
              alt="KAI Robot" 
              className="object-contain drop-shadow-lg transition-transform duration-300 hover:scale-110"
              style={{
                width: getResponsiveSize('2.5rem', '3rem', '3rem', '2rem', '1.75rem'),
                height: getResponsiveSize('2.5rem', '3rem', '3rem', '2rem', '1.75rem')
              }}
            />
          </div>

          {/* Menu Container */}
          <div className={`
            btn-pluss bg-blue-900 overflow-hidden flex flex-col items-center
            transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            ${isHovered ? 'h-auto rounded-2xl pb-3 pt-3 shadow-2xl' : 'h-12 rounded-full shadow-lg'}
            border border-blue-700
          `}
          style={{
            width: isHovered ? getResponsiveSize('10rem', '11rem', '11rem', '9rem', '8rem') : getResponsiveSize('3rem', '3rem', '3rem', '2.5rem', '2.25rem')
          }}>
            {/* Plus Button with Jelly Animation Both Ways */}
            <div className={`
              bg-red-600 rounded-full flex items-center justify-center text-white font-bold
              transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              ${isHovered ? 'rotate-45 scale-105' : 'rotate-0 scale-100'}
              shadow-lg hover:shadow-xl border border-red-500
            `}
            style={{
              width: getResponsiveSize('2.5rem', '3rem', '3rem', '2rem', '1.75rem'),
              height: getResponsiveSize('2.5rem', '3rem', '3rem', '2rem', '1.75rem'),
              fontSize: getResponsiveSize('1rem', '1.25rem', '1.25rem', '0.875rem', '0.8rem')
            }}>
              +
            </div>
            
            {/* Menu Items with Jelly Staggered Animation Both Ways */}
            <ul className={`
              transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] px-3 w-full overflow-y-auto ${getJellyMenuMaxHeight()}
              ${isHovered ? 'opacity-100 mt-4' : 'opacity-0 mt-0'}
            `}
            style={{ 
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,255,255,0.3) transparent'
            }}>
              {menuItems.map((item, index) => (
                <li 
                  key={index}
                  className={`
                    bg-white rounded-lg transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    transform border border-gray-100 shadow-sm
                    ${isHovered 
                      ? `mb-2 opacity-100 translate-x-0 scale-100` 
                      : 'opacity-0 translate-x-8 scale-90'
                    }
                    hover:bg-blue-50 hover:border-blue-200 hover:scale-105 hover:shadow-md
                    cursor-pointer
                  `}
                  style={{
                    height: isHovered ? getResponsiveSize('2.5rem', '3rem', '3rem', '2.25rem', '2rem') : '0',
                    transitionDelay: isHovered 
                      ? `${index * 100}ms` 
                      : `${(menuItems.length - index - 1) * 80}ms`
                  }}
                  onClick={() => handleNavigation(item.href)}
                >
                  <div 
                    className="text-blue-900 font-medium block w-full h-full flex flex-col items-center justify-center transition-colors duration-300 hover:text-blue-700 p-1"
                    style={{
                      fontSize: getResponsiveSize('0.7rem', '0.8rem', '0.875rem', '0.65rem', '0.6rem')
                    }}
                  >
                    <span className="font-semibold">{item.text}</span>
                    <span 
                      className="text-gray-600"
                      style={{
                        fontSize: getResponsiveSize('0.6rem', '0.7rem', '0.75rem', '0.55rem', '0.5rem')
                      }}
                    >
                      {item.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Ninja Image with Cartoon Dialog - Responsive Positioning */}
        <div className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 pointer-events-auto ${getNinjaPosition()}`}>
          <div className="relative flex flex-col items-center">
            {/* UPDATED: Ninja Dialog - Now positioned to the right for desktop landscape */}
            <div className={`absolute ${getNinjaDialogPosition()}`}>
              <div className="bg-white rounded-2xl px-3 py-2 shadow-lg border border-gray-200 relative" style={{ 
                maxWidth: getResponsiveSize('140px', '160px', '180px', '120px', '100px'), 
                minHeight: getResponsiveSize('60px', '70px', '80px', '50px', '45px') 
              }}>
                <div className="font-medium text-gray-800 whitespace-pre-line text-center" style={{ 
                  fontSize: getResponsiveSize('0.7rem', '0.8rem', '0.875rem', '0.65rem', '0.6rem') 
                }}>
                  {ninjaText}
                  <span className="inline-block w-1 h-3 bg-gray-800 ml-1 animate-pulse"></span>
                </div>
                {/* UPDATED: Pointer arrow positioned for right-side placement */}
                <div className={`absolute ${
                  isDesktopLandscape 
                    ? 'right-full top-1/2 transform -translate-y-1/2 -translate-x-1/2 rotate-[135deg]' 
                    : 'top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45'
                } bg-white border-r border-b border-gray-200`} style={{ 
                  width: getResponsiveSize('0.5rem', '0.6rem', '0.75rem', '0.4rem', '0.35rem'), 
                  height: getResponsiveSize('0.5rem', '0.6rem', '0.75rem', '0.4rem', '0.35rem') 
                }}></div>
              </div>
            </div>
            
            {/* Ninja Image */}
            <img 
              src="/images/ninja.png" 
              alt="Ninja character offering help" 
              className="object-contain drop-shadow-lg" 
              style={{ 
                width: getResponsiveSize(
                  isLandscape ? '8rem' : '12rem', 
                  '14rem', 
                  '20rem', 
                  '6rem', 
                  '5rem'
                ), 
                height: getResponsiveSize(
                  isLandscape ? '8rem' : '12rem', 
                  '14rem', 
                  '20rem', 
                  '6rem', 
                  '5rem'
                ) 
              }} 
            />
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-auto">
          <BottomNav />
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

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

        /* Custom scrollbar for GCSE theme */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #dbeafe;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #2563eb;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #1d4ed8;
        }
        
        /* For Firefox */
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: #2563eb #dbeafe;
        }

        /* Mobile-specific optimizations */
        @media (max-width: 767px) and (orientation: landscape) {
          .btn-pluss-wrapper {
            transform: scale(0.85);
          }
        }

        @media (max-width: 640px) and (orientation: landscape) {
          .btn-pluss-wrapper {
            transform: scale(0.75);
          }
        }

        @media (max-width: 500px) and (orientation: landscape) {
          .btn-pluss-wrapper {
            transform: scale(0.65);
          }
        }

        /* Prevent text selection on mobile */
        @media (max-width: 767px) {
          * {
            -webkit-tap-highlight-color: transparent;
          }
        }

        .btn-pluss ul::-webkit-scrollbar {
          width: 4px;
        }
        
        .btn-pluss ul::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .btn-pluss ul::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }
        
        .btn-pluss ul::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default GCSEs;