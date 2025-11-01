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

  // Responsive calculations - Updated breakpoints for larger phones
  const isMobile = windowSize.width < 1024; // Increased from 768 to 1024
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

  // Get appropriate image based on screen size
  const getBackgroundImage = () => {
    if (useBbcLayout) return "/images/landscape/prim1.png";
    if (isMobile) return "/images/home_primary.png";
    if (isTabletPortrait) return "/images/tab_primary.png";
    return "/images/primary.png";
  };

  // Responsive sizes - Increased sizes for mobile landscape
  const getResponsiveSize = (mobile, tablet, desktop, landscapeMobile = null, smallLandscape = null) => {
    if (isMobileLandscape && landscapeMobile !== null) return landscapeMobile;
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  // Function to determine ninja position - adjusted for larger screens
  const getNinjaPosition = () => {
    if (useBbcLayout) return 'mb-[-10px] scale-90'; // Increased scale
    if (isMobile) return isLandscape ? 'mb-[-10px] scale-100' : 'mb-[-20px] scale-110';
    if (isTablet) return 'mb-[30px] scale-125';
    return 'mb-[-50px] scale-150';
  };

  // Function to determine ninja dialog position - adjusted for larger screens
  const getNinjaDialogPosition = () => {
    if (useBbcLayout) return 'top-4 -right-2 translate-x-full scale-100'; // Increased scale and position
    if (isMobile) return isLandscape ? 'top-6 -right-2 translate-x-full scale-110' : 'top-16 -right-2 translate-x-full scale-110';
    if (isTablet) return 'top-6 -right-2 translate-x-full scale-125';
    return 'top-24 -right-4 translate-x-full scale-150';
  };

  // Function to determine plus menu position
  const getPlusMenuPosition = () => {
    if (useBbcLayout) return 'bottom-4 left-4 scale-100'; // Increased scale and position
    if (isMobile) return isLandscape ? 'bottom-6 left-6 scale-110' : 'bottom-24 left-6 scale-110';
    if (isTablet) return 'bottom-20 right-12 scale-125';
    return 'bottom-20 right-12 scale-150';
  };

  const getJellyMenuMaxHeight = () => {
    if (useBbcLayout) return 'max-h-48'; // Increased max height
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

          {/* BBC-style header bar - Increased height */}
          <div className="sticky top-0 left-0 right-0 h-12 bg-gradient-to-r from-green-600 to-blue-600 z-40 flex items-center px-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">PRIMARY EDUCATION</span>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <div className="w-6 h-6 bg-white/20 rounded"></div>
              <div className="w-6 h-6 bg-white/20 rounded"></div>
              <div className="w-6 h-6 bg-white/20 rounded"></div>
            </div>
          </div>

          {/* BBC-style main content grid - Enhanced sizes for larger phones */}
          <div className="p-6">
            {/* Main featured story - BBC style with larger sizes */}
            <div className="mb-8">
              <div className="bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-200">
                <img
                  src="/images/landscape/prim1.png"
                  alt="Primary Education Hero"
                  className={`w-full ${isMobilePortrait ? 'h-80' : 'h-64'} object-cover`}
                />
                <div className="p-6">
                  <h1 className={`${isMobilePortrait ? 'text-3xl' : 'text-2xl'} font-bold text-gray-900 mb-3`}>Primary School Education</h1>
                  <p className="text-gray-600 text-base mb-4">Building strong foundations in core subjects and life skills</p>
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
            <div className={`grid ${isMobilePortrait ? 'grid-cols-2' : 'grid-cols-3'} gap-6 mb-8`}>
              {primaryImages.slice(1, isMobilePortrait ? 5 : 4).map((image, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`w-full ${isMobilePortrait ? 'h-52' : 'h-48'} object-cover`}
                  />
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-gray-900 mb-2">{image.title}</h3>
                    <div className="w-12 h-1 bg-orange-500 mb-3"></div>
                    <p className="text-sm text-gray-600">Essential learning skills</p>
                  </div>
                </div>
              ))}
            </div>

            {/* BBC-style more stories section - Enhanced sizes */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">More Learning Areas</h2>
                <div className="w-16 h-1 bg-blue-500"></div>
              </div>
              
              <div className="space-y-6">
                {primaryImages.slice(isMobilePortrait ? 5 : 4).map((image, index) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200">
                    <div className="flex">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className={`${isMobilePortrait ? 'w-40 h-40' : 'w-32 h-32'} object-cover flex-shrink-0`}
                      />
                      <div className="p-4 flex-1">
                        <h3 className="text-base font-semibold text-gray-900 mb-3">{image.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">Develop essential skills and knowledge for academic success</p>
                        <div className="flex items-center mt-3 text-sm text-gray-500">
                          <span>Learning</span>
                          <span className="mx-3">•</span>
                          <span>Development</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BBC-style trending section - Enhanced sizes */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
              <div className="flex items-center mb-4">
                <div className="w-4 h-8 bg-green-600 mr-3"></div>
                <h3 className="text-lg font-bold text-gray-900">Core Subjects</h3>
              </div>
              <div className={`grid ${isMobilePortrait ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
                {['Mathematics', 'Science', 'English', 'Creative Arts'].map((item, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 text-center border border-gray-300 shadow-sm">
                    <span className="text-sm font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* BBC-style footer section */}
            <div className="border-t border-gray-300 pt-6">
              <div className="text-center">
                <div className="inline-flex items-center space-x-3 bg-gray-100 px-6 py-3 rounded-full">
                  <span className="text-sm text-gray-600 font-medium">PRIMARY EDUCATION</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-600">AGES 6-11</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation - Now part of scrollable content */}
          <div className="sticky bottom-0 left-0 right-0 z-40 mt-8">
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
        {/* Floating Plus Menu with Robot and Dialog - Responsive Positioning */}
        <nav 
          className={`btn-pluss-wrapper fixed z-50 flex flex-col items-center transition-all duration-300 pointer-events-auto ${getPlusMenuPosition()}`}
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
          onClick={() => isMobile && setIsHovered(!isHovered)}
        >
          {/* Robot Image with Cartoon Dialog - Always Visible */}
          <div className="flex flex-col items-center mb-3">
            {/* Cartoon Dialog */}
            <div 
              className="bg-white rounded-2xl px-4 py-3 shadow-xl border border-gray-200 mb-3 relative"
              style={{
                minWidth: getResponsiveSize('120px', '140px', '140px', '110px', '100px'),
                minHeight: getResponsiveSize('45px', '50px', '50px', '40px', '35px')
              }}
            >
              <div 
                className="font-medium text-gray-800"
                style={{
                  fontSize: getResponsiveSize('0.875rem', '1rem', '1rem', '0.8rem', '0.75rem')
                }}
              >
                {displayedText}
                <span className="inline-block w-1 h-4 bg-gray-800 ml-1 animate-pulse"></span>
              </div>
              {/* Speech bubble tail */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-gray-200"></div>
            </div>
            
            {/* Robot Image */}
            <img 
              src="/images/bot_kai.png" 
              alt="KAI Robot" 
              className="object-contain drop-shadow-lg transition-transform duration-300 hover:scale-110"
              style={{
                width: getResponsiveSize('3rem', '3.5rem', '3.5rem', '2.5rem', '2.25rem'),
                height: getResponsiveSize('3rem', '3.5rem', '3.5rem', '2.5rem', '2.25rem')
              }}
            />
          </div>

          {/* Menu Container */}
          <div className={`
            btn-pluss bg-blue-900 overflow-hidden flex flex-col items-center
            transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            ${isHovered ? 'h-auto rounded-2xl pb-4 pt-4 shadow-2xl' : 'h-14 rounded-full shadow-xl'}
            border border-blue-700
          `}
          style={{
            width: isHovered ? getResponsiveSize('12rem', '13rem', '13rem', '11rem', '10rem') : getResponsiveSize('3.5rem', '3.5rem', '3.5rem', '3rem', '2.75rem')
          }}>
            {/* Plus Button with Jelly Animation Both Ways */}
            <div className={`
              bg-red-600 rounded-full flex items-center justify-center text-white font-bold
              transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              ${isHovered ? 'rotate-45 scale-110' : 'rotate-0 scale-100'}
              shadow-lg hover:shadow-xl border border-red-500
            `}
            style={{
              width: getResponsiveSize('3rem', '3.5rem', '3.5rem', '2.5rem', '2.25rem'),
              height: getResponsiveSize('3rem', '3.5rem', '3.5rem', '2.5rem', '2.25rem'),
              fontSize: getResponsiveSize('1.125rem', '1.375rem', '1.375rem', '1rem', '0.9rem')
            }}>
              +
            </div>
            
            {/* Menu Items with Jelly Staggered Animation Both Ways */}
            <ul className={`
              transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] px-4 w-full overflow-y-auto ${getJellyMenuMaxHeight()}
              ${isHovered ? 'opacity-100 mt-5' : 'opacity-0 mt-0'}
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
                      ? `mb-3 opacity-100 translate-x-0 scale-100` 
                      : 'opacity-0 translate-x-8 scale-90'
                    }
                    hover:bg-blue-50 hover:border-blue-200 hover:scale-105 hover:shadow-md
                    cursor-pointer
                  `}
                  style={{
                    height: isHovered ? getResponsiveSize('3rem', '3.5rem', '3.5rem', '2.75rem', '2.5rem') : '0',
                    transitionDelay: isHovered 
                      ? `${index * 100}ms` 
                      : `${(menuItems.length - index) * 80}ms`
                  }}
                  onClick={() => handleNavigation(item.href)}
                >
                  <div 
                    className="text-blue-900 font-medium block w-full h-full flex flex-col items-center justify-center transition-colors duration-300 hover:text-blue-700 p-2"
                    style={{
                      fontSize: getResponsiveSize('0.8rem', '0.9rem', '0.9rem', '0.75rem', '0.7rem')
                    }}
                  >
                    <span className="font-semibold">{item.text}</span>
                    <span 
                      className="text-gray-600"
                      style={{
                        fontSize: getResponsiveSize('0.7rem', '0.8rem', '0.8rem', '0.65rem', '0.6rem')
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
                  isLandscape ? '10rem' : '14rem',
                  '16rem',
                  '22rem',
                  '8rem',
                  '7rem'
                ),
                height: getResponsiveSize(
                  isLandscape ? '10rem' : '14rem',
                  '16rem',
                  '22rem',
                  '8rem',
                  '7rem'
                )
              }}
            />
            
            {/* Ninja Cartoon Dialog - Responsive Positioning */}
            <div className={`absolute transform ${getNinjaDialogPosition()}`}>
              <div 
                className="bg-white rounded-2xl px-4 py-3 shadow-xl border border-gray-200 relative"
                style={{
                  maxWidth: getResponsiveSize('160px', '180px', '200px', '140px', '120px'),
                  minHeight: getResponsiveSize('70px', '80px', '90px', '60px', '55px')
                }}
              >
                <div 
                  className="font-medium text-gray-800 whitespace-pre-line"
                  style={{
                    fontSize: getResponsiveSize('0.8rem', '0.9rem', '0.9rem', '0.75rem', '0.7rem')
                  }}
                >
                  {ninjaText}
                  <span className="inline-block w-1 h-4 bg-gray-800 ml-1 animate-pulse"></span>
                </div>
                {/* Speech bubble tail pointing left towards ninja */}
                <div 
                  className="absolute transform -translate-y-1/2 rotate-45 bg-white border-l border-b border-gray-200"
                  style={{
                    bottom: getResponsiveSize('2rem', '2.25rem', '2.5rem', '1.75rem', '1.5rem'),
                    left: '-0.375rem',
                    width: getResponsiveSize('0.75rem', '0.875rem', '1rem', '0.625rem', '0.5rem'),
                    height: getResponsiveSize('0.75rem', '0.875rem', '1rem', '0.625rem', '0.5rem')
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
          width: 8px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #dcfce7;
          border-radius: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #16a34a;
          border-radius: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #15803d;
        }
        
        /* For Firefox */
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: #16a34a #dcfce7;
        }

        /* Mobile-specific optimizations for larger phones */
        @media (max-width: 1023px) and (orientation: landscape) {
          .btn-pluss-wrapper {
            transform: scale(1);
          }
        }

        @media (max-width: 768px) and (orientation: landscape) {
          .btn-pluss-wrapper {
            transform: scale(0.9);
          }
        }

        @media (max-width: 640px) and (orientation: landscape) {
          .btn-pluss-wrapper {
            transform: scale(0.8);
          }
        }

        /* Prevent text selection on mobile */
        @media (max-width: 1023px) {
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
          width: 6px;
        }
        
        .btn-pluss ul::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .btn-pluss ul::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.4);
          border-radius: 3px;
        }
        
        .btn-pluss ul::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </div>
  );
};

export default Primary;