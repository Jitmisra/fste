import { useInView } from 'react-intersection-observer';
import EnvironmentalImpactViz from './EnvironmentalImpactViz';
import VensimCLD from './VensimCLD';

const Analysis = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="analysis" className="section bg-white">
      <div ref={ref} className="container">
        <div className={`mb-12 text-center ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Deeper Analysis: Insights & Structures</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Moving beyond surface-level observations to understand the underlying patterns and structures 
            that shape the quick commerce system
          </p>
        </div>

        {/* Environmental Impact 3D Visualization */}
        <div className={`mb-16 ${inView ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: "0.1s"}}>
          <h3 className="text-2xl font-semibold mb-4 text-center">Environmental Impact Visualization</h3>
          <p className="text-gray-700 text-center mb-6 max-w-3xl mx-auto">
            This interactive 3D visualization illustrates the environmental tradeoffs between different delivery methods
            and how quick commerce's single-item deliveries can increase packaging waste and emissions.
          </p>
          <EnvironmentalImpactViz />
        </div>

        {/* Vensim CLD Section - New Addition */}
        <div className={`mb-16 ${inView ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: "0.2s"}}>
          <h3 className="text-2xl font-semibold mb-4 text-center">Stock & Flow System Dynamics Model</h3>
          <p className="text-gray-700 text-center mb-6 max-w-3xl mx-auto">
            A formal system dynamics model using Vensim to map the stocks, flows, and feedback mechanisms 
            in the quick commerce ecosystem.
          </p>
          <VensimCLD />
        </div>

        <div className="mb-16">
          <h3 className={`text-2xl font-semibold mb-6 ${inView ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: "0.2s"}}>
            Event → Pattern → Structure (EPS) Analysis
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {epsCategories.map((category, index) => (
              <div 
                key={category.title} 
                className={`bg-white shadow-md rounded-lg overflow-hidden ${inView ? 'animate-fade-in' : 'opacity-0'}`}
                style={{animationDelay: `${0.2 * (index + 2)}s`}}
              >
                <div className={`h-2 ${category.colorClass}`}></div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-4">{category.title}</h4>
                  <ul className="space-y-3">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-primary mr-2 mt-1">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h3 className={`text-2xl font-semibold mb-6 ${inView ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: "0.8s"}}>
            System Archetypes at Play
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archetypes.map((archetype, index) => (
              <div 
                key={archetype.title} 
                className={`bg-white rounded-lg shadow-md p-6 border-t-4 border-secondary ${inView ? 'animate-fade-in' : 'opacity-0'}`}
                style={{animationDelay: `${0.2 * (index + 5)}s`}}
              >
                <h4 className="text-lg font-semibold mb-3">{archetype.title}</h4>
                <p className="text-gray-700 text-sm">{archetype.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className={`text-2xl font-semibold mb-6 ${inView ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: "1.4s"}}>
            Leverage Points for Change
          </h3>
          
          <div className="space-y-6">
            {leverageCategories.map((category, catIndex) => (
              <div key={category.level} className={`${inView ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: `${0.2 * (catIndex + 8)}s`}}>
                <h4 className="text-xl font-medium mb-4 flex items-center">
                  <span className={`w-3 h-3 rounded-full ${category.colorClass} mr-2`}></span>
                  {category.level}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="bg-white shadow-sm rounded-lg p-5 border-l-4 border-gray-200">
                      <h5 className="font-medium mb-2">{point.title}</h5>
                      <p className="text-gray-700 text-sm">{point.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const epsCategories = [
  {
    title: "Events (What we see)",
    colorClass: "bg-blue-400",
    items: [
      "Customer receives an order in 8 minutes",
      "News report on a q-commerce company's billion-dollar valuation",
      "Delivery rider involved in a traffic accident",
      "Overflowing bins with single-item packaging"
    ]
  },
  {
    title: "Patterns (Trends over time)",
    colorClass: "bg-purple-400",
    items: [
      "Steadily increasing adoption of quick commerce services",
      "Rising number of complaints about rider working conditions",
      "Growing carbon footprint attributed to last-mile delivery",
      "Normalization of 'instant' delivery expectations"
    ]
  },
  {
    title: "Structures (Underlying rules)",
    colorClass: "bg-green-400",
    items: [
      "Business Models prioritizing speed over sustainability",
      "Consumer Culture emphasizing instant gratification",
      "Technological Infrastructure optimized for speed, not efficiency",
      "Investment Climate favoring rapid growth over profitability",
      "Labor Market Dynamics with limited worker protections"
    ]
  }
];

const archetypes = [
  {
    title: "Success to the Successful",
    description: "Early q-commerce entrants with significant funding can rapidly scale, capture market share, and set industry standards, making it harder for smaller, potentially more ethical/sustainable players to compete."
  },
  {
    title: "Tragedy of the Commons",
    description: "Individual consumers and platforms pursue their self-interest (ultra-fast delivery). The cumulative effect is degradation of common resources: increased road congestion, higher emissions, and potentially exploitative labor practices."
  },
  {
    title: "Shifting the Burden / Fixes that Fail",
    description: "Platforms address rider shortages (a symptom) by offering temporary bonuses (a quick fix) rather than addressing root causes like high pressure and low job security, creating dependency on continually finding new riders."
  }
];

const leverageCategories = [
  {
    level: "High Leverage",
    colorClass: "bg-green-500",
    points: [
      {
        title: "Changing Mental Models",
        description: "Shifting paradigms from 'speed at all costs' to 'sustainable convenience' through consumer education and corporate responsibility campaigns."
      },
      {
        title: "Rules of the System",
        description: "Introducing regulations for minimum rider wages/benefits, emissions standards for delivery fleets, and incentives for sustainable delivery practices."
      }
    ]
  },
  {
    level: "Medium Leverage",
    colorClass: "bg-yellow-500",
    points: [
      {
        title: "Information Flows",
        description: "Increasing transparency around environmental and labor impacts of specific q-commerce choices through carbon labeling for deliveries and rider welfare ratings."
      },
      {
        title: "Incentives & Disincentives",
        description: "Implementing taxes on single-item deliveries or offering subsidies for e-bike fleets and consolidated orders to shift behavior."
      }
    ]
  },
  {
    level: "Lower Leverage",
    colorClass: "bg-orange-500",
    points: [
      {
        title: "Parameters & Buffers",
        description: "Investing in greener delivery vehicles, optimizing routes for efficiency not just speed, and better inventory management in dark stores to reduce waste."
      },
      {
        title: "Physical Infrastructure",
        description: "Redesigning dark stores and delivery equipment for lower environmental impact and better working conditions."
      }
    ]
  }
];

export default Analysis;
