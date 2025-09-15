import { useState, useRef, useEffect, useCallback } from 'react';

const STORAGE_KEYS = {
  HISTORY: 'chatbot-history',
  SETTINGS: 'chatbot-settings',
  CURRENT_SESSION: 'chatbot-current-session'
};

export const useChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [settings, setSettings] = useState({
    theme: 'light',
    soundEnabled: true,
    animationsEnabled: true,
    autoScroll: true
  });
  const [currentSessionId, setCurrentSessionId] = useState('');
  
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef();

  // Initialize chatbot
  useEffect(() => {
    initializeChatbot();
  }, []);

  const initializeChatbot = () => {
    // Load settings
    const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Load history
    const savedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }

    // Start new session
    startNewSession();
  };

  const startNewSession = () => {
    const sessionId = Date.now().toString();
    setCurrentSessionId(sessionId);
    
    const welcomeMessage = {
      id: '1',
      content: 'Bonjour! 👋 Je suis votre assistant virtuel KeySafe amélioré. Comment puis-je vous aider aujourd\'hui?',
      sender: 'bot',
      timestamp: new Date().toISOString(),
      metadata: {
        quickReplies: ['📚 Mes cours', '📊 Ma progression', '💬 Forum', '❓ Aide'],
        category: 'welcome'
      }
    };

    setCurrentMessages([welcomeMessage]);
  };

  const scrollToBottom = useCallback(() => {
    if (settings.autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [settings.autoScroll]);

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages, scrollToBottom]);

  const playNotificationSound = () => {
    if (settings.soundEnabled) {
      // Create a simple notification sound using Web Audio API
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 600;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      } catch (err) {
        console.log('Audio not supported');
      }
    }
  };

  const generateEnhancedBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    const responses = {
      cours: {
        content: `🎓 **Gestion des Cours**

Vous pouvez accéder à tous vos cours depuis la section "Cours" dans le menu. Voici ce qui vous attend :

• **Modules interactifs** avec vidéos HD
• **Documents téléchargeables** (PDF, slides)
• **Quiz de validation** après chaque section
• **Suivi de progression** en temps réel

Souhaitez-vous que je vous aide à trouver un cours spécifique ?`,
        metadata: {
          quickReplies: ['📖 Voir mes cours', '🎯 Cours recommandés', '📈 Ma progression'],
          category: 'courses'
        }
      },
      quiz: {
        content: `📝 **Évaluations et Quiz**

Les quiz sont conçus pour valider vos acquis :

• **Quiz de fin de module** (obligatoires)
• **Tests de révision** (optionnels)
• **Examens finaux** avec certificats
• **Feedback détaillé** sur vos réponses

Vous obtenez des badges pour chaque réussite ! 🏆`,
        metadata: {
          quickReplies: ['🎯 Mes quiz', '📊 Mes résultats', '🏆 Mes badges'],
          category: 'assessments'
        }
      },
      forum: {
        content: `💬 **Forum Communautaire**

Un espace d'échange enrichissant :

• **Questions/Réponses** avec la communauté
• **Groupes d'étude** par sujet
• **Partage de ressources** entre étudiants
• **Sessions live** avec les formateurs

Rejoignez plus de 10,000 étudiants actifs ! 🌟`,
        metadata: {
          quickReplies: ['💬 Accéder au forum', '👥 Mes groupes', '📅 Sessions live'],
          category: 'community'
        }
      },
      progression: {
        content: `📈 **Suivi de Progression**

Votre tableau de bord personnalisé affiche :

• **Pourcentage d'avancement** par cours
• **Notes et certificats** obtenus
• **Temps d'étude** cumulé
• **Objectifs** et deadlines
• **Recommandations** personnalisées

Restez motivé avec vos statistiques ! ⚡`,
        metadata: {
          quickReplies: ['📊 Mon dashboard', '🎯 Mes objectifs', '📋 Planning'],
          category: 'progress'
        }
      },
      aide: {
        content: `🚀 **Centre d'Aide KeySafe**

Je peux vous assister sur :

🎓 **Apprentissage**
• Navigation dans les cours
• Utilisation des outils
• Gestion du planning

💬 **Communauté**
• Participation au forum
• Collaboration en groupe

📊 **Suivi**
• Analyse de progression
• Objectifs et deadlines

Que souhaitez-vous explorer ?`,
        metadata: {
          quickReplies: ['📚 Guide débutant', '🛠️ Outils avancés', '📞 Contact support'],
          category: 'help'
        }
      }
    };

    // Find matching response
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    // Default response with suggestions
    return {
      content: `Je comprends votre question ! 🤔 

Pour une assistance personnalisée, je peux vous orienter vers les bonnes ressources. Voici quelques suggestions :`,
      metadata: {
        quickReplies: ['📚 Voir l\'aide', '💬 Contact support', '🔍 Rechercher'],
        suggestions: [
          'Comment accéder à mes cours ?',
          'Où voir ma progression ?',
          'Comment utiliser le forum ?',
          'Problème technique'
        ],
        category: 'default'
      }
    };
  };

  const addMessage = (message) => {
    setCurrentMessages(prev => [...prev, message]);
    
    // Save to session storage
    const updatedMessages = [...currentMessages, message];
    localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, JSON.stringify(updatedMessages));
  };

  const handleSendMessage = async (messageText) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    const userMessage = {
      id: Date.now().toString(),
      content: text,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    addMessage(userMessage);
    setInputMessage('');
    setIsTyping(true);

    // Clear any existing typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Simulate realistic typing delay
    const typingDuration = Math.min(2000, text.length * 50 + 800);
    
    typingTimeoutRef.current = setTimeout(() => {
      const botResponseData = generateEnhancedBotResponse(text);
      const botResponse = {
        id: (Date.now() + 1).toString(),
        content: botResponseData.content,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        metadata: botResponseData.metadata
      };

      addMessage(botResponse);
      setIsTyping(false);
      playNotificationSound();
    }, typingDuration);
  };

  const handleQuickReply = (reply) => {
    handleSendMessage(reply);
  };

  const saveCurrentSession = () => {
    if (currentMessages.length > 1) { // More than just welcome message
      const session = {
        id: currentSessionId,
        title: `Conversation du ${new Date().toLocaleDateString()}`,
        messages: currentMessages,
        createdAt: new Date().toISOString(),
        lastMessage: currentMessages[currentMessages.length - 1].content
      };

      const updatedHistory = [session, ...chatHistory.slice(0, 9)]; // Keep last 10 sessions
      setChatHistory(updatedHistory);
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedHistory));
    }
  };

  const loadSession = (sessionId) => {
    const session = chatHistory.find(h => h.id === sessionId);
    if (session) {
      setCurrentMessages(session.messages);
      setCurrentSessionId(sessionId);
    }
  };

  const clearHistory = () => {
    setChatHistory([]);
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  };

  const updateSettings = (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
  };

  const handleClose = () => {
    saveCurrentSession();
    setIsOpen(false);
  };

  return {
    // State
    isOpen,
    currentMessages,
    chatHistory,
    inputMessage,
    isTyping,
    settings,
    currentSessionId,
    messagesEndRef,

    // Actions
    setIsOpen,
    setInputMessage,
    handleSendMessage,
    handleQuickReply,
    startNewSession,
    loadSession,
    clearHistory,
    updateSettings,
    handleClose
  };
};