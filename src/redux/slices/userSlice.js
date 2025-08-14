
import { createSlice } from "@reduxjs/toolkit";
import { FetchUserProfile, LoginAction, LogoutAction, RegisterAction} from "../actions/userActions";
const initialState = {
  CurrentUser: null,
  loading: false,
  error: false,
  successMessage: null,
  errorMessage: null,
  token: null,
}

const userSlice = createSlice({
name:'user',
initialState,
reducers:{},
extraReducers:(builder) =>{
    builder
     .addCase(RegisterAction.pending,(state)=>{
        state.loading= true;
        state.error=false;

    })
     .addCase(RegisterAction.fulfilled,(state,action)=>{
        state.loading= false;
        state.CurrentUser= action.payload;
        state.error=false;

        })
         .addCase(RegisterAction.rejected,(state)=>{
        state.loading= false;
        state.error=true;
        state.CurrentUser=null;
    })
   .addCase(LoginAction.pending,(state)=>{
        state.loading= true;
        state.error=false;

    })
    .addCase(LoginAction.fulfilled,(state,action)=>{
        state.loading= false;
        state.CurrentUser= action.payload;
        state.error=false;
        localStorage.setItem("token", action.payload?.token?.accessToken);
        })
   .addCase(LoginAction.rejected,(state)=>{
        state.loading= false;
        state.error=true;
        state.CurrentUser=null;
    })
     .addCase(FetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = false;
    })
    .addCase(FetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
     
        state.CurrentUser = action.payload.data;
        state.error = false;
    })
    .addCase(FetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        // Stocke le message d'erreur pour l'afficher si besoin
        state.error = true;
        state.errorMessage = action.payload;
        state.CurrentUser = null;
    })
      .addCase(LogoutAction.fulfilled, (state) => {
    state.loading = false;
    state.CurrentUser = null;
    state.error = false;
    localStorage.removeItem("token");
  })
  .addCase(LogoutAction.rejected, (state) => {
    state.loading = false;
    state.error = true;
  })
  .addCase(LogoutAction.pending, (state) => {
    state.loading = true;
    state.error = false;
  })

}


});

export default userSlice.reducer;

