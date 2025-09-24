import {  createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Récupérer toutes les notifications d’un étudiant
export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async (studentId) => {
    const res = await axios.get(`http://localhost:8085/notifications/student/${studentId}`);
    return res.data;
  }
);
export const markAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (notifId) => {
    const res = await axios.put(`http://localhost:8085/notifications/${notifId}/read`);
    return res.data;
  }
);