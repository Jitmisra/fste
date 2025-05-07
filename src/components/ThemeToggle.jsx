import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [hovered, setHovered] = useState(false);
  
  return (
    <button 
      onClick={toggleTheme} 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative p-2 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        darkMode 
          ? 'bg-gray-800 hover:bg-gray-700' 
          : 'bg-gray-100 hover:bg-gray-200'
      }`}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-5 h-5 overflow-hidden">
        {/* Sun icon */}
        <div 
          className={`absolute inset-0 transition-transform duration-500 ${
            darkMode ? 'scale-100 rotate-0' : 'scale-0 rotate-90'
          }`}
        >
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        </div>
        
        {/* Moon icon */}
        <div 
          className={`absolute inset-0 transition-transform duration-500 ${
            darkMode ? 'scale-0 -rotate-90' : 'scale-100 rotate-0'
          }`}
        >
          <svg className="w-5 h-5 text-indigo-700" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </div>
      </div>
      
      {/* Animated background glow */}
      <span className={`absolute inset-0 rounded-full transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
        <span className={`absolute inset-0 rounded-full ${darkMode ? 'animate-pulse-slow bg-yellow-500/10' : 'animate-pulse-slow bg-indigo-500/10'}`}></span>
      </span>
    </button>
  );
};

export default ThemeToggle;
