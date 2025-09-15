import { createSlice } from "@reduxjs/toolkit";
import { FetchUserProfile, LoginAction, LogoutAction, RegisterAction, FetchAllUsers, ConfirmUser, RegisterEnseignantAction, AddAdmin } from "../actions/userActions";

const initialState = {
  CurrentUser: null,
  loading: false,
  error: false,
  successMessage: null,
  errorMessage: null,
  token: localStorage.getItem("token") || null,
  users: [],            // <-- Ajout pour stocker tous les utilisateurs
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
 // REGISTERENSEIGNANT
        .addCase(RegisterEnseignantAction.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(RegisterEnseignantAction.fulfilled, (state, action) => {
        state.loading = false;
        state.CurrentUser = action.payload;
        state.error = false;
      })
      .addCase(RegisterEnseignantAction.rejected, (state, action) => {
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
        state.CurrentUser = action.payload.data || action.payload;
        state.error = false;
      })
      .addCase(FetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
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
      })

    .addCase(FetchAllUsers.pending, (state) => {
  state.loading = true;
  state.error = false;
})
.addCase(FetchAllUsers.fulfilled, (state, action) => {
  state.loading = false;
  state.users = action.payload; // <-- Tous les utilisateurs, pas seulement les collaborateur
  state.error = false;
})

.addCase(FetchAllUsers.rejected, (state, action) => {
  state.loading = false;
  state.error = true;
  state.errorMessage = action.payload;
  state.users = [];
})
      // CONFIRM USER (Activation du compte)
      .addCase(ConfirmUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.successMessage = null;
      })
      .addCase(ConfirmUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.successMessage = action.payload.message || "Compte activé avec succès ✅";

        // Mettre à jour la liste des utilisateurs si nécessaire
        state.users = state.users.map(user =>
          user.email === action.meta.arg ? { ...user, situation: "ACTIF" } : user
        );
      })
      .addCase(ConfirmUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload || "Erreur lors de l'activation ❌";
      })
      //addAdmin
      .addCase(AddAdmin.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.successMessage = null;
      })
      .addCase(AddAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.successMessage = action.payload.message || "Compte activé avec succès ✅";

        // Mettre à jour la liste des utilisateurs si nécessaire
        state.users = state.users.map(user =>
          user.email === action.meta.arg ? { ...user, situation: "ACTIF" } : user
        );
      })
      .addCase(AddAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload || "Erreur lors de l'activation ❌";
      });

  },
});

export default userSlice.reducer;
