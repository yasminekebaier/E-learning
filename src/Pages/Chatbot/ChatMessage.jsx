import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Copy, Check } from 'lucide-react';

const ChatMessage = ({ 
  message, 
  onQuickReply, 
  theme = 'light',
  animationsEnabled = true 
}) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';
  const isBot = message.sender === 'bot';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const formatContent = (content) => {
    // Convert markdown-style formatting to HTML
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^• (.*$)/gim, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: animationsEnabled ? 0.3 : 0,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}
    >
      <div className={`flex items-start space-x-3 max-w-[85%] ${
        isUser ? 'flex-row-reverse space-x-reverse' : ''
      }`}>
        {/* Avatar */}
        <motion.div 
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
              : theme === 'dark'
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-100 text-gray-600'
          }`}
          whileHover={animationsEnabled ? { scale: 1.1 } : {}}
          transition={{ duration: 0.2 }}
        >
          {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        </motion.div>

        {/* Message Content */}
        <div className="flex flex-col space-y-1">
          <motion.div 
            className={`relative px-4 py-3 rounded-2xl shadow-sm ${
              isUser
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
                : theme === 'dark'
                  ? 'bg-gray-800 text-gray-100 rounded-bl-md border border-gray-700'
                  : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
            }`}
            whileHover={animationsEnabled ? { scale: 1.02 } : {}}
            transition={{ duration: 0.2 }}
          >
            {/* Copy Button */}
            {isBot && (
              <button
                onClick={handleCopy}
                className={`absolute top-2 right-2 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
                  theme === 'dark' 
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' 
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </button>
            )}
            
            <div 
              className="text-sm leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: formatContent(message.content) }}
            />
          </motion.div>

          {/* Quick Replies */}
          {isBot && message.metadata?.quickReplies && (
            <motion.div 
              className="flex flex-wrap gap-2 mt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              {message.metadata.quickReplies.map((reply, index) => (
                <motion.button
                  key={index}
                  onClick={() => onQuickReply?.(reply)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 hover:shadow-md ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                  }`}
                  whileHover={animationsEnabled ? { scale: 1.05 } : {}}
                  whileTap={animationsEnabled ? { scale: 0.95 } : {}}
                >
                  {reply}
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Suggestions */}
          {isBot && message.metadata?.suggestions && (
            <motion.div 
              className="mt-3 space-y-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Suggestions :
              </p>
              {message.metadata.suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => onQuickReply?.(suggestion)}
                  className={`block w-full text-left px-3 py-2 text-xs rounded-lg transition-all duration-200 ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                  whileHover={animationsEnabled ? { x: 5 } : {}}
                >
                  💡 {suggestion}
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Timestamp */}
          <p className={`text-xs mt-1 ${
            isUser ? 'text-right' : 'text-left'
          } ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            {new Date(message.timestamp).toLocaleTimeString('fr-FR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;