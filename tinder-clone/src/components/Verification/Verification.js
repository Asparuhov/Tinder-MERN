import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Verification.css";
import placeHolder from "../../assets/placeholder.jpg";
import axios from "axios";
import * as actions from "../../actions/actions";
function Verification(props) {
  const [image, setImage] = useState(null);
  const [allowed, setAllowed] = useState(false);
  const loadImage = (file) => {
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setImage([reader.result]);
    }.bind(this);
    console.log(url);
  };

  const verify = (id) => {
    if (image) {
      axios
        .post("verify", { id })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      axios
        .post("resetUser", { id })
        .then((res) => {
          props.setCurrentUser(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="verification_page">
      <h1
        style={{
          color: "orange",
          fontSize: "75px",
          textAlign: "center",
          marginBottom: "35px",
        }}
      >
        Welcome
      </h1>
      <p
        style={{
          color: "orange",
          fontSize: "40px",
          textAlign: "center",
          marginBottom: "35px",
        }}
      >
        Please finish your account setup before you continue forwards:
      </p>

      <h2
        style={{
          color: "orange",
          fontSize: "40px",
          textAlign: "center",
          marginBottom: "35px",
        }}
      >
        Upload an image:
      </h2>

      {image ? (
        <img src={image} alt="default" className="verify_image" />
      ) : (
        <img src={placeHolder} alt="placeholder" className="verify_image" />
      )}

      <input
        className="custom-file-input"
        id="file"
        type="file"
        name="image"
        onChange={(e) => loadImage(e.target.files[0])}
      />
      <label for="file">Select file</label>
      <button id="verify_button" onClick={() => verify(props.user._id)}>
        Verify!
      </button>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.currentUser,
  };
};
const toActions = (dispatch) => {
  return {
    verify: () => dispatch({ type: "VERIFY" }),
    setCurrentUser: (user) => dispatch(actions.setCurrentUser(user)),
  };
};
export default connect(mapStateToProps, toActions)(Verification);
