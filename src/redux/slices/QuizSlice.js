import { createSlice } from "@reduxjs/toolkit"; 
import { fetchQuizsDevoir, AddQuizDevoirs, AddDevoir, AddQuestions } from "../actions/QuizActions.js";

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
state.quizs = action.payload})
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
      })
      // === ADD QuestionQUIZ===
        // === ADD QUESTIONS ===
    .addCase(AddQuestions.fulfilled, (state, action) => {
      const addedQuestions = action.payload; // liste des questions ajoutées
      const quizId = addedQuestions[0]?.quiz?.id;
      if (quizId) {
        const quizIndex = state.quizs.findIndex((q) => q.id === quizId);
        if (quizIndex !== -1) {
          state.quizs[quizIndex].questions = [
            ...(state.quizs[quizIndex].questions || []),
            ...addedQuestions
          ];
        }
      }
    });
      
  },
});

export default quizDevoirSlice.reducer;
