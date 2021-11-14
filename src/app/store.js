import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../redux/authSlice";
import registerReducer from "../redux/registerSlice";
import eventsReducer from "../redux/eventsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    events: eventsReducer,
  },
});
