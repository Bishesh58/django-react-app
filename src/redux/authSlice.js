import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authToken: null,
    isLoading: false,
    error: false,
    errorMessage: null,
  },

  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.authToken = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    loginError: (state, action) => {
      state.errorMessage = action.payload;
      state.error = true;
      state.isLoading = false;
      
    },
    logout: (state) => {
      state.authToken = null;
    },
  },
});

export const { loginStart, loginSuccess, loginError, logout } =
  authSlice.actions;

export default authSlice.reducer;