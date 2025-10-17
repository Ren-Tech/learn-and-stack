import React, { useState, useEffect } from 'react';
import { Home, Info, Search, Globe, Book, PencilLine, Handshake, Mail } from 'lucide-react';

const BottomNav = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navButtons = [
    { icon: Home, tooltip: 'Home', path: '/', color: 'bg-blue-500' },
    { icon: Info, tooltip: 'Info', path: '/info', color: 'bg-green-500' },
    { icon: Search, tooltip: 'Search', path: '/search', color: 'bg-purple-500' },
    { icon: Globe, tooltip: 'World', path: '/world', color: 'bg-orange-500' },
    { icon: Book, tooltip: 'Library', path: '/library', color: 'bg-indigo-500' },
    { icon: PencilLine, tooltip: 'Learn', path: '/learn', color: 'bg-teal-500' },
    { icon: Handshake, tooltip: 'Partners', path: '/partners', color: 'bg-yellow-500' },
    { icon: Mail, tooltip: 'Contact', path: '/contact', color: 'bg-pink-500' }
  ];

  const handleNavButtonClick = (path) => {
    console.log(`Navigating to ${path}`);
    // You can add navigation logic here later
  };

  // Handle scroll behavior for landscape mobile
  useEffect(() => {
    const isLandscape = () => {
      return window.innerHeight < 500 && window.innerWidth < 900;
    };

    const handleScroll = () => {
      if (!isLandscape()) {
        setIsNavVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        // Scrolling up or at top
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down
        setIsNavVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    const handleResize = () => {
      if (!isLandscape()) setIsNavVisible(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [lastScrollY]);

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-blue-900 backdrop-blur-2xl p-2 md:p-3 shadow-2xl border-t border-white/20 z-40 rounded-none transition-transform duration-300 ${
      isNavVisible ? "translate-y-0" : "translate-y-full"
    }`}>
      <div className="flex justify-center gap-1 md:gap-1.5 max-w-4xl mx-auto">
        {navButtons.map((button) => {
          const IconComponent = button.icon;
          return (
            <button
              key={button.tooltip}
              onClick={() => handleNavButtonClick(button.path)}
              className={`relative w-10 h-10 md:w-12 md:h-12 ${button.color} rounded-lg flex items-center justify-center cursor-pointer transition-all duration-400 hover:-translate-y-2 hover:scale-110 hover:brightness-110 hover:shadow-2xl active:translate-y-[-6px] active:scale-105 shadow-md border-2 border-white/30 group`}
            >
              <IconComponent className="text-white w-4 h-4 md:w-5 md:h-5 drop-shadow-md transition-all duration-400 group-hover:scale-110 group-hover:rotate-12" />
              
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 bg-blue-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none mb-2">
                {button.tooltip}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;