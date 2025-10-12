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
  
  const navigate = useNavigate();

  const dialogLines = ["I'm KAI", "Can I help?"];
  const ninjaLines = ["Our knowledge team", "are always ready", "to help!"];

  // Navigation items matching your navbar structure exactly
  const menuItems = [
    { 
      href: "/primary", 
      text: "Primary",
      description: "6-11 Years Old"
    },
    { 
      href: "/preschool", 
      text: "Pre-School",
      description: "2-5 Years Old"
    },
    { 
      href: "/11plus", 
      text: "11+",
      description: "11 Years Old"
    },
    { 
      href: "/gcses", 
      text: "GCSEs",
      description: "14-16 Years Old"
    },
    { 
      href: "/alevels", 
      text: "A-Levels",
      description: "16-18 Years Old"
    },
  ];

  const assessmentCategories = [
    { 
      title: "SAT", 
      gradient: "from-purple-600 via-purple-500 to-pink-500",
      shadow: "shadow-purple-500/50",
      glow: "shadow-purple-400",
      angle: -60,
      href: "/sat"
    },
    { 
      title: "11+", 
      gradient: "from-blue-600 via-blue-500 to-cyan-500",
      shadow: "shadow-blue-500/50",
      glow: "shadow-blue-400",
      angle: -20,
      href: "/11plus"
    },
    { 
      title: "GCSEs", 
      gradient: "from-green-600 via-green-500 to-emerald-500",
      shadow: "shadow-green-500/50",
      glow: "shadow-green-400",
      angle: 20,
      href: "/gcses"
    },
    { 
      title: "A-Levels", 
      gradient: "from-orange-600 via-orange-500 to-yellow-500",
      shadow: "shadow-orange-500/50",
      glow: "shadow-orange-400",
      angle: 60,
      href: "/alevels"
    }
  ];

  // Navigation handler
  const handleNavigation = (href) => {
    navigate(href);
  };

  // Calculate position on arc
  const getCirclePosition = (angle, radius) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius
    };
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
        backgroundImage: "url('/images/homeee.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay to ensure content readability */}
      <div className="absolute inset-0 bg-white/10 pointer-events-none"></div>
      
      <div className="relative z-10">
        <Navbar />

        {/* Game-Style 3D Circular Button with Curved Mini Circles */}
        <div 
          className="fixed top-1/2 right-[15%] transform -translate-y-1/2 z-50"
          onMouseEnter={() => setIs3DButtonHovered(true)}
          onMouseLeave={() => {
            setIs3DButtonHovered(false);
            setHoveredCircle(null);
          }}
        >
          <div className="relative" style={{ width: '280px', height: '280px' }}>
            {/* Mini Circles Container - Following Circular Arc */}
            <div className="absolute inset-0">
              {assessmentCategories.map((category, index) => {
                const radius = 180;
                const position = getCirclePosition(category.angle, radius);
                
                return (
                  <div
                    key={category.title}
                    className={`
                      absolute transition-all duration-700 ease-out
                      ${is3DButtonHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                    `}
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
                      transitionDelay: is3DButtonHovered ? `${index * 120}ms` : '0ms'
                    }}
                    onMouseEnter={() => setHoveredCircle(index)}
                    onMouseLeave={() => setHoveredCircle(null)}
                  >
                    {/* Curved Connection Line */}
                    <svg 
                      className={`
                        absolute transition-all duration-500
                        ${is3DButtonHovered ? 'opacity-100' : 'opacity-0'}
                      `}
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%)`,
                        width: `${radius + 50}px`,
                        height: `${radius + 50}px`,
                        pointerEvents: 'none',
                        transitionDelay: is3DButtonHovered ? `${index * 120 + 200}ms` : '0ms'
                      }}
                    >
                      <path
                        d={`M ${(radius + 50) / 2} ${(radius + 50) / 2} L ${(radius + 50) / 2 - position.x} ${(radius + 50) / 2 - position.y}`}
                        stroke="rgba(251, 191, 36, 0.6)"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="5,5"
                      />
                      <circle
                        cx={`${(radius + 50) / 2 - position.x}`}
                        cy={`${(radius + 50) / 2 - position.y}`}
                        r="4"
                        fill="#fbbf24"
                        className="drop-shadow-lg"
                        style={{
                          filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.8))'
                        }}
                      />
                    </svg>

                    {/* Category Circle - Game Style with Navigation */}
                    <div 
                      className={`
                        relative w-28 h-28 rounded-full
                        transform transition-all duration-400
                        cursor-pointer
                        ${hoveredCircle === index ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}
                        bg-gradient-to-br ${category.gradient}
                        shadow-xl ${category.shadow}
                        ${hoveredCircle === index ? `${category.glow} shadow-2xl` : ''}
                      `}
                      onClick={() => handleNavigation(category.href)}
                      style={{
                        border: '4px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: hoveredCircle === index 
                          ? `0 15px 40px ${category.shadow.replace('/50', '/60')}, inset 0 -4px 12px rgba(0,0,0,0.3), inset 0 4px 12px rgba(255,255,255,0.3)`
                          : '0 8px 25px rgba(0,0,0,0.3), inset 0 -3px 10px rgba(0,0,0,0.3), inset 0 3px 10px rgba(255,255,255,0.2)'
                      }}
                    >
                      {/* Inner ring */}
                      <div className="absolute inset-2 rounded-full border-2 border-white/20"></div>
                      
                      {/* Glow effect */}
                      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
                      
                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-center justify-center h-full p-2">
                        <span className="text-white text-lg font-black tracking-wider mb-1 drop-shadow-lg"
                          style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
                          {category.title}
                        </span>
                      </div>

                      {/* Orbital ring decoration */}
                      <div className={`
                        absolute inset-0 rounded-full transition-all duration-500
                        ${hoveredCircle === index ? 'opacity-100' : 'opacity-0'}
                      `}
                      style={{
                        border: '2px dashed rgba(255, 255, 255, 0.4)',
                        animation: hoveredCircle === index ? 'spin 3s linear infinite' : 'none'
                      }}></div>

                      {/* Hover shine */}
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

            {/* Main 3D Game-Style Circular Button - Centered */}
            <button
              className={`
                absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
                w-40 h-40 rounded-full
                transition-all duration-500
                ${is3DButtonHovered ? 'scale-110' : 'scale-100'}
                cursor-pointer group
              `}
              onClick={() => handleNavigation('/assessment')}
              style={{
                background: 'linear-gradient(145deg, #fbbf24, #f59e0b, #d97706)',
                boxShadow: is3DButtonHovered 
                  ? '0 20px 50px rgba(251, 191, 36, 0.6), 0 0 80px rgba(251, 191, 36, 0.4), inset 0 -8px 20px rgba(0,0,0,0.4), inset 0 8px 20px rgba(255,255,255,0.3)'
                  : '0 12px 30px rgba(251, 191, 36, 0.4), 0 0 40px rgba(251, 191, 36, 0.2), inset 0 -5px 15px rgba(0,0,0,0.3), inset 0 5px 15px rgba(255,255,255,0.2)',
                border: '5px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              {/* Outer game ring */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  border: '3px solid rgba(0, 0, 0, 0.2)',
                  boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.5), inset 0 -2px 4px rgba(0,0,0,0.3)'
                }}
              ></div>

              {/* Rotating outer ring decoration */}
              <div 
                className={`
                  absolute inset-0 rounded-full transition-opacity duration-500
                  ${is3DButtonHovered ? 'opacity-100' : 'opacity-60'}
                `}
                style={{
                  border: '2px dashed rgba(255, 255, 255, 0.3)',
                  animation: is3DButtonHovered ? 'spin 4s linear infinite' : 'none'
                }}
              ></div>

              {/* Inner glow pulse effect */}
              <div className={`
                absolute inset-6 rounded-full transition-opacity duration-700
                ${is3DButtonHovered ? 'opacity-100' : 'opacity-60'}
              `}
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)',
                animation: is3DButtonHovered ? 'pulse 1.5s ease-in-out infinite' : 'none'
              }}></div>
              
              {/* Icon Container */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                {/* Game-style icon with border */}
                <div className="relative mb-2">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
                  <svg 
                    className="w-14 h-14 text-white drop-shadow-lg relative z-10" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
                    />
                  </svg>
                </div>
                
                {/* Game-style text with shadow */}
                <div className="text-center">
                  <span className="text-white text-xl font-black tracking-wider drop-shadow-lg" 
                    style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.3)'}}>
                    INSTANT
                  </span>
                  <div className="text-white text-sm font-bold tracking-wide drop-shadow-lg"
                    style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
                    ASSESS
                  </div>
                   <span className="text-white/90 text-[8px] font-semibold mt-1"
                          style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
                          Powered by KAI
                        </span>
                </div>
              </div>

              {/* Animated shine effect */}
              <div 
                className={`
                  absolute inset-0 rounded-full overflow-hidden
                  transition-opacity duration-500
                  ${is3DButtonHovered ? 'opacity-100' : 'opacity-0'}
                `}
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent shine-animation"
                ></div>
              </div>
            </button>
          </div>
        </div>

        {/* Floating Plus Menu with Robot and Dialog */}
        <nav 
          className="btn-pluss-wrapper fixed bottom-16 right-10 z-40 flex flex-col items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Robot Image with Cartoon Dialog - Always Visible */}
          <div className="flex flex-col items-center mb-2">
            {/* Cartoon Dialog */}
            <div className="bg-white rounded-2xl px-4 py-2 shadow-lg border border-gray-200 mb-2 relative min-w-[120px] min-h-[40px]">
              <div className="text-sm font-medium text-gray-800">
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
              className="w-12 h-12 object-contain drop-shadow-lg transition-transform duration-300 hover:scale-110"
            />
          </div>

          {/* Menu Container */}
          <div className={`
            btn-pluss bg-blue-900 overflow-hidden flex flex-col items-center
            transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            ${isHovered ? 'h-auto rounded-2xl pb-3 pt-3 shadow-2xl' : 'h-12 rounded-full shadow-lg'}
            border border-blue-700
          `}>
            {/* Plus Button with Jelly Animation Both Ways */}
            <div className={`
              bg-red-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold
              transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              ${isHovered ? 'rotate-45 scale-105' : 'rotate-0 scale-100'}
              shadow-lg hover:shadow-xl
              border border-red-500
            `}>
              +
            </div>
            
            {/* Menu Items with Jelly Staggered Animation Both Ways */}
            <ul className={`
              transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] w-44 px-3
              ${isHovered ? 'opacity-100 max-h-96 mt-4' : 'opacity-0 max-h-0 mt-0'}
            `}>
              {menuItems.map((item, index) => (
                <li 
                  key={index}
                  className={`
                    bg-white rounded-lg transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    transform border border-gray-100 shadow-sm
                    ${isHovered 
                      ? `h-12 mb-2 opacity-100 translate-x-0 scale-100` 
                      : 'h-0 opacity-0 translate-x-8 scale-90'
                    }
                    hover:bg-blue-50 hover:border-blue-200 hover:scale-105 hover:shadow-md
                    cursor-pointer
                  `}
                  style={{
                    transitionDelay: isHovered 
                      ? `${index * 100}ms` 
                      : `${(menuItems.length - index) * 80}ms`
                  }}
                  onClick={() => handleNavigation(item.href)}
                >
                  <div className="text-blue-900 text-sm font-medium block w-full h-full flex flex-col items-center justify-center transition-colors duration-300 hover:text-blue-700 p-1">
                    <span className="font-semibold">{item.text}</span>
                    <span className="text-xs text-gray-600">{item.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Ninja Image with Cartoon Dialog */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-30 mb-[-15px] md:mb-[-40px]">
          <div className="relative">
            {/* Ninja Image */}
            <img 
              src="/images/ninja.png" 
              alt="Ninja" 
              className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-lg"
            />
            
            {/* Ninja Cartoon Dialog - Top Right of Image */}
            <div className="absolute top-20 -right-2 transform translate-x-full">
              <div className="bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-200 relative max-w-[180px] min-h-[80px]">
                <div className="text-sm font-medium text-gray-800 whitespace-pre-line">
                  {ninjaText}
                  <span className="inline-block w-1 h-4 bg-gray-800 ml-1 animate-pulse"></span>
                </div>
                {/* Speech bubble tail pointing left towards ninja */}
                <div className="absolute bottom-4 -left-2 transform -translate-y-1/2 rotate-45 w-3 h-3 bg-white border-l border-b border-gray-200"></div>
              </div>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .shine-animation {
          animation: shine 2s infinite;
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;