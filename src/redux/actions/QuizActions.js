import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuizs = createAsyncThunk(
  "Quizs/list",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // récupère ton token stocké
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ajoute le token
        },
      };
      const response = await axios.get(
        "http://localhost:8085/Quiz/listquiz",
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

export const AddQuiz = createAsyncThunk(
  "Quizs/createQuiz",
  async (RessourceData, { rejectWithValue }) => {
    const { titreRes, typeRes, contenuRes, heureAjout, Niveau, cours } = RessourceData;
    try {
      const token = localStorage.getItem("token"); // récupère le token
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ajoute le token
        },
      };
      const response = await axios.post(
        "http://localhost:8085/Quiz/addquiz",
        { titreRes, typeRes, contenuRes, heureAjout, Niveau, cours },
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
export const FetchOneQuiz = createAsyncThunk(
  "Quiz/fetchOne",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = localStorage.getItem("token");
     // récupère l'ID de l'utilisateur connect

      const response = await axios.get(
        `http://localhost:8085/Quiz/Onequiz/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Impossible de récupérer le quiz.";
      return rejectWithValue(errorMessage);
    }
  }
);
