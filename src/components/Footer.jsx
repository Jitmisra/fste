import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-scroll';

const Footer = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <footer ref={ref} className="bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white py-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl transition-opacity duration-1000 ${loaded ? 'opacity-30' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-3xl transition-opacity duration-1000 ${loaded ? 'opacity-30' : 'opacity-0'}`}></div>
        
        {/* Grid pattern */}
        <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.015]">
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"></path>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-pattern)"></rect>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">10-Minute Promise</span>
              <span className="ml-2 w-2 h-2 rounded-full bg-primary animate-pulse-slow"></span>
            </h3>
            <p className="text-gray-400 mb-6">
              This project was developed for the FSTE Systems Thinking Hackathon 2025, exploring the systemic impacts of quick commerce.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <SocialLink 
                  key={index} 
                  href={link.href} 
                  icon={link.icon} 
                  delay={index * 0.1} 
                  loaded={loaded}
                />
              ))}
            </div>
            
            {/* Quick navigation */}
            <div className="mt-8 pt-8 border-t border-gray-800">
              <h4 className="text-sm font-medium text-gray-400 mb-3">Quick Navigation</h4>
              <div className="flex flex-wrap gap-2">
                {['Hero', 'Challenge', 'System Map', 'Analysis', 'Solutions'].map((section, i) => (
                  <Link
                    key={i}
                    to={section.toLowerCase().replace(' ', '-')}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={800}
                    className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {section}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: '0.2s'}}>
            <h3 className="text-xl font-bold mb-4">Team Members</h3>
            <ul className="space-y-3">
              {teamMembers.map((member, idx) => (
                <li 
                  key={idx} 
                  className={`text-gray-400 transition-all duration-300 ${
                    loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{transitionDelay: `${0.3 + idx * 0.1}s`}}
                >
                  <span className="font-medium text-white">{member.name}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: '0.4s'}}>
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-3">
              {resources.map((resource, idx) => (
                <ResourceLink 
                  key={idx} 
                  href={resource.href} 
                  label={resource.label} 
                  icon={resource.icon} 
                  delay={0.5 + idx * 0.1} 
                  loaded={loaded}
                />
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p className={`transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: '0.7s'}}>
            © 2025 Team Name. Created for the FSTE Systems Thinking Hackathon.
          </p>
          <p className={`mt-2 transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: '0.8s'}}>
            Tools Used: Vensim, React, Tailwind CSS, Three.js
          </p>
          
          {/* Additional credits */}
          <div className={`inline-flex items-center mt-6 bg-gray-800/50 px-4 py-2 rounded-full text-xs transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: '0.9s'}}>
            <span className="mr-2">Made with</span>
            <span className="text-red-500 animate-pulse">❤</span>
            <span className="mx-2">and</span>
            <span className="text-primary">Systems Thinking</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Social link component with hover effects
const SocialLink = ({ href, icon, delay, loaded }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <a 
      href={href} 
      className={`w-10 h-10 rounded-full flex items-center justify-center border border-gray-700 group transition-all duration-300 ${
        hovered ? 'bg-white border-white transform scale-110' : ''
      } ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{transitionDelay: `${0.2 + delay}s`}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className={`transition-colors duration-300 ${hovered ? 'text-gray-900' : 'text-gray-400'}`}>
        {icon}
      </span>
    </a>
  );
};

// Resource link component with hover effects
const ResourceLink = ({ href, label, icon, delay, loaded }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <li 
      className={`transition-all duration-300 ${
        loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
      }`}
      style={{transitionDelay: `${delay}s`}}
    >
      <a 
        href={href} 
        className="group flex items-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className={`text-lg mr-2 transition-all duration-300 ${
          hovered ? 'text-primary transform translate-x-1' : 'text-gray-500'
        }`}>{icon}</span>
        <span className={`transition-all duration-300 ${
          hovered ? 'text-white' : 'text-gray-400'
        }`}>{label}</span>
        <span className={`ml-2 transition-all duration-300 ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
        }`}>→</span>
      </a>
    </li>
  );
};

// Data for the footer
const socialLinks = [
  { 
    href: "#", 
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
    </svg>
  },
  { 
    href: "#", 
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.21c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.755zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
    </svg>
  },
  { 
    href: "#", 
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
    </svg>
  },
];

const teamMembers = [
  { name: "Agnik Misra" },
  { name: "Kartikey Gupta" },
  { name: "Kavya Jain" },
  { name: "Anshika Seth" },
  { name: "Abhijeet" }
];

const resources = [
  { href: "#", label: "Download Our Report (PDF)", icon: "📄" },
  { href: "#", label: "Vensim Model (.mdl)", icon: "🔄" },
  { href: "#", label: "Data Sources", icon: "📊" },
  { href: "#", label: "Further Reading", icon: "📚" },
];

export default Footer;
