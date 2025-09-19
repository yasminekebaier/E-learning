import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuizsDevoir = createAsyncThunk(
"devoirQuiz/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get("http://localhost:8085/api/devoirquiz/all", config);
      return res.data; // tu récupères déjà la liste combinée
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const AddQuizDevoirs = createAsyncThunk(
  "quizDevoir/add",
  async (newQuiz, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:8085/api/devoirquiz/add?coursId=${newQuiz.coursId}`,
        newQuiz ,
              {
    headers: { 
              "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
    }
  } // corps de la requête
      );



      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const FetchOneQuiz = createAsyncThunk(
  "Quiz/fetchOne",
  async (quizId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8085/Quiz/Onequiz/${quizId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Impossible de récupérer le quiz.");
    }
  }
);
export const AddDevoir = createAsyncThunk(
  "quiz/addDevoir",
  async ({ file, titre, coursId }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("titre", titre);
      formData.append("coursId", coursId);

      const response = await axios.post("http://localhost:8085/Devoirs/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data; // le devoir créé
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.data || "Erreur lors de l'ajout");
    }
  }
);
