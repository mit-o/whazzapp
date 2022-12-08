import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../utils/api";

export const getConversations = createAsyncThunk(
  "chat/getConversations",
  async ({ accessToken }, thunkAPI) => {
    try {
      const res = await fetch(`${API_BASE_URL}/conversations/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();
      if (res.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const createConversation = createAsyncThunk(
  "chat/createConversation",
  async ({ users, accessToken }, thunkAPI) => {
    const body = JSON.stringify({
      users,
    });

    try {
      const res = await fetch(`${API_BASE_URL}/conversations/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body,
      });

      const data = await res.json();
      if (res.status === 201) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  activeChat: [],
  conversations: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createConversation.fulfilled, (state, action) => {
        state.conversations = [...state.conversations, action.payload];
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.conversations = action.payload;
      });
  },
});

export const selectActiveChat = (state) => state.chat.activeChat;

export const { setActiveChat } = chatSlice.actions;
export default chatSlice.reducer;
