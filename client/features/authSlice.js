import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../utils/api";

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, confirmPassword }, thunkAPI) => {
    const body = JSON.stringify({
      email: email,
      password: password,
      confirm_password: confirmPassword,
    });

    try {
      const res = await fetch(`${API_BASE_URL}/register/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    const body = JSON.stringify({
      email,
      password,
    });

    try {
      const res = await fetch(`${API_BASE_URL}/token/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json();

      if (res.status === 200) {
        const accessToken = data.access;
        const { dispatch } = thunkAPI;
        dispatch(getUser(accessToken));

        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/user",
  async (accessToken, thunkAPI) => {
    if (!accessToken) {
      const state = thunkAPI.getState();
      accessToken = state.auth.tokens.access;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/users/me/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (res.status === 200) {
        return data;
      } else if (res.status === 401) {
        const { dispatch } = thunkAPI;
        const dispatchRefresh = dispatch(refreshToken());
        if (dispatchRefresh.fulfilled) {
          dispatch(getUser());
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const editUser = createAsyncThunk(
  "auth/editUser",
  async (accessToken, thunkAPI) => {
    if (!accessToken) {
      const state = thunkAPI.getState();
      accessToken = state.auth.tokens.access;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/users/me/`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (res.status === 200) {
        return data;
      } else if (res.status === 401) {
        const { dispatch } = thunkAPI;
        const dispatchRefresh = dispatch(refreshToken());
        if (dispatchRefresh.fulfilled) {
          dispatch(editUser());
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const refresh = state.auth.tokens.refresh;
  const body = JSON.stringify({ refresh });
  try {
    const res = await fetch(`${API_BASE_URL}/token/blacklist/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
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
});

export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const refresh = state.auth.tokens.refresh;
    const body = JSON.stringify({ refresh });
    try {
      const res = await fetch(`${API_BASE_URL}/token/refresh/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
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

const initialState = {
  isAuthenticated: false,
  user: null,
  tokens: null,
  loading: false,
  registered: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.registered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.registered = true;
        state.loading = false;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.tokens = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(editUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.tokens = null;
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.tokens = null;
        state.user = null;
      })
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.tokens = action.payload;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.loading = false;
        state.tokens = null;
        state.user = null;
      });
  },
});

export const { resetRegistered } = authSlice.actions;
export default authSlice.reducer;
