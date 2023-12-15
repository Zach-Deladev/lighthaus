import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth/authSlice";
import apiSlice from "../slices/auth/apiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;