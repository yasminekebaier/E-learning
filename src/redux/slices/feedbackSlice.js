import { createSlice } from "@reduxjs/toolkit";
import { addFeedback, fetchFeedbacks, fetchFeedbacksByCours } from "../actions/feedbackActions";

const initialState = {
  feedbacks: [],
  loading: false,
  error: null,
  successMessage: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Ajouter feedback
      .addCase(addFeedback.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks.push(action.payload);
        state.successMessage = "Feedback ajouté avec succès ✅";
      })
      .addCase(addFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Récupérer feedbacks
      .addCase(fetchFeedbacks.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFeedbacksByCours.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedbacksByCours.fulfilled, (state, action) => {
        state.feedbacks = action.payload;
        state.loading = false;
      })
      .addCase(fetchFeedbacksByCours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default feedbackSlice.reducer;
