import React from "react";
import "./PopUp.css";

const PopUp = (props) => {
  return (
    <div className="overlay">
      <div className="final-score">
        <p className="close-popup" onClick={props.closePopup}>
          X
        </p>
        <h3>Your Current Score is {props.score}.</h3>
      </div>
    </div>
  );
};

export default PopUp;
