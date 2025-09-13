import { createSlice } from '@reduxjs/toolkit'
import { AddCours, fetchCours } from '../actions/CoursAction';


const initialState={
    cours:[],
    isFetching:false,
    error:false
}
const CoursSlice = createSlice({
    name:'cours',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
     
          builder
          .addCase(AddCours.pending, (state) => {
            state.isFetching = true;
            state.error = null;
        })
         .addCase(AddCours.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.cours = payload; 
        })
        .addCase(AddCours.rejected, (state, { payload }) => {
            state.isFetching = false;
            state.error = payload; 
        })
          .addCase(fetchCours.pending, (state) => {
            state.isFetching = true;
            state.error = null;
        })
        .addCase(fetchCours.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.cours = payload; 
        })
        .addCase(fetchCours.rejected, (state, { payload }) => {
            state.isFetching = false;
            state.error = payload; 
        });
  }
})
export default CoursSlice.reducer;