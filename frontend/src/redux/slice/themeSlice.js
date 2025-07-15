// src/redux/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const stored = localStorage.getItem('theme');        // "light" | "dark" | null
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const initialState = {
  mode: stored || (prefersDark ? 'dark' : 'light'),  // default
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', state.mode); // ✅ save to localStorage
    },
    setTheme(state, action) {
      state.mode = action.payload === 'dark' ? 'dark' : 'light';
      localStorage.setItem('theme', state.mode); // ✅ save to localStorage
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
