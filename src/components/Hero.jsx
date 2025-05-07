import { Link } from 'react-scroll';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Set a small delay to ensure animations start after render
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="min-h-screen pt-24 pb-16 md:pt-28 md:pb-20 flex items-center relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      {/* Modern animated shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-gradient-radial from-primary-light/10 to-transparent opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-radial from-secondary-light/10 to-transparent opacity-60"></div>
        
        {/* Floating blobs */}
        <div className={`absolute top-20 right-20 w-32 h-32 blob-shape bg-primary/5 border border-primary/10 ${loaded ? 'animate-float' : 'opacity-0'}`} 
            style={{ animationDelay: '0.1s' }}></div>
        <div className={`absolute bottom-20 left-20 w-40 h-40 blob-shape bg-secondary/5 border border-secondary/10 ${loaded ? 'animate-float' : 'opacity-0'}`} 
            style={{ animationDelay: '0.5s', animationDuration: '4s' }}></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOHY2YzYuNjI3IDAgMTIgNS4zNzMgMTIgMTJoNnptLTYgNmMwLTYuNjI3LTUuMzczLTEyLTEyLTEydjZjMy4zMTQgMCA2IDIuNjg2IDYgNmg2eiIgZmlsbD0icmdiYSgwLDAsMCwwLjAyKSIvPjwvZz48L3N2Zz4=')] opacity-30 dark:opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-6 md:px-8 responsive-py relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
          <div className="w-full md:w-1/2 space-y-6">
            <div className={`inline-block px-4 py-2 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light font-medium text-sm ${loaded ? 'animate-fade-in' : 'opacity-0'}`} 
                style={{ animationDelay: '0.1s' }}>
              Systems Thinking Analysis
            </div>
            
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-gray-900 dark:text-white ${loaded ? 'animate-slide-up' : 'opacity-0'}`} 
                style={{ animationDelay: '0.2s' }}>
              10 Minutes to Your Door: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Convenience at What Cost?</span>
            </h1>
            
            <p className={`text-lg md:text-xl text-gray-700 dark:text-gray-300 ${loaded ? 'animate-slide-up' : 'opacity-0'}`} 
                style={{ animationDelay: '0.3s' }}>
              Exploring the intricate web of customer behavior shifts, environmental tolls, and labor dynamics driven by the rise of ultra-fast delivery.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 ${loaded ? 'animate-slide-up' : 'opacity-0'}`} 
                style={{ animationDelay: '0.4s' }}>
              <Link 
                to="challenge"
                spy={true}
                smooth={true}
                offset={-70}
                duration={800}
                className="btn-primary"
              >
                Explore Our Analysis
              </Link>
              <Link 
                to="system-map"
                spy={true}
                smooth={true}
                offset={-70}
                duration={800}
                className="btn-outline"
              >
                View System Map
              </Link>
            </div>
          </div>
          
          <div className={`w-full md:w-1/2 ${loaded ? 'animate-slide-left' : 'opacity-0'}`} 
              style={{ animationDelay: '0.5s' }}>
            <div className="card p-6 shadow-lg transform transition-all duration-500 hover:shadow-xl">
              <div className="w-full h-64 rounded-lg mb-4 overflow-hidden">
                <img 
                  src="/assets/heroname.png" 
                  alt="Quick Commerce Delivery" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Quick Commerce Is Reshaping Our Cities</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Quick commerce is revolutionizing how we shop, promising unprecedented speed. But this convenience comes with a complex set of interconnected consequences. Our team delved into this system to understand its drivers, impacts, and potential leverage points for a more sustainable future.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <div 
              key={section.title}
              className={`card p-6 hover:shadow-lg ${loaded ? 'animate-scale-in' : 'opacity-0'}`} 
              style={{ animationDelay: `${0.6 + index * 0.2}s` }}
            >
              <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4 animate-pulse-slow">
                <span className="text-primary dark:text-primary-light text-2xl">{section.icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{section.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{section.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const sections = [
  {
    icon: "📊",
    title: "The Quick Commerce Phenomenon",
    description: "What is it and why is it booming? Explore the rapid rise of 10-minute delivery services and their impact on retail."
  },
  {
    icon: "🔄",
    title: "Our System Map (CLD)",
    description: "Visualizing the interconnected forces driving quick commerce growth and its various impacts through causal loop diagrams."
  },
  {
    icon: "⚖️",
    title: "Impacts & Trade-offs",
    description: "Analyzing the complex balance between customer convenience, environmental sustainability, and labor conditions."
  }
];

export default Hero;
