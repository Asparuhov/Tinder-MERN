import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
const Register = (props) => {
  const emailValidationRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const passwordValidationRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  let [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  let [feedback, setFeedback] = useState("");
  let [errorHandler, setErrorHandler] = useState(null);
  const register = () => {
    axios
      .post("/register", user)
      .then((res) => {
        if (res.data === "success") {
          setFeedback("success");
          setErrorHandler(null);
        } else {
          setFeedback("bad");
          setErrorHandler(null);
        }
      })
      .catch((err) => console.log(err));
  };
  const validateUsername = (username) => {
    if (username.length > 4) {
      register();
    } else {
      setErrorHandler("name");
    }
  };
  const validatePassword = (password, username) => {
    if (passwordValidationRegex.test(password)) {
      validateUsername(username);
    } else {
      setErrorHandler("pass");
    }
  };
  const validateEmail = (email, password, username) => {
    if (emailValidationRegex.test(email)) {
      validatePassword(password, username);
    } else {
      setErrorHandler("email");
    }
  };
  return (
    <div className="Register">
      <h1>Register</h1>
      <input
        placeholder="nickname"
        type="text"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      {errorHandler === "name" ? (
        <p
          style={{
            color: "red",
            wordBreak: "break-all",
            fontSize: "13px",
            textAlign: "center",
            padding: "10px",
          }}
        >
          Username needs to be more than 4 characters long.
        </p>
      ) : null}
      <input
        placeholder="email"
        type="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      {errorHandler === "email" ? (
        <p style={{ color: "red" }}>Unvalid email format.</p>
      ) : null}
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      {errorHandler === "pass" ? (
        <p
          style={{
            color: "red",
            wordBreak: "break-all",
            fontSize: "13px",
            textAlign: "center",
            padding: "10px",
          }}
        >
          Password should include lower case letter, upper case letter and a
          number
        </p>
      ) : null}
      {feedback === "success" ? <Redirect to="/login" /> : null}
      {feedback === "bad" ? (
        <p style={{ color: "red" }}>
          Email already registered, try another one
        </p>
      ) : null}
      <button
        onClick={() =>
          validateEmail(user.email, user.password, user.username, user.image)
        }
      >
        Register
      </button>
      <p>
        Already registered?
        <Link className="link" to="/login">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
