import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  Settings, 
  History, 
  Moon, 
  Sun,
  Volume2,
  VolumeX,
  Zap,
  ZapOff,
  RotateCcw,
  Trash2
} from 'lucide-react';
import { useChatbot } from '../hooks/useChatbot';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

const Chatbot = () => {
  const {
    isOpen,
    currentMessages,
    chatHistory,
    inputMessage,
    isTyping,
    settings,
    messagesEndRef,
    setIsOpen,
    setInputMessage,
    handleSendMessage,
    handleQuickReply,
    startNewSession,
    loadSession,
    clearHistory,
    updateSettings,
    handleClose
  } = useChatbot();

  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleSetting = (key) => {
    updateSettings({ [key]: !settings[key] });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-#008000-500 to-#008000-600 text-white rounded-full shadow-2xl hover:shadow-#008000-500/25 transition-all duration-300 z-50 flex items-center justify-center group"
        style={{
          boxShadow: isOpen 
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
            : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
        </motion.div>
        
        {/* Notification Badge */}
        {!isOpen && currentMessages.length > 1 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold"
          >
            {currentMessages.length - 1}
          </motion.div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`fixed bottom-24 right-6 w-96 h-[600px] rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden ${
              settings.theme === 'dark' 
                ? 'bg-gray-900 border border-gray-700' 
                : 'bg-white border border-gray-200'
            }`}
            style={{
              backdropFilter: 'blur(20px)',
              background: settings.theme === 'dark' 
                ? 'rgba(17, 24, 39, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)'
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-#008000-500 to-#008000-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3"
                >
                  <Bot className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="font-bold">Assistant KeySafe</h3>
                  <p className="text-sm text-#008000-100">
                    {isTyping ? 'En train d\'écrire...' : 'En ligne'}
                  </p>
                </div>
              </div>
              
              {/* Header Actions */}
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowHistory(!showHistory)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <History className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className={`border-b ${settings.theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}
                >
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Thème sombre
                      </span>
                      <button
                        onClick={() => toggleSetting('theme')}
                        className="flex items-center space-x-2"
                      >
                        {settings.theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Sons
                      </span>
                      <button
                        onClick={() => toggleSetting('soundEnabled')}
                        className="flex items-center space-x-2"
                      >
                        {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Animations
                      </span>
                      <button
                        onClick={() => toggleSetting('animationsEnabled')}
                        className="flex items-center space-x-2"
                      >
                        {settings.animationsEnabled ? <Zap className="w-4 h-4" /> : <ZapOff className="w-4 h-4" />}
                      </button>
                    </div>
                    
                    <button
                      onClick={startNewSession}
                      className={`w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        settings.theme === 'dark' 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Nouvelle conversation</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* History Panel */}
            <AnimatePresence>
              {showHistory && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className={`border-b max-h-40 overflow-y-auto ${settings.theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={`text-sm font-medium ${settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Historique
                      </h4>
                      {chatHistory.length > 0 && (
                        <button
                          onClick={clearHistory}
                          className={`p-1 rounded hover:bg-gray-300 ${settings.theme === 'dark' ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500'}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    {chatHistory.length === 0 ? (
                      <p className={`text-xs ${settings.theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                        Aucune conversation sauvegardée
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {chatHistory.map((session) => (
                          <button
                            key={session.id}
                            onClick={() => loadSession(session.id)}
                            className={`w-full text-left p-2 rounded-lg text-xs transition-colors ${
                              settings.theme === 'dark' 
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                                : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            <div className="font-medium truncate">{session.title}</div>
                            <div className={`truncate ${settings.theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                              {session.lastMessage}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${
              settings.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
              {currentMessages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onQuickReply={handleQuickReply}
                  theme={settings.theme}
                  animationsEnabled={settings.animationsEnabled}
                />
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <TypingIndicator 
                  theme={settings.theme}
                  animationsEnabled={settings.animationsEnabled}
                />
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={`p-4 border-t ${
              settings.theme === 'dark' 
                ? 'border-gray-700 bg-gray-800' 
                : 'border-gray-200 bg-white'
            }`}>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tapez votre message..."
                  className={`flex-1 px-4 py-3 rounded-full border-2 transition-all duration-200 focus:ring-2 focus:ring-#008000-500 focus:border-transparent ${
                    settings.theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="w-12 h-12 bg-gradient-to-r from-#008000-500 to-#008000-600 text-white rounded-full hover:from-#008000-600 hover:to-#008000-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;