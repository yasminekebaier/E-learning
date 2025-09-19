import { createSlice } from "@reduxjs/toolkit";
import { AddVisios, fetchVisios } from "../actions/VisioConférenceAction";


const initialState = {
  visioConferences: [], // en camelCase
  isFetching: false,
  error: null,
};

const visioSlice = createSlice({
  name: "visioConferences",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ➤ Ajouter une visio
      .addCase(AddVisios.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(AddVisios.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.visioConferences.push(payload); // ajouter au tableau
      })
      .addCase(AddVisios.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })

      // ➤ Récupérer toutes les visios
      .addCase(fetchVisios.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(fetchVisios.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.visioConferences = payload; // remplacer par le tableau du backend
      })
      .addCase(fetchVisios.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      });
  },
});

export default visioSlice.reducer;
