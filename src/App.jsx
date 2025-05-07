import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Challenge from './components/Challenge';
import SystemMap from './components/SystemMap';
import Analysis from './components/Analysis';
import Solutions from './components/Solutions';
import Team from './components/Team';
import SourcesSection from './components/SourcesSection';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading time for resources
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      {/* Initial loading animation */}
      {loading ? (
        <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="inline-block relative w-24 h-24 mb-8">
              {/* Circular loader with multiple rings */}
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse"></div>
              <div className="absolute inset-0 rounded-full border-t-4 border-r-4 border-primary animate-spin"></div>
              <div className="absolute inset-[10px] rounded-full border-b-4 border-l-4 border-secondary animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
              
              {/* Icon in the center */}
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">10-Minute Promise</h1>
            <p className="text-gray-400">Loading systems thinking visualization...</p>
          </div>
        </div>
      ) : (
        <div className="w-full min-w-full overflow-x-hidden" style={{ width: '100vw', maxWidth: '100vw' }}>
          <Navbar />
          <Hero />
          <Challenge />
          <SystemMap />
          <Analysis />
          <Solutions />
          <Team />
          <SourcesSection />
          <Footer />
          <ChatBot />
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
