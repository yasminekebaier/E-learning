import { createSlice } from "@reduxjs/toolkit";
import { fetchNotifications, markAsRead } from "../actions/NotificationAction";

const notifSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [],
    loading: false,
    error: null,
    unreadCount: 0,
  },
  reducers: {
    clearNotifications: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
     .addCase(fetchNotifications.fulfilled, (state, action) => {
  state.loading = false;
  state.items = action.payload;
  state.unreadCount = action.payload.filter((n) => !n.read).length;
})

      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
       .addCase(markAsRead.fulfilled, (state, action) => {
        const index = state.items.findIndex((n) => n.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        state.unreadCount = state.items.filter((n) => !n.read).length;
      });
  },
});

export const { clearNotifications } = notifSlice.actions;
export default notifSlice.reducer;