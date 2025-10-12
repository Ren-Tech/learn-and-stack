import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

const Preschool = () => {
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

  const dialogLines = ["I'm KAI", "Can I help?"];
  const ninjaLines = ["Ready", "Steady", "Succeed"];

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
  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isLandscape = windowSize.width > windowSize.height;

  // Get background image based on screen size
  const getBackgroundImage = () => {
    if (isMobile) {
      return "url('/images/home_pre.png')";
    } else {
      return "url('/images/pre-school.png')";
    }
  };

  // Responsive sizes
  const getResponsiveSize = (mobile, tablet, desktop) => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
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
    <div 
      className="min-h-screen bg-white relative overflow-x-hidden"
      style={{
        backgroundImage: getBackgroundImage(),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: isMobile ? 'scroll' : 'fixed'
      }}
    >
      {/* Overlay to ensure content readability */}
      <div className="absolute inset-0 bg-white/10 pointer-events-none"></div>
      
      <div className="relative z-10">
        <Navbar />

        {/* Floating Plus Menu with Robot and Dialog - Responsive Positioning */}
        <nav 
          className={`
            btn-pluss-wrapper fixed z-40 flex flex-col items-center
            ${isMobile 
              ? isLandscape 
                ? 'bottom-4 left-4' 
                : 'bottom-20 left-4'
              : 'bottom-16 right-10'
            }
          `}
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
                minWidth: getResponsiveSize('100px', '120px', '120px'),
                minHeight: getResponsiveSize('35px', '40px', '40px')
              }}
            >
              <div 
                className="font-medium text-gray-800"
                style={{
                  fontSize: getResponsiveSize('0.75rem', '0.875rem', '0.875rem')
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
                width: getResponsiveSize('2.5rem', '3rem', '3rem'),
                height: getResponsiveSize('2.5rem', '3rem', '3rem')
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
            width: isHovered ? getResponsiveSize('10rem', '11rem', '11rem') : '3rem'
          }}>
            {/* Plus Button with Jelly Animation Both Ways */}
            <div className={`
              bg-red-600 rounded-full flex items-center justify-center text-white font-bold
              transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              ${isHovered ? 'rotate-45 scale-105' : 'rotate-0 scale-100'}
              shadow-lg hover:shadow-xl border border-red-500
            `}
            style={{
              width: getResponsiveSize('2.5rem', '3rem', '3rem'),
              height: getResponsiveSize('2.5rem', '3rem', '3rem'),
              fontSize: getResponsiveSize('1rem', '1.25rem', '1.25rem')
            }}>
              +
            </div>
            
            {/* Menu Items with Jelly Staggered Animation Both Ways */}
            <ul className={`
              transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] px-3 w-full
              ${isHovered ? 'opacity-100 max-h-96 mt-4' : 'opacity-0 max-h-0 mt-0'}
            `}>
              {[
                { href: "#past-papers", text: "Past Papers" },
                { href: "#practice", text: "Practice" },
                { href: "#tutorial", text: "Tutorial Videos" },
                { href: "#contact", text: "Master Classes" },
                { href: "freetrial.php", text: "Free Trial" },
                { href: "#CreateaccountModal", text: "Be a Member" }
              ].map((item, index) => (
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
                    height: isHovered ? getResponsiveSize('2.5rem', '3rem', '3rem') : '0',
                    transitionDelay: isHovered 
                      ? `${index * 100}ms` 
                      : `${(5 - index) * 80}ms`
                  }}
                >
                  <a 
                    href={item.href} 
                    className="text-blue-900 font-medium block w-full h-full flex items-center justify-center transition-colors duration-300 hover:text-blue-700 p-1"
                    style={{
                      fontSize: getResponsiveSize('0.7rem', '0.8rem', '0.875rem')
                    }}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Ninja Image with Cartoon Dialog - Responsive Positioning */}
        <div className={`
          fixed bottom-0 left-1/2 transform -translate-x-1/2 z-30
          ${isMobile 
            ? isLandscape 
              ? 'mb-[-5px]' 
              : 'mb-[-15px]'
            : 'mb-[-40px]'
          }
        `}>
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
                  '20rem'
                ),
                height: getResponsiveSize(
                  isLandscape ? '8rem' : '12rem',
                  '14rem',
                  '20rem'
                )
              }}
            />
            
            {/* Ninja Cartoon Dialog - Responsive Positioning */}
            <div 
              className={`
                absolute transform
                ${isMobile 
                  ? isLandscape
                    ? 'top-4 -right-1 translate-x-full'
                    : 'top-12 -right-1 translate-x-full'
                  : 'top-20 -right-2 translate-x-full'
                }
              `}
            >
              <div 
                className="bg-white rounded-2xl px-3 py-2 shadow-lg border border-gray-200 relative"
                style={{
                  maxWidth: getResponsiveSize('140px', '160px', '180px'),
                  minHeight: getResponsiveSize('60px', '70px', '80px')
                }}
              >
                <div 
                  className="font-medium text-gray-800 whitespace-pre-line"
                  style={{
                    fontSize: getResponsiveSize('0.7rem', '0.8rem', '0.875rem')
                  }}
                >
                  {ninjaText}
                  <span className="inline-block w-1 h-3 bg-gray-800 ml-1 animate-pulse"></span>
                </div>
                {/* Speech bubble tail pointing left towards ninja */}
                <div 
                  className="absolute transform -translate-y-1/2 rotate-45 bg-white border-l border-b border-gray-200"
                  style={{
                    bottom: getResponsiveSize('1.5rem', '1.75rem', '2rem'),
                    left: '-0.25rem',
                    width: getResponsiveSize('0.5rem', '0.6rem', '0.75rem'),
                    height: getResponsiveSize('0.5rem', '0.6rem', '0.75rem')
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>

      <style jsx>{`
        /* Mobile-specific optimizations */
        @media (max-width: 767px) and (orientation: landscape) {
          .btn-pluss-wrapper {
            transform: scale(0.9);
          }
        }

        /* Prevent text selection on mobile */
        @media (max-width: 767px) {
          * {
            -webkit-tap-highlight-color: transparent;
          }
        }
      `}</style>
    </div>
  );
};

export default Preschool;