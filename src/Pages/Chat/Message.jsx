import React, { useEffect, useState } from "react";
import {
  Box, Typography, TextField, IconButton, Avatar, List, ListItem,
  ListItemAvatar, ListItemText, Divider
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, sendMessage } from "../../redux/actions/ChatActions";
import { FetchAllUsers } from "../../redux/actions/userActions";

const Message = () => {
   const dispatch = useDispatch();
  const { CurrentUser, users } = useSelector(state => state.user);
  const { Messages, isFetching } = useSelector(state => state.Messages);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messageText, setMessageText] = useState("");

  // Récupérer tous les utilisateurs depuis Redux
  useEffect(() => {
    dispatch(FetchAllUsers());
  }, [dispatch]);
useEffect(() => {
  console.log("CurrentUser:", CurrentUser);
}, [CurrentUser]);

  // Filtrer uniquement les enseignants et définir le premier comme contact
useEffect(() => {
  if (users.length && CurrentUser) {
    // Retirer "ROLE_" si présent
    const normalizedRole = CurrentUser.role?.replace("ROLE_", "");

    let contactsToShow = [];

    if (normalizedRole?.toUpperCase() === "ENSEIGNANT") {
      // Enseignant voit les ELEVE
      contactsToShow = users.filter(u => u.role?.toUpperCase() === "ELEVE");
    } else if (normalizedRole?.toUpperCase() === "ELEVE") {
      // Eleve voit les ENSEIGNANT
      contactsToShow = users.filter(u => u.role?.toUpperCase() === "ENSEIGNANT");
    }

    console.log("Contacts filtrés:", contactsToShow);

    setContacts(contactsToShow);

    if (!selectedContact && contactsToShow.length > 0) {
      setSelectedContact(contactsToShow[0]);
    }
  }
}, [users, CurrentUser]);

  
useEffect(() => {
  if (CurrentUser && selectedContact) {
    dispatch(fetchMessages({
      user1Id: CurrentUser.id,
      user2Id: selectedContact.id
    }));
  }
}, [CurrentUser, selectedContact, dispatch]);

const handleSend = () => {
  if (!messageText.trim() || !selectedContact) return;

  dispatch(sendMessage({ 
    senderId: CurrentUser.id, 
    receiverId: selectedContact?.id, 
    content: messageText 
  })).then(() => {
    setMessageText("");
    dispatch(fetchMessages({ user1Id: CurrentUser.id, user2Id: selectedContact?.id }));
  });
};
useEffect(() => {
  console.log("Users depuis Redux:", users);
}, [users]);
const getUserDisplayName = (user) => {
  if (user.role === "ENSEIGNANT") return user.nom_prenom_ensignant;
  if (user.role === "ELEVE") return user.nom_prenom_eleve;
  if (user.role === "ADMIN") return user.nom_prenom_admin;
  return user.username;
};



  return (
    <Box display="flex" height="90vh" bgcolor="#f5f6fa" borderRadius="12px" overflow="hidden">
      {/* Liste des conversations */}
      <Box width="30%" bgcolor="white" borderRight="1px solid #ddd">
        <Box p={2}><Typography variant="h6" fontWeight="bold">Conversations</Typography></Box>
        <Divider />
      <List>
  {contacts.length === 0 && (
    <Typography p={2} color="text.secondary">
      Aucun contact disponible
    </Typography>
  )}
  {contacts.map((user) => (
    <ListItem button key={user.id} onClick={() => setSelectedContact(user)}>
      <ListItemAvatar>
        <Avatar src={`https://i.pravatar.cc/150?img=${user.id}`} />
      </ListItemAvatar>
      <ListItemText 
  primary={getUserDisplayName(user)} 
  secondary="Dernier message..." 
/>

    </ListItem>
  ))}
</List>

      </Box>

      {/* Zone de chat */}
      <Box flex={1} display="flex" flexDirection="column" bgcolor="#fafafa">
        <Box p={2} bgcolor="white" borderBottom="1px solid #ddd">
          <Typography variant="h6">{selectedContact?.name || "Sélectionner un contact"}</Typography>
        </Box>

        {/* Messages */}
        <Box flex={1} p={2} overflow="auto">
          {isFetching && <Typography>Chargement...</Typography>}
          {Messages.map((msg, idx) => (
            <Box key={idx} display="flex" mb={2} justifyContent={msg.sender.id === CurrentUser.id ? 'flex-end' : 'flex-start'}>
              {msg.sender.id !== CurrentUser.id && <Avatar src={`https://i.pravatar.cc/150?img=${msg.sender.id}`} />}
              <Box ml={msg.sender.id !== CurrentUser.id ? 1 : 0} mr={msg.sender.id === CurrentUser.id ? 1 : 0} p={1.5} bgcolor={msg.sender.id === CurrentUser.id ? "#d4f7d4" : "#eee"} borderRadius="10px">
                <Typography>{msg.content}</Typography>
              </Box>
              {msg.sender.id === CurrentUser.id && <Avatar src={`https://i.pravatar.cc/150?img=${msg.sender.id}`} />}
            </Box>
          ))}
        </Box>

        {/* Saisie */}
        <Box display="flex" p={2} bgcolor="white" borderTop="1px solid #ddd">
          <TextField fullWidth placeholder="Type a message..." variant="outlined" size="small" value={messageText} onChange={(e) => setMessageText(e.target.value)} />
          <IconButton color="primary" sx={{ ml: 1 }} onClick={handleSend}><SendIcon /></IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Message;
