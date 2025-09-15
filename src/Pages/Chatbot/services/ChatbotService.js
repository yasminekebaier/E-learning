// Service de chatbot intelligent simulant une API IA
class ChatbotService {
  constructor() {
    this.conversationHistory = [];
    this.userContext = null;
  }

  // Initialiser le contexte utilisateur
  setUserContext(user) {
    this.userContext = user;
  }

  // Simuler une API d'IA pour générer des réponses intelligentes
  async generateResponse(userMessage, conversationHistory = []) {
    // Simuler un délai d'API réaliste
    await this.delay(1000 + Math.random() * 2000);

    const context = this.buildContext(userMessage, conversationHistory);
    const response = await this.processWithAI(userMessage, context);
    
    return {
      content: response,
      suggestions: this.generateSuggestions(userMessage, response),
      quickReplies: this.generateQuickReplies(userMessage)
    };
  }

  // Construire le contexte de conversation
  buildContext(currentMessage, history) {
    const recentMessages = history.slice(-5); // Garder les 5 derniers messages
    const userInfo = this.userContext || { name: 'Utilisateur', role: 'étudiant' };
    
    return {
      user: userInfo,
      recentConversation: recentMessages,
      currentMessage: currentMessage,
      timestamp: new Date().toISOString()
    };
  }

  // Simuler le traitement IA (remplace l'appel à une vraie API)
  async processWithAI(message, context) {
    const lowerMessage = message.toLowerCase();
    const userName = context.user.name || 'Ahmed';

    // Réponses contextuelles intelligentes basées sur l'analyse du message
    const responses = await this.getIntelligentResponse(lowerMessage, userName, context);
    
    return responses;
  }

  // Générer des réponses intelligentes basées sur l'analyse du message
  async getIntelligentResponse(message, userName, context) {
    // Analyse des intentions et entités
    const intent = this.analyzeIntent(message);
    const entities = this.extractEntities(message);
    
    switch (intent) {
      case 'greeting':
        return this.generateGreetingResponse(userName);
      
      case 'course_question':
        return this.generateCourseResponse(entities, userName);
      
      case 'technical_help':
        return this.generateTechnicalResponse(entities, userName);
      
      case 'progress_inquiry':
        return this.generateProgressResponse(userName);
      
      case 'quiz_help':
        return this.generateQuizResponse(entities, userName);
      
      case 'schedule_question':
        return this.generateScheduleResponse(userName);
      
      case 'general_question':
        return this.generateGeneralResponse(message, userName, context);
      
      default:
        return this.generateContextualResponse(message, userName, context);
    }
  }

  // Analyser l'intention du message
  analyzeIntent(message) {
    const greetings = ['bonjour', 'salut', 'hello', 'bonsoir', 'hey'];
    const courseKeywords = ['cours', 'leçon', 'module', 'formation', 'apprentissage'];
    const techKeywords = ['problème', 'erreur', 'bug', 'connexion', 'technique'];
    const progressKeywords = ['progression', 'avancement', 'résultat', 'note', 'score'];
    const quizKeywords = ['quiz', 'examen', 'test', 'évaluation', 'devoir'];
    const scheduleKeywords = ['planning', 'horaire', 'rendez-vous', 'meeting', 'session'];

    if (greetings.some(word => message.includes(word))) return 'greeting';
    if (courseKeywords.some(word => message.includes(word))) return 'course_question';
    if (techKeywords.some(word => message.includes(word))) return 'technical_help';
    if (progressKeywords.some(word => message.includes(word))) return 'progress_inquiry';
    if (quizKeywords.some(word => message.includes(word))) return 'quiz_help';
    if (scheduleKeywords.some(word => message.includes(word))) return 'schedule_question';
    if (message.includes('?')) return 'general_question';
    
    return 'contextual';
  }

