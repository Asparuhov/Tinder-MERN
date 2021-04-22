import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Redirect } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Card from "./components/Card/Card";
import Register from "./components/Authentication/Register/Register";
import Login from "./components/Authentication/Login/Login";
import * as actions from "./actions/actions";
import axios from "axios";
import { connect } from "react-redux";
function App(props) {
  useEffect(() => {
    axios
      .get("user")
      .then((res) => {
        props.setCurrentUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact="/">
          {props.loggedIn ? (
            <div className="main_layout">
              <Header />
              <Card />
              <Footer />
            </div>
          ) : (
            <Redirect to="/login" />
          )}{" "}
        </Route>

        <Route path="/login" exact>
          {props.loggedIn === false ? <Login /> : <Redirect to="/" />}
        </Route>
        <Route path="/register" exact component={Register} />
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
