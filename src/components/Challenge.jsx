import { useInView } from 'react-intersection-observer';
import ThreeJsCity from './ThreeJsCity';

const Challenge = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="challenge" className="section bg-white">
      <div ref={ref} className="container">
        <div className={`mb-12 text-center ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The Challenge: Unpacking Quick Commerce</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Understanding the complex system behind the promise of 10-minute delivery and its wide-ranging impacts
          </p>
        </div>
        
        {/* 3D Interactive City Visualization */}
        <div className={`mb-16 ${inView ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: "0.1s"}}>
          <h3 className="text-2xl font-semibold mb-4 text-center">The Quick Commerce Ecosystem</h3>
          <p className="text-gray-700 text-center mb-6 max-w-3xl mx-auto">
            Explore our interactive 3D model showing how quick commerce transforms urban spaces with dark stores 
            and high-frequency deliveries. Drag to rotate, scroll to zoom, and hover over elements for more information.
          </p>
          <ThreeJsCity />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">
          <div className={`${inView ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: "0.2s"}}>
            <h3 className="text-2xl font-semibold mb-4">What is Quick Commerce?</h3>
            <p className="mb-4 text-gray-700">
              Quick commerce refers to the ultra-fast delivery of goods, typically in 10-30 minutes, enabled by a network of "dark stores" - small local warehouses strategically placed to serve nearby neighborhoods. These are not retail spaces but fulfillment centers optimized for rapid picking and delivery.
            </p>
            <div className="bg-gray-100 p-6 rounded-lg mb-6">
              <h4 className="font-semibold mb-2">Key Players</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Rapid-delivery startups focusing exclusively on this model</li>
                <li>Traditional retailers launching their quick-delivery services</li>
                <li>Food delivery platforms expanding into grocery and essentials</li>
              </ul>
            </div>
            <div className="bg-primary-light bg-opacity-30 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Market Growth</h4>
              <p className="text-gray-700">
                The global quick commerce market is projected to reach $72 billion by 2025, growing at a CAGR of over 20%. This explosive growth was accelerated by the COVID-19 pandemic but continues to expand rapidly in urban centers worldwide.
              </p>
            </div>
          </div>

          <div className={`${inView ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: "0.4s"}}>
            <h3 className="text-2xl font-semibold mb-4">Problem Framing & Research Focus</h3>
            
            <div className="border-l-4 border-primary pl-4 mb-6">
              <p className="italic text-gray-700">
                "How is the '10-minute delivery' promise reshaping customer expectations and behaviors, and what are the systemic trade-offs, particularly concerning environmental sustainability and labor conditions?"
              </p>
            </div>
            
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Initial Observations (Tip of the Iceberg)</h4>
              <ul className="space-y-2">
                {iceberg.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">The "10-Minute" Promise: Driving Forces</h4>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {forces.map((force, index) => (
                  <div key={index} className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm">
                    <span className="text-2xl mb-2">{force.icon}</span>
                    <h5 className="font-medium text-sm">{force.title}</h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const iceberg = [
  "Groceries arriving in minutes after ordering",
  "Increased visibility of delivery riders on streets",
  "News of billion-dollar valuations for q-commerce platforms",
  "Rise in single-item impulse purchases due to convenience",
  "Customer expectations shifting toward instant fulfillment"
];

const forces = [
  { icon: "👥", title: "Customer Demand" },
  { icon: "💻", title: "Technological Enablers" },
  { icon: "🏆", title: "Competitive Landscape" },
  { icon: "💰", title: "Venture Capital" }
];

export default Challenge;
