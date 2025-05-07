import { useRef, useState, useEffect } from 'react';
import { Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement,
  RadialLinearScale,
  Filler
} from 'chart.js';
import { Bar, Pie, Line, Radar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';

// Register required Chart.js components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler,
  ChartDataLabels,
  annotationPlugin
);

const EnvironmentalImpactViz = () => {
  const containerRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('emissions');
  const [animationCompleted, setAnimationCompleted] = useState({
    emissions: false,
    packaging: false,
    comparison: false,
    cumulative: false
  });
  
  // Intersection Observer to detect when component is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  // Smooth loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Animation completion handler for each chart
  const handleAnimationComplete = (chartType) => {
    setAnimationCompleted(prev => ({
      ...prev,
      [chartType]: true
    }));
  };

  // EMISSIONS CHART CONFIG
  const emissionsChartData = {
    labels: ['Bicycle', 'E-Scooter', 'Electric Vehicle', 'Traditional Delivery', 'Q-Commerce (Multiple Small Orders)'],
    datasets: [
      {
        label: 'CO₂ Emissions (g/delivery)',
        data: [0, 25, 70, 140, 190],
        backgroundColor: [
          'rgba(52, 211, 153, 0.8)',  // Green for bicycle
          'rgba(96, 165, 250, 0.8)',  // Light blue for e-scooter
          'rgba(139, 92, 246, 0.8)',  // Purple for EV
          'rgba(251, 146, 60, 0.8)',  // Orange for traditional
          'rgba(239, 68, 68, 0.8)'    // Red for q-commerce
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(59, 130, 246)',
          'rgb(124, 58, 237)',
          'rgb(249, 115, 22)',
          'rgb(220, 38, 38)'
        ],
        borderWidth: 1,
        borderRadius: 8,
        hoverBackgroundColor: [
          'rgba(52, 211, 153, 1)',
          'rgba(96, 165, 250, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(251, 146, 60, 1)',
          'rgba(239, 68, 68, 1)'
        ]
      }
    ]
  };

  const emissionsChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeOutQuart',
      onComplete: () => handleAnimationComplete('emissions')
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: true,
        text: 'Carbon Emissions by Delivery Method',
        font: {
          size: 18,
          weight: 'bold',
          family: "'Inter', sans-serif"
        },
        padding: 20,
        color: '#374151'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw} g`;
          },
          afterLabel: function(context) {
            const index = context.dataIndex;
            if (index === 0) {
              return 'Zero direct emissions during delivery';
            } else if (index === 1) {
              return 'Low emissions from battery charging';
            } else if (index === 2) {
              return 'Electric vehicle with multiple deliveries';
            } else if (index === 3) {
              return 'Traditional scheduled delivery van';
            } else if (index === 4) {
              return 'Multiple small deliveries increase total emissions';
            }
            return '';
          }
        },
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#111827',
        bodyColor: '#374151',
        bodyFont: {
          size: 12
        },
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 10,
        boxPadding: 6,
        boxWidth: 8
      },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold',
          size: 12
        },
        formatter: (value) => {
          return value > 0 ? `${value}g` : 'Zero';
        },
        display: (context) => animationCompleted.emissions,
        anchor: 'center',
        align: 'center'
      },
      annotation: {
        annotations: {
          thresholdLine: {
            type: 'line',
            scaleID: 'y',
            value: 100,
            borderColor: 'rgba(239, 68, 68, 0.5)',
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              display: true,
              content: 'Environmental Concern Threshold',
              position: 'end',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              color: '#b91c1c',
              font: {
                size: 11
              },
              borderRadius: 4,
              padding: 6
            }
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Carbon Emissions (g CO₂)',
          font: {
            size: 13,
            weight: 'bold'
          },
          color: '#4b5563'
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)'
        },
        ticks: {
          font: {
            size: 11
          },
          color: '#6b7280'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          },
          color: '#6b7280'
        }
      }
    }
  };

  // PACKAGING CHART CONFIG
  const packagingChartData = {
    labels: ['Single Consolidated Order', 'Two Separate Orders', 'Five Small Q-Commerce Orders'],
    datasets: [
      {
        label: 'Packaging Material (g)',
        data: [35, 70, 175],
        backgroundColor: [
          'rgba(52, 211, 153, 0.8)',  // Green for consolidated
          'rgba(251, 146, 60, 0.8)',  // Orange for semi-fragmented
          'rgba(239, 68, 68, 0.8)'    // Red for highly fragmented
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(249, 115, 22)',
          'rgb(220, 38, 38)'
        ],
        borderWidth: 1,
        borderRadius: 8,
        hoverBackgroundColor: [
          'rgba(52, 211, 153, 1)',
          'rgba(251, 146, 60, 1)',
          'rgba(239, 68, 68, 1)'
        ]
      }
    ]
  };

  const packagingChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeOutQuart',
      onComplete: () => handleAnimationComplete('packaging')
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Packaging Waste Comparison',
        font: {
          size: 18,
          weight: 'bold',
          family: "'Inter', sans-serif"
        },
        padding: 20,
        color: '#374151'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}g`;
          },
          afterLabel: function(context) {
            const index = context.dataIndex;
            if (index === 0) {
              return 'Baseline efficient use of packaging';
            } else if (index === 1) {
              return '100% more packaging than consolidated';
            } else if (index === 2) {
              return '400% more packaging than consolidated';
            }
            return '';
          }
        },
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#111827',
        bodyColor: '#374151',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1
      },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold',
          size: 12
        },
        formatter: (value) => `${value}g`,
        display: (context) => animationCompleted.packaging,
        anchor: 'center',
        align: 'center'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Packaging Material (grams)',
          font: {
            size: 13,
            weight: 'bold'
          },
          color: '#4b5563'
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)'
        },
        ticks: {
          font: {
            size: 11
          },
          color: '#6b7280'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          },
          color: '#6b7280'
        }
      }
    }
  };

  // RADAR CHART CONFIG
  const comparisonChartData = {
    labels: [
      'Carbon Footprint',
      'Packaging Waste',
      'Traffic Congestion',
      'Noise Pollution',
      'Energy Consumption',
      'Urban Space Usage'
    ],
    datasets: [
      {
        label: 'Consolidated Delivery',
        data: [60, 55, 60, 50, 65, 40],
        backgroundColor: 'rgba(96, 165, 250, 0.2)',
        borderColor: 'rgb(59, 130, 246)',
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 246)',
        pointRadius: 4
      },
      {
        label: 'Quick Commerce Delivery',
        data: [85, 90, 80, 75, 80, 70],
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: 'rgb(220, 38, 38)',
        pointBackgroundColor: 'rgb(220, 38, 38)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(220, 38, 38)',
        pointRadius: 4
      },
      {
        label: 'Eco-Optimized Delivery',
        data: [40, 35, 45, 30, 45, 25],
        backgroundColor: 'rgba(52, 211, 153, 0.2)',
        borderColor: 'rgb(16, 185, 129)',
        pointBackgroundColor: 'rgb(16, 185, 129)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(16, 185, 129)',
        pointRadius: 4
      }
    ]
  };

  const comparisonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeOutQuart',
      onComplete: () => handleAnimationComplete('comparison')
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          showLabelBackdrop: false,
          font: {
            size: 10
          },
          color: '#6b7280'
        },
        pointLabels: {
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          color: '#4b5563'
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.3)'
        },
        angleLines: {
          color: 'rgba(200, 200, 200, 0.3)'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: true,
        text: 'Environmental Impact Comparison',
        font: {
          size: 18,
          weight: 'bold',
          family: "'Inter', sans-serif"
        },
        padding: 20,
        color: '#374151'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}/100`;
          }
        },
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#111827',
        bodyColor: '#374151',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1
      },
      datalabels: {
        display: false
      }
    }
  };

  // CUMULATIVE IMPACT CHART CONFIG
  const cumulativeChartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [
      {
        label: 'Quick Commerce (Multiple Orders)',
        data: [19, 38, 57, 76, 95, 114, 133, 152, 171, 190],
        borderColor: 'rgb(220, 38, 38)',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        tension: 0.3,
        fill: true,
        borderWidth: 2
      },
      {
        label: 'Traditional Delivery (Consolidated)',
        data: [14, 28, 42, 56, 70, 84, 98, 112, 126, 140],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(96, 165, 250, 0.2)',
        tension: 0.3,
        fill: true,
        borderWidth: 2
      },
      {
        label: 'Eco-Friendly Delivery',
        data: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(52, 211, 153, 0.2)',
        tension: 0.3,
        fill: true,
        borderWidth: 2
      }
    ]
  };

  const cumulativeChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeOutQuart',
      onComplete: () => handleAnimationComplete('cumulative')
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: true,
        text: 'Cumulative Environmental Impact Over Multiple Orders',
        font: {
          size: 18,
          weight: 'bold',
          family: "'Inter', sans-serif"
        },
        padding: 20,
        color: '#374151'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}g CO₂`;
          }
        },
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#111827',
        bodyColor: '#374151',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1
      },
      datalabels: {
        display: false
      },
      annotation: {
        annotations: {
          criticalLine: {
            type: 'line',
            scaleID: 'y',
            value: 100,
            borderColor: 'rgba(239, 68, 68, 0.5)',
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              display: true,
              content: 'Environmental Impact Threshold',
              position: 'end',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              color: '#b91c1c',
              font: {
                size: 11
              },
              borderRadius: 4,
              padding: 6
            }
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cumulative Emissions (g CO₂)',
          font: {
            size: 13,
            weight: 'bold'
          },
          color: '#4b5563'
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)'
        },
        ticks: {
          font: {
            size: 11
          },
          color: '#6b7280'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Number of Orders',
          font: {
            size: 13,
            weight: 'bold'
          },
          color: '#4b5563'
        },
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          },
          color: '#6b7280'
        }
      }
    }
  };

  // Educational insight cards for each visualization
  const insightCards = {
    emissions: [
      {
        title: "Carbon Intensity",
        content: "Quick commerce single-item deliveries generate nearly 5x more emissions than bicycles and significantly more than traditional consolidated delivery services.",
        icon: "🌍"
      },
      {
        title: "Urban Scale Impact",
        content: "When multiplied across thousands of daily deliveries in urban areas, these seemingly small individual emissions create substantial environmental impacts.",
        icon: "🏙️"
      }
    ],
    packaging: [
      {
        title: "Packaging Multiplication",
        content: "Multiple small orders require separate packaging for each delivery, creating up to 400% more packaging waste compared to consolidated shopping.",
        icon: "📦"
      },
      {
        title: "Waste Management Burden",
        content: "The additional packaging burden significantly impacts urban waste management systems, increasing processing costs and landfill usage.",
        icon: "♻️"
      }
    ],
    comparison: [
      {
        title: "Multi-Dimensional Impact",
        content: "Quick commerce's environmental footprint extends beyond just emissions, affecting multiple aspects of urban sustainability simultaneously.",
        icon: "🔄"
      },
      {
        title: "Optimization Potential",
        content: "Eco-optimized delivery models demonstrate that significant reductions are possible through thoughtful system design and consumer behavior changes.",
        icon: "✅"
      }
    ],
    cumulative: [
      {
        title: "Behavior Change Impact",
        content: "Each additional fragmented order widens the environmental gap - showing how consumer behavior shifts have exponential long-term consequences.",
        icon: "📈"
      },
      {
        title: "Threshold Crossing",
        content: "Quick commerce orders cross environmental impact thresholds much sooner than alternatives, highlighting the urgency of system-level interventions.",
        icon: "⚠️"
      }
    ]
  };

  // Calculator variables for "What if" scenarios
  const [calculatorInputs, setCalculatorInputs] = useState({
    currentOrders: 5,
    quickCommercePercentage: 60
  });
  const [calculatorResults, setCalculatorResults] = useState({
    currentEmissions: 0,
    potentialSavings: 0,
    packagingReduction: 0
  });

  // Update calculator results when inputs change
  useEffect(() => {
    const totalOrders = calculatorInputs.currentOrders;
    const qcPercent = calculatorInputs.quickCommercePercentage / 100;
    
    // Calculate current emissions
    const qcOrders = Math.round(totalOrders * qcPercent);
    const normalOrders = totalOrders - qcOrders;
    
    const currentEmissions = (qcOrders * 19) + (normalOrders * 14);
    
    // Calculate potential savings if all consolidated
    const potentialEmissions = totalOrders * 14;
    const potentialSavings = currentEmissions - potentialEmissions;
    
    // Calculate packaging reduction
    const currentPackaging = (qcOrders * 35) + (normalOrders * 35);
    const potentialPackaging = totalOrders * 35;
    const packagingReduction = (currentPackaging - potentialPackaging) / currentPackaging * 100;
    
    setCalculatorResults({
      currentEmissions,
      potentialSavings,
      packagingReduction: Math.round(packagingReduction)
    });
  }, [calculatorInputs]);

  // Handle calculator input changes
  const handleCalculatorInput = (e) => {
    const { name, value } = e.target;
    setCalculatorInputs(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  return (
    <div 
      ref={containerRef}
      className="w-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-1000"
    >
      <div className="relative overflow-hidden p-6 border-b border-gray-200 dark:border-gray-700">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10"></div>
        
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Environmental Impact Analysis</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm max-w-3xl">
            Interactive data visualization showing how quick commerce delivery models impact the environment
          </p>
        </div>
        
        {/* Tab navigation with pill design */}
        <div className="relative z-10 mt-6 inline-flex p-1 bg-gray-100 dark:bg-gray-700/50 rounded-full shadow-sm">
          {['emissions', 'packaging', 'comparison', 'cumulative', 'calculator'].map((tab) => (
            <button 
              key={tab}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-white dark:bg-gray-800 text-primary dark:text-primary-light shadow-sm' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'emissions' && 'Carbon Emissions'}
              {tab === 'packaging' && 'Packaging Waste'}
              {tab === 'comparison' && 'Impact Comparison'}
              {tab === 'cumulative' && 'Long-term Impact'}
              {tab === 'calculator' && 'Impact Calculator'}
            </button>
          ))}
        </div>
      </div>

      <div className={`p-6 ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
        {/* Chart display area */}
        <div className="bg-white/70 dark:bg-gray-800/70 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
          <div className="h-[400px]">
            {activeTab === 'emissions' && isVisible && (
              <Bar data={emissionsChartData} options={emissionsChartOptions} />
            )}
            {activeTab === 'packaging' && isVisible && (
              <Bar data={packagingChartData} options={packagingChartOptions} />
            )}
            {activeTab === 'comparison' && isVisible && (
              <Radar data={comparisonChartData} options={comparisonChartOptions} />
            )}
            {activeTab === 'cumulative' && isVisible && (
              <Line data={cumulativeChartData} options={cumulativeChartOptions} />
            )}
            {activeTab === 'calculator' && (
              <div className="h-full flex flex-col items-center justify-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Environmental Impact Calculator
                </h4>
                
                <div className="w-full max-w-md bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6 shadow-sm">
                  {/* Calculator content */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Number of weekly orders:
                    </label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" 
                        min="1" 
                        max="15" 
                        name="currentOrders"
                        value={calculatorInputs.currentOrders}
                        onChange={handleCalculatorInput}
                        className="flex-grow h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <span className="text-sm font-medium bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light px-3 py-1 rounded-full min-w-[40px] text-center">
                        {calculatorInputs.currentOrders}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Percentage using quick commerce:
                    </label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="10"
                        name="quickCommercePercentage"
                        value={calculatorInputs.quickCommercePercentage}
                        onChange={handleCalculatorInput}
                        className="flex-grow h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <span className="text-sm font-medium bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light px-3 py-1 rounded-full min-w-[50px] text-center">
                        {calculatorInputs.quickCommercePercentage}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Current CO₂</p>
                      <p className="text-xl font-bold text-red-500">
                        {calculatorResults.currentEmissions}g
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Potential Savings</p>
                      <p className="text-xl font-bold text-green-500">
                        {calculatorResults.potentialSavings}g
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Packaging Reduction</p>
                      <p className="text-xl font-bold text-blue-500">
                        {calculatorResults.packagingReduction}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Educational insights section */}
        {activeTab !== 'calculator' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insightCards[activeTab].map((card, index) => (
              <div 
                key={index} 
                className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl bg-primary/10 dark:bg-primary/20 p-2 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{card.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{card.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Key takeaway with modern design */}
        {activeTab !== 'calculator' && (
          <div className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 p-5 rounded-xl border-l-4 border-primary shadow-sm">
            <h4 className="font-medium text-primary-dark dark:text-primary-light mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Key Takeaway
            </h4>
            <p className="text-gray-700 dark:text-gray-200">
              {activeTab === 'emissions' && "While individual delivery emissions may seem small, the shift toward frequent quick commerce orders creates a significant environmental burden compared to consolidated shopping patterns."}
              {activeTab === 'packaging' && "Quick commerce's business model encourages multiple small orders rather than consolidated shopping, multiplying packaging waste and increasing pressure on waste management systems."}
              {activeTab === 'comparison' && "The environmental impact of quick commerce extends beyond carbon emissions, affecting multiple aspects of urban environments including noise, traffic, and air quality."}
              {activeTab === 'cumulative' && "Over time, the environmental gap between quick commerce and more sustainable options widens dramatically, demonstrating the importance of considering long-term behavior changes."}
            </p>
          </div>
        )}
        
        {/* Call to action for calculator */}
        {activeTab === 'calculator' && (
          <div className="mt-8 text-center">
            <p className="text-gray-700 dark:text-gray-200 mb-6">
              By consolidating your orders, you can significantly reduce your environmental impact while still enjoying the convenience of home delivery.
            </p>
            <button className="btn-primary">
              Learn More About Sustainable Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnvironmentalImpactViz;
