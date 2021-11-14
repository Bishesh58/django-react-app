import { createSlice } from "@reduxjs/toolkit";

export const eventsSlice = createSlice({
  name: "events",
  initialState: {
    eventsDetails: null,
    newEventDetails: null,
    isLoading: false,
    error: false,
    success: false,
    successMessage: null,
  },

  reducers: {
    fetchEventsStart: (state) => {
      state.isLoading = true;
    },
    fetchEventsSuccess: (state, action) => {
      state.eventsDetails = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    fetchEventsError: (state) => {
      state.error = true;
      state.isLoading = false;
    },
    addNewEventStart: (state, action) => {
      state.isLoading = true;
    },
    addNewEventSuccess: (state, action) => {
      state.isLoading = false;
      state.newEventDetails = action.payload;
      state.error = false;
    },
    addNewEventError: (state, action) => {
      state.error = true;
      state.isLoading = false;
      state.error = action.payload;
    },
    updateEventsStart: (state) => {
      state.isLoading = true;
      state.success = false;
    },
    updateEventsSuccess: (state, action) => {
      state.isLoading = false;
      state.successMessage = action.payload;
      state.error = false;
      state.success = true;
    },
    updateEventsError: (state, action) => {
      state.error = true;
      state.isLoading = false;
      state.success = false;
    },
  },
});

export const {
  fetchEventsStart,
  fetchEventsSuccess,
  fetchEventsError,
  addNewEventStart,
  addNewEventSuccess,
  addNewEventError,
  updateEventsStart,
  updateEventsSuccess,
  updateEventsError,
} = eventsSlice.actions;

export default eventsSlice.reducer;