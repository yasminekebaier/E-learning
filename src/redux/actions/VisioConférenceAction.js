import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8085/api/visio";

// ➤ Ajouter une session visio
export const AddVisios = createAsyncThunk(
  "visio/add",
  async ({ enseignantId, eleveId, session }, { rejectWithValue }) => {
    try {
         const token = localStorage.getItem("token");
     const res = await axios.post(
  `${API_URL}/create`,
  session,
  {
    params: { enseignantId, eleveId },
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }
);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ➤ Récupérer toutes les sessions visio
export const fetchVisios = createAsyncThunk(
  "visio/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/all`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
