import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const VensimCLD = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [activeTab, setActiveTab] = useState('stocks');

  return (
    <div ref={ref} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="relative overflow-hidden p-6 border-b border-gray-200 dark:border-gray-700">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10"></div>
        
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Vensim Stock & Flow Model</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm max-w-3xl">
            A more formal system dynamics modeling approach showing the key stocks, flows, and converters in the quick commerce ecosystem
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* CLD Image */}
          <div className={`md:w-1/2 ${inView ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: "0.1s"}}>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <img 
                src="/assets/cld.jpeg" 
                alt="Vensim Causal Loop Diagram" 
                className="w-full h-auto rounded shadow-md hover:shadow-lg transition-shadow duration-300"
              />
            </div>
            <div className="mt-4 p-4 bg-primary/10 dark:bg-primary/20 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white text-center mb-2">What Is a Stock & Flow Diagram?</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                This diagram represents system dynamics using stocks (accumulations), flows (rates of change), 
                and converters (variables that influence flows). Arrows show causal relationships and feedback 
                loops within the quick commerce ecosystem.
              </p>
            </div>
          </div>

          {/* Explanation Tabs */}
          <div className={`md:w-1/2 ${inView ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: "0.3s"}}>
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
              <button 
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'stocks' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('stocks')}
              >
                🔵 Stocks
              </button>
              <button 
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'flows' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('flows')}
              >
                🔁 Flows
              </button>
              <button 
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'converters' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('converters')}
              >
                ⚙️ Converters
              </button>
            </div>

            {/* Tab Content */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              {activeTab === 'stocks' && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Key Stocks (Accumulations)</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Stocks represent accumulations or quantities that can increase or decrease over time:
                  </p>
                  <ul className="space-y-2">
                    {stocksData.map((stock, index) => (
                      <li key={index} className="flex items-start p-2 rounded bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-shadow">
                        <span className="text-primary dark:text-primary-light font-bold mr-2">{index + 1}.</span>
                        <span className="text-gray-800 dark:text-gray-200">{stock}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'flows' && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Key Flows (Rates)</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Flows represent the rates at which stocks change over time:
                  </p>
                  <ul className="space-y-2">
                    {flowsData.map((flow, index) => (
                      <li key={index} className="flex items-start p-2 rounded bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-shadow">
                        <span className="text-secondary dark:text-secondary-light font-bold mr-2">{index + 1}.</span>
                        <span className="text-gray-800 dark:text-gray-200">{flow}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'converters' && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Key Converters (Variables)</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Converters are variables that influence the flows between stocks:
                  </p>
                  <ul className="space-y-2">
                    {convertersData.map((converter, index) => (
                      <li key={index} className="flex items-start p-2 rounded bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-shadow">
                        <span className="text-gray-500 dark:text-gray-400 mr-2">•</span>
                        <span className="text-gray-800 dark:text-gray-200">{converter}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Key Insight */}
            <div className="mt-4 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 p-4 rounded-lg">
              <h4 className="font-medium text-primary-dark dark:text-primary-light mb-2">Key Insight</h4>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                Our stock and flow model reveals how quick commerce creates reinforcing feedback loops 
                between consumer demand, revenue growth, and infrastructure expansion, while also generating 
                balancing loops through environmental impacts and rider well-being challenges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Data for the different tabs
const stocksData = [
  'Consumer Demand',
  'Rider Workload',
  'Delivery Quality',
  'Environmental Sustainability',
  'Carbon Emissions',
  'Revenue',
  'Delivery Infrastructure',
  'Rider Well-being'
];

const flowsData = [
  'Rate of Order Placement → into Consumer Demand',
  'Hiring/Dispatch Rate → into Rider Workload',
  'Infrastructure Investment Rate → into Delivery Infrastructure',
  'Delivery Fatigue Rate → out of Rider Well-being',
  'Emission Generation Rate → into Carbon Emissions',
  'Sustainability Degradation Rate → out of Environmental Sustainability',
  'Revenue Generation Rate → into Revenue'
];

const convertersData = [
  '10-min Delivery Pressure',
  'Consumer Satisfaction',
  'Delivery Speed Expectation',
  'Policy Incentives',
  'Vehicle Type (e-bike vs petrol)',
  'Urban Planning',
  'Peak Delivery Hours'
];

export default VensimCLD;
