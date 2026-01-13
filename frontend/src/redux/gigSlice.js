import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../services/authApi";
import { saveToken, removeToken } from "../utils/localStorage";

export const loginUser = createAsyncThunk("user/login", async (payload) => {
  const res = await authApi.login(payload);
  saveToken(res.token);
  return res;
});

export const registerUser = createAsyncThunk("user/register", async (payload) => {
  const res = await authApi.register(payload);
  return res;
});

export const logoutUser = createAsyncThunk("user/logout", async () => {
  removeToken();
  return null;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
      });
  },
});

export default userSlice.reducer;
