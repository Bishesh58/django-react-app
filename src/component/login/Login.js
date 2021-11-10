import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Login.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LockIcon from "@mui/icons-material/Lock";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const dispatch = useDispatch();

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
      //login({ username, password }, dispatch, history);
      console.log("submitted-->");
    }
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

        <Button variant="contained" color="success" size="large">
          Login
          {/* {auth.isLoading ? <CircularProgress size="30px" /> : "Sign In"} */}
        </Button>
      </form>
      {/* {auth.error && (
            <span style={{ paddingLeft: "15px", color: "orange" }}>
              Wrong username or password!
            </span>
          )} */}
    </div>
  );
}

export default Login;
