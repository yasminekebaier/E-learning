import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchReclamations = createAsyncThunk(
  "reclamations/fetchReclamations",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:8085/api/Reclamations");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createReclamation = createAsyncThunk(
  "reclamations/createReclamation",
  async (reclamationData, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:8085/api/Reclamations", null, {
        params: reclamationData,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateReclamation = createAsyncThunk(
  "reclamations/updateReclamation",
  async ({ id, statut, resolution }, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:8085/api/Reclamations/${id}`, null, {
        params: { statut, resolution },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
