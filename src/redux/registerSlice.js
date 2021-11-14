import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    newUser: null,
    isLoading: false,
    error: false,
    errorMessage : null,
  },

  reducers: {
    registerStart: (state) => {
      state.isLoading = true;
    },
    registerSuccess: (state, action) => {
        state.isLoading = false;
        state.newUser = action.payload;
        state.error = false;
    },
      registerError: (state, action) => {
        state.error = true;
        state.isLoading = false;
        state.errorMessage = action.payload;
      },
  },
});

export const {registerStart,registerSuccess,registerError} = registerSlice.actions;

export default registerSlice.reducer;