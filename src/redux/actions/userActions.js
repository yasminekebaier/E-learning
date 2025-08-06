import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

export const LoginAction = createAsyncThunk(
    "auth/login",
    async (formData, {}) => {
      try {
        console.log("[FRONT] LoginAction → Données envoyées :", formData);
        const response = await axios.post(
          "http://localhost:3000/Auth/SignIn",
          formData,
          {
            withCredentials: true,
          }
        );
        console.log("Data to dispatch", response.data);
        return response.data;
      } catch (error) {
        console.log("[FRONT] LoginAction → ERROR :", error?.response?.data || error.message);
        return isRejectedWithValue(error.message);
      }
    }
  );