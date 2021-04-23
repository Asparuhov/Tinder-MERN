import React from "react";
import "./Profile";
function Profile() {
  return (
    <div className="profile">
      <h1>Profile page</h1>\
      <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
