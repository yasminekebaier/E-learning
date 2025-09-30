import { createSlice } from "@reduxjs/toolkit";
import { AddMatiéres, DeleteMatieres, fetchMatieres, UpdateMatiere } from "../actions/MatiéreAction";

const matiereSlice = createSlice({
  name: "matiere",
  initialState: {
    matieres: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all
    builder.addCase(fetchMatieres.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMatieres.fulfilled, (state, action) => {
      state.loading = false;
      state.matieres = action.payload;
    });
    builder.addCase(fetchMatieres.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Add
    builder.addCase(AddMatiéres.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(AddMatiéres.fulfilled, (state, action) => {
      state.loading = false;
      state.matieres.push(action.payload);
    });
    builder.addCase(AddMatiéres.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete
    builder.addCase(DeleteMatieres.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(DeleteMatieres.fulfilled, (state, action) => {
      state.matieres = state.matieres.filter(
        (matiere) => matiere.id !== action.payload
      );
      state.loading = false;
    })
    builder.addCase(DeleteMatieres.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update
    builder.addCase(UpdateMatiere.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(UpdateMatiere.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.matieres.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) state.matieres[index] = action.payload;
    });
    builder.addCase(UpdateMatiere.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default matiereSlice.reducer;