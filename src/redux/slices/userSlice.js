
import { createSlice } from "@reduxjs/toolkit";
import { LoginAction} from "../actions/userActions";
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

}


});

export default userSlice.reducer;

