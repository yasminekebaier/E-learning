// src/Redux/slices/quizDevoirSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchQuizsDevoir,
  AddQuizDevoirs,
/*   UpdateQuizDevoir,
  DeleteQuizDevoir, */
} from "../actions/QuizActions.js";

const quizDevoirSlice = createSlice({
  name: "quizDevoir",
  initialState: {
    quizs: [],
    loading: false,
    error: null,
  },
  reducers: {}, // si tu veux des actions locales (ex: resetError)
  extraReducers: (builder) => {
    builder
      // === FETCH ALL ===
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

      // === ADD ===
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

      // === UPDATE ===
      /* .addCase(UpdateQuizDevoir.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.quizs.findIndex((q) => q.id === action.payload.id);
        if (index !== -1) {
          state.quizs[index] = action.payload;
        }
      })

      // === DELETE ===
      .addCase(DeleteQuizDevoir.fulfilled, (state, action) => {
        state.loading = false;
        state.quizs = state.quizs.filter((q) => q.id !== action.payload);
      }); */
  },
});

export default quizDevoirSlice.reducer;
