// src/redux/slice/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



// ───── Thunk to fetch user from token ─────
export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrent',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const { data } = await axios.get(`http://localhost:3000/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return data; // 👈 This is the user data saved to Redux
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// ───── Initial state ─────
const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  status: 'idle',
  error: null,
};

// ───── Slice ─────
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // ✅ save user to Redux
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setToken, clearUser } = userSlice.actions;
export default userSlice.reducer;

// ───── Selectors ─────
export const selectCurrentUser = (state) => state.user.user;
export const selectUserToken = (state) => state.user.token;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;
