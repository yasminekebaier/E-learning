import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// --- Actions ---
export const fetchSpecialites = createAsyncThunk(
  "speciality/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:8085/api/specialites");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const AddSpeciality = createAsyncThunk(
  "speciality/add",
  async (specialite, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:8085/api/specialites", specialite);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateSpeciality = createAsyncThunk(
  "speciality/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`http://localhost:8085/api/specialites/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteSpeciality = createAsyncThunk(
  "speciality/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8085/api/specialites/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);