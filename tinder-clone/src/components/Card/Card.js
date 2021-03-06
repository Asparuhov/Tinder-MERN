import React, { useState, useEffect, useMemo } from "react";
import "./Card.css";
import Xicon from "../../assets/Xicon.png";
import starIcon from "../../assets/starIcon.png";
import tickIcon from "../../assets/tickIcon.png";
import TinderCard from "react-tinder-card";
import chrisPhoto from "../../assets/Chris.jpg";
import daniPhoto from "../../assets/Dani.jpg";
import radiPhoto from "../../assets/Radi.jpg";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import axios from "axios";
const db = [
  {
    name: "Kristiyan Asparuhov",
    url: chrisPhoto,
  },
  {
    name: "Yordan Radoslavov",
    url: daniPhoto,
  },
  {
    name: "Radoslav Georgiev",
    url: radiPhoto,
  },
];
const alreadyRemoved = [];
let charactersState = db;
function Card(props) {
  const [characters, setCharacters] = useState(db);
  const [lastDirection, setLastDirection] = useState();
  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
    alreadyRemoved.push(nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
    charactersState = charactersState.filter(
      (character) => character.name !== name
    );
    setCharacters(charactersState);
  };

  const swipe = (dir) => {
    const cardsLeft = characters.filter(
      (person) => !alreadyRemoved.includes(person.name)
    );
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name; // Find the card object to be removed
      const index = db.map((person) => person.name).indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  };

  return (
    <div className="tinder_cards">
      <div className="cardContainer">
        {characters.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name)}
            onCardLeftScreen={() => outOfFrame(character.name)}
          >
            <div
              style={{ backgroundImage: "url(" + character.url + ")" }}
              className="card"
            />
          </TinderCard>
        ))}
      </div>
      <div className="footer">
        <img className="footer__icon" src={Xicon} alt="" />
        <img className="footer__icon" src={starIcon} alt="" />
        <img className="footer__icon" src={tickIcon} alt="" />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};
const toActions = (dispatch) => {
  return {
    loadUsers: (users) => dispatch(actions.loadUsers(users)),
    onSwipe: (direction, id) => dispatch(actions.onSwipe(direction, id)),
  };
};
export default connect(mapStateToProps, toActions)(Card);
