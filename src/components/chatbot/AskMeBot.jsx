import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const predefinedQA = [
  {
    question: "What technologies do you use?",
    answer: "I primarily work with React, Node.js, Express, MongoDB, and various modern web technologies including Tailwind CSS, Framer Motion, and Redux."
  },
  {
    question: "Can I see your projects?",
    answer: "Yes! Check out the Projects section where you will find my recent work including AI assistants, management systems, and web applications."
  },
  {
    question: "How to contact you?",
    answer: "You can reach me through the Contact section, email me at ojeshmundale@gmail.com, or connect with me on LinkedIn/GitHub."
  },
  {
    question: "What is your main focus?",
    answer: "I specialize in creating responsive, user-friendly web applications with clean code and modern design principles."
  }
];

const AskMeBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const chatRef = useRef(null);
  const botRef = useRef(null);

  // Hide welcome message after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom on chat update
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Close bot on outside click or scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (botRef.current && !botRef.current.contains(event.target)) {
        setIsOpen(false);
        setChatHistory([]);
        setIsLoading(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
      setChatHistory([]);
      setIsLoading(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  const handleQuestionClick = (qa) => {
    if (isLoading) return; // prevent clicking while loading

    setIsLoading(true);

    // Add user question immediately
    setChatHistory(prev => [...prev, { type: 'question', text: qa.question }]);

    // Simulate bot typing and response delay
    setTimeout(() => {
      setChatHistory(prev => [...prev, { type: 'answer', text: qa.answer }]);
      setIsLoading(false);
    }, 800);
  };

  const handleClose = () => {
    setIsOpen(false);
    setChatHistory([]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle chatbot"
      >
        <div className="w-28 h-28 overflow-hidden bg-transparent">
          <img 
            src="/bot.gif" 
            alt="Bot Icon" 
            className="w-full h-full object-cover bg-transparent"
            style={{ backgroundColor: 'transparent' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IndoaXRlIi8+CjxjaXJjbGUgY3g9IjE3IiBjeT0iMTgiIHI9IjMiIGZpbGw9IiM2YjczODAiLz4KPGNpcmNsZSBjeD0iMzEiIGN5PSIxOCIgcj0iMyIgZmlsbD0iIzZiNzM4MCIvPgo8cGF0aCBkPSJNMTggMzBDMTggMzMgMjQgMzMgMjQgMzNDMjQgMzMgMzAgMzMgMzAgMzAiIHN0cm9rZT0iIzZiNzM4MCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+';
            }}
          />
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={botRef}
            className="fixed top-1/2 left-12 -translate-x-1/2 -translate-y-1/2 z-50 w-80 h-[400px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="chatbot-title"
            style={{ color: 'black', fontWeight: 'bold' }} // make all text black & bold
          >
            {/* Header */}
            <div className="bg-gray-200 p-4 rounded-t-lg flex justify-between items-center" style={{ color: 'black', fontWeight: 'bold' }}>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full border-2 border-black overflow-hidden bg-transparent">
                  <img 
                    src="/bot.gif" 
                    alt="Bot Icon" 
                    className="w-full h-full object-cover bg-transparent"
                    style={{ backgroundColor: 'transparent' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IndoaXRlIi8+CjxjaXJjbGUgY3g9IjE3IiBjeT0iMTgiIHI9IjMiIGZpbGw9IiM2YjczODAiLz4KPGNpcmNsZSBjeD0iMzEiIGN5PSIxOCIgcj0iMyIgZmlsbD0iIzZiNzM4MCIvPgo8cGF0aCBkPSJNMTggMzBDMTggMzMgMjQgMzMgMjQgMzNDMjQgMzMgMzAgMzMgMzAgMzAiIHN0cm9rZT0iIzZiNzM4MCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+';
                    }}
                  />
                </div>
                <div>
                  <h3 id="chatbot-title">Ask Me Bot</h3>
                  <p>I am here to help!</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close chatbot"
                className="hover:text-gray-600 transition-colors"
                style={{ color: 'black', fontWeight: 'bold' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Messages Area */}
            <div
              ref={chatRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 chat-scrollbar"
              id="chatMessages"
              style={{ color: 'black', fontWeight: 'bold' }}
            >
              {chatHistory.length === 0 && (
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-lg text-sm border-l-4 border-purple-500"
                    style={{ color: 'black', fontWeight: 'bold' }}
                  >
                    👋 <strong>Welcome!</strong> I'm your AI assistant ready to help you explore this portfolio.
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-blue-50 p-3 rounded-lg text-sm border-l-4 border-blue-500"
                    style={{ color: 'black', fontWeight: 'bold' }}
                  >
                    💡 <strong>Quick Tip:</strong> Click any question below to get instant answers about my work and experience!
                  </motion.div>
                </div>
              )}

              {chatHistory.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-3 rounded-lg text-sm max-w-[85%] break-words shadow-sm ${
                    message.type === 'question'
                      ? 'bg-purple-100 ml-auto border border-purple-200'
                      : 'bg-gray-100 mr-auto border border-gray-200'
                  }`}
                  style={{ color: 'black', fontWeight: 'bold' }}
                >
                  {message.text}
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-2 text-gray-500 text-sm"
                  style={{ color: 'black', fontWeight: 'bold' }}
                >
                  <div className="typing-indicator">
                    <span>●</span>
                    <span>●</span>
                    <span>●</span>
                  </div>
                  <span>Bot is typing...</span>
                </motion.div>
              )}
            </div>

            {/* Fixed Questions List */}
            <div className="border-t p-3 bg-gray-50" style={{ color: 'black', fontWeight: 'bold' }}>
              <p className="mb-2 font-semibold">Quick Questions:</p>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {predefinedQA.map((qa, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleQuestionClick(qa)}
                    className="w-full text-left p-3 bg-white hover:bg-gray-100 rounded-lg text-sm transition-colors border border-gray-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                    style={{ color: 'black', fontWeight: 'bold' }}
                  >
                    <span className="text-purple-600 font-medium">💬</span> {qa.question}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AskMeBot;
