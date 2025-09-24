import { createSlice } from "@reduxjs/toolkit";
import { createReclamation, fetchReclamations, updateReclamation } from "../actions/reclamationAction";


const initialState = {
  reclamations: [],
  loading: false,
  error: null,
};

const reclamationSlice = createSlice({
  name: "reclamations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchReclamations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReclamations.fulfilled, (state, action) => {
        state.loading = false;
        state.reclamations = action.payload;
      })
      .addCase(fetchReclamations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createReclamation.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReclamation.fulfilled, (state, action) => {
        state.loading = false;
        state.reclamations.push(action.payload);
      })
      .addCase(createReclamation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateReclamation.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReclamation.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.reclamations.findIndex(
          (rec) => rec.id === action.payload.id
        );
        if (index !== -1) state.reclamations[index] = action.payload;
      })
      .addCase(updateReclamation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reclamationSlice.reducer;
