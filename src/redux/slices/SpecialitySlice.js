import { createSlice } from "@reduxjs/toolkit";
import { AddSpeciality, deleteSpeciality, fetchSpecialites, updateSpeciality } from "../actions/specialityAction";

const specialitySlice = createSlice({
  name: "speciality",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecialites.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchSpecialites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(AddSpeciality.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateSpeciality.fulfilled, (state, action) => {
        const index = state.list.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteSpeciality.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s.id !== action.payload);
      });
  },
});

export default specialitySlice.reducer;