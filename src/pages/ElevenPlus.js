import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

const ElevenPlus = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [ninjaText, setNinjaText] = useState('');
  const [isNinjaTyping, setIsNinjaTyping] = useState(true);

  const dialogLines = ["I'm KAI", "Can I help?"];
  const ninjaLines = ["Ready", "Steady", "Succeed"];

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
        backgroundImage: "url('/images/11+.png')",
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
                      ? `h-9 mb-2 opacity-100 translate-x-0 scale-100` 
                      : 'h-0 opacity-0 translate-x-8 scale-90'
                    }
                    hover:bg-blue-50 hover:border-blue-200 hover:scale-105 hover:shadow-md
                  `}
                  style={{
                    transitionDelay: isHovered 
                      ? `${index * 100}ms` 
                      : `${(5 - index) * 80}ms`
                  }}
                >
                  <a 
                    href={item.href} 
                    className="text-blue-900 text-sm font-medium block w-full h-full flex items-center justify-center transition-colors duration-300 hover:text-blue-700"
                  >
                    {item.text}
                  </a>
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
            
            {/* Ninja Cartoon Dialog - Top Left of Image */}
            <div className="absolute top-20 -left-2 transform -translate-x-full">
              <div className="bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-200 relative max-w-[180px] min-h-[80px]">
                <div className="text-sm font-medium text-gray-800 whitespace-pre-line">
                  {ninjaText}
                  <span className="inline-block w-1 h-4 bg-gray-800 ml-1 animate-pulse"></span>
                </div>
                {/* Speech bubble tail pointing right towards ninja */}
                <div className="absolute bottom-4 -right-2 transform -translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-t border-gray-200"></div>
              </div>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
};

export default ElevenPlus;