  // Extraire les entités du message
  extractEntities(message) {
    const entities = {
      subjects: [],
      difficulty: null,
      timeframe: null
    };

    // Sujets détectés
    const subjects = ['mathématiques', 'français', 'sciences', 'histoire', 'géographie', 'physique', 'chimie'];
    entities.subjects = subjects.filter(subject => message.includes(subject));

    // Niveau de difficulté
    if (message.includes('difficile') || message.includes('compliqué')) entities.difficulty = 'hard';
    if (message.includes('facile') || message.includes('simple')) entities.difficulty = 'easy';

    // Temporalité
    if (message.includes('aujourd\'hui') || message.includes('maintenant')) entities.timeframe = 'today';
    if (message.includes('demain')) entities.timeframe = 'tomorrow';

    return entities;
  }

  // Générer différents types de réponses
  generateGreetingResponse(userName) {
    const greetings = [
      `Bonjour ${userName} ! 👋 Je suis ravi de vous revoir. Comment puis-je vous aider aujourd'hui ?`,
      `Salut ${userName} ! 😊 Prêt pour une nouvelle session d'apprentissage ? Que souhaitez-vous explorer ?`,
      `Hello ${userName} ! ✨ J'espère que vous passez une excellente journée. Sur quoi travaillons-nous aujourd'hui ?`
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  generateCourseResponse(entities, userName) {
    const subject = entities.subjects[0] || 'votre matière';
    return `Excellente question sur ${subject}, ${userName} ! 📚 

Je peux vous aider avec :
• **Concepts fondamentaux** et explications détaillées
• **Exercices pratiques** adaptés à votre niveau
• **Ressources complémentaires** pour approfondir
• **Méthodes d'apprentissage** efficaces

Quel aspect spécifique vous intéresse le plus ? Je peux adapter mes explications à votre rythme d'apprentissage.`;
  }

  generateTechnicalResponse(entities, userName) {
    return `Je comprends votre problème technique, ${userName}. 🔧

Voici comment je peux vous aider :
• **Diagnostic rapide** du problème
• **Solutions étape par étape**
• **Alternatives** si la première solution ne fonctionne pas
• **Prévention** pour éviter que cela se reproduise

Pouvez-vous me décrire plus précisément ce qui ne fonctionne pas ? Plus vous me donnez de détails, mieux je peux vous aider !`;
  }

  generateProgressResponse(userName) {
    return `Parlons de votre progression, ${userName} ! 📈

Je peux vous fournir des insights sur :
• **Analyse de vos performances** récentes
• **Points forts** à maintenir
• **Axes d'amélioration** identifiés
• **Recommandations personnalisées** pour progresser
• **Objectifs** à court et long terme

Souhaitez-vous qu'on examine une matière en particulier ou faire un bilan global ?`;
  }

  generateQuizResponse(entities, userName) {
    const subject = entities.subjects[0] || 'la matière de votre choix';
    return `Parfait pour les quiz, ${userName} ! 🎯

Je peux vous proposer :
• **Quiz personnalisés** en ${subject}
• **Questions adaptées** à votre niveau
• **Explications détaillées** des réponses
• **Conseils stratégiques** pour les examens
• **Révisions ciblées** sur vos points faibles

Quel type de quiz vous intéresse ? Questions rapides ou session d'entraînement approfondie ?`;
  }

  generateScheduleResponse(userName) {
    return `Organisons votre planning, ${userName} ! 📅

Je peux vous aider avec :
• **Planification d'étude** optimisée
• **Rappels personnalisés** pour vos sessions
• **Équilibrage** entre différentes matières
• **Gestion du temps** efficace
• **Préparation aux échéances** importantes

Avez-vous des deadlines spécifiques ou souhaitez-vous créer un planning d'étude régulier ?`;
  }

  generateGeneralResponse(message, userName, context) {
    return `C'est une excellente question, ${userName} ! 🤔

Basé sur notre conversation, je pense que vous vous intéressez à l'apprentissage et au développement de vos compétences. 

Voici comment je peux vous accompagner :
• **Réponses personnalisées** à vos questions spécifiques
• **Explications adaptées** à votre niveau
• **Ressources recommandées** pour approfondir
• **Suivi de votre progression** dans le temps

N'hésitez pas à me poser des questions plus spécifiques - plus vous êtes précis, mieux je peux vous aider !`;
  }

  generateContextualResponse(message, userName, context) {
    // Analyser le contexte de la conversation pour une réponse plus intelligente
    const recentTopics = this.extractTopicsFromHistory(context.recentConversation);
    
    return `Je vois que vous vous intéressez à ${recentTopics.join(', ')}, ${userName}. 

Permettez-moi de vous donner une réponse réfléchie à votre message : "${message}"

Basé sur notre conversation et votre profil d'apprentissage, je recommande d'aborder cette question sous plusieurs angles. Souhaitez-vous que je vous propose une approche structurée ou préférez-vous commencer par un aspect particulier ?

💡 **Astuce** : Plus vous me donnez de contexte, plus mes réponses peuvent être précises et utiles !`;
  }

  // Extraire les sujets de l'historique de conversation
  extractTopicsFromHistory(history) {
    const topics = new Set();
    const keywords = ['mathématiques', 'sciences', 'français', 'quiz', 'cours', 'progression'];
    
    history.forEach(msg => {
      keywords.forEach(keyword => {
        if (msg.content && msg.content.toLowerCase().includes(keyword)) {
          topics.add(keyword);
        }
      });
    });
    
    return Array.from(topics).slice(0, 3); // Limiter à 3 sujets principaux
  }

  // Générer des suggestions intelligentes
  generateSuggestions(userMessage, response) {
    const suggestions = [];
    const message = userMessage.toLowerCase();

    if (message.includes('cours')) {
      suggestions.push(
        'Quels sont les prérequis pour ce cours ?',
        'Avez-vous des exercices pratiques ?',
        'Comment évaluer ma compréhension ?'
      );
    } else if (message.includes('quiz')) {
      suggestions.push(
        'Créer un quiz personnalisé',
        'Voir mes résultats précédents',
        'Conseils pour mieux réviser'
      );
    } else if (message.includes('aide')) {
      suggestions.push(
        'Guide de démarrage rapide',
        'Contacter le support technique',
        'Voir la documentation complète'
      );
    } else {
      suggestions.push(
        'Expliquer plus en détail',
        'Donner des exemples concrets',
        'Proposer des ressources supplémentaires'
      );
    }

    return suggestions.slice(0, 3);
  }

  // Générer des réponses rapides contextuelles
  generateQuickReplies(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('cours') || message.includes('formation')) {
      return ['📚 Voir mes cours', '🎯 Cours recommandés', '📈 Ma progression'];
    } else if (message.includes('quiz') || message.includes('test')) {
      return ['🎯 Nouveau quiz', '📊 Mes résultats', '🏆 Mes badges'];
    } else if (message.includes('aide') || message.includes('help')) {
      return ['📖 Guide d\'aide', '💬 Contact support', '🔍 Rechercher'];
    } else {
      return ['👍 Merci', '❓ Plus d\'infos', '➡️ Continuer'];
    }
  }

  // Utilitaire pour simuler un délai
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Analyser le sentiment du message (positif, négatif, neutre)
  analyzeSentiment(message) {
    const positiveWords = ['merci', 'super', 'génial', 'parfait', 'excellent'];
    const negativeWords = ['problème', 'difficile', 'erreur', 'frustrant', 'compliqué'];
    
    const hasPositive = positiveWords.some(word => message.includes(word));
    const hasNegative = negativeWords.some(word => message.includes(word));
    
    if (hasPositive && !hasNegative) return 'positive';
    if (hasNegative && !hasPositive) return 'negative';
    return 'neutral';
  }

  // Obtenir des statistiques de conversation
  getConversationStats() {
    return {
      totalMessages: this.conversationHistory.length,
      averageResponseTime: '1.2s',
      satisfactionScore: '4.8/5',
      topicsDiscussed: this.extractTopicsFromHistory(this.conversationHistory)
    };
  }
}

// Instance singleton du service
const chatbotService = new ChatbotService();

export default chatbotService;