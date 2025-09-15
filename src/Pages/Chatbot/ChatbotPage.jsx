import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Bot, 
  Mic, 
  MicOff, 
  Settings, 
  MoreVertical,
  Smile,
  Paperclip,
  Phone,
  Video,
  Search,
  Brain,
  Zap,
  TrendingUp,
  Download
} from 'lucide-react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Chip,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Tooltip,
  LinearProgress
} from '@mui/material';
import IntelligentChatMessage from './IntelligentChatMessage';
import TypingIndicator from './TypingIndicator';
import { useIntelligentChat } from './hooks/useIntelligentChat';

const ChatbotPage = () => {
  const {
    messages,
    inputMessage,
    isTyping,
    isThinking,
    userContext,
    conversationStats,
    settings,
    messagesEndRef,
    setInputMessage,
    handleSendMessage,
    handleQuickReply,
    clearConversation,
    updateSettings,
    exportConversation
  } = useIntelligentChat();

  const [isRecording, setIsRecording] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showStats, setShowStats] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFeedback = (messageId, feedbackType) => {
    console.log(`Feedback pour le message ${messageId}: ${feedbackType}`);
    // Ici vous pouvez implémenter la logique de feedback
  };

  const quickReplies = [
    '📚 Mes cours',
    '🎯 Nouveau quiz', 
    '📈 Ma progression',
    '❓ Aide rapide'
  ];

  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: '#f5f5f5'
    }}>
      {/* Header */}
      <Paper 
        elevation={2} 
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #FFA726 0%, #FF9800 100%)',
          color: 'white',
          position: 'sticky'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2,position: 'sticky', }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: '#4caf50',
                  border: '2px solid white'
                }}
              />
            }
          >
            <Avatar 
              sx={{ 
                width: 48, 
                height: 48,
                bgcolor: 'rgba(255,255,255,0.2)'
              }}
            >
              <Bot size={24} />
            </Avatar>
          </Badge>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {userContext?.name || 'Amal'}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {isThinking ? 'Réflexion en cours...' : isTyping ? 'En train d\'écrire...' : 'Assistant IA • En ligne'}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Statistiques">
            <IconButton 
              sx={{ color: 'white' }}
              onClick={() => setShowStats(!showStats)}
            >
              <TrendingUp />
            </IconButton>
          </Tooltip>
          <IconButton sx={{ color: 'white' }}>
            <Search />
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <Phone />
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <Video />
          </IconButton>
          <IconButton sx={{ color: 'white' }} onClick={handleMenuClick}>
            <MoreVertical />
          </IconButton>
        </Box>
      </Paper>

      {/* Barre de progression pour l'IA */}
      {isThinking && (
        <LinearProgress 
          sx={{ 
            height: 3,
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(90deg, #FFA726, #FF9800, #F57C00)'
            }
          }} 
        />
      )}

      {/* Statistiques intelligentes */}
      <AnimatePresence>
        {showStats && conversationStats && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <Paper sx={{ p: 2, bgcolor: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Brain size={16} />
                  Statistiques IA
                </Typography>
                <Tooltip title="Exporter la conversation">
                  <IconButton size="small" onClick={exportConversation}>
                    <Download size={16} />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 2 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="primary">{conversationStats.totalMessages}</Typography>
                  <Typography variant="caption">Messages</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="success.main">{conversationStats.averageResponseTime}</Typography>
                  <Typography variant="caption">Temps moyen</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="warning.main">{conversationStats.satisfactionScore}</Typography>
                  <Typography variant="caption">Satisfaction</Typography>
                </Box>
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Settings sx={{ mr: 1 }} />
          Paramètres
        </MenuItem>
        <MenuItem onClick={() => { clearConversation(); handleMenuClose(); }}>
          <Zap sx={{ mr: 1 }} />
          Nouvelle conversation
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          Signaler un problème
        </MenuItem>
      </Menu>

      {/* Quick Replies */}
      <Box sx={{ p: 2, bgcolor: 'white', borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {quickReplies.map((reply, index) => (
            <Chip
              key={index}
              label={reply}
              onClick={() => {
                handleQuickReply(reply);
              }}
              sx={{
                bgcolor: '#fff3e0',
                color: '#f57c00',
                border: '1px solid #ffcc02',
                '&:hover': {
                  bgcolor: '#ffe0b2',
                  transform: 'scale(1.05)'
                }
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Messages Area */}
      <Box 
        sx={{ 
          flex: 1, 
          overflow: 'auto', 
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        {messages.map((message) => (
          <IntelligentChatMessage
            key={message.id}
            message={message}
            onQuickReply={handleQuickReply}
            theme={settings.theme}
            animationsEnabled={settings.animationsEnabled}
            onFeedback={handleFeedback}
          />
        ))}

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <TypingIndicator 
              theme={settings.theme}
              animationsEnabled={settings.animationsEnabled}
            />
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          bgcolor: 'white',
          borderTop: '1px solid #e0e0e0'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
          <IconButton sx={{ color: '#666' }}>
            <Paperclip />
          </IconButton>
          
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Posez-moi une question intelligente..."
            variant="outlined"
            disabled={isTyping}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
                bgcolor: '#f8f9fa',
                '& fieldset': {
                  border: '1px solid #e0e0e0'
                },
                '&:hover fieldset': {
                  border: '1px solid #FFA726'
                },
                '&.Mui-focused fieldset': {
                  border: '2px solid #FFA726'
                }
              }
            }}
          />
          
          <IconButton sx={{ color: '#666' }}>
            <Smile />
          </IconButton>
          
          <IconButton 
            onClick={toggleRecording}
            sx={{ 
              color: isRecording ? '#f44336' : '#666',
              bgcolor: isRecording ? '#ffebee' : 'transparent'
            }}
          >
            {isRecording ? <MicOff /> : <Mic />}
          </IconButton>
          
          <IconButton
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            sx={{
              bgcolor: '#FFA726',
              color: 'white',
              position: 'relative',
              '&:hover': {
                bgcolor: '#FF9800'
              },
              '&:disabled': {
                bgcolor: '#e0e0e0',
                color: '#999'
              }
            }}
          >
            {isThinking ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Brain />
              </motion.div>
            ) : (
              <Send />
            )}
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatbotPage;