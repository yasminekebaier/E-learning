import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import qs from "qs"; // npm install qs
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
        qs.stringify({
          username: formData.username,
          password: formData.password
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
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
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                "http://localhost:8085/User/getone/",
                {
                    withCredentials: true,
                }
            );
         
            return response.data;
        } catch (error) {
            // Rejeter avec un message d'erreur clair en cas d'échec
            const errorMessage = error.response?.data?.message || "Impossible de récupérer le profil.";
            return rejectWithValue(errorMessage);
        }
    }
);
 export const LogoutAction = createAsyncThunk(
      "user/logout",
      async (_, { rejectWithValue }) => {
        try {
          const token = localStorage.getItem("token");
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


