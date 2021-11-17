import axios from "axios";
import { loginStart, loginSuccess, loginError } from "./authSlice";
import { registerStart, registerSuccess, registerError } from "./registerSlice";
// import {
//   fetchUserStart,
//   fetchUserSuccess,
//   fetchUserError,
//   updateUserStart,
//   updateUserSuccess,
//   updateUserError,
// } from "./userSlice";

import {
  fetchEventsStart,
  fetchEventsSuccess,
  fetchEventsError,
  addNewEventStart,
  addNewEventSuccess,
  addNewEventError,
  updateEventsStart,
  updateEventsSuccess,
  updateEventsError,
} from "./eventsSlice";

import {
  fetchDogStart,
  fetchDogSuccess,
  fetchDogError,
  addNewDogstart,
  addNewDogSuccess,
  addNewDogError,
  updateDogStartgsStart,
  updateDogSuccess,
  updateDogError,
} from "./dogSlice";

//login
export const login = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://django-dog-api.herokuapp.com/api/login/",
      user
    );
    dispatch(loginSuccess(res.data));
    localStorage.setItem("token", res.data.token);
    navigate("/");
  } catch (error) {
    dispatch(loginError());
  }
};

//register
export const register = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post("https://django-dog-api.herokuapp.com/api/register/", user);
    dispatch(registerSuccess(res.data));
    localStorage.setItem("token", res.data.token);
    navigate("/");
  } catch (error) {
    dispatch(registerError(error.message));
    console.log(error);
  }
};


//get events
export const fetchEvents = async (dispatch) => {
  dispatch(fetchEventsStart());
  try {
    const res = await axios.get(`https://django-dog-api.herokuapp.com/api/events/`);
    dispatch(fetchEventsSuccess(res.data));
  } catch (error) {
    dispatch(fetchEventsError(error.message));
    console.log(error);
  }
};

//get dogs
export const fetchDogs = async (dispatch) => {
  dispatch(fetchDogStart());
  try {
    const res = await axios.get(`https://django-dog-api.herokuapp.com/api/dogs/`);
    dispatch(fetchDogSuccess(res.data));
  } catch (error) {
    dispatch(fetchDogError(error.message));
    console.log(error);
  }
};

//add new dogs
export const addNewDog = async (dogs, dispatch) => {
  dispatch(addNewDogstart());
  try {
    const res = await axios.post(`https://django-dog-api.herokuapp.com/api/dogs/`, dogs);
    dispatch(addNewDogSuccess(res.data));
    const res1 = await axios.get(`https://django-dog-api.herokuapp.com/api/dogs/`);
    dispatch(fetchDogSuccess(res1.data));
  } catch (error) {
    dispatch(addNewDogError(error.message));
    console.log(error.response.data);
  }
};


//add new events
export const addNewEvent = async (events, dispatch) => {
  dispatch(addNewEventStart());
  try {
    const res = await axios.post(`https://django-dog-api.herokuapp.com/api/events/`, events);
    dispatch(addNewEventSuccess(res.data));
    const res1 = await axios.get(`https://django-dog-api.herokuapp.com/api/events/`);
    dispatch(fetchEventsSuccess(res1.data));
  } catch (error) {
    dispatch(addNewEventError(error.message));
    console.log(error.response.data);
  }
};

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