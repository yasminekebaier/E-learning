import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

export const RegisterAction = createAsyncThunk(
    "auth/register",
    async (formData, {}) => {
      try {
        console.log("[FRONT] LoginAction → Données envoyées :", formData);
        const response = await axios.post(
          "http://localhost:8085/User/registerStudent",
          formData
    
        );
        console.log("Data to dispatch", response.data);
        return response.data;
      } catch (error) {
        console.log("[FRONT] LoginAction → ERROR :", error?.response?.data || error.message);
        return isRejectedWithValue(error.message);
      }
    }
  );

export const LoginAction = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("[FRONT] LoginAction → Données envoyées :", formData);
      const response = await axios.post(
        "http://localhost:8085/auth/signin",
      formData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log("Data to dispatch", response.data);
      return response.data;
    } catch (error) {
      console.log("[FRONT] LoginAction → ERROR :", error?.response?.data || error.message);
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);
export const FetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = localStorage.getItem("token");
      const userId = state.user.CurrentUser?.id; // récupère l'ID de l'utilisateur connecté

      if (!userId) {
        return rejectWithValue("Utilisateur non connecté");
      }

      const response = await axios.get(
        `http://localhost:8085/User/getone/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Impossible de récupérer le profil.";
      return rejectWithValue(errorMessage);
    }
  }
);

 export const LogoutAction = createAsyncThunk(
      "user/logout",
      async (_, { rejectWithValue }) => {
        try {
          const token = localStorage.getItem("token");
          console.log("📌 Token envoyé pour le logout:", token);
          const response = await axios.get("http://localhost:8085/auth/signout", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        
        );
          return response.data;
        } catch (error) {
          return rejectWithValue(error.response?.data?.message || error.message);
        }
      }
    );
     export const ConfirmUser = createAsyncThunk(
      "user/logout",
      async (_, { rejectWithValue }) => {
        try {
          const token = localStorage.getItem("token");
          console.log("📌 Token envoyé pour le logout:", token);
          const response = await axios.get("http://localhost:8085/User/confirm?email=testensignant@gmail.com", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        
        );
          return response.data;
        } catch (error) {
          return rejectWithValue(error.response?.data?.message || error.message);
        }
      }
    );


