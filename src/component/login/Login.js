import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Login.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LockIcon from "@mui/icons-material/Lock";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { login } from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const token = localStorage.getItem('token');
  
  //ref for input
  const usr = useRef();
  const pw = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    setUsernameError(false);
    setUsernameErrorMessage("");

    setPasswordError(false);
    setPasswordErrorMessage("");

    if (username === "") {
      setUsernameError(true);
      setUsernameErrorMessage("Please fill in this field.");
    } else if (password === "") {
      setPasswordError(true);
      setPasswordErrorMessage("Please fill in this field.");
    } else {
      login({ username, password }, dispatch, navigate);

      // axios
      // .post("https://django-dog-api.herokuapp.com/api/login/", {
      //   username: username,
      //   password: password,
      // })
      // .then((res) => console.log(res.data.token))
      // .catch((error) => console.log(error));
    }
  };

  const adminLogin = () => {
    navigate("https://django-dog-api.herokuapp.com/admin/")
  };

  return (
    <div className="login">
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div className="login-title">
          <LockIcon />
          <h3>Sign in form</h3>
        </div>
        <div className="login-input">
          <TextField
            className="TextField"
            error={usernameError}
            helperText={usernameErrorMessage}
            label="username"
            onChange={(e) => setUsername(e.target.value)}
            ref={usr}
            required
            fullWidth
            variant="outlined"
            onFocus={() => (
              setUsernameError(false), setUsernameErrorMessage("")
            )}
          />
          <TextField
            className="TextField"
            error={passwordError}
            helperText={passwordErrorMessage}
            label="Password"
            minLength="5"
            onChange={(e) => setPassword(e.target.value)}
            ref={pw}
            required
            fullWidth
            type="password"
            variant="outlined"
            onFocus={() => (
              setPasswordError(false), setPasswordErrorMessage("")
            )}
          />
        </div>

        <Button type="submit" variant="contained" color="primary" size="large">
          {auth.isLoading ? (
            <CircularProgress
              size="30px"
              style={{ marginLeft: "10px" }}
              color="inherit"
            />
          ) : (
            "Sign In"
          )}
        </Button>
        <p>
              Forget password? <span className="forgetpw">Reset Now</span>
            </p>
        <p>
          Are you admin? <a className="admin" href="https://django-dog-api.herokuapp.com/admin/">Click here</a>
        </p>
        {auth.error && (
          <span style={{ paddingLeft: "15px", color: "tomato" }}>
            Wrong username or password!
          </span>
        )}
      </form>
    </div>
  );
}

export default Login;
