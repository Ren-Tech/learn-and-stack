import React from 'react';

const BottomNav = () => {
  const navButtons = [
    { icon: 'home', tooltip: 'Home', path: '/', color: 'bg-blue-500' },
    { icon: 'info-circle', tooltip: 'Info', path: '/info', color: 'bg-green-500' },
    { icon: 'search', tooltip: 'Search', path: '/search', color: 'bg-purple-500' },
    { icon: 'globe', tooltip: 'World', path: '/world', color: 'bg-orange-500' },
    { icon: 'book', tooltip: 'Library', path: '/library', color: 'bg-indigo-500' },
    { icon: 'pencil-alt', tooltip: 'Learn', path: '/learn', color: 'bg-teal-500' },
    { icon: 'handshake', tooltip: 'Partners', path: '/partners', color: 'bg-yellow-500' },
    { icon: 'envelope', tooltip: 'Contact', path: '/contact', color: 'bg-pink-500' }
  ];

  const handleNavButtonClick = (path) => {
    console.log(`Navigating to ${path}`);
    // You can add navigation logic here later
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-900 backdrop-blur-2xl p-2 md:p-3 shadow-2xl border-t border-white/20 z-40 rounded-none">
      <div className="flex justify-center gap-1 md:gap-1.5 max-w-4xl mx-auto">
        {navButtons.map((button) => (
          <button
            key={button.tooltip}
            onClick={() => handleNavButtonClick(button.path)}
            className={`relative w-10 h-10 md:w-12 md:h-12 ${button.color} rounded-lg flex items-center justify-center cursor-pointer transition-all duration-400 hover:-translate-y-2 hover:scale-110 hover:brightness-110 hover:shadow-2xl active:translate-y-[-6px] active:scale-105 shadow-md border-2 border-white/30 group`}
          >
            <i className={`fas fa-${button.icon} text-white text-base md:text-lg drop-shadow-md transition-all duration-400 group-hover:scale-110 group-hover:rotate-12`} />
            
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 bg-blue-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none mb-2">
              {button.tooltip}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;