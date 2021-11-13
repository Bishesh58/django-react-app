import { loginStart, loginSuccess, loginError } from "./authSlice";
import axios from "axios";

//import { registerStart, registerSuccess, registerError } from "./registerSlice";
// import {
//   fetchUserStart,
//   fetchUserSuccess,
//   fetchUserError,
//   updateUserStart,
//   updateUserSuccess,
//   updateUserError,
// } from "./userSlice";

// import {
//   fetchEventsStart,
//   fetchEventsSuccess,
//   fetchEventsError,
//   addNewEventStart,
//   addNewEventSuccess,
//   addNewEventError,
//   updateEventsStart,
//   updateEventsSuccess,
//   updateEventsError,
// } from "./eventsSlice";

//login
export const login = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://django-dog-api.herokuapp.com/api/login/",
      user
    );
    dispatch(loginSuccess(res.data));
    localStorage.setItem('token', res.data.token)
    navigate("/");
  } catch (error) {
    dispatch(loginError());
  }
};

// //register
// export const register = async (user, dispatch, history) => {
//   dispatch(registerStart());
//   try {
//     const res = await axios.post("/api/users/register", user);
//     dispatch(registerSuccess(res.data));
//     history.push("/login");
//   } catch (error) {
//     dispatch(registerError(error.message));
//     console.log(error);
//   }
// };

// //get user
// export const fetchUser = async (dispatch, id) => {
//   dispatch(fetchUserStart());
//   try {
//     const res = await axios.get(`/api/users/${id}`);
//     dispatch(fetchUserSuccess(res.data));
//   } catch (error) {
//     dispatch(fetchUserError(error.message));
//     console.log(error);
//   }
// };

// //update user
// export const updateUser = async (user, dispatch, history, id) => {
//   dispatch(updateUserStart());
//   try {
//     const res = await axios.patch(`/api/users/${id}`, user);
//     dispatch(updateUserSuccess(res.data));
//     history.push("/profile");

//     const res1 = await axios.get(`/api/users/${id}`);
//     dispatch(fetchUserSuccess(res1.data));
//   } catch (error) {
//     dispatch(updateUserError(error.message));
//     console.log(error);
//   }
// };

// //get events
// export const fetchEvents = async (dispatch) => {
//   dispatch(fetchEventsStart());
//   try {
//     const res = await axios.get(`/api/events/`);
//     dispatch(fetchEventsSuccess(res.data));
//   } catch (error) {
//     dispatch(fetchEventsError(error.message));
//     console.log(error);
//   }
// };

// //add new events
// export const addNewEvent = async (events, dispatch) => {
//   dispatch(addNewEventStart());
//   try {
//     const res = await axios.post(`/api/events/`, events);
//     dispatch(addNewEventSuccess(res.data));
//     const res1 = await axios.get(`/api/events/`);
//     dispatch(fetchEventsSuccess(res1.data));
//   } catch (error) {
//     dispatch(addNewEventError(error.message));
//     console.log(error.response.data);
//   }
// };

// //update events
// export const updateEvent = async (events, dispatch, id) => {
//   dispatch(updateEventsStart());
//   try {
//     const res = await axios.patch(`/api/events/${id}`, events);
//     dispatch(updateEventsSuccess(res.data));
//     const res1 = await axios.get(`/api/events/`);
//     dispatch(fetchEventsSuccess(res1.data));
//   } catch (error) {
//     dispatch(updateEventsError(error.message));
//     console.log(error.response.data);
//   }
// };
