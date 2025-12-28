import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [ninjaText, setNinjaText] = useState('');
  const [isNinjaTyping, setIsNinjaTyping] = useState(true);
  const [is3DButtonHovered, setIs3DButtonHovered] = useState(false);
  const [hoveredCircle, setHoveredCircle] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMiniCircles, setShowMiniCircles] = useState(false);
  const [showPortraitLock, setShowPortraitLock] = useState(false);
  
  const navigate = useNavigate();

  const dialogLines = ["I'm KAI", "Can I help?"];
  const ninjaLines = ["Our knowledge team", "are always ready", "to help!"];

  const commitments = [
    "Empowering every child to discover the joy of learning & achieve their full potential.",
    "To inspire and equip children with the skills and confidence to learn effectively & pursue their curiosity.",
    "Guiding children to become confident, lifelong learners who love to explore & grow."
  ];

  const menuItems = [
    { href: "/primary", text: "Primary", description: "6-11 Years Old" },
    { href: "/preschool", text: "Pre-School", description: "2-5 Years Old" },
    { href: "/11plus", text: "11+", description: "11 Years Old" },
    { href: "/gcses", text: "GCSEs", description: "14-16 Years Old" },
    { href: "/alevels", text: "A-Levels", description: "16-18 Years Old" },
  ];

  const assessmentCategories = [
    { title: "SAT", gradient: "from-purple-600 via-purple-500 to-pink-500", shadow: "shadow-purple-500/50", glow: "shadow-purple-400", angle: -60, href: "/sat" },
    { title: "11+", gradient: "from-blue-600 via-blue-500 to-cyan-500", shadow: "shadow-blue-500/50", glow: "shadow-blue-400", angle: -20, href: "/11plus" },
    { title: "GCSEs", gradient: "from-green-600 via-green-500 to-emerald-500", shadow: "shadow-green-500/50", glow: "shadow-green-400", angle: 20, href: "/gcses" },
    { title: "A-Levels", gradient: "from-orange-600 via-orange-500 to-yellow-500", shadow: "shadow-orange-500/50", glow: "shadow-orange-400", angle: 60, href: "/alevels" }
  ];

  // Home specific images for mobile - using PNGs (use PUBLIC_URL so paths work when deployed to subfolders)
  const homeImages = [
    { src: process.env.PUBLIC_URL + '/images/landscape/home1.jpg', alt: 'Home Hero 1', title: 'Welcome to EduPlatform' },
    { src: process.env.PUBLIC_URL + '/images/landscape/home2.png', alt: 'Home Activity 2', title: 'Creative Learning' },
    { src: process.env.PUBLIC_URL + '/images/landscape/home3.png', alt: 'Home Activity 3', title: 'Team Collaboration' },
  ];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ 
        width: window.innerWidth, 
        height: window.innerHeight 
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

  // Show instant assess only for mobile and tablet, NOT for desktop
  const showInstantAssess = isMobile || isTablet;

  // Navigation handler
  const handleNavigation = (href) => {
    navigate(href);
  };

  // Get appropriate image based on screen size
  const getHomeImage = () => {
    if (useBbcLayout) return process.env.PUBLIC_URL + '/images/landscape/home1.jpg';
    if (isMobile) return process.env.PUBLIC_URL + '/images/home_mob.png';
    if (isTabletPortrait) return process.env.PUBLIC_URL + '/images/tab_home.png';
    return process.env.PUBLIC_URL + '/images/Homes.jpg';
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
      const spacingX = 90; // Increased horizontal spacing
      const spacingY = 90; // Increased vertical spacing
      return { 
        x: (col * spacingX) - (spacingX * (cols - 1) / 2), 
        y: (row * spacingY) - (spacingY * (rows - 1) / 2) - 100 // Move up from center
      };
    }
    
    // For mobile landscape, position in a horizontal line
    if (isMobileLandscape && showMiniCircles) {
      const totalCircles = assessmentCategories.length;
      const spacing = 80; // Increased spacing
      const startX = -((totalCircles - 1) * spacing) / 2;
      return { 
        x: startX + (index * spacing), 
        y: -90 // Moved up slightly
      };
    }
    
    if (isTablet) {
      const totalCircles = assessmentCategories.length;
      const spacing = 200; // Increased spacing
      const startX = -((totalCircles - 1) * spacing) / 2;
      return { 
        x: startX + (index * spacing), 
        y: -90
      };
    }
    
    const radian = (angle * Math.PI) / 180;
    return { x: Math.cos(radian) * radius, y: Math.sin(radian) * radius };
  };

  const handleInstantAssessmentTap = () => {
    if (isMobile || isTablet) {
      setShowMiniCircles(prev => !prev);
    }
  };

  const handleMiniCircleTap = (href) => {
    handleNavigation(href);
    if (isMobile || isTablet) {
      setShowMiniCircles(false);
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
    if (e.target === e.currentTarget && (isMobile || isTablet)) {
      setShowMiniCircles(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if ((isMobile || isTablet) && showMiniCircles) {
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
  }, [showMiniCircles, isMobile, isTablet]);

  // Function to determine ninja position
  const getNinjaPosition = () => {
    if (useBbcLayout) return 'bottom-9 mb-0 scale-75';
    if (isMobile) return isLandscape ? 'bottom-0 mb-0 scale-90' : 'bottom-0 mb-0';
    if (isTablet) return 'bottom-0 mb-0';
    return 'bottom-0 pc-ninja-bottom';
  };

  // Function to determine plus menu position
  const getPlusMenuPosition = () => {
    if (useBbcLayout) return 'bottom-2 left-2 scale-85';
    if (isMobile) return isLandscape ? 'bottom-4 left-4' : 'bottom-20 left-4';
    if (isTablet) return 'bottom-16 right-10';
    return 'bottom-16 right-10';
  };

  // Function to determine instant assess button position
  const getInstantAssessButtonPosition = () => {
    if (isMobilePortrait) return 'bottom-4 transform scale-85';
    if (isMobileLandscape) return 'bottom-100 transform scale-75';
    if (isTablet) return 'bottom-6 transform scale-100';
    return 'bottom-8 transform scale-100';
  };

  // Get right position for instant assess button
  const getInstantAssessRightPosition = () => {
    if (isMobilePortrait) return '20px';
    if (isMobileLandscape) return '60px';
    if (isTablet) return '30px';
    return '40px';
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

  // KAI Dynamic Learning Cycle Component - Static on right side for desktop
  const KAIDynamicLearningCycle = () => (
    <div className="fixed z-40 pointer-events-auto"
      style={{
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '300px',
        opacity: isDesktop ? 1 : 0,
        pointerEvents: isDesktop ? 'auto' : 'none',
        transition: 'opacity 0.3s ease-in-out'
      }}
    >
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl py-4 pl-4 pr-8 border-4 border-red-600 shadow-2xl relative"
           style={{
             boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
             transform: 'perspective(1000px) rotateX(2deg)'
           }}>
        
        {/* Top row - 4 circles with 3D effect */}
        <div className="flex justify-between items-center mb-10 relative z-10">
          {/* Circle 1 - Yellow */}
          <div className="flex flex-col items-center flex-1 -ml-3">
            <div className="relative group">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer"
                   style={{
                     boxShadow: '0 8px 20px rgba(234, 179, 8, 0.4), inset 0 -4px 8px rgba(0,0,0,0.2), inset 0 1px 4px rgba(255,255,255,0.5)',
                     border: '2px solid rgba(255, 255, 255, 0.3)'
                   }}
                   onClick={() => handleNavigation('/clear-objectives')}>
                <div className="text-center px-1">
                  <p className="text-[0.55rem] font-bold text-gray-900 drop-shadow-sm leading-tight">Clear</p>
                  <p className="text-[0.55rem] font-bold text-gray-900 drop-shadow-sm leading-tight">Learning</p>
                  <p className="text-[0.55rem] font-bold text-gray-900 drop-shadow-sm leading-tight">Objectives</p>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center border-2 border-white shadow-lg"
                   style={{boxShadow: '0 4px 8px rgba(0,0,0,0.6)'}}>
                <span className="text-white font-bold text-[0.6rem]">1</span>
              </div>
            </div>
          </div>

          {/* Arrow 1 with 3D effect */}
          <div className="flex-shrink-0 mx-1">
            <svg width="16" height="8" viewBox="0 0 16 8" className="text-red-600 drop-shadow-lg">
              <defs>
                <linearGradient id="arrowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#991b1b" />
                </linearGradient>
              </defs>
              <path d="M0 4 L11 4 L9 2 M11 4 L9 6" stroke="url(#arrowGradient1)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Circle 2 - Blue */}
          <div className="flex flex-col items-center flex-1">
            <div className="relative group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer"
                   style={{
                     boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4), inset 0 -4px 8px rgba(0,0,0,0.2), inset 0 1px 4px rgba(255,255,255,0.5)',
                     border: '2px solid rgba(255, 255, 255, 0.3)'
                   }}
                   onClick={() => handleNavigation('/learner-journeys')}>
                <div className="text-center px-1">
                  <p className="text-[0.55rem] font-bold text-white drop-shadow-md leading-tight">Simplified</p>
                  <p className="text-[0.55rem] font-bold text-white drop-shadow-md leading-tight">Learner's</p>
                  <p className="text-[0.55rem] font-bold text-white drop-shadow-md leading-tight">Journeys</p>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center border-2 border-white shadow-lg"
                   style={{boxShadow: '0 4px 8px rgba(0,0,0,0.6)'}}>
                <span className="text-white font-bold text-[0.6rem]">2</span>
              </div>
            </div>
          </div>

          {/* Arrow 2 */}
          <div className="flex-shrink-0 mx-1">
            <svg width="16" height="8" viewBox="0 0 16 8" className="text-red-600 drop-shadow-lg">
              <path d="M0 4 L11 4 L9 2 M11 4 L9 6" stroke="url(#arrowGradient1)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Circle 3 - Orange */}
          <div className="flex flex-col items-center flex-1">
            <div className="relative group">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-400 via-orange-600 to-orange-700 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer"
                   style={{
                     boxShadow: '0 8px 20px rgba(234, 88, 12, 0.4), inset 0 -4px 8px rgba(0,0,0,0.2), inset 0 1px 4px rgba(255,255,255,0.5)',
                     border: '2px solid rgba(255, 255, 255, 0.3)'
                   }}
                   onClick={() => handleNavigation('/learning-activities')}>
                <div className="text-center px-1">
                  <p className="text-[0.55rem] font-bold text-white drop-shadow-md leading-tight">Effective</p>
                  <p className="text-[0.55rem] font-bold text-white drop-shadow-md leading-tight">Learning</p>
                  <p className="text-[0.55rem] font-bold text-white drop-shadow-md leading-tight">Activities</p>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center border-2 border-white shadow-lg"
                   style={{boxShadow: '0 4px 8px rgba(0,0,0,0.6)'}}>
                <span className="text-white font-bold text-[0.6rem]">3</span>
              </div>
            </div>
          </div>

          {/* Arrow 3 */}
          <div className="flex-shrink-0 mx-1">
            <svg width="16" height="8" viewBox="0 0 16 8" className="text-red-600 drop-shadow-lg">
              <path d="M0 4 L11 4 L9 2 M11 4 L9 6" stroke="url(#arrowGradient1)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Circle 4 - Gold */}
          <div className="flex flex-col items-center flex-1">
            <div className="relative group">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-200 via-yellow-300 to-amber-400 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer"
                   style={{
                     boxShadow: '0 8px 20px rgba(251, 191, 36, 0.4), inset 0 -4px 8px rgba(0,0,0,0.2), inset 0 1px 4px rgba(255,255,255,0.5)',
                     border: '2px solid rgba(255, 255, 255, 0.3)'
                   }}
                   onClick={() => handleNavigation('/knowledge-evaluations')}>
                <div className="text-center px-1">
                  <p className="text-[0.55rem] font-bold text-gray-900 drop-shadow-sm leading-tight">Accurate</p>
                  <p className="text-[0.55rem] font-bold text-gray-900 drop-shadow-sm leading-tight">Knowledge</p>
                  <p className="text-[0.55rem] font-bold text-gray-900 drop-shadow-sm leading-tight">Evaluations</p>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center border-2 border-white shadow-lg"
                   style={{boxShadow: '0 4px 8px rgba(0,0,0,0.6)'}}>
                <span className="text-white font-bold text-[0.6rem]">4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center text with 3D effect */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent mb-1"
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(156, 163, 175, 0.3)',
                letterSpacing: '0.1em'
              }}>
            KAI
          </h2>
          <p className="text-gray-400 text-[0.65rem] font-medium tracking-wide">Dynamic Learning Cycle</p>
        </div>
      </div>

      {/* Bottom feedback box with 3D effect */}
      <div className="relative mt-6">
        <div className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-lg py-2 px-3 relative transform transition-transform duration-300 hover:scale-105 cursor-pointer"
             style={{
               boxShadow: '0 8px 20px rgba(22, 163, 74, 0.4), inset 0 -4px 8px rgba(0,0,0,0.2), inset 0 1px 4px rgba(255,255,255,0.2)',
               border: '2px solid rgba(255, 255, 255, 0.2)'
             }}
             onClick={() => handleNavigation('/feedback-improvements')}>
          <p className="text-white text-center font-bold text-xs tracking-wide drop-shadow-lg">
            Feedbacks and Constant Improvements
          </p>
          <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center border-2 border-white shadow-lg"
               style={{boxShadow: '0 4px 8px rgba(0,0,0,0.6)'}}>
            <span className="text-white font-bold text-xs">5</span>
          </div>
        </div>

        {/* Return arrows with 3D effect */}
        <div className="absolute -top-8 right-4">
          <svg width="30" height="40" viewBox="0 0 30 40" className="drop-shadow-2xl">
            <defs>
              <linearGradient id="arrowGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
            </defs>
            <path d="M15 2 L15 30 M15 30 L21 25 M15 30 L9 25" stroke="url(#arrowGradient2)" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Left return arrow with 3D effect */}
        <div className="absolute -top-8 left-4">
          <svg width="30" height="40" viewBox="0 0 30 40" className="drop-shadow-2xl">
            <path d="M15 2 L15 30 M15 30 L21 25 M15 30 L9 25" stroke="url(#arrowGradient2)" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-white relative overflow-x-hidden ${showPortraitLock ? 'backdrop-blur-sm' : ''}`} onClick={handleContainerClick}>
      {/* Portrait Lock Dialog */}
      {showPortraitLock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl border border-gray-200">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2h-5l-5 5v-5z" />
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

      {/* KAI Dynamic Learning Cycle - Static on right side for desktop with padding */}
      {isDesktop && <KAIDynamicLearningCycle />}

      {useBbcLayout ? (
        // BBC-style Layout for Mobile (Both Landscape and Portrait)
        <div className={`w-full h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-y-auto ${showPortraitLock ? 'blur-sm' : ''}`}>
          {/* Green Navbar - Now part of scrollable content */}
          <div className="relative z-50">
            <Navbar onMenuStateChange={handleMenuStateChange} />
          </div>

          {/* BBC-style header bar */}
          <div className="sticky top-0 left-0 right-0 h-8 bg-gradient-to-r from-blue-800 to-purple-800 z-40 flex items-center px-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              </div>
              <span className="text-white font-bold text-sm tracking-tight">EDUPLATFORM</span>
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
                    src={homeImages[0].src}
                    alt="Educational Platform Hero"
                    className="w-full h-full object-contain"
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                      WebkitBackfaceVisibility: 'hidden',
                      backfaceVisibility: 'hidden'
                    }}
                  />
                </div>
                <div className="p-4">
                  <h1 className={`${isMobilePortrait ? 'text-2xl' : 'text-xl'} font-bold text-gray-900 mb-2`}>Welcome to EduPlatform</h1>
                  <p className="text-gray-600 text-sm mb-3">Comprehensive learning solutions for all educational stages</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>All Ages</span>
                    <span className="mx-2">•</span>
                    <span>Comprehensive</span>
                    <span className="mx-2">•</span>
                    <span>Interactive</span>
                  </div>
                </div>
              </div>
            </div>

            {/* BBC-style secondary stories grid - Adjusted columns for portrait */}
            <div className={`grid ${isMobilePortrait ? 'grid-cols-2' : 'grid-cols-2'} gap-4 mb-6`}>
              {homeImages.slice(1, isMobilePortrait ? 5 : 3).map((image, index) => (
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
                    <div className="w-8 h-1 bg-purple-500 mb-2"></div>
                    <p className="text-xs text-gray-600">Innovative teaching methods</p>
                  </div>
                </div>
              ))}
            </div>

            {/* BBC-style more stories section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Our Commitments</h2>
                <div className="w-12 h-1 bg-red-600"></div>
              </div>
              
              <div className="space-y-4">
                {commitments.map((commitment, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    <div className="p-3">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <p className="text-xs text-gray-600 flex-1">
                          {commitment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BBC-style footer section */}
            <div className="border-t border-gray-300 pt-4">
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
                  <span className="text-xs text-gray-600 font-medium">EDUPLATFORM</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-600">COMPREHENSIVE LEARNING</span>
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
            <div className="relative w-full h-full overflow-hidden flex items-start justify-center">
              <img 
                src={getHomeImage()} 
                alt="Home Background" 
                className="object-contain"
                style={{
                  imageRendering: '-webkit-optimize-contrast',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                  transform: 'scale(1.15) translateY(-5%)',
                  width: 'auto',
                  height: 'auto',
                  maxWidth: isDesktop ? '70%' : '85%', // Reduced width for desktop to accommodate KAI component
                  maxHeight: '85%',
                }}
              />
            </div>

          {/* Our Commitments Section - Closer to image */}
            <div className="absolute left-20 z-10" style={{ top: 'calc(55% + 0.5rem)' }}>
              <div className="flex items-start gap-6 max-w-sm">
                {/* Commitment Text without card background */}
                <div>
                  <h2 className="text-base font-bold text-gray-900 mb-1.5 border-b-2 border-blue-600 pb-1 inline-block">
                    Our Commitments to Excellence
                  </h2>
                  <div className="space-y-1">
                    {commitments.map((commitment, index) => (
                      <div key={index} className="flex items-start gap-1.5">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                        </div>
                        <p className="text-gray-800 text-[0.65rem] leading-tight">
                          {commitment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Navigation */}
          <div className="relative z-40">
            <BottomNav />
          </div>
        </div>
      )}

      {/* Interactive Elements - Fixed position elements that stay visible */}
      <div className="fixed inset-0 z-40 pointer-events-none">
        {/* Instant Assessment Button - Only for Mobile and Tablet */}
        {showInstantAssess && !isMenuOpen && (
          <div 
            className={`fixed instant-assessment-container bottom-0 z-50 pointer-events-auto ${getInstantAssessButtonPosition()}`}
            style={{ 
              right: getInstantAssessRightPosition(),
              touchAction: 'manipulation'
            }}
            onMouseEnter={() => setIs3DButtonHovered(true)}
            onMouseLeave={() => {
              setIs3DButtonHovered(false);
              setHoveredCircle(null);
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative" style={{ 
              width: getResponsiveSize('150px', '180px', '220px', '100px', '90px'),
              height: getResponsiveSize('150px', '180px', '220px', '100px', '90px')
            }}>
              <div className="absolute inset-0">
                {assessmentCategories.map((category, index) => {
                  const radius = getResponsiveSize(100, 120, 150, 60, 55);
                  const position = getCirclePosition(category.angle, radius, index);
                  const circleSize = getResponsiveSize('60px', '70px', '85px', '42px', '38px');
                  
                  // Show circles on hover for desktop, or when mini circles are toggled for mobile/tablet
                  const shouldShowCircles = showMiniCircles;
                  
                  return (
                    <div key={category.title} className={`absolute transition-all duration-700 ease-out ${shouldShowCircles ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                      style={{ 
                        left: '50%', 
                        top: '50%', 
                        transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`, 
                        transitionDelay: shouldShowCircles ? `${index * 120}ms` : '0ms' 
                      }}
                      onMouseEnter={() => !isMobile && !isTablet && setHoveredCircle(index)}
                      onMouseLeave={() => !isMobile && !isTablet && setHoveredCircle(null)}>
                      {!isMobile && !isTablet && !isMobilePortrait && (
                        <svg className={`absolute transition-all duration-500 ${shouldShowCircles ? 'opacity-100' : 'opacity-0'}`}
                          style={{ 
                            left: '50%', 
                            top: '50%', 
                            transform: `translate(-50%, -50%)`, 
                            width: isTablet ? `${Math.abs(position.x) * 2 + 60}px` : `${radius + 60}px`, 
                            height: isTablet ? '120px' : `${radius + 60}px`, 
                            pointerEvents: 'none', 
                            transitionDelay: shouldShowCircles ? `${index * 120 + 200}ms` : '0ms' 
                          }}>
                          {isTablet && (
                            <path 
                              d={`M ${(Math.abs(position.x) * 2 + 60) / 2} ${60} L ${(Math.abs(position.x) * 2 + 60) / 2 + position.x} ${60 + position.y}`} 
                              stroke="rgba(251, 191, 36, 0.6)" 
                              strokeWidth="3" 
                              fill="none" 
                              strokeDasharray="5,5" 
                            />
                          )}
                          {!isTablet && (
                            <path 
                              d={`M ${(radius + 60) / 2} ${(radius + 60) / 2} L ${(radius + 60) / 2 - position.x} ${(radius + 60) / 2 - position.y}`} 
                              stroke="rgba(251, 191, 36, 0.6)" 
                              strokeWidth="3" 
                              fill="none" 
                              strokeDasharray="5,5" 
                            />
                          )}
                          <circle 
                            cx={isTablet ? `${(Math.abs(position.x) * 2 + 60) / 2 + position.x}` : `${(radius + 60) / 2 - position.x}`} 
                            cy={isTablet ? `${60 + position.y}` : `${(radius + 60) / 2 - position.y}`} 
                            r="4" 
                            fill="#fbbf24" 
                            className="drop-shadow-lg" 
                            style={{ filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.8))' }} 
                          />
                        </svg>
                      )}
                      <div 
                        className={`relative rounded-full transform transition-all duration-400 cursor-pointer ${!isMobile && !isTablet && hoveredCircle === index ? 'scale-110 rotate-12' : 'scale-100 rotate-0'} bg-gradient-to-br ${category.gradient} shadow-xl ${category.shadow} ${!isMobile && !isTablet && hoveredCircle === index ? `${category.glow} shadow-2xl` : ''}`}
                        style={{ 
                          width: circleSize, 
                          height: circleSize, 
                          border: '3px solid rgba(255, 255, 255, 0.3)',
                          boxShadow: !isMobile && !isTablet && hoveredCircle === index ? `0 12px 30px ${category.shadow.replace('/50', '/60')}, inset 0 -3px 8px rgba(0,0,0,0.3), inset 0 3px 8px rgba(255,255,255,0.3)` : '0 6px 20px rgba(0,0,0,0.3), inset 0 -2px 6px rgba(0,0,0,0.3), inset 0 2px 6px rgba(255,255,255,0.2)' 
                        }}
                        onClick={() => handleMiniCircleTap(category.href)}
                      >
                        <div className="absolute inset-1 rounded-full border border-white/20"></div>
                        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
                        <div className="relative z-10 flex flex-col items-center justify-center h-full p-1">
                          <span className="text-white font-black tracking-wider mb-0.5 drop-shadow-lg" style={{ 
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)', 
                            fontSize: getResponsiveSize('0.6rem', '0.7rem', '0.85rem', '0.5rem', '0.45rem') 
                          }}>
                            {category.title}
                          </span>
                        </div>
                        {!isMobile && !isTablet && <div className={`absolute inset-0 rounded-full transition-all duration-500 ${hoveredCircle === index ? 'opacity-100' : 'opacity-0'}`} style={{ border: '1px dashed rgba(255, 255, 255, 0.4)', animation: hoveredCircle === index ? 'spin 3s linear infinite' : 'none' }}></div>}
                        {!isMobile && !isTablet && hoveredCircle === index && (
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
                  width: getResponsiveSize('75px', '90px', '105px', '50px', '45px'),
                  height: getResponsiveSize('75px', '90px', '105px', '50px', '45px'),
                  background: 'linear-gradient(145deg, #fbbf24, #f59e0b, #d97706)', 
                  boxShadow: is3DButtonHovered ? '0 15px 35px rgba(251, 191, 36, 0.6), 0 0 60px rgba(251, 191, 36, 0.4), inset 0 -5px 12px rgba(0,0,0,0.4), inset 0 5px 12px rgba(255,255,255,0.3)' : '0 8px 20px rgba(251, 191, 36, 0.4), 0 0 30px rgba(251, 191, 36, 0.2), inset 0 -3px 10px rgba(0,0,0,0.3), inset 0 3px 10px rgba(255,255,255,0.2)', 
                  border: '3px solid rgba(255, 255, 255, 0.3)'
                }}
                onClick={handleInstantAssessmentTap}
                onMouseEnter={() => setIs3DButtonHovered(true)}
                onMouseLeave={() => setIs3DButtonHovered(false)}
              >
                <div className="absolute inset-0 rounded-full" style={{ border: '2px solid rgba(0, 0, 0, 0.2)', boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.5), inset 0 -1px 3px rgba(0,0,0,0.3)' }}></div>
                {!isMobile && !isTablet && <div className={`absolute inset-0 rounded-full transition-opacity duration-500 ${is3DButtonHovered ? 'opacity-100' : 'opacity-60'}`} style={{ border: '1px dashed rgba(255, 255, 255, 0.3)', animation: is3DButtonHovered ? 'spin 4s linear infinite' : 'none' }}></div>}
                <div className={`absolute rounded-full transition-opacity duration-700 ${is3DButtonHovered ? 'opacity-100' : 'opacity-60'}`} style={{ inset: getResponsiveSize('1rem', '1.2rem', '1.2rem', '0.5rem', '0.45rem'), background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)', animation: is3DButtonHovered ? 'pulse 1.5s ease-in-out infinite' : 'none' }}></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <div className="relative mb-0.5">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
                    <svg className="text-white drop-shadow-lg relative z-10" style={{ 
                      width: getResponsiveSize('1.25rem', '1.5rem', '1.75rem', '0.75rem', '0.65rem'), 
                      height: getResponsiveSize('1.25rem', '1.5rem', '1.75rem', '0.75rem', '0.65rem') 
                    }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <span className="text-white font-black tracking-wider drop-shadow-lg block" style={{ 
                      textShadow: '1px 1px 3px rgba(0,0,0,0.5), 0 0 8px rgba(255,255,255,0.3)', 
                      fontSize: getResponsiveSize('0.625rem', '0.75rem', '0.875rem', '0.4rem', '0.35rem') 
                    }}>
                      INSTANT
                    </span>
                    <div className="text-white font-bold tracking-wide drop-shadow-lg" style={{ 
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)', 
                      fontSize: getResponsiveSize('0.5rem', '0.625rem', '0.75rem', '0.35rem', '0.3rem') 
                    }}>
                      ASSESS
                    </div>
                    <span className="text-white/90 font-semibold mt-0.5 block" style={{ 
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)', 
                      fontSize: getResponsiveSize('0.375rem', '0.5rem', '0.5rem', '0.25rem', '0.22rem') 
                    }}>
                      Powered by KAI
                    </span>
                  </div>
                </div>
                {!isMobile && !isTablet && (
                  <div className={`absolute inset-0 rounded-full overflow-hidden transition-opacity duration-500 ${is3DButtonHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent shine-animation"></div>
                  </div>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Floating Plus Menu with Robot - Responsive Positioning */}
        <nav 
          className={`btn-pluss-wrapper fixed z-50 flex flex-col items-center transition-all duration-300 pointer-events-auto ${getPlusMenuPosition()}`}
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
          onClick={() => isMobile && setIsHovered(!isHovered)}
        >
          {/* Robot Image without Dialog */}
          <div className="flex flex-col items-center mb-2">
            {/* Robot Image only, no dialog */}
            <img 
              src={process.env.PUBLIC_URL + '/images/bot_kai.png'} 
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

        {/* Ninja Image without Dialog - Responsive Positioning */}
        <div className={`fixed left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 pointer-events-auto ${getNinjaPosition()}`}>
          <div className="relative flex flex-col items-center">
            {/* Ninja Image only, no dialog */}
            <img 
              src={process.env.PUBLIC_URL + '/images/ninja_v2.png'} 
              alt="Ninja character" 
              className="object-contain drop-shadow-lg pc-ninja" 
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

        /* Custom scrollbar for home theme */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #dbeafe;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
        
        /* For Firefox */
        .overflow-y-auto {
          scrollbarWidth: 'thin';
          scrollbarColor: '#3b82f6 #dbeafe';
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

        /* PC-only ninja adjustments */
        @media (min-width: 1024px) {
          .pc-ninja-bottom {
            margin-bottom: 0rem !important;
          }
          
          .pc-ninja {
            transform: translateY(10%) scale(1.1);
            transition: transform 0.5s ease-out;
          }
          
          .pc-ninja-container {
            bottom: 0rem !important;
          }
        }

        /* Optional: Add hover effect for PC */
        @media (min-width: 1024px) {
          .pc-ninja:hover {
            transform: translateY(20%) scale(1.15);
            filter: brightness(1.1) drop-shadow(0 10px 20px rgba(0,0,0,0.3));
          }
        }
      `}</style>
    </div>
  );
};

export default Home;