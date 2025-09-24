import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:8085";

// Ajouter un feedback
export const addFeedback = createAsyncThunk(
  "feedback/add",
  async ({ candidatId, coursId, feedback }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/Feedback/add/${candidatId}/${coursId}`,
        feedback,
        { headers: { "Content-Type": "application/json" } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Récupérer tous les feedbacks (ancienne version)
export const fetchFeedbacks = createAsyncThunk(
  "feedback/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/Feedback/all`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ⚡ Nouvelle action : récupérer les feedbacks d'un cours spécifique
export const fetchFeedbacksByCours = createAsyncThunk(
  "feedback/fetchByCours",
  async (coursId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/Feedback/cours/${coursId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
