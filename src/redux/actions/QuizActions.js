import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuizsDevoir = createAsyncThunk(
  "Quizs/list",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Fetch des quiz
      const quizResponse = await axios.get("http://localhost:8085/Quiz/listquiz", config);
      const quizs = quizResponse.data.map(q => ({
        ...q,
        type: "QUIZ",   // pour distinguer côté frontend
        cours: q.cours || null
      }));

      // Fetch des devoirs
      const devoirResponse = await axios.get("http://localhost:8085/Devoirs", config);
      const devoirs = devoirResponse.data.map(d => ({
        ...d,
        type: "DEVOIR",
        cours: d.cours || null,
        dateLimite: d.datefin,  // si tu veux harmoniser les champs
        duree: d.nbrhour
      }));

      // Combine quiz et devoirs
      return [...quizs, ...devoirs];

    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
;

export const AddQuizDevoirs = createAsyncThunk(
  "quizDevoir/add",
  async (newQuiz, { rejectWithValue }) => {
    try {
      
      const res = await axios.post(
        `http://localhost:8085/api/devoirquiz/add?coursId=${newQuiz.coursId}`,
        newQuiz ,
              {
    headers: { // token JWT valide
      'Content-Type': 'application/json'
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
