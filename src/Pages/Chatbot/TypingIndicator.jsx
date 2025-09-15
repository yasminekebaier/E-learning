import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

const TypingIndicator = ({ theme = 'light', animationsEnabled = true }) => {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: [-4, 0, -4] }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex justify-start"
    >
      <div className="flex items-start space-x-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
        }`}>
          <Bot className="w-5 h-5" />
        </div>
        <div className={`px-4 py-3 rounded-2xl rounded-bl-md ${
          theme === 'dark' 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-200'
        }`}>
          <div className="flex space-x-1">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                variants={dotVariants}
                initial="initial"
                animate="animate"
                transition={{
                  duration: animationsEnabled ? 0.6 : 0,
                  repeat: Infinity,
                  delay: index * 0.1
                }}
                className={`w-2 h-2 rounded-full ${
                  theme === 'dark' ? 'bg-gray-500' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;