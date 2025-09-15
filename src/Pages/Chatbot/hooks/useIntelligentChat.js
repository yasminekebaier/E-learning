import { useState, useRef, useEffect, useCallback } from 'react';
import chatbotService from '../services/ChatbotService.js';

const STORAGE_KEYS = {
  HISTORY: 'intelligent-chat-history',
  SETTINGS: 'intelligent-chat-settings',
  USER_CONTEXT: 'user-context'
};

export const useIntelligentChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [userContext, setUserContext] = useState(null);
  const [conversationStats, setConversationStats] = useState(null);
  const [settings, setSettings] = useState({
    theme: 'light',
    soundEnabled: true,
    animationsEnabled: true,
    autoScroll: true,
    intelligenceLevel: 'adaptive' // basic, adaptive, advanced
  });
  
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Initialiser le chat intelligent
  useEffect(() => {
    initializeIntelligentChat();
  }, []);

  const initializeIntelligentChat = async () => {
    // Charger le contexte utilisateur
    const savedUserContext = localStorage.getItem(STORAGE_KEYS.USER_CONTEXT);
    const user = savedUserContext ? JSON.parse(savedUserContext) : {
      id: 'user_' + Date.now(),
      name: 'Amal',
      role: 'étudiant',
      preferences: {
        subjects: ['mathématiques', 'sciences'],
        learningStyle: 'visual',
        difficulty: 'intermediate'
      },
      joinedAt: new Date().toISOString()
    };

    setUserContext(user);
    chatbotService.setUserContext(user);

    // Charger les paramètres
    const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Charger l'historique
    const savedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      setMessages(history);
    } else {
      // Message de bienvenue intelligent
      await generateWelcomeMessage(user);
    }

    // Obtenir les statistiques
    setConversationStats(chatbotService.getConversationStats());
  };

  const generateWelcomeMessage = async (user) => {
    const welcomeMessage = {
      id: 'welcome_' + Date.now(),
      content: `Bonjour ${user.name} ! 👋 

Je suis votre assistant IA personnel, spécialement conçu pour vous accompagner dans votre parcours d'apprentissage. 

🧠 **Intelligence adaptative** : Je m'adapte à votre style d'apprentissage
📚 **Expertise pédagogique** : Spécialisé dans l'éducation et la formation
🎯 **Personnalisation** : Réponses adaptées à votre niveau et vos objectifs

Comment puis-je vous aider aujourd'hui ? N'hésitez pas à me poser toutes vos questions !`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      type: 'welcome',
      metadata: {
        quickReplies: ['📚 Mes cours', '🎯 Nouveau quiz', '📈 Ma progression', '❓ Aide'],
        suggestions: [
          'Comment fonctionne cette plateforme ?',
          'Quels cours sont disponibles ?',
          'Comment suivre ma progression ?'
        ],
        intelligence: {
          confidence: 1.0,
          responseTime: 0,
          context: 'welcome'
        }
      }
    };

    setMessages([welcomeMessage]);
  };

  const scrollToBottom = useCallback(() => {
    if (settings.autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [settings.autoScroll]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = async (messageText) => {
    const text = messageText || inputMessage.trim();
    if (!text || isTyping) return;

    // Annuler toute requête en cours
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const userMessage = {
      id: 'user_' + Date.now(),
      content: text,
      sender: 'user',
      timestamp: new Date().toISOString(),
      metadata: {
        userContext: userContext?.id,
        messageLength: text.length,
        sentiment: chatbotService.analyzeSentiment(text)
      }
    };

    // Ajouter le message utilisateur
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsTyping(true);
    setIsThinking(true);

    try {
      // Créer un nouveau AbortController pour cette requête
      abortControllerRef.current = new AbortController();

      // Générer la réponse intelligente
      const startTime = Date.now();
      const aiResponse = await chatbotService.generateResponse(text, updatedMessages);
      const responseTime = Date.now() - startTime;

      // Vérifier si la requête n'a pas été annulée
      if (!abortControllerRef.current.signal.aborted) {
        const botMessage = {
          id: 'bot_' + Date.now(),
          content: aiResponse.content,
          sender: 'bot',
          timestamp: new Date().toISOString(),
          metadata: {
            quickReplies: aiResponse.quickReplies,
            suggestions: aiResponse.suggestions,
            intelligence: {
              confidence: 0.95,
              responseTime: responseTime,
              context: 'intelligent_response',
              model: 'ChatBot-AI-v2.0'
            }
          }
        };

        setMessages(prev => [...prev, botMessage]);
        
        // Jouer le son de notification
        if (settings.soundEnabled) {
          playNotificationSound();
        }

        // Sauvegarder l'historique
        const finalMessages = [...updatedMessages, botMessage];
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(finalMessages));
        
        // Mettre à jour les statistiques
        setConversationStats(chatbotService.getConversationStats());
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Erreur lors de la génération de la réponse:', error);
        
        // Message d'erreur intelligent
        const errorMessage = {
          id: 'error_' + Date.now(),
          content: `Désolé ${userContext?.name || 'Amal'}, je rencontre une difficulté technique momentanée. 😅

Pouvez-vous reformuler votre question ? Je suis là pour vous aider !

💡 **Astuce** : Essayez d'être plus spécifique dans votre demande pour que je puisse mieux vous comprendre.`,
          sender: 'bot',
          timestamp: new Date().toISOString(),
          type: 'error',
          metadata: {
            quickReplies: ['🔄 Réessayer', '📞 Contact support', '❓ Aide'],
            intelligence: {
              confidence: 0.1,
              responseTime: 0,
              context: 'error_recovery'
            }
          }
        };

        setMessages(prev => [...prev, errorMessage]);
      }
    } finally {
      setIsTyping(false);
      setIsThinking(false);
    }
  };

  const handleQuickReply = (reply) => {
    handleSendMessage(reply);
  };

  const playNotificationSound = () => {
    if (settings.soundEnabled) {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      } catch (err) {
        console.log('Audio non supporté');
      }
    }
  };

  const clearConversation = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    generateWelcomeMessage(userContext);
  };

  const updateSettings = (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
  };

  const updateUserContext = (newContext) => {
    const updated = { ...userContext, ...newContext };
    setUserContext(updated);
    chatbotService.setUserContext(updated);
    localStorage.setItem(STORAGE_KEYS.USER_CONTEXT, JSON.stringify(updated));
  };

  const exportConversation = () => {
    const exportData = {
      user: userContext,
      messages: messages,
      stats: conversationStats,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation_${userContext?.name || 'user'}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
    // État
    messages,
    inputMessage,
    isTyping,
    isThinking,
    userContext,
    conversationStats,
    settings,
    messagesEndRef,

    // Actions
    setInputMessage,
    handleSendMessage,
    handleQuickReply,
    clearConversation,
    updateSettings,
    updateUserContext,
    exportConversation
  };
};