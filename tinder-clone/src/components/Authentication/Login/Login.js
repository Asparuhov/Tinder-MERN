import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
const Login = (props) => {
  let [user, setUser] = useState({
    email: "",
    password: "",
  });
  let [feedback, setFeedback] = useState("");
  const login = () => {
    axios
      .post("login", user)
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken);
        if (res.data === "email") {
          setFeedback("email");
        } else if (res.data === "pass") {
          setFeedback("pass");
        } else {
          localStorage.setItem("token", res.data.accessToken);
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="Login">
      <h1>Login</h1>
      <input
        autoComplete="off"
        placeholder="email"
        type="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        autoComplete="off"
        placeholder="password"
        type="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      {feedback === "email" ? (
        <p style={{ color: "red" }}>Incorrect email</p>
      ) : null}
      {feedback === "pass" ? (
        <p style={{ color: "red" }}>Incorrect password</p>
      ) : null}
      <button onClick={login}>Login</button>
      <p>
        Don't have an account?
        <Link className="link" to="/register">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default Login;
