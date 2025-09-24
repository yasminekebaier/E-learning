import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuizsDevoir = createAsyncThunk(
"devoirQuiz/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
   
      const config = {
        headers: {
          "Content-Type": "application/json",
        
        },
      };

      const res = await axios.get("http://localhost:8085/api/devoirquiz/all", config);
      console.log("la liste des quizs est",res.data);
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

      // Créer un payload selon le type
    const payload = {
  titre: newQuiz.titre,
  type: newQuiz.type,
  dateLimite: newQuiz.dateLimite,
  duree: newQuiz.duree
};


      const res = await axios.post(
        `http://localhost:8085/api/devoirquiz/add?coursId=${newQuiz.coursId}`,
        payload, // objet JSON modifié
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
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
  "quizDevoir/addDevoir",
  async ({ quizDevoirId, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `http://localhost:8085/api/devoirquiz/${quizDevoirId}/upload-devoir`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Erreur upload devoir");
    }
  }
);
export const AddQuestions = createAsyncThunk(
  "quizDevoir/addQuestions",
  async ({ quizId, questions }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:8085/Question/addQuestions/${quizId}`, questions, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      return questions;
    } catch (err) {
      console.error(err.response?.data || err.message);
      return rejectWithValue(err.response?.data || "Erreur lors de l'ajout des questions");
    }
  }
);
// Soumettre un quiz (réponses étudiant)
export const submitQuiz = createAsyncThunk(
  "quizDevoir/submitQuiz",
  async ({ quizId, studentId, reponses }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `http://localhost:8085/api/devoirquiz/soumettre/${quizId}/${studentId}`,
        reponses, // objet { questionId: choixIndex }
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Erreur lors de la soumission du quiz");
    }
  }
);

// Évaluer un quiz automatiquement
export const evaluateQuiz = createAsyncThunk(
  "quizDevoir/evaluateQuiz",
  async (evaluationId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:8085/api/devoirquiz/evaluer-quiz/${evaluationId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Erreur lors de l'évaluation du quiz");
    }
  }
);






