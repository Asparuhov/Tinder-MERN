import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Redirect } from "react-router-dom";

import Register from "./components/Authentication/Register/Register";
import Login from "./components/Authentication/Login/Login";
import * as actions from "./actions/actions";
import axios from "axios";
import { connect } from "react-redux";
import Profile from "./components/Profile/Profile";
import Header from "./components/Header/Header";
import Verification from "./components/Verification/Verification";
function App(props) {
  useEffect(() => {
    axios
      .get("user")

      .then((res) => {
        props.setCurrentUser(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    console.log(props.loggedIn);
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          {props.loggedIn && props.currentUser.verified ? <Header /> : null}
          {props.loggedIn && !props.currentUser.verified ? (
            <Redirect to="/verification" />
          ) : null}
          {props.loggedIn === false ? <Redirect to="/login" /> : null}
        </Route>
        <Route exact path="/verification">
          {props.loggedIn && !props.currentUser.verified ? (
            <Verification />
          ) : null}
          {props.loggedIn && props.currentUser.verified ? (
            <Redirect to="/" />
          ) : null}
          {!props.loggedIn ? <Redirect to="/login" /> : null}
        </Route>

        <Route path="/login" exact>
          {props.loggedIn && props.currentUser.verified ? <Header /> : null}
          {props.loggedIn && !props.currentUser.verified ? (
            <Redirect to="/verification" />
          ) : null}
          {!props.loggedIn  ? <Login /> : null}
        </Route>
        <Route path="/register" exact component={Register} />
        <Route path="/profile" exact component={Profile} />
      </BrowserRouter>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    loggedIn: state.loggedIn,
  };
};
const toActions = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(actions.setCurrentUser(user)),
  };
};
export default connect(mapStateToProps, toActions)(App);
