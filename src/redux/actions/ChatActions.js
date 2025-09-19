import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8085/messages";

// 📩 Récupérer les messages entre 2 utilisateurs
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async ({ user1Id, user2Id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/conversation/${user1Id}/${user2Id}`);
      return data; // tableau de messages
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✉️ Envoyer un message
export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ senderId, receiverId, content }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/send`,
        null, // pas de body, car params dans l’URL
        { params: { senderId, receiverId, content } }
      );
      return data; // message créé
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
