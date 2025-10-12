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
  
  const navigate = useNavigate();

  const dialogLines = ["I'm KAI", "Can I help?"];
  const ninjaLines = ["Our knowledge team", "are always ready", "to help!"];

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

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isLandscape = windowSize.width > windowSize.height;
  const isMobileLandscape = isMobile && isLandscape;
  const isSmallMobileLandscape = isMobileLandscape && windowSize.width < 700;
  // Add tablet portrait detection
  const isTabletPortrait = isTablet && !isLandscape;

  const getResponsiveSize = (mobile, tablet, desktop, landscapeMobile = null, smallLandscape = null) => {
    if (isSmallMobileLandscape && smallLandscape !== null) return smallLandscape;
    if (isMobileLandscape && landscapeMobile !== null) return landscapeMobile;
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  // Updated circle positions for tablet - left to right arrangement
  const getCirclePosition = (angle, radius, index) => {
    if (isTablet) {
      // For tablet, arrange circles in a horizontal line from left to right
      const totalCircles = assessmentCategories.length;
      const spacing = 180; // Horizontal spacing between circles
      const startX = -((totalCircles - 1) * spacing) / 2;
      return { 
        x: startX + (index * spacing), 
        y: -80 // Position circles above the main button
      };
    }
    const radian = (angle * Math.PI) / 180;
    return { x: Math.cos(radian) * radius, y: Math.sin(radian) * radius };
  };

  const handleNavigation = (href) => {
    navigate(href);
  };

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

  // Function to determine which image to use
  const getHomeImage = () => {
    if (isMobileLandscape) return '/images/home_landscape.png';
    if (isMobile) return '/images/home_mob.png';
    if (isTabletPortrait) return '/images/tab_home.png'; // Use the tablet portrait image
    return '/images/homee.png'; // Default desktop image
  };

  // Function to determine button position - moved slightly up for tablet
  const getButtonPosition = () => {
    if (isMobileLandscape) return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-90';
    if (isMobile) return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
    if (isTablet) return 'top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2'; // Moved slightly up for tablet
    return 'top-1/2 right-[15%] transform -translate-y-1/2'; // Right side for desktop
  };

  // Function to determine ninja position - moved higher for tablet
  const getNinjaPosition = () => {
    if (isSmallMobileLandscape) return 'mb-[-8px] scale-65';
    if (isMobileLandscape) return 'mb-[-5px] scale-75';
    if (isMobile) return isLandscape ? 'mb-[-5px] scale-90' : 'mb-[-15px]';
    if (isTablet) return 'mb-[20px]'; // Moved higher for tablet
    return 'mb-[-40px]';
  };

  // Function to determine ninja dialog position - adjusted for tablet
  const getNinjaDialogPosition = () => {
    if (isSmallMobileLandscape) return 'top-1 -right-2 translate-x-full scale-75';
    if (isMobileLandscape) return 'top-2 -right-1 translate-x-full scale-90';
    if (isMobile) return isLandscape ? 'top-4 -right-1 translate-x-full' : 'top-12 -right-1 translate-x-full';
    if (isTablet) return 'top-4 -right-1 translate-x-full'; // Adjusted for higher ninja position
    return 'top-20 -right-2 translate-x-full';
  };

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden overflow-y-auto">
      {/* Main Content Image as Regular Content */}
      <div className="relative z-0 w-full h-screen">
        <img
          src={getHomeImage()} // Use the function to determine the image
          alt="Educational platform main content"
          className="w-full h-full object-cover"
          style={{
            imageRendering: '-webkit-optimize-contrast',
            WebkitBackfaceVisibility: 'hidden',
            MozBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
          }}
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10">
        <Navbar />

        {/* Game-Style 3D Circular Button with Curved Mini Circles */}
        <div 
          className={`fixed z-50 ${getButtonPosition()}`}
          onMouseEnter={() => setIs3DButtonHovered(true)}
          onMouseLeave={() => { setIs3DButtonHovered(false); setHoveredCircle(null); }}
        >
          <div className="relative" style={{ width: getResponsiveSize('200px', '250px', '280px', '180px', '160px'), height: getResponsiveSize('200px', '250px', '280px', '180px', '160px') }}>
            <div className="absolute inset-0">
              {assessmentCategories.map((category, index) => {
                const radius = getResponsiveSize(120, 150, 180, 100, 90);
                const position = getCirclePosition(category.angle, radius, index);
                const circleSize = getResponsiveSize('80px', '100px', '112px', '70px', '60px');
                
                return (
                  <div key={category.title} className={`absolute transition-all duration-700 ease-out ${is3DButtonHovered && !isMobile ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                    style={{ 
                      left: '50%', 
                      top: '50%', 
                      transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`, 
                      transitionDelay: is3DButtonHovered ? `${index * 120}ms` : '0ms' 
                    }}
                    onMouseEnter={() => !isMobile && setHoveredCircle(index)}
                    onMouseLeave={() => !isMobile && setHoveredCircle(null)}>
                    {!isMobile && (
                      <svg className={`absolute transition-all duration-500 ${is3DButtonHovered ? 'opacity-100' : 'opacity-0'}`}
                        style={{ 
                          left: '50%', 
                          top: '50%', 
                          transform: `translate(-50%, -50%)`, 
                          width: isTablet ? `${Math.abs(position.x) * 2 + 50}px` : `${radius + 50}px`, 
                          height: isTablet ? '100px' : `${radius + 50}px`, 
                          pointerEvents: 'none', 
                          transitionDelay: is3DButtonHovered ? `${index * 120 + 200}ms` : '0ms' 
                        }}>
                        {/* Only show connecting lines for tablet in horizontal layout */}
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
                    <div className={`relative rounded-full transform transition-all duration-400 cursor-pointer ${!isMobile && hoveredCircle === index ? 'scale-110 rotate-12' : 'scale-100 rotate-0'} bg-gradient-to-br ${category.gradient} shadow-xl ${category.shadow} ${!isMobile && hoveredCircle === index ? `${category.glow} shadow-2xl` : ''}`}
                      style={{ 
                        width: circleSize, 
                        height: circleSize, 
                        border: '4px solid rgba(255, 255, 255, 0.3)', 
                        boxShadow: !isMobile && hoveredCircle === index ? `0 15px 40px ${category.shadow.replace('/50', '/60')}, inset 0 -4px 12px rgba(0,0,0,0.3), inset 0 4px 12px rgba(255,255,255,0.3)` : '0 8px 25px rgba(0,0,0,0.3), inset 0 -3px 10px rgba(0,0,0,0.3), inset 0 3px 10px rgba(255,255,255,0.2)' 
                      }}
                      onClick={() => handleNavigation(category.href)}>
                      <div className="absolute inset-2 rounded-full border-2 border-white/20"></div>
                      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
                      <div className="relative z-10 flex flex-col items-center justify-center h-full p-2">
                        <span className="text-white font-black tracking-wider mb-1 drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)', fontSize: getResponsiveSize('0.75rem', '0.875rem', '1.125rem', '0.7rem', '0.65rem') }}>{category.title}</span>
                      </div>
                      {!isMobile && <div className={`absolute inset-0 rounded-full transition-all duration-500 ${hoveredCircle === index ? 'opacity-100' : 'opacity-0'}`} style={{ border: '2px dashed rgba(255, 255, 255, 0.4)', animation: hoveredCircle === index ? 'spin 3s linear infinite' : 'none' }}></div>}
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

            <button className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ${!isMobile && is3DButtonHovered ? 'scale-110' : 'scale-100'} cursor-pointer group`}
              style={{ 
                width: getResponsiveSize('100px', '120px', '160px', '90px', '80px'), 
                height: getResponsiveSize('100px', '120px', '160px', '90px', '80px'), 
                background: 'linear-gradient(145deg, #fbbf24, #f59e0b, #d97706)', 
                boxShadow: !isMobile && is3DButtonHovered ? '0 20px 50px rgba(251, 191, 36, 0.6), 0 0 80px rgba(251, 191, 36, 0.4), inset 0 -8px 20px rgba(0,0,0,0.4), inset 0 8px 20px rgba(255,255,255,0.3)' : '0 12px 30px rgba(251, 191, 36, 0.4), 0 0 40px rgba(251, 191, 36, 0.2), inset 0 -5px 15px rgba(0,0,0,0.3), inset 0 5px 15px rgba(255,255,255,0.2)', 
                border: '5px solid rgba(255, 255, 255, 0.3)' 
              }}
              onClick={() => handleNavigation('/assessment')}>
              <div className="absolute inset-0 rounded-full" style={{ border: '3px solid rgba(0, 0, 0, 0.2)', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.5), inset 0 -2px 4px rgba(0,0,0,0.3)' }}></div>
              {!isMobile && <div className={`absolute inset-0 rounded-full transition-opacity duration-500 ${is3DButtonHovered ? 'opacity-100' : 'opacity-60'}`} style={{ border: '2px dashed rgba(255, 255, 255, 0.3)', animation: is3DButtonHovered ? 'spin 4s linear infinite' : 'none' }}></div>}
              <div className={`absolute rounded-full transition-opacity duration-700 ${!isMobile && is3DButtonHovered ? 'opacity-100' : 'opacity-60'}`} style={{ inset: getResponsiveSize('1.5rem', '1.75rem', '1.5rem', '1rem', '0.875rem'), background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)', animation: !isMobile && is3DButtonHovered ? 'pulse 1.5s ease-in-out infinite' : 'none' }}></div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <div className="relative mb-1">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
                  <svg className="text-white drop-shadow-lg relative z-10" style={{ width: getResponsiveSize('2rem', '2.5rem', '3.5rem', '1.75rem', '1.5rem'), height: getResponsiveSize('2rem', '2.5rem', '3.5rem', '1.75rem', '1.5rem') }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div className="text-center">
                  <span className="text-white font-black tracking-wider drop-shadow-lg block" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.3)', fontSize: getResponsiveSize('0.75rem', '0.875rem', '1.25rem', '0.7rem', '0.65rem') }}>INSTANT</span>
                  <div className="text-white font-bold tracking-wide drop-shadow-lg" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)', fontSize: getResponsiveSize('0.6rem', '0.7rem', '0.875rem', '0.55rem', '0.5rem') }}>ASSESS</div>
                  <span className="text-white/90 font-semibold mt-0.5 block" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)', fontSize: getResponsiveSize('0.5rem', '0.6rem', '0.5rem', '0.45rem', '0.4rem') }}>Powered by KAI</span>
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

        {/* Floating Plus Menu with Robot and Dialog */}
        <nav className={`btn-pluss-wrapper fixed z-40 flex flex-col items-center transition-all duration-300 ${
          isSmallMobileLandscape ? 'bottom-1 left-1 scale-75' : 
          isMobileLandscape ? 'bottom-2 left-2 scale-85' : 
          isMobile ? isLandscape ? 'bottom-4 left-4' : 'bottom-20 left-4' : 
          'bottom-16 right-10'
        }`}
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
          onClick={() => isMobile && setIsHovered(!isHovered)}>
          
          {/* Robot Dialog */}
          <div className="flex flex-col items-center mb-2">
            <div className="bg-white rounded-2xl px-3 py-2 shadow-lg border border-gray-200 mb-2 relative" style={{ 
              minWidth: getResponsiveSize('100px', '120px', '120px', '90px', '80px'), 
              minHeight: getResponsiveSize('35px', '40px', '40px', '30px', '25px') 
            }}>
              <div className="font-medium text-gray-800" style={{ fontSize: getResponsiveSize('0.75rem', '0.875rem', '0.875rem', '0.7rem', '0.65rem') }}>
                {displayedText}
                <span className="inline-block w-1 h-3 bg-gray-800 ml-1 animate-pulse"></span>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-200"></div>
            </div>
            <img 
              src="/images/bot_kai.png" 
              alt="KAI Robot assistant" 
              className="object-contain drop-shadow-lg transition-transform duration-300 hover:scale-110" 
              style={{ 
                width: getResponsiveSize('2.5rem', '3rem', '3rem', '2rem', '1.75rem'), 
                height: getResponsiveSize('2.5rem', '3rem', '3rem', '2rem', '1.75rem') 
              }} 
            />
          </div>

          {/* Jelly Menu */}
          <div className={`btn-pluss bg-blue-900 overflow-hidden flex flex-col items-center transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isHovered ? 'h-auto rounded-2xl pb-3 pt-3 shadow-2xl' : 'h-12 rounded-full shadow-lg'
          } border border-blue-700`} style={{ 
            width: isHovered ? getResponsiveSize('10rem', '11rem', '11rem', '9rem', '8rem') : getResponsiveSize('3rem', '3rem', '3rem', '2.5rem', '2.25rem')
          }}>
            <div className={`bg-red-600 rounded-full flex items-center justify-center text-white font-bold transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              isHovered ? 'rotate-45 scale-105' : 'rotate-0 scale-100'
            } shadow-lg hover:shadow-xl border border-red-500`} style={{ 
              width: getResponsiveSize('2.5rem', '3rem', '3rem', '2rem', '1.75rem'), 
              height: getResponsiveSize('2.5rem', '3rem', '3rem', '2rem', '1.75rem'), 
              fontSize: getResponsiveSize('1rem', '1.25rem', '1.25rem', '0.875rem', '0.8rem') 
            }}>+</div>
            
            <ul className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] px-3 w-full ${
              isHovered ? 'opacity-100 max-h-96 mt-4' : 'opacity-0 max-h-0 mt-0'
            }`}>
              {menuItems.map((item, index) => (
                <li key={index} className={`bg-white rounded-lg transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform border border-gray-100 shadow-sm ${
                  isHovered ? `mb-2 opacity-100 translate-x-0 scale-100` : 'opacity-0 translate-x-8 scale-90'
                } hover:bg-blue-50 hover:border-blue-200 hover:scale-105 hover:shadow-md cursor-pointer`}
                  style={{ 
                    height: isHovered ? getResponsiveSize('2.5rem', '3rem', '3rem', '2.25rem', '2rem') : '0', 
                    transitionDelay: isHovered ? `${index * 100}ms` : `${(menuItems.length - index) * 80}ms` 
                  }}
                  onClick={() => handleNavigation(item.href)}>
                  <div className="text-blue-900 font-medium block w-full h-full flex flex-col items-center justify-center transition-colors duration-300 hover:text-blue-700 p-1" style={{ 
                    fontSize: getResponsiveSize('0.7rem', '0.8rem', '0.875rem', '0.65rem', '0.6rem') 
                  }}>
                    <span className="font-semibold">{item.text}</span>
                    <span className="text-gray-600" style={{ 
                      fontSize: getResponsiveSize('0.6rem', '0.7rem', '0.75rem', '0.55rem', '0.5rem') 
                    }}>{item.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Ninja Image with Cartoon Dialog - Updated for tablet */}
        <div className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 z-30 transition-all duration-300 ${getNinjaPosition()}`}>
          <div className="relative">
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
            <div className={`absolute transform ${getNinjaDialogPosition()}`}>
              <div className="bg-white rounded-2xl px-3 py-2 shadow-lg border border-gray-200 relative" style={{ 
                maxWidth: getResponsiveSize('140px', '160px', '180px', '120px', '100px'), 
                minHeight: getResponsiveSize('60px', '70px', '80px', '50px', '45px') 
              }}>
                <div className="font-medium text-gray-800 whitespace-pre-line" style={{ 
                  fontSize: getResponsiveSize('0.7rem', '0.8rem', '0.875rem', '0.65rem', '0.6rem') 
                }}>
                  {ninjaText}
                  <span className="inline-block w-1 h-3 bg-gray-800 ml-1 animate-pulse"></span>
                </div>
                <div className="absolute transform -translate-y-1/2 rotate-45 bg-white border-l border-b border-gray-200" style={{ 
                  bottom: getResponsiveSize('1.5rem', '1.75rem', '2rem', '1.25rem', '1rem'), 
                  left: '-0.25rem', 
                  width: getResponsiveSize('0.5rem', '0.6rem', '0.75rem', '0.4rem', '0.35rem'), 
                  height: getResponsiveSize('0.5rem', '0.6rem', '0.75rem', '0.4rem', '0.35rem') 
                }}></div>
              </div>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>

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
        
        /* Enhanced landscape responsiveness */
        @media (max-width: 767px) and (orientation: landscape) {
          .btn-pluss-wrapper { 
            transform: scale(0.85); 
            bottom: 1rem !important; 
            left: 1rem !important; 
          }
          body { overflow-x: hidden; }
        }
        
        @media (max-width: 640px) and (orientation: landscape) {
          .btn-pluss-wrapper { 
            transform: scale(0.75); 
            bottom: 0.5rem !important; 
            left: 0.5rem !important; 
          }
        }
        
        @media (max-width: 500px) and (orientation: landscape) {
          .btn-pluss-wrapper { 
            transform: scale(0.65); 
            bottom: 0.25rem !important; 
            left: 0.25rem !important; 
          }
        }
        
        @media (max-width: 767px) {
          * { -webkit-tap-highlight-color: transparent; }
        }
        
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .btn-pluss-wrapper, .ninja-container { image-rendering: -webkit-optimize-contrast; }
        }
      `}</style>
    </div>
  );
};

export default Home;