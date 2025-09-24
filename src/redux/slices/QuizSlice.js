import { createSlice } from "@reduxjs/toolkit"; 
import { 
  fetchQuizsDevoir, 
  AddQuizDevoirs, 
  AddDevoir, 
  AddQuestions, 
  FetchOneQuiz, 
  submitQuiz, 
  evaluateQuiz 
} from "../actions/QuizActions.js";

const quizDevoirSlice = createSlice({
  name: "quizDevoir",
  initialState: {
    quizs: [],
    loading: false,
    error: null,
    selectedQuiz: null,   // pour stocker le quiz récupéré avec FetchOneQuiz
    evaluation: null,     // pour stocker la soumission ou l’évaluation
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // === FETCH ALL QUIZZES ===
      .addCase(fetchQuizsDevoir.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizsDevoir.fulfilled, (state, action) => {
        state.loading = false;
        state.quizs = action.payload;
      })
      .addCase(fetchQuizsDevoir.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // === FETCH ONE QUIZ ===
      .addCase(FetchOneQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchOneQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedQuiz = action.payload;
      })
      .addCase(FetchOneQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // === ADD QUIZ ===
      .addCase(AddQuizDevoirs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddQuizDevoirs.fulfilled, (state, action) => {
        state.loading = false;
        state.quizs.push(action.payload);
      })
      .addCase(AddQuizDevoirs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // === ADD DEVOIR ===
      .addCase(AddDevoir.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddDevoir.fulfilled, (state, action) => {
        state.loading = false;
        state.quizs.push(action.payload);
      })
      .addCase(AddDevoir.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // === ADD QUESTIONS ===
      .addCase(AddQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddQuestions.fulfilled, (state, action) => {
        state.loading = false;
        const addedQuestions = action.payload;
        const quizId = addedQuestions[0]?.quiz?.id;
        if (quizId) {
          const quizIndex = state.quizs.findIndex((q) => q.id === quizId);
          if (quizIndex !== -1) {
            state.quizs[quizIndex].questions = [
              ...(state.quizs[quizIndex].questions || []),
              ...addedQuestions,
            ];
          }
        }
      })
      .addCase(AddQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // === SUBMIT QUIZ ===
      .addCase(submitQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.evaluation = action.payload; // Résultat de la soumission (EvaluationQuiz)
      })
      .addCase(submitQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // === EVALUATE QUIZ ===
      .addCase(evaluateQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(evaluateQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.evaluation = action.payload; // Résultat de l'évaluation
      })
      .addCase(evaluateQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default quizDevoirSlice.reducer;
