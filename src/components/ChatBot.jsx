import { useState, useRef, useEffect } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hi there! I\'m your Q-Commerce assistant. How can I help you understand the 10-minute delivery ecosystem?' 
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  const API_KEY = 'AIzaSyD2ioc4jyATDdFDIezIQKTXU5tB2w1v5GM';
  // Update to use the gemini-2.0-flash model for better speed/reliability
  const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;

    // Add user message to chat
    const newUserMessage = { role: 'user', content: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      // Simplified request format matching the official API structure
      const requestBody = {
        contents: [
          {
            parts: [
              { 
                text: "You are a helpful assistant for a website about quick commerce (10-minute delivery) systems. Answer this question about quick commerce: " + userInput 
              }
            ]
          }
        ]
      };

      console.log("Sending request to Gemini API:", requestBody);

      // Make API call to Gemini
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("Gemini API response:", data);
      
      // Handle API response
      if (response.ok && data.candidates && data.candidates[0].content) {
        const botResponse = {
          role: 'assistant',
          content: data.candidates[0].content.parts[0].text
        };
        setMessages(prev => [...prev, botResponse]);
      } else {
        // Handle API error with more detailed logging
        console.error('API Error Response:', data);
        console.error('Status code:', response.status);
        
        const errorMessage = {
          role: 'assistant',
          content: "I'm having trouble connecting to my knowledge base right now. Please try again in a moment. Error: " + 
                   (data.error?.message || "Unknown error")
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error communicating with Gemini API:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I encountered an error: " + error.message
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Modern floating chat button with pulse effect */}
      <button
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-500 ${
          isOpen ? 'bg-red-500 rotate-45 scale-110' : 'bg-gradient-to-r from-primary to-primary-dark hover:shadow-xl'
        }`}
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {/* Pulse animation ring when closed */}
        {!isOpen && (
          <span className="absolute w-full h-full rounded-full animate-ping bg-primary/30"></span>
        )}
        
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Enhanced chat window with glassmorphism effect */}
      <div
        className={`fixed bottom-24 right-6 w-80 md:w-96 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl z-50 overflow-hidden transition-all duration-500 transform border border-gray-200/50 ${
          isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* Chat header with gradient */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white px-5 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg">Gemini Assistant</h3>
              <p className="text-xs text-white/75">Q-Commerce Expert</p>
            </div>
          </div>
          <span className="px-3 py-1 text-xs bg-white/20 rounded-full font-medium flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
            AI Powered
          </span>
        </div>
        
        {/* Messages container with improved styling */}
        <div className="h-96 overflow-y-auto p-5 bg-gray-50/50 backdrop-blur-sm">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-5 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {/* Avatar for assistant */}
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 flex items-center justify-center mr-2 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
              )}
              
              <div 
                className={`max-w-[75%] rounded-xl p-3.5 shadow-sm ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-br from-primary to-primary-dark text-white rounded-tr-none' 
                    : 'bg-white border border-gray-100 rounded-tl-none'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                  {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
              
              {/* Avatar for user */}
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center ml-2 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
          ))}
          
          {/* Enhanced loading indicator */}
          {isLoading && (
            <div className="flex justify-start mb-4 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 flex items-center justify-center mr-2 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl rounded-tl-none p-3 max-w-[75%] shadow-sm">
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Modern input area with shadow and glow effect */}
        <form onSubmit={handleSubmit} className="border-t border-gray-100 p-4 bg-white relative">
          <div className="flex items-center bg-gray-50 rounded-full shadow-inner">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about quick commerce..."
              className="flex-1 py-3 px-4 bg-transparent rounded-l-full focus:outline-none text-gray-700"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`bg-gradient-to-r from-primary to-secondary text-white p-3 rounded-full mr-1 shadow-md transition-all duration-300 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:scale-105'
              }`}
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          
          {/* Footer message */}
          <div className="text-center mt-3 text-xs text-gray-400">
            Powered by Google Gemini · Ask me anything about quick commerce
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatBot;
