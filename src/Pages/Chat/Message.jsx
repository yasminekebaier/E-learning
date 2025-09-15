import React from 'react'
import { Box, Typography, TextField, IconButton, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const Message = () => {
  return (
    <Box display="flex" height="90vh" bgcolor="#f5f6fa" borderRadius="12px" overflow="hidden">
      
      {/* 📌 Liste des conversations */}
      <Box width="30%" bgcolor="white" borderRight="1px solid #ddd">
        <Box p={2}>
          <Typography variant="h6" fontWeight="bold">Conversations</Typography>
        </Box>
        <Divider />
        <List>
          {["John Doe", "Jane Smith", "Alex Martin"].map((user, index) => (
            <ListItem button key={index}>
              <ListItemAvatar>
                <Avatar src={`https://i.pravatar.cc/150?img=${index + 1}`} />
              </ListItemAvatar>
              <ListItemText
                primary={user}
                secondary="Dernier message..."
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* 📌 Zone de chat */}
      <Box flex={1} display="flex" flexDirection="column" bgcolor="#fafafa">
        <Box p={2} bgcolor="white" borderBottom="1px solid #ddd">
          <Typography variant="h6">Amal Abid</Typography>
        </Box>
        
        {/* Messages */}
        <Box flex={1} p={2} overflow="auto">
          <Box display="flex" mb={2}>
            <Avatar src="https://i.pravatar.cc/150?img=1" />
            <Box ml={1} p={1.5} bgcolor="#eee" borderRadius="10px">
              <Typography>Hi, what are you doing?</Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Box mr={1} p={1.5} bgcolor="#d4f7d4" borderRadius="10px">
              <Typography>I am doing nothing now!</Typography>
            </Box>
            <Avatar src="https://i.pravatar.cc/150?img=2" />
          </Box>
        </Box>

        {/* Saisie */}
        <Box display="flex" p={2} bgcolor="white" borderTop="1px solid #ddd">
          <TextField fullWidth placeholder="Type a message..." variant="outlined" size="small" />
          <IconButton color="primary" sx={{ ml: 1 }}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Message
