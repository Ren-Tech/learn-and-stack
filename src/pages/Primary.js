import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

const Primary = () => {
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

  // Primary specific images for mobile - using PNGs
  const primaryImages = [
    { src: '/images/landscape/prim1.png', alt: 'Primary Activity 1', title: 'Math Skills' },
    { src: '/images/landscape/prim2.png', alt: 'Primary Activity 2', title: 'Science Exploration' },
    { src: '/images/landscape/prim3.png', alt: 'Primary Activity 3', title: 'Reading & Writing' },
    { src: '/images/landscape/prim4.png', alt: 'Primary Activity 4', title: 'Creative Arts' },
    { src: '/images/landscape/prim5.png', alt: 'Primary Activity 5', title: 'Group Projects' },
    { src: '/images/landscape/prim6.png', alt: 'Primary Activity 6', title: 'Sports & Fitness' },
    { src: '/images/landscape/prim7.png', alt: 'Primary Activity 7', title: 'Technology Skills' },
    { src: '/images/landscape/prim8.jpg', alt: 'Primary Activity 8', title: 'Music & Drama' },
    { src: '/images/landscape/prim9.jpg', alt: 'Primary Activity 9', title: 'Outdoor Learning' },
    { src: '/images/landscape/prim10.png', alt: 'Primary Activity 10', title: 'Problem Solving' }
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

  // Responsive calculations - KEEP ORIGINAL BREAKPOINTS for PC/laptop
  const isMobile = windowSize.width < 768; // KEEP original 768px breakpoint
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
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

  // Get appropriate image based on screen size
  const getBackgroundImage = () => {
    if (useBbcLayout) return "/images/landscape/prim1.png";
    if (isMobile) return "/images/home_primary.png";
    if (isTabletPortrait) return "/images/tab_primary.png";
    return "/images/primary.png";
  };

  // Responsive sizes - ENHANCED only for mobile landscape
  const getResponsiveSize = (mobile, tablet, desktop, landscapeMobile = null, smallLandscape = null) => {
    if (isMobileLandscape && landscapeMobile !== null) return landscapeMobile;
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  // Function to determine ninja position - ENHANCED only for mobile
  const getNinjaPosition = () => {
    if (useBbcLayout) return 'mb-[-10px] scale-100'; // Increased from scale-75
    if (isMobile) return isLandscape ? 'mb-[-10px] scale-100' : 'mb-[-15px]'; // Enhanced landscape
    if (isTablet) return 'mb-[20px]'; // UNCHANGED for tablet
    return 'mb-[-40px]'; // UNCHANGED for desktop
  };

  // Function to determine ninja dialog position - ENHANCED only for mobile
  const getNinjaDialogPosition = () => {
    if (useBbcLayout) return 'top-4 -right-2 translate-x-full scale-100'; // Enhanced from scale-90
    if (isMobile) return isLandscape ? 'top-6 -right-2 translate-x-full' : 'top-12 -right-1 translate-x-full'; // Enhanced landscape
    if (isTablet) return 'top-4 -right-1 translate-x-full'; // UNCHANGED for tablet
    return 'top-20 -right-2 translate-x-full'; // UNCHANGED for desktop
  };

  // Function to determine plus menu position - ENHANCED only for mobile
  const getPlusMenuPosition = () => {
    if (useBbcLayout) return 'bottom-4 left-4 scale-100'; // Enhanced from scale-85
    if (isMobile) return isLandscape ? 'bottom-6 left-6' : 'bottom-20 left-4'; // Enhanced landscape
    if (isTablet) return 'bottom-16 right-10'; // UNCHANGED for tablet
    return 'bottom-16 right-10'; // UNCHANGED for desktop
  };

  const getJellyMenuMaxHeight = () => {
    if (useBbcLayout) return 'max-h-48'; // Increased from max-h-32
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
        // BBC-style Layout for Mobile (Both Landscape and Portrait) - ENHANCED SIZES
        <div className="w-full h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 overflow-y-auto">
          {/* Green Navbar - Now part of scrollable content */}
          <div className="relative z-50">
            <Navbar />
          </div>

          {/* BBC-style header bar - Enhanced for mobile */}
          <div className="sticky top-0 left-0 right-0 h-10 bg-gradient-to-r from-green-600 to-blue-600 z-40 flex items-center px-5">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                <div className="w-3.5 h-3.5 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-white font-bold text-base tracking-tight">PRIMARY EDUCATION</span>
            </div>
            <div className="ml-auto flex items-center space-x-3">
              <div className="w-5 h-5 bg-white/20 rounded"></div>
              <div className="w-5 h-5 bg-white/20 rounded"></div>
              <div className="w-5 h-5 bg-white/20 rounded"></div>
            </div>
          </div>

          {/* BBC-style main content grid - Enhanced for mobile */}
          <div className="p-5">
            {/* Main featured story - BBC style with enhanced sizes */}
            <div className="mb-7">
              <div className="bg-white rounded-xl overflow-hidden shadow-xl border border-gray-200">
                <img
                  src="/images/landscape/prim1.png"
                  alt="Primary Education Hero"
                  className={`w-full ${isMobilePortrait ? 'h-72' : 'h-56'} object-cover`}
                />
                <div className="p-5">
                  <h1 className={`${isMobilePortrait ? 'text-2xl' : 'text-xl'} font-bold text-gray-900 mb-3`}>Primary School Education</h1>
                  <p className="text-gray-600 text-sm mb-3">Building strong foundations in core subjects and life skills</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Ages 6-11</span>
                    <span className="mx-3">•</span>
                    <span>Key Stage 1-2</span>
                    <span className="mx-3">•</span>
                    <span>Core Curriculum</span>
                  </div>
                </div>
              </div>
            </div>

            {/* BBC-style secondary stories grid - Enhanced sizes */}
            <div className={`grid ${isMobilePortrait ? 'grid-cols-2' : 'grid-cols-2'} gap-5 mb-7`}>
              {primaryImages.slice(1, isMobilePortrait ? 5 : 3).map((image, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`w-full ${isMobilePortrait ? 'h-48' : 'h-40'} object-cover`}
                  />
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">{image.title}</h3>
                    <div className="w-10 h-1 bg-orange-500 mb-2"></div>
                    <p className="text-xs text-gray-600">Essential learning skills</p>
                  </div>
                </div>
              ))}
            </div>

            {/* BBC-style more stories section - Enhanced sizes */}
            <div className="mb-7">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900">More Learning Areas</h2>
                <div className="w-14 h-1 bg-blue-500"></div>
              </div>
              
              <div className="space-y-5">
                {primaryImages.slice(isMobilePortrait ? 5 : 3).map((image, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
                    <div className="flex">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className={`${isMobilePortrait ? 'w-36 h-36' : 'w-28 h-28'} object-cover flex-shrink-0`}
                      />
                      <div className="p-4 flex-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-2">{image.title}</h3>
                        <p className="text-xs text-gray-600 line-clamp-2">Develop essential skills and knowledge for academic success</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <span>Learning</span>
                          <span className="mx-2">•</span>
                          <span>Development</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BBC-style trending section - Enhanced sizes */}
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 mb-7">
              <div className="flex items-center mb-4">
                <div className="w-3 h-6 bg-green-600 mr-2"></div>
                <h3 className="text-base font-bold text-gray-900">Core Subjects</h3>
              </div>
              <div className={`grid ${isMobilePortrait ? 'grid-cols-2' : 'grid-cols-2'} gap-3`}>
                {['Mathematics', 'Science', 'English', 'Creative Arts'].map((item, index) => (
                  <div key={index} className="bg-white rounded p-3 text-center border border-gray-300">
                    <span className="text-xs font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* BBC-style footer section */}
            <div className="border-t border-gray-300 pt-5">
              <div className="text-center">
                <div className="inline-flex items-center space-x-3 bg-gray-100 px-5 py-2 rounded-full">
                  <span className="text-xs text-gray-600 font-medium">PRIMARY EDUCATION</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-600">AGES 6-11</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation - Now part of scrollable content */}
          <div className="sticky bottom-0 left-0 right-0 z-40 mt-7">
            <BottomNav />
          </div>
        </div>
      ) : (
        // Original layout for other screen sizes - COMPLETELY UNCHANGED
        <div className="relative">
          {/* Green Navbar */}
          <div className="relative z-50">
            <Navbar />
          </div>

          {/* Background Image */}
          <div className="relative z-0 w-full" style={{ height: 'calc(100vh - 120px)' }}>
            <img 
              src={getBackgroundImage()} 
              alt="Primary Background" 
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
        {/* Floating Plus Menu with Robot and Dialog - Enhanced only for mobile */}
        <nav 
          className={`btn-pluss-wrapper fixed z-50 flex flex-col items-center transition-all duration-300 pointer-events-auto ${getPlusMenuPosition()}`}
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
          onClick={() => isMobile && setIsHovered(!isHovered)}
        >
          {/* Robot Image with Cartoon Dialog - Enhanced for mobile */}
          <div className="flex flex-col items-center mb-2">
            {/* Cartoon Dialog */}
            <div 
              className="bg-white rounded-2xl px-3 py-2 shadow-lg border border-gray-200 mb-2 relative"
              style={{
                minWidth: getResponsiveSize('110px', '120px', '120px', '100px', '90px'), // Enhanced mobile
                minHeight: getResponsiveSize('40px', '40px', '40px', '35px', '30px') // Enhanced mobile
              }}
            >
              <div 
                className="font-medium text-gray-800"
                style={{
                  fontSize: getResponsiveSize('0.8rem', '0.875rem', '0.875rem', '0.75rem', '0.7rem') // Enhanced mobile
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
                width: getResponsiveSize('2.75rem', '3rem', '3rem', '2.25rem', '2rem'), // Enhanced mobile
                height: getResponsiveSize('2.75rem', '3rem', '3rem', '2.25rem', '2rem') // Enhanced mobile
              }}
            />
          </div>

          {/* Menu Container - Enhanced only for mobile */}
          <div className={`
            btn-pluss bg-blue-900 overflow-hidden flex flex-col items-center
            transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            ${isHovered ? 'h-auto rounded-2xl pb-3 pt-3 shadow-2xl' : 'h-12 rounded-full shadow-lg'}
            border border-blue-700
          `}
          style={{
            width: isHovered ? getResponsiveSize('10.5rem', '11rem', '11rem', '9.5rem', '8.5rem') : getResponsiveSize('3rem', '3rem', '3rem', '2.75rem', '2.5rem') // Enhanced mobile
          }}>
            {/* Plus Button with Jelly Animation - Enhanced for mobile */}
            <div className={`
              bg-red-600 rounded-full flex items-center justify-center text-white font-bold
              transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              ${isHovered ? 'rotate-45 scale-105' : 'rotate-0 scale-100'}
              shadow-lg hover:shadow-xl border border-red-500
            `}
            style={{
              width: getResponsiveSize('2.75rem', '3rem', '3rem', '2.25rem', '2rem'), // Enhanced mobile
              height: getResponsiveSize('2.75rem', '3rem', '3rem', '2.25rem', '2rem'), // Enhanced mobile
              fontSize: getResponsiveSize('1.125rem', '1.25rem', '1.25rem', '1rem', '0.9rem') // Enhanced mobile
            }}>
              +
            </div>
            
            {/* Menu Items with Jelly Staggered Animation - Enhanced for mobile */}
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
                    height: isHovered ? getResponsiveSize('2.75rem', '3rem', '3rem', '2.5rem', '2.25rem') : '0', // Enhanced mobile
                    transitionDelay: isHovered 
                      ? `${index * 100}ms` 
                      : `${(menuItems.length - index) * 80}ms`
                  }}
                  onClick={() => handleNavigation(item.href)}
                >
                  <div 
                    className="text-blue-900 font-medium block w-full h-full flex flex-col items-center justify-center transition-colors duration-300 hover:text-blue-700 p-1"
                    style={{
                      fontSize: getResponsiveSize('0.75rem', '0.8rem', '0.875rem', '0.7rem', '0.65rem') // Enhanced mobile
                    }}
                  >
                    <span className="font-semibold">{item.text}</span>
                    <span 
                      className="text-gray-600"
                      style={{
                        fontSize: getResponsiveSize('0.65rem', '0.7rem', '0.75rem', '0.6rem', '0.55rem') // Enhanced mobile
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

        {/* Ninja Image with Cartoon Dialog - Enhanced only for mobile */}
        <div className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 pointer-events-auto ${getNinjaPosition()}`}>
          <div className="relative">
            {/* Ninja Image */}
            <img 
              src="/images/ninja.png" 
              alt="Ninja" 
              className="object-contain drop-shadow-lg"
              style={{
                width: getResponsiveSize(
                  isLandscape ? '9rem' : '13rem', // Enhanced from 8rem/12rem
                  '14rem',
                  '20rem',
                  '7rem', // Enhanced from 6rem
                  '6rem'  // Enhanced from 5rem
                ),
                height: getResponsiveSize(
                  isLandscape ? '9rem' : '13rem', // Enhanced from 8rem/12rem
                  '14rem',
                  '20rem',
                  '7rem', // Enhanced from 6rem
                  '6rem'  // Enhanced from 5rem
                )
              }}
            />
            
            {/* Ninja Cartoon Dialog - Enhanced for mobile */}
            <div className={`absolute transform ${getNinjaDialogPosition()}`}>
              <div 
                className="bg-white rounded-2xl px-3 py-2 shadow-lg border border-gray-200 relative"
                style={{
                  maxWidth: getResponsiveSize('150px', '160px', '180px', '130px', '110px'), // Enhanced mobile
                  minHeight: getResponsiveSize('65px', '70px', '80px', '55px', '50px') // Enhanced mobile
                }}
              >
                <div 
                  className="font-medium text-gray-800 whitespace-pre-line"
                  style={{
                    fontSize: getResponsiveSize('0.75rem', '0.8rem', '0.875rem', '0.7rem', '0.65rem') // Enhanced mobile
                  }}
                >
                  {ninjaText}
                  <span className="inline-block w-1 h-3 bg-gray-800 ml-1 animate-pulse"></span>
                </div>
                {/* Speech bubble tail pointing left towards ninja */}
                <div 
                  className="absolute transform -translate-y-1/2 rotate-45 bg-white border-l border-b border-gray-200"
                  style={{
                    bottom: getResponsiveSize('1.75rem', '1.75rem', '2rem', '1.5rem', '1.25rem'), // Enhanced mobile
                    left: '-0.3rem', // Enhanced mobile
                    width: getResponsiveSize('0.6rem', '0.6rem', '0.75rem', '0.5rem', '0.4rem'), // Enhanced mobile
                    height: getResponsiveSize('0.6rem', '0.6rem', '0.75rem', '0.5rem', '0.4rem') // Enhanced mobile
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

        /* Custom scrollbar for primary theme */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #dcfce7;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #16a34a;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #15803d;
        }
        
        /* For Firefox */
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: #16a34a #dcfce7;
        }

        /* Mobile-specific optimizations - ENHANCED for larger phones */
        @media (max-width: 767px) and (orientation: landscape) {
          .btn-pluss-wrapper {
            transform: scale(0.9); // Enhanced from 0.85
          }
        }

        @media (max-width: 640px) and (orientation: landscape) {
          .btn-pluss-wrapper {
            transform: scale(0.8); // Enhanced from 0.75
          }
        }

        @media (max-width: 500px) and (orientation: landscape) {
          .btn-pluss-wrapper {
            transform: scale(0.7); // Enhanced from 0.65
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

export default Primary;