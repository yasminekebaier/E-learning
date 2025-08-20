import { createSlice } from "@reduxjs/toolkit";
import { FetchUserProfile, LoginAction, LogoutAction, RegisterAction } from "../actions/userActions";

const initialState = {
  CurrentUser: null,
  loading: false,
  error: false,
  successMessage: null,
  errorMessage: null,
  token: localStorage.getItem("token") || null, // garder le token si déjà connecté
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(RegisterAction.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(RegisterAction.fulfilled, (state, action) => {
        state.loading = false;
        state.CurrentUser = action.payload;
        state.error = false;
      })
      .addCase(RegisterAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
        state.CurrentUser = null;
      })

      // LOGIN
      .addCase(LoginAction.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(LoginAction.fulfilled, (state, action) => {
  state.loading = false;
  state.CurrentUser = action.payload.user || action.payload;

  // On stocke le JWT principal
  state.token = action.payload?.token || null;

  state.error = false;

  if (state.token) {
    localStorage.setItem("token", state.token);
  }
})
      .addCase(LoginAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
        state.CurrentUser = null;
        state.token = null;
      })

      // FETCH PROFILE
      .addCase(FetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(FetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.CurrentUser = action.payload.data || action.payload; // harmonisation
        state.error = false;
      })
      .addCase(FetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
        // ⚠️ On ne vide plus le CurrentUser ici → sinon déco forcée
      })

      // LOGOUT
      .addCase(LogoutAction.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(LogoutAction.fulfilled, (state) => {
        state.loading = false;
        state.CurrentUser = null;
        state.error = false;
        state.token = null;
        localStorage.removeItem("token");
      })
      .addCase(LogoutAction.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
      });
  },
});

export default userSlice.reducer;
