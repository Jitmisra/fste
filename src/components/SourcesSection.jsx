import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const SourcesSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [loaded, setLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  const filterSources = (category) => {
    setActiveCategory(category);
  };

  // Filter sources based on active category
  const filteredSources = activeCategory === 'all' 
    ? sources 
    : sources.filter(source => source.category === activeCategory);

  return (
    <section id="sources" className="section bg-white relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        <div className={`absolute top-40 right-10 w-20 h-20 border border-primary/20 rounded-full ${loaded ? 'animate-float' : 'opacity-0'}`} style={{animationDelay: '0.5s'}}></div>
        <div className={`absolute bottom-20 left-20 w-32 h-32 border border-secondary/20 rounded-full ${loaded ? 'animate-float' : 'opacity-0'}`} style={{animationDelay: '0.8s'}}></div>
      </div>
      
      <div ref={ref} className="container relative z-10">
        <div className={`mb-12 text-center ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">References & Sources</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our analysis is backed by extensive research from reputable sources across academic, industry, and news publications.
          </p>
        </div>

        {/* Category filter buttons */}
        <div className={`flex flex-wrap justify-center gap-3 mb-8 ${inView ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: "0.2s"}}>
          <button 
            onClick={() => filterSources('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === 'all' 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Sources
          </button>
          <button 
            onClick={() => filterSources('academic')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === 'academic' 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Academic
          </button>
          <button 
            onClick={() => filterSources('industry')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === 'industry' 
                ? 'bg-purple-500 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Industry Reports
          </button>
          <button 
            onClick={() => filterSources('news')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === 'news' 
                ? 'bg-green-500 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            News Articles
          </button>
        </div>

        {/* Sources list */}
        <div className="grid grid-cols-1 gap-4">
          {filteredSources.map((source, index) => (
            <div 
              key={index}
              className={`bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
                inView ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{animationDelay: `${0.1 * (index + 1)}s`}}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left side with favicon and publisher */}
                <div className="w-full md:w-1/4 bg-gray-50 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      {source.favicon && (
                        <span className="bg-white p-1 rounded-md mr-2 border border-gray-100">
                          {source.favicon}
                        </span>
                      )}
                      <h3 className="font-semibold text-gray-800">{source.publisher}</h3>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      source.category === 'academic' ? 'bg-blue-100 text-blue-800' :
                      source.category === 'industry' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {source.category === 'academic' ? 'Academic' : 
                       source.category === 'industry' ? 'Industry' : 
                       'News'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {source.date && <p>Published: {source.date}</p>}
                  </div>
                </div>
                
                {/* Right side with citation and info */}
                <div className="w-full md:w-3/4 p-4">
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:text-primary-dark hover:underline transition-colors mb-2 block"
                  >
                    {source.title}
                  </a>
                  
                  {source.description && (
                    <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                      {source.description}
                    </p>
                  )}
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="mr-2">Citation:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded select-all">
                      {`${source.publisher}. (${source.date || 'n.d.'}). ${source.title}. Retrieved from ${source.url}`}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Source data with categorization and complete information
const sources = [
  {
    publisher: "Shiprocket",
    favicon: "🚚",
    title: "Quick Commerce Meaning: Benefits, Trends & Growth Explained",
    url: "https://www.shiprocket.in/blog/quick-commerce-meaning-benefits-trends-growth-explained/",
    description: "Comprehensive guide explaining quick commerce, its benefits, current trends, and growth projections",
    category: "industry",
    date: "2023"
  },
  {
    publisher: "Unicommerce",
    favicon: "🛒",
    title: "Quick Commerce in India [Trends, Challenges, Opportunities]",
    url: "https://unicommerce.com/blog/quick-commerce-india-business-models-challenges-strategies/",
    description: "Analysis of quick commerce in India covering business models, challenges, and strategic opportunities",
    category: "industry",
    date: "2023"
  },
  {
    publisher: "Vajiram & Ravi",
    favicon: "📚",
    title: "Quick Commerce: How It Works, Benefits, Challenges & Future Trends",
    url: "https://www.vajiramandravi.com/upsc-daily-current-affairs/mains-articles/quick-commerce-how-it-works/",
    description: "Educational article explaining quick commerce operations, benefits, challenges, and future trends",
    category: "academic",
    date: "2023"
  },
  {
    publisher: "WareIQ",
    favicon: "📦",
    title: "What is Quick Commerce: Benefits for Consumers & Businesses",
    url: "https://wareiq.com/resources/blogs/what-is-quick-commerce/",
    description: "Overview of quick commerce basics and benefits for both consumers and businesses",
    category: "industry",
    date: "2023"
  },
  {
    publisher: "Appnova",
    favicon: "🚀",
    title: "Future of Q-Commerce: Benefits, Examples, and Challenges",
    url: "https://www.appnova.com/future-of-quick-commerce/",
    description: "Analysis of future trends in quick commerce with benefits, examples, and potential challenges",
    category: "industry",
    date: "2022"
  },
  {
    publisher: "European Journal of Development Studies",
    favicon: "🔬",
    title: "Is Quick Delivery Related to Quick-Commerce Environmentally Sustainable?",
    url: "https://www.ej-develop.org/index.php/ejdevelop/article/view/404",
    description: "Academic research on environmental sustainability of quick commerce delivery methods, focusing on EVs and dark stores",
    category: "academic",
    date: "2023"
  },
  {
    publisher: "SSRN",
    favicon: "📄",
    title: "Green E-commerce: Environmental Impact of Fast Delivery",
    url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4762848",
    description: "Research paper examining the environmental impact of faster delivery in e-commerce",
    category: "academic",
    date: "2024"
  },
  {
    publisher: "Changeincontent",
    favicon: "🔄",
    title: "10-minute delivery: Convenience at what cost?",
    url: "https://www.changeincontent.com/10-minute-delivery-hidden-costs/",
    description: "Deep dive into the real impacts of 10-minute delivery, including safety concerns and food quality issues",
    category: "news",
    date: "2023"
  },
  {
    publisher: "Earth.Org",
    favicon: "🌍",
    title: "The Truth About Online Shopping and Its Environmental Impact",
    url: "https://earth.org/online-shopping-and-its-environmental-impact/",
    description: "Analysis of the environmental impact of global online shopping trends and practices",
    category: "academic",
    date: "2022"
  },
  {
    publisher: "Times of India",
    favicon: "📰",
    title: "Making 10-minute deliveries sustainable: Breaking myth with Math",
    url: "https://timesofindia.indiatimes.com/blogs/voices/making-10-minute-deliveries-sustainable-breaking-myth-with-math/",
    description: "Opinion piece using mathematical analysis to examine sustainability claims in 10-minute delivery services",
    category: "news",
    date: "2022"
  },
  {
    publisher: "LinkedIn",
    favicon: "💼",
    title: "The Black Truth Behind 10-Minute Delivery",
    url: "https://www.linkedin.com/pulse/black-truth-behind-10-minute-delivery-dr-balvinder-singh-banga-bb--usbuc/",
    description: "Analysis of the human and safety costs behind ultra-fast delivery services",
    category: "news",
    date: "2023"
  },
  {
    publisher: "Economic Times",
    favicon: "📈",
    title: "Why nobody is talking about 10-minute deliveries anymore",
    url: "https://economictimes.indiatimes.com/tech/technology/startups-recalibrate-approach-to-ten-minute-deliveries-amid-operational-challenges/articleshow/92045165.cms",
    description: "Report on how startups are recalibrating their approach to 10-minute deliveries due to operational challenges",
    category: "news",
    date: "2022"
  },
  {
    publisher: "Economic Times",
    favicon: "📈",
    title: "ETtech Opinion | Are 10-minute deliveries a passing fad or the next big thing?",
    url: "https://economictimes.indiatimes.com/tech/trendspotting/ettech-opinion-are-10-minute-deliveries-a-passing-fad-or-the-next-big-thing/articleshow/90707856.cms",
    description: "Expert opinion on whether 10-minute deliveries represent a lasting business model or temporary trend",
    category: "news",
    date: "2022"
  },
  {
    publisher: "McKinsey & Company",
    favicon: "📊",
    title: "Watching the clock: Factors to consider for same-day delivery",
    url: "https://www.mckinsey.com/industries/logistics/our-insights/watching-the-clock-factors-to-consider-for-same-day-delivery",
    description: "Analysis of factors that influence the potential for same-day delivery services",
    category: "industry",
    date: "2023"
  },
  {
    publisher: "Shiprocket",
    favicon: "🚚",
    title: "Instant Delivery: The 10-Minute Local Service Revolution",
    url: "https://www.shiprocket.in/blog/revolutionising-instant-delivery-in-just-10-minutes/",
    description: "Overview of how instant delivery services are transforming local commerce through 10-minute delivery options",
    category: "industry",
    date: "2023"
  }
];

export default SourcesSection;
