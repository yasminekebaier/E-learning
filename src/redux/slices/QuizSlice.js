import { createSlice } from "@reduxjs/toolkit"; 
import { fetchQuizsDevoir, AddQuizDevoirs, AddDevoir } from "../actions/QuizActions.js";

const quizDevoirSlice = createSlice({
  name: "quizDevoir",
  initialState: {
    quizs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // === FETCH ALL ===
      .addCase(fetchQuizsDevoir.fulfilled, (state, action) => {
      // Dans le map du fetch
state.quizs = action.payload.map(item => ({
  id: item.id,
  titre: item.titre,
  type: item.type,
  dateLimite: item.dateLimite,
  statut: item.statut,
  cours: item.cours || null,
  duree: item.duree || null,
  questions: item.questions || [],  // pour les quiz
  file: item.file || null           // pour les devoirs
}));

      })
      .addCase(fetchQuizsDevoir.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // === ADD QUIZ ===
      .addCase(AddQuizDevoirs.fulfilled, (state, action) => {
        const newQuiz = {
          id: action.payload.id,
          titre: action.payload.titre,
          type: action.payload.type,
          dateLimite: action.payload.dateLimite,
          statut: action.payload.statut,
          cours: action.payload.cours || null,
          duree: action.payload.duree || null,
          questions: action.payload.questions || [],
        };
        state.quizs.push(newQuiz);
      })

      // === ADD DEVOIR ===
      .addCase(AddDevoir.fulfilled, (state, action) => {
        const newDevoir = {
          id: action.payload.id,
          titre: action.payload.titre,
          type: action.payload.type,
          dateLimite: action.payload.dateLimite,
          statut: action.payload.statut,
          cours: action.payload.cours || null,
          file: action.payload.file || null,
        };
        state.quizs.push(newDevoir);
      });
  },
});

export default quizDevoirSlice.reducer;
