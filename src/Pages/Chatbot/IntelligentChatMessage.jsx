import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  User,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  MoreVertical,
  Brain,
  Clock,
  Zap,
} from "lucide-react";
import {
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Tooltip,
  Box,
  Typography,
} from "@mui/material";

const IntelligentChatMessage = ({
  message,
  onQuickReply,
  theme = "light",
  animationsEnabled = true,
  onFeedback,
}) => {
  const [copied, setCopied] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const isUser = message.sender === "user";
  const isBot = message.sender === "bot";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Échec de la copie:", err);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFeedback = (type) => {
    setFeedback(type);
    if (onFeedback) {
      onFeedback(message.id, type);
    }
    handleMenuClose();
  };

  const formatContent = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/^• (.*$)/gim, "<li>$1</li>")
      .replace(
        /(<li>.*<\/li>)/s,
        '<ul style="margin: 8px 0; padding-left: 20px;">$1</ul>'
      )
      .replace(
        /🧠|📚|🎯|📈|❓|💡|🔧|📊|🏆|💬|📅|✨|🚀|⚡|🎨|🔍/g,
        '<span style="font-size: 1.1em;">$&</span>'
      );
  };

  const getIntelligenceIndicator = () => {
    const intelligence = message.metadata?.intelligence;
    if (!intelligence || isUser) return null;

    const confidence = intelligence.confidence || 0;
    const responseTime = intelligence.responseTime || 0;

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          mt: 1,
          opacity: 0.7,
        }}
      >
        <Brain size={12} />
        <Typography variant="caption" sx={{ fontSize: "0.7rem" }}>
          IA • {Math.round(confidence * 100)}% • {responseTime}ms
        </Typography>
        {confidence > 0.9 && <Zap size={10} color="#4caf50" />}
      </Box>
    );
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: animationsEnabled ? 0.4 : 0,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      className={`flex ${isUser ? "justify-end" : "justify-start"} w-full mb-4`}
    >{console.log('user::',isUser)}
      <div
        className={`flex items-start space-x-3 max-w-[85%] ${
          isUser ? "flex-row-reverse space-x-reverse" : ""
        }`}
      >
        
        <motion.div
          className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
            isUser
              ? "bg-gradient-to-r from-#174090-500 to-#174090-600 text-white"
              : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
          }`}
          whileHover={animationsEnabled ? { scale: 1.1, rotate: 5 } : {}}
          transition={{ duration: 0.2 }}
        >
          {isUser ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        </motion.div>

        {/* Contenu du message */}
        <div className="flex flex-col space-y-1 flex-1">
          <motion.div
            className={`relative px-4 py-3 shadow-sm border max-w-fit ${
              isUser
                ? "bg-#174090-500 text-white rounded-tl-2xl rounded-bl-2xl rounded-br-md"
                : theme === "dark"
                ? "bg-gray-800 text-gray-100 border-gray-600 rounded-tr-2xl rounded-br-2xl rounded-bl-md"
                : "bg-white text-gray-800 border-gray-200 rounded-tr-2xl rounded-br-2xl rounded-bl-md"
            }`}
            whileHover={animationsEnabled ? { scale: 1.01 } : {}}
            transition={{ duration: 0.2 }}
          >
            {/* Actions du message */}
            {isBot && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                <Tooltip title="Copier">
                  <IconButton
                    size="small"
                    onClick={handleCopy}
                    sx={{
                      color: theme === "dark" ? "gray.400" : "gray.500",
                      "&:hover": {
                        bgcolor: theme === "dark" ? "gray.700" : "gray.100",
                      },
                    }}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                  </IconButton>
                </Tooltip>

                <Tooltip title="Plus d'options">
                  <IconButton
                    size="small"
                    onClick={handleMenuClick}
                    sx={{
                      color: theme === "dark" ? "gray.400" : "gray.500",
                      "&:hover": {
                        bgcolor: theme === "dark" ? "gray.700" : "gray.100",
                      },
                    }}
                  >
                    <MoreVertical size={14} />
                  </IconButton>
                </Tooltip>
              </div>
            )}

            {/* Contenu formaté */}
            <div
              className="text-sm leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: formatContent(message.content),
              }}
              style={{
                color: isUser
                  ? "#0c0f14ff"
                  : theme === "dark"
                  ? "#2a8454ff"
                  : "#374151",
              }}
            />

            {/* Indicateur d'intelligence */}
            {getIntelligenceIndicator()}
          </motion.div>

          {/* Réponses rapides */}
          {isBot && message.metadata?.quickReplies && (
            <motion.div
              className="flex flex-wrap gap-2 mt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              {message.metadata.quickReplies.map((reply, index) => (
                <Chip
                  key={index}
                  label={reply}
                  onClick={() => onQuickReply?.(reply)}
                  size="small"
                  sx={{
                    bgcolor: "#fff3e0",
                    color: "#f57c00",
                    border: "1px solid #ffcc02",
                    fontSize: "0.75rem",
                    "&:hover": {
                      bgcolor: "#ffe0b2",
                      transform: animationsEnabled ? "scale(1.05)" : "none",
                    },
                    transition: "all 0.2s ease",
                  }}
                />
              ))}
            </motion.div>
          )}

          {/* Suggestions intelligentes */}
          {isBot && message.metadata?.suggestions && (
            <motion.div
              className="mt-3 space-y-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: theme === "dark" ? "gray.400" : "gray.500",
                  fontSize: "0.7rem",
                  fontWeight: "medium",
                }}
              >
                💡 Suggestions intelligentes :
              </Typography>
              {message.metadata.suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => onQuickReply?.(suggestion)}
                  className={`block w-full text-left px-3 py-2 text-xs rounded-lg transition-all duration-200 ${
                    theme === "dark"
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                  whileHover={animationsEnabled ? { x: 5, scale: 1.02 } : {}}
                  whileTap={animationsEnabled ? { scale: 0.98 } : {}}
                >
                  {suggestion}
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Feedback et timestamp */}
          <div
            className={`flex items-center justify-between mt-2 ${
              isUser ? "flex-row-reverse" : ""
            }`}
          >
            <Typography
              variant="caption"
              sx={{
                color: theme === "dark" ? "gray.500" : "gray.400",
                fontSize: "0.7rem",
              }}
            >
              {new Date(message.timestamp).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>

            {/* Feedback pour les messages du bot */}
            {isBot && (
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Tooltip title="Utile">
                  <IconButton
                    size="small"
                    onClick={() => handleFeedback("positive")}
                    sx={{
                      color: feedback === "positive" ? "#4caf50" : "gray.400",
                      "&:hover": { color: "#4caf50" },
                    }}
                  >
                    <ThumbsUp size={12} />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Pas utile">
                  <IconButton
                    size="small"
                    onClick={() => handleFeedback("negative")}
                    sx={{
                      color: feedback === "negative" ? "#f44336" : "gray.400",
                      "&:hover": { color: "#f44336" },
                    }}
                  >
                    <ThumbsDown size={12} />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menu contextuel */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { minWidth: 150 },
        }}
      >
        <MenuItem onClick={() => handleFeedback("positive")}>
          <ThumbsUp size={16} style={{ marginRight: 8 }} />
          Utile
        </MenuItem>
        <MenuItem onClick={() => handleFeedback("negative")}>
          <ThumbsDown size={16} style={{ marginRight: 8 }} />
          Pas utile
        </MenuItem>
        <MenuItem onClick={handleCopy}>
          <Copy size={16} style={{ marginRight: 8 }} />
          Copier
        </MenuItem>
      </Menu>
    </motion.div>
  );
};

export default IntelligentChatMessage;
