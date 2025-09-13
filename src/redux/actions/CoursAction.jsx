import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Ajouter un cours
export const AddCours = createAsyncThunk(
  "Cours/createCours",
  async (CoursData, { rejectWithValue }) => {
    const {
      matiereId,
      nom,
      description,
      etat,
      type,
      datedebut,
      datefin,
      nbrhour,
      prix,
      nomformateur,
      creepar
    } = CoursData;

    const payload = {
      nom,
      description,
      etat,
      type,
      datedebut,
      datefin,
      nbrhour: Number(nbrhour),
      prix: Number(prix),
      nomformateur,
      creepar
    };

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `http://localhost:8085/Cours/addcours/${matiereId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchCours = createAsyncThunk(
  "Cours/list",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get("http://localhost:8085/Cours/listCours", config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const DeleteCours = createAsyncThunk(
  "Cours/delete",
  async (coursId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `http://localhost:8085/Cours/deleteone/${coursId}`,
        config
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
