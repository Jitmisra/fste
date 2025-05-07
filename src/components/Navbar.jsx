import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
// Removed ThemeToggle import
import { useTheme } from '../../src/context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [loaded, setLoaded] = useState(false);
  const navRef = useRef(null);
  const { darkMode } = useTheme();
  
  const navLinks = [
    { name: 'Home', to: 'hero', offset: -70 },
    { name: 'The Challenge', to: 'challenge', offset: -70 },
    { name: 'System Map', to: 'system-map', offset: -70 },
    { name: 'Analysis', to: 'analysis', offset: -70 },
    { name: 'Solutions', to: 'solutions', offset: -70 },
    { name: 'Team', to: 'team', offset: -70 },
    { name: 'Sources', to: 'sources', offset: -70 }
  ];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => link.to);
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);
  
  // Set loaded state with slight delay for smooth animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle click outside mobile menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav 
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-3' 
          : 'bg-transparent dark:bg-transparent py-5'
      } ${loaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
    >
      {/* Progress line at bottom of navbar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-secondary to-primary-light opacity-0 transition-opacity duration-300" 
          style={{ opacity: scrolled ? 0.7 : 0, width: '100%' }}></div>
          
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="hero"
              spy={true}
              smooth={true}
              offset={-70}
              duration={800}
              className="cursor-pointer"
            >
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                10-Minute Promise
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation - Pill Design */}
          <div className="hidden md:block">
            <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
              <div className="flex space-x-1">
                {navLinks.map(link => (
                  <Link
                    key={link.name}
                    to={link.to}
                    spy={true}
                    smooth={true}
                    offset={link.offset}
                    duration={800}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeSection === link.to
                        ? 'bg-primary text-white shadow-sm' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-700/70'
                    } cursor-pointer`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Mobile Menu Button - Removed Theme Toggle */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5">
                <span className={`absolute w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transform transition-all duration-300 ${
                  isOpen ? 'rotate-45 top-2.5' : 'top-0.5'
                }`}></span>
                <span className={`absolute w-5 h-0.5 bg-gray-600 dark:bg-gray-300 top-2.5 transition-all duration-300 ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`absolute w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transform transition-all duration-300 ${
                  isOpen ? '-rotate-45 top-2.5' : 'top-4.5'
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation - Slide-in Panel */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] bg-white dark:bg-gray-900 z-50 shadow-xl md:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Menu
            </h2>
            <button 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div className="flex flex-col space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.to}
                spy={true}
                smooth={true}
                offset={link.offset}
                duration={800}
                className={`py-3 px-4 rounded-xl transition-all duration-300 ${
                  activeSection === link.to
                    ? 'bg-primary/10 text-primary dark:text-primary-light font-medium' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* Removed theme toggle section from mobile menu */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
