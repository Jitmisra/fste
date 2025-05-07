import { useRef, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Team = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    if (inView) {
      // Small delay for smoother staggered appearance
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <section id="team" className="section bg-white relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        <div className={`absolute top-40 right-10 w-20 h-20 border border-primary/20 rounded-full ${loaded ? 'animate-float' : 'opacity-0'}`} style={{animationDelay: '0.5s'}}></div>
        <div className={`absolute bottom-20 left-20 w-32 h-32 border border-secondary/20 rounded-full ${loaded ? 'animate-float' : 'opacity-0'}`} style={{animationDelay: '0.8s'}}></div>
      </div>
      
      <div ref={ref} className="container relative z-10">
        <div className={`mb-16 text-center ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About Our Team</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We are a diverse group of students from RISHIHOOD UNIVERSITY participating in the FSTE Systems Thinking Hackathon 2025.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <TeamMemberCard 
              key={member.name} 
              member={member} 
              index={index} 
              inView={inView} 
              loaded={loaded}
            />
          ))}
        </div>

        <div className={`text-center mb-16 ${inView ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: "0.8s"}}>
          <h3 className="text-2xl font-semibold mb-4">Our Approach & Methodology</h3>
          <p className="text-gray-700 max-w-3xl mx-auto">
            We approached this challenge using systems thinking methodologies to understand the complex interrelationships at play in the quick commerce ecosystem. Our process involved:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {methodologies.map((method, index) => (
            <div 
              key={method.title} 
              className={`p-6 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all duration-300 ${inView ? 'animate-scale-in' : 'opacity-0'}`}
              style={{animationDelay: `${0.2 * (index + 5)}s`}}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-light to-primary-dark flex items-center justify-center mb-6 mx-auto shadow-md">
                <span className="text-2xl text-white">{method.icon}</span>
              </div>
              <h4 className="text-lg font-semibold mb-3 text-center">{method.title}</h4>
              <p className="text-gray-700 text-center">{method.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// New card component with hover effects
const TeamMemberCard = ({ member, index, inView, loaded }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  
  // 3D tilt effect on hover
  const handleMouseMove = (e) => {
    if (!cardRef.current || !hovered) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };
  
  const resetCardTransform = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };
  
  return (
    <div 
      ref={cardRef}
      className={`bg-white rounded-xl shadow-md overflow-hidden ${inView ? 'animate-fade-in' : 'opacity-0'} transition-all duration-300`}
      style={{
        animationDelay: `${0.15 * (index + 1)}s`,
        transformStyle: 'preserve-3d'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        resetCardTransform();
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="h-48 relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br from-primary-light/30 to-secondary-light/30 flex items-center justify-center transition-transform duration-300 ${hovered ? 'scale-110' : 'scale-100'}`}>
          <span className="text-6xl">{member.avatar}</span>
        </div>
        {/* Glow effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-r from-primary-light/50 to-secondary-light/50 opacity-0 transition-opacity duration-500 ${hovered ? 'opacity-30' : ''}`}></div>
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
        <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-secondary mx-auto my-2"></div>
        <p className="text-primary mb-3 font-medium">{member.role}</p>
        <p className="text-gray-600 text-sm">{member.bio}</p>
        
        {/* Social links that appear on hover */}
        <div className={`mt-4 flex justify-center space-x-3 transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <a href="#" className="text-gray-400 hover:text-primary transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-primary transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.162 5.656a8.384 8.384 0 01-2.402.658A4.196 4.196 0 0021.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 00-7.126 3.814 11.874 11.874 0 01-8.62-4.37 4.168 4.168 0 00-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 01-1.894-.523v.052a4.185 4.185 0 003.355 4.101 4.21 4.21 0 01-1.89.072A4.185 4.185 0 007.97 16.65a8.394 8.394 0 01-6.191 1.732 11.83 11.83 0 006.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 002.087-2.165z"></path>
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-primary transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.94 5a2 2 0 11-4-.002 2 2 0 014 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const teamMembers = [
  {
    name: "Agnik Misra",
    role: "",
    avatar: "👨‍💻",
    bio: "Specialist in systems modeling and causal loop diagrams with a background in environmental systems analysis."
  },
  {
    name: "Kartikey Gupta",
    role: "",
    avatar: "👨‍🔬",
    bio: "Focused on data collection and research synthesis, with expertise in consumer behavior trends."
  },
  {
    name: "Kavya Jain",
    role: "",
    avatar: "👨‍🏫",
    bio: "Managed our quantitative analysis and helped design the dashboard visualizations."
  },
  {
    name: "Anshika Seth",
    role: "",
    avatar: "👩‍💻",
    bio: "Created this interactive website to showcase our findings and system analysis."
  },
  {
    name: "Abhijeet",
    role: "",
    avatar: "👨‍🎨",
    bio: "Designed the user interface and experience to make our complex system analysis accessible and engaging."
  }
];

const methodologies = [
  {
    icon: "🔄",
    title: "Systems Mapping",
    description: "We created causal loop diagrams to visualize the complex relationships between variables in the quick commerce system."
  },
  {
    icon: "📊",
    title: "EPS Analysis",
    description: "We examined Events, Patterns, and underlying Structures to uncover the root causes of system behavior."
  },
  {
    icon: "🔍",
    title: "Leverage Points Identification",
    description: "We identified high-impact intervention points where changes could create positive ripple effects throughout the system."
  }
];

export default Team;
