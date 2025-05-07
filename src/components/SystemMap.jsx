import { useInView } from 'react-intersection-observer';
import CausalLoopAnimation from './CausalLoopAnimation';

const SystemMap = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="system-map" className="section bg-gray-50">
      <div ref={ref} className="container">
        <div className={`mb-12 text-center ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our System Map: The Causal Loop Diagram (CLD)</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            To understand the complex dynamics of quick commerce, we developed a Causal Loop Diagram (CLD).
            This visual tool helps map the key variables and their interrelationships, revealing the feedback loops that drive system behavior.
          </p>
        </div>

        <div className={`bg-white rounded-xl shadow-lg p-4 md:p-8 mb-12 ${inView ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: "0.2s"}}>
          {/* 3D Interactive CLD Visualization */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-center">Interactive 3D System Map</h3>
            <p className="text-gray-600 text-center mb-4">
              Explore our causal loop diagram in 3D. Click and drag to rotate, scroll to zoom.
              Click on elements to highlight them.
            </p>
            <CausalLoopAnimation />
          </div>
          
          {/* Removed download button div */}
        </div>

        <div className={`${inView ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: "0.4s"}}>
          <h3 className="text-2xl font-semibold mb-6">System Narrative: Walking Through the Loops</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <h4 className="text-xl font-medium text-primary mb-4">Key Variables Defined</h4>
              <ul className="space-y-3">
                {variables.map((variable, index) => (
                  <li key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <span className="font-medium">{variable.name}:</span> {variable.description}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col space-y-6">
              <div>
                <h4 className="text-xl font-medium text-primary mb-4">Reinforcing Loops (R)</h4>
                {reinforcingLoops.map((loop, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm mb-4">
                    <h5 className="font-semibold mb-2">R{index+1}: {loop.name}</h5>
                    <p className="text-gray-700">{loop.description}</p>
                  </div>
                ))}
              </div>
              
              <div>
                <h4 className="text-xl font-medium text-primary mb-4">Balancing Loops (B)</h4>
                {balancingLoops.map((loop, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm mb-4">
                    <h5 className="font-semibold mb-2">B{index+1}: {loop.name}</h5>
                    <p className="text-gray-700">{loop.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-primary-light bg-opacity-30 p-6 rounded-lg">
            <h4 className="text-xl font-medium mb-3">Overall System Behavior Insights</h4>
            <p className="text-gray-700">
              Our CLD suggests that the quick commerce system is currently dominated by reinforcing loops driving rapid growth and escalating customer expectations. However, several balancing loops related to environmental and labor pressures are beginning to exert counter-effects, potentially leading to instability or the need for systemic adjustments in the medium term.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const variables = [
  { name: "Customer Demand for Speed", description: "Desire for fast delivery from consumers" },
  { name: "Number of Dark Stores", description: "Local micro-fulfillment centers enabling quick delivery" },
  { name: "Delivery Rider Pressure", description: "Time pressure and workload on delivery personnel" },
  { name: "Environmental Impact", description: "Carbon emissions, packaging waste, and other impacts" }
];

const reinforcingLoops = [
  { 
    name: "The Growth Engine Loop", 
    description: "Increased Customer Adoption leads to higher Platform Revenue & Investment. This allows for expansion of Dark Store Networks and Rider Fleets, improving Service Speed & Availability, which further fuels Customer Adoption."
  },
  { 
    name: "The Expectation Inflation Loop", 
    description: "As customers experience Faster Deliveries, their Expectations for Speed rise. This puts pressure on platforms to maintain or improve Delivery Times, reinforcing the focus on speed."
  }
];

const balancingLoops = [
  { 
    name: "The Environmental Strain Loop", 
    description: "Increased Number of Deliveries leads to higher Packaging Waste and Carbon Emissions. This growing Environmental Impact could eventually trigger Public Concern & Regulatory Pressure, potentially slowing down q-commerce growth."
  },
  { 
    name: "The Labor Pressure Loop", 
    description: "The drive for Extreme Delivery Speeds puts immense Pressure on Delivery Riders. This can lead to Rider Burnout and Safety Concerns, potentially forcing changes to labor practices."
  }
];

export default SystemMap;
