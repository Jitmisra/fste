import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Solutions = () => {
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
    <section id="solutions" className="section bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -right-10 -top-20 w-64 h-64 bg-gradient-radial from-primary-light/10 to-transparent opacity-80"></div>
        <div className="absolute -left-20 bottom-0 w-96 h-96 bg-gradient-radial from-secondary-light/10 to-transparent opacity-70"></div>
      </div>
      
      <div ref={ref} className="container relative z-10">
        <div className={`mb-16 text-center ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Pathways to Sustainable & Ethical Quick Commerce</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Addressing the challenges of quick commerce requires more than quick fixes. 
            We propose interventions targeting the structural level of the system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stakeholders.map((stakeholder, index) => (
            <StakeholderCard 
              key={stakeholder.title} 
              stakeholder={stakeholder} 
              index={index} 
              inView={inView} 
              loaded={loaded} 
            />
          ))}
        </div>

        <div className={`${inView ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: "0.8s"}}>
          <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none"></div>
            
            <h3 className="text-2xl font-semibold mb-8 text-center relative z-10">Implementation Roadmap</h3>
            
            <div className="relative">
              {timeframes.map((timeframe, index) => (
                <TimeframeStep 
                  key={timeframe.period} 
                  timeframe={timeframe} 
                  index={index} 
                  isLast={index === timeframes.length - 1} 
                  loaded={loaded}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// New component for stakeholder cards with hover effects
const StakeholderCard = ({ stakeholder, index, inView, loaded }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div 
      className={`group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 ${
        hovered ? 'shadow-lg transform scale-[1.02]' : ''
      } ${inView ? 'animate-fade-in' : 'opacity-0'}`}
      style={{animationDelay: `${0.2 * (index + 1)}s`}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`h-2 ${stakeholder.colorClass} w-full transform transition-all duration-500 ${hovered ? 'h-3' : ''}`}></div>
      <div className="p-6">
        <div className={`w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 mx-auto transition-transform duration-500 ${hovered ? 'scale-110' : ''}`}>
          <span className="text-2xl">{stakeholder.icon}</span>
        </div>
        <h3 className="text-xl font-semibold mb-4 text-center">{stakeholder.title}</h3>
        <ul className="space-y-3">
          {stakeholder.solutions.map((solution, idx) => (
            <li 
              key={idx} 
              className={`flex items-start transition-all duration-300 ${
                loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
              style={{transitionDelay: `${0.1 * (idx + 1)}s`}}
            >
              <span className={`${stakeholder.checkColor || 'text-green-500'} mr-2 transform transition-transform duration-300 ${hovered ? 'scale-125' : ''}`}>✓</span>
              <span className="text-gray-700">{solution}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// New component for timeframe steps with animations
const TimeframeStep = ({ timeframe, index, isLast, loaded }) => {
  return (
    <div className={`mb-12 last:mb-0 transition-all duration-500 ${
      loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`} style={{transitionDelay: `${0.3 * (index + 1)}s`}}>
      <div className="flex">
        <div className="flex flex-col items-center mr-6">
          <div className={`w-10 h-10 rounded-full ${timeframe.colorClass} flex items-center justify-center text-white font-bold text-sm shadow-md relative z-10`}>
            {index + 1}
            
            {/* Pulsing animation around timeline nodes */}
            <span className="absolute inset-0 rounded-full animate-pulse-slow opacity-70" style={{
              animationDelay: `${index * 0.5}s`,
              backgroundColor: timeframe.colorClass.replace('bg-', '')
            }}></span>
          </div>
          {!isLast && (
            <div className="w-0.5 h-full bg-gradient-to-b from-transparent via-gray-300 to-transparent mt-2 relative">
              {/* Animated line */}
              <div className={`absolute top-0 left-0 w-full bg-gradient-to-b ${timeframe.gradientClass || 'from-green-400 to-blue-500'} transition-all duration-1000 ease-out`} style={{
                height: loaded ? '100%' : '0%',
                transitionDelay: `${0.5 * (index + 1)}s`
              }}></div>
            </div>
          )}
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2 flex items-center">
            <span>{timeframe.period}</span>
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${timeframe.badgeClass || 'bg-primary-light/30 text-primary-dark'}`}>
              {timeframe.badge || (index === 0 ? 'Priority' : '')}
            </span>
          </h4>
          <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition-shadow duration-300">
            <ul className="space-y-2">
              {timeframe.actions.map((action, idx) => (
                <li 
                  key={idx} 
                  className={`flex items-start transition-all duration-300 ${
                    loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{transitionDelay: `${0.6 * (index + 1) + 0.1 * idx}s`}}
                >
                  <span className={`text-${timeframe.textColorClass} mr-2 text-xl`}>•</span>
                  <span className="text-gray-700">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Updated data with additional styling properties
const stakeholders = [
  {
    title: "For Consumers",
    icon: "👥",
    colorClass: "bg-blue-400",
    checkColor: "text-blue-500",
    solutions: [
      "Awareness campaigns highlighting the 'true cost' of 10-min delivery",
      "Opt-in for 'Slow Commerce' option with discount or eco-bonus",
      "Transparent impact ratings for delivery choices",
      "Order consolidation incentives to reduce frequency"
    ]
  },
  {
    title: "For Platforms",
    icon: "🏢",
    colorClass: "bg-purple-400",
    checkColor: "text-purple-500",
    solutions: [
      "Invest in e-bike/cargo bike fleets for green delivery",
      "Implement fair labor practices beyond gig work model",
      "Optimize routes for grouped deliveries",
      "Adopt sustainable packaging solutions",
      "Develop balanced KPIs beyond speed metrics"
    ]
  },
  {
    title: "For Policymakers",
    icon: "⚖️",
    colorClass: "bg-green-400",
    checkColor: "text-green-500",
    solutions: [
      "Establish minimum standards for rider pay and benefits",
      "Implement carbon pricing for deliveries",
      "Create incentives for green logistics solutions",
      "Develop considerate zoning for dark stores",
      "Regulate packaging waste through EPR schemes"
    ]
  }
];

const timeframes = [
  {
    period: "Short-term (0-12 months)",
    colorClass: "bg-green-500",
    textColorClass: "green-500",
    gradientClass: "from-green-500 to-green-300",
    badge: "Immediate action",
    badgeClass: "bg-green-100 text-green-800",
    actions: [
      "Launch consumer awareness campaigns about delivery impacts",
      "Platforms introduce optional 'eco-delivery' windows",
      "Begin transitioning portion of fleet to e-bikes/EVs",
      "Conduct comprehensive rider welfare assessment"
    ]
  },
  {
    period: "Medium-term (1-3 years)",
    colorClass: "bg-blue-500",
    textColorClass: "blue-500",
    gradientClass: "from-blue-500 to-blue-300",
    badge: "Strategic focus",
    badgeClass: "bg-blue-100 text-blue-800",
    actions: [
      "Implement carbon labeling across all deliveries",
      "Develop industry standards for sustainable q-commerce",
      "Scale up electric/low-carbon delivery fleet to 50%+",
      "Introduce rider benefits programs and stable contracts"
    ]
  },
  {
    period: "Long-term (3-5+ years)",
    colorClass: "bg-purple-500",
    textColorClass: "purple-500",
    gradientClass: "from-purple-500 to-purple-300",
    badge: "Systemic change",
    badgeClass: "bg-purple-100 text-purple-800",
    actions: [
      "Establish comprehensive regulatory framework for q-commerce",
      "Build infrastructure supporting consolidated, low-carbon delivery",
      "Shift consumer expectations toward balanced convenience (not just speed)",
      "Integrate q-commerce into sustainable urban planning"
    ]
  }
];

export default Solutions;
