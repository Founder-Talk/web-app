// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userslice";
import themeReducer from "../slice/themeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
});
