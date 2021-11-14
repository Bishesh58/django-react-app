import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./component/login/Login";
import Register from "./component/Register/Register";
import Home from "./component/Home/Home";
import Navbar from "./component/Navbar/Navbar";
import Footer from "./component/Footer/Footer";
import Profile from "./component/Profile/Profile";
import { useSelector } from "react-redux";

function App() {
  const { authToken } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={authToken || token ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Register />} exact />
          <Route path="/profile" element={<Profile />} exact />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
