import { createSlice } from "@reduxjs/toolkit";
import { fetchMessages, sendMessage } from "../actions/ChatActions";

const initialState = {
  Messages: [],
  isFetching: false,
  error: null,
};

const chatSlice = createSlice({
  name: "Messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ➤ Fetch
      .addCase(fetchMessages.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.Messages = payload;
      })
      .addCase(fetchMessages.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })

      // ➤ Send
      .addCase(sendMessage.fulfilled, (state, { payload }) => {
        state.Messages.push(payload); // Ajouter direct le nouveau msg
      });
  },
});

export default chatSlice.reducer;
