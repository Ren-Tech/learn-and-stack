import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

const ElevenPlus = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [ninjaText, setNinjaText] = useState('');
  const [isNinjaTyping, setIsNinjaTyping] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const navigate = useNavigate();

  const dialogLines = ["I'm KAI", "Can I help?"];
  const ninjaLines = ["Ready", "Steady", "Succeed"];

  // 11+ specific images for mobile - using PNGs
  const elevenPlusImages = [
    { src: '/images/landscape/el1.png', alt: '11+ Preparation 1', title: 'Verbal Reasoning' },
    { src: '/images/landscape/el2.png', alt: '11+ Preparation 2', title: 'Non-Verbal Reasoning' },
    { src: '/images/landscape/el3.png', alt: '11+ Preparation 3', title: 'Math Skills' },
    { src: '/images/landscape/el4.png', alt: '11+ Preparation 4', title: 'English Comprehension' },
    { src: '/images/landscape/el5.png', alt: '11+ Preparation 5', title: 'Practice Tests' },
    { src: '/images/landscape/el6.png', alt: '11+ Preparation 6', title: 'Time Management' },
    { src: '/images/landscape/el7.png', alt: '11+ Preparation 7', title: 'Problem Solving' },
    { src: '/images/landscape/el8.png', alt: '11+ Preparation 8', title: 'Creative Writing' },
    { src: '/images/landscape/el9.png', alt: '11+ Preparation 9', title: 'Exam Strategies' },
    { src: '/images/landscape/el10.png', alt: '11+ Preparation 10', title: 'Confidence Building' }
  ];

  // Navigation menu items - same as home page
  const menuItems = [
    { href: "/primary", text: "Primary", description: "6-11 Years Old" },
    { href: "/preschool", text: "Pre-School", description: "2-5 Years Old" },
    { href: "/11plus", text: "11+", description: "11 Years Old" },
    { href: "/gcses", text: "GCSEs", description: "14-16 Years Old" },
    { href: "/alevels", text: "A-Levels", description: "16-18 Years Old" },
  ];

  // Handle window resize
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

  // Responsive calculations
  const isMobile = windowSize.width < 1100;
  const isTablet = windowSize.width >= 1024 && windowSize.width < 1280;
  const isLandscape = windowSize.width > windowSize.height;
  const isMobileLandscape = isMobile && isLandscape;
  const isMobilePortrait = isMobile && !isLandscape;
  const isTabletPortrait = isTablet && !isLandscape;

  // Use BBC-style layout for both mobile landscape and portrait
  const useBbcLayout = isMobileLandscape || isMobilePortrait;

  // Navigation handler
  const handleNavigation = (href) => {
    navigate(href);
  };

  // Get background image based on screen size
  const getBackgroundImage = () => {
    if (useBbcLayout) return "/images/landscape/el1.png";
    if (isMobile) return "/images/11.png";
    if (isTabletPortrait) return "/images/tab_11.png";
    return "/images/11+.png";
  };

  // Responsive sizes
  const getResponsiveSize = (mobile, tablet, desktop, landscapeMobile = null, smallLandscape = null) => {
    if (isMobileLandscape && landscapeMobile !== null) return landscapeMobile;
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  // Function to determine ninja position - moved higher for tablet
  const getNinjaPosition = () => {
    if (useBbcLayout) return 'mb-[-5px] scale-75';
    if (isMobile) return isLandscape ? 'mb-[-5px] scale-90' : 'mb-[-15px]';
    if (isTablet) return 'mb-[20px]';
    return 'mb-[-40px]';
  };

  // Function to determine ninja dialog position - adjusted for tablet
  const getNinjaDialogPosition = () => {
    if (useBbcLayout) return 'top-2 -right-1 translate-x-full scale-90';
    if (isMobile) return isLandscape ? 'top-4 -right-1 translate-x-full' : 'top-12 -right-1 translate-x-full';
    if (isTablet) return 'top-4 -right-1 translate-x-full';
    return 'top-20 -right-2 translate-x-full';
  };

  // Function to determine plus menu position
  const getPlusMenuPosition = () => {
    if (useBbcLayout) return 'bottom-2 left-2 scale-85';
    if (isMobile) return isLandscape ? 'bottom-4 left-4' : 'bottom-20 left-4';
    if (isTablet) return 'bottom-16 right-10';
    return 'bottom-16 right-10';
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
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {useBbcLayout ? (
        // BBC-style Layout for Mobile (Both Landscape and Portrait)
        <div className="w-full h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 overflow-y-auto">
          {/* Green Navbar - Now part of scrollable content */}
          <div className="relative z-50">
            <Navbar />
          </div>

          {/* BBC-style header bar */}
          <div className="sticky top-0 left-0 right-0 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 z-40 flex items-center px-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              </div>
              <span className="text-white font-bold text-sm tracking-tight">11+ PREPARATION</span>
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
                <img
                  src="/images/landscape/el1.png"
                  alt="11+ Preparation Hero"
                  className={`w-full ${isMobilePortrait ? 'h-64' : 'h-48'} object-cover`}
                />
                <div className="p-4">
                  <h1 className={`${isMobilePortrait ? 'text-2xl' : 'text-xl'} font-bold text-gray-900 mb-2`}>11+ Exam Preparation</h1>
                  <p className="text-gray-600 text-sm mb-3">Comprehensive preparation for grammar school entrance exams</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>Age 11</span>
                    <span className="mx-2">•</span>
                    <span>Grammar School</span>
                    <span className="mx-2">•</span>
                    <span>Exam Focus</span>
                  </div>
                </div>
              </div>
            </div>

            {/* BBC-style secondary stories grid - Adjusted columns for portrait */}
            <div className={`grid ${isMobilePortrait ? 'grid-cols-2' : 'grid-cols-2'} gap-4 mb-6`}>
              {elevenPlusImages.slice(1, isMobilePortrait ? 5 : 3).map((image, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`w-full ${isMobilePortrait ? 'h-40' : 'h-32'} object-cover`}
                  />
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">{image.title}</h3>
                    <div className="w-8 h-1 bg-blue-500 mb-2"></div>
                    <p className="text-xs text-gray-600">Essential skills development</p>
                  </div>
                </div>
              ))}
            </div>

            {/* BBC-style more stories section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">More Preparation Topics</h2>
                <div className="w-12 h-1 bg-red-500"></div>
              </div>
              
              <div className="space-y-4">
                {elevenPlusImages.slice(isMobilePortrait ? 5 : 3).map((image, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    <div className="flex">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className={`${isMobilePortrait ? 'w-32 h-32' : 'w-24 h-24'} object-cover flex-shrink-0`}
                      />
                      <div className="p-3 flex-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-2">{image.title}</h3>
                        <p className="text-xs text-gray-600 line-clamp-2">Build confidence and master essential exam techniques</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <span>Practice</span>
                          <span className="mx-2">•</span>
                          <span>Progress</span>
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
                <div className="w-3 h-6 bg-purple-600 mr-2"></div>
                <h3 className="text-md font-bold text-gray-900">Key Focus Areas</h3>
              </div>
              <div className={`grid ${isMobilePortrait ? 'grid-cols-2' : 'grid-cols-2'} gap-2`}>
                {['Verbal Reasoning', 'Non-Verbal', 'Math Skills', 'English'].map((item, index) => (
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
                  <span className="text-xs text-gray-600 font-medium">11+ PREPARATION</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-600">AGE 11</span>
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
        <div className="relative">
          {/* Green Navbar */}
          <div className="relative z-50">
            <Navbar />
          </div>

          {/* Background Image */}
          <div className="relative z-0 w-full" style={{ height: 'calc(100vh - 120px)' }}>
            <img 
              src={getBackgroundImage()} 
              alt="11+ Background" 
              className="w-full h-full object-cover"
              style={{
                imageRendering: '-webkit-optimize-contrast',
                WebkitBackfaceVisibility: 'hidden',
                MozBackfaceVisibility: 'hidden',
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
                      : `${(menuItems.length - index) * 80}ms`
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
          <div className="relative">
            {/* Ninja Image */}
            <img 
              src="/images/ninja.png" 
              alt="Ninja" 
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
            
            {/* Ninja Cartoon Dialog - Responsive Positioning */}
            <div className={`absolute transform ${getNinjaDialogPosition()}`}>
              <div 
                className="bg-white rounded-2xl px-3 py-2 shadow-lg border border-gray-200 relative"
                style={{
                  maxWidth: getResponsiveSize('140px', '160px', '180px', '120px', '100px'),
                  minHeight: getResponsiveSize('60px', '70px', '80px', '50px', '45px')
                }}
              >
                <div 
                  className="font-medium text-gray-800 whitespace-pre-line"
                  style={{
                    fontSize: getResponsiveSize('0.7rem', '0.8rem', '0.875rem', '0.65rem', '0.6rem')
                  }}
                >
                  {ninjaText}
                  <span className="inline-block w-1 h-3 bg-gray-800 ml-1 animate-pulse"></span>
                </div>
                {/* Speech bubble tail pointing left towards ninja */}
                <div 
                  className="absolute transform -translate-y-1/2 rotate-45 bg-white border-l border-b border-gray-200"
                  style={{
                    bottom: getResponsiveSize('1.5rem', '1.75rem', '2rem', '1.25rem', '1rem'),
                    left: '-0.25rem',
                    width: getResponsiveSize('0.5rem', '0.6rem', '0.75rem', '0.4rem', '0.35rem'),
                    height: getResponsiveSize('0.5rem', '0.6rem', '0.75rem', '0.4rem', '0.35rem')
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom scrollbar for 11+ theme */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f3e8ff;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #9333ea;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #7e22ce;
        }
        
        /* For Firefox */
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: #9333ea #f3e8ff;
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

        /* Enhanced image rendering */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .btn-pluss-wrapper, .ninja-container {
            image-rendering: -webkit-optimize-contrast;
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

export default ElevenPlus;