import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Register.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LockIcon from "@mui/icons-material/Lock";
import CircularProgress from "@mui/material/CircularProgress";
import validator from "validator";
import { register } from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");

  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newUser = useSelector((state) => state.register);

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
    }
    else if (firstName === "") {
      setFirstNameError(true);
      setFirstNameErrorMessage("Please fill in this field.");
    } 
    else if (lastName === "") {
      setLastNameError(true);
      setLastNameErrorMessage("Please fill in this field.");
    }else if (email === "") {
      setEmailError(true);
      setEmailErrorMessage("Please fill in this field.");
    } else if (!validator.isEmail(email)) {
      setEmailError(true);
      setEmailErrorMessage("Email is not valid");
    } else if (password === "") {
      setPasswordError(true);
      setPasswordErrorMessage("Please fill in this field.");
    } else if (confirmPassword === "") {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("Please fill in this field.");
    } else if (password !== confirmPassword) {
      alert("Passwords don't match");
    } else {
      register(
        {
          username,
          first_name: firstName,
          last_name : lastName,
          email,
          password,
        },
        dispatch,
        navigate
      );
    }
  };

  return (
    <div className="register">
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div className="register-title">
          <LockIcon />
          <h3>Sign up form</h3>
        </div>
        <div className="register-input">
          <TextField
            className="TextField"
            error={usernameError}
            helperText={usernameErrorMessage}
            label="Username"
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
            error={firstNameError}
            helperText={firstNameErrorMessage}
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            ref={usr}
            required
            fullWidth
            variant="outlined"
            onFocus={() => (
              setFirstNameError(false), setFirstNameErrorMessage("")
            )}
          />
          <TextField
            className="TextField"
            error={lastNameError}
            helperText={lastNameErrorMessage}
            label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            ref={usr}
            required
            fullWidth
            variant="outlined"
            onFocus={() => (
              setLastNameError(false), setLastNameErrorMessage("")
            )}
          />
         
          <TextField
            className="TextField"
            error={emailError}
            fullWidth
            helperText={emailErrorMessage}
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            value={email}
            variant="outlined"
            onKeyPress={() =>
              validator.isEmail(email)
                ? setEmailErrorMessage("")
                : setEmailErrorMessage("Not a valid email!")
            }
            onFocus={() => (setEmailError(false), setEmailErrorMessage(""))}
          />
          <TextField
            className="TextField"
            error={passwordError}
            fullWidth
            helperText={passwordErrorMessage}
            label="Password"
            minLength="5"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            ref={pw}
            type="password"
            variant="outlined"
            onFocus={() => (
              setPasswordError(false), setPasswordErrorMessage("")
            )}
          />
          <TextField
            className="TextField"
            error={confirmPasswordError}
            fullWidth
            helperText={confirmPasswordErrorMessage}
            label="Confirm Password"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            type="password"
            variant="outlined"
            onFocus={() => (
              setConfirmPasswordError(false), setConfirmPasswordErrorMessage("")
            )}
          />
        </div>

        <Button type="submit" variant="contained" color="success" size="large">
          {newUser.isLoading ? <CircularProgress size="30px" /> : "Sign up"}
        </Button>
        {newUser.error && (
        <span
          style={{
            color: "tomato",
            display: "block",
            fontSize: "1.25rem",
            margin: "0.75rem",
            textAlign: "center",
          }}
        >
          Something went wrong, Try again!
        </span>
      )}
      </form>
      
    </div>
  );
}

export default Register;
