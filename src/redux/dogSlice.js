import { createSlice } from "@reduxjs/toolkit";

export const dogsSlice = createSlice({
  name: "dogs",
  initialState: {
    dogsDetails: null,
    newDogsDetails: null,
    isLoading: false,
    error: false,
    success: false,
    successMessage: null,
  },

  reducers: {
    fetchDogStart: (state) => {
      state.isLoading = true;
    },
    fetchDogSuccess: (state, action) => {
      state.dogsDetails = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    fetchDogError: (state) => {
      state.error = true;
      state.isLoading = false;
    },
    addNewDogstart: (state, action) => {
      state.isLoading = true;
    },
    addNewDogSuccess: (state, action) => {
      state.isLoading = false;
      state.newDogsDetails = action.payload;
      state.error = false;
    },
    addNewDogError: (state, action) => {
      state.error = true;
      state.isLoading = false;
      state.error = action.payload;
    },
    updateDogStart: (state) => {
      state.isLoading = true;
      state.success = false;
    },
    updateDogSuccess: (state, action) => {
      state.isLoading = false;
      state.successMessage = action.payload;
      state.error = false;
      state.success = true;
    },
    updateDogError: (state, action) => {
      state.error = true;
      state.isLoading = false;
      state.success = false;
    },
  },
});

export const {
  fetchDogStart,
  fetchDogSuccess,
  fetchDogError,
  addNewDogstart,
  addNewDogSuccess,
  addNewDogError,
  updateDogStartgsStart,
  updateDogSuccess,
  updateDogError,
} = dogsSlice.actions;

export default dogsSlice.reducer;
