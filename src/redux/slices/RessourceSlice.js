import { createSlice } from '@reduxjs/toolkit'
import { fetchRessources } from '../actions/RessourceActions';

const initialState={
    ressources:[],
    isFetching:false,
    error:false
}
const RessourcesSlice = createSlice({
    name:'ressources',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
     
          builder
          .addCase(fetchRessources.pending, (state) => {
            state.isFetching = true;
            state.error = null;
        })
  .addCase(fetchRessources.fulfilled, (state, { payload }) => {
  state.isFetching = false;
  state.ressources = Array.isArray(payload) ? payload : [];
})



        .addCase(fetchRessources.rejected, (state, { payload }) => {
            state.isFetching = false;
            state.error = payload; 
        });
  }
})
export default RessourcesSlice.reducer;