import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeChat: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
  },
});

export const selectActiveChat = (state) => state.chat.activeChat;

export const { setActiveChat } = chatSlice.actions;
export default chatSlice.reducer;
