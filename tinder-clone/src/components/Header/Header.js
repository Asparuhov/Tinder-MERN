import React, { useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import fireIcon from "../../assets/fireIcon.png";
import ChatIcon from "@material-ui/icons/Chat";
import { Link } from "react-router-dom";
import Profile from "../Profile/Profile";
import Card from "../Card/Card";
import "./Header.css";
function Header() {
  const [currentPage, setCurrentPage] = useState("main");
  return (
    <>
      <div className="header">
        <IconButton onClick={() => setCurrentPage("profile")}>
          <PersonIcon fontSize="large" className="header__icon" />
        </IconButton>
        <img
          className="header__icon"
          src={fireIcon}
          onClick={() => setCurrentPage("main")}
        />
        <IconButton onClick={() => setCurrentPage("messages")}>
          <ChatIcon fontSize="large" className="header__icon" />
        </IconButton>
      </div>
      <div className="page">
        {currentPage === "profile" ? <Profile /> : null}
        {currentPage === "main" ? <Card /> : null}
        {currentPage === "messages" ? <h1>messages</h1> : null}
      </div>
    </>
  );
}

export default Header;
