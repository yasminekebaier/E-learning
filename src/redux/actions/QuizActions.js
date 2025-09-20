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
        ...newQuiz,
        quiz: newQuiz.type === "QUIZ" ? { questions: [] } : null, // <-- Quiz vide pour les questions
        devoir: newQuiz.type === "DEVOIR" ? null : null
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

      // Transformer les questions pour correspondre au backend
      const payload = questions.map(q => ({
        content: q.texte, // correspond à Question.content côté backend
        correctAnswerIndex: q.correctAnswerIndex,
        choices: q.options.map(opt => ({ content: opt })) // correspond à List<Choice>
      }));

      // Envoyer au backend
      await axios.post(`http://localhost:8085/Question/addQuestions/${quizId}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      return questions; // ou payload si tu veux stocker la structure envoyée
    } catch (err) {
      console.error(err.response?.data || err.message);
      return rejectWithValue(err.response?.data || "Erreur lors de l'ajout des questions");
    }
  }
);




