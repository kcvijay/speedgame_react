import React from "react";
import "./PopUp.css";

const PopUp = (props) => {
  return (
    <div className="overlay">
      <div className="final-score">
        <p className="close-popup" onClick={props.closePopup}>
          X
        </p>
        <p>Your Final Score is: {props.score}</p>
      </div>
    </div>
  );
};

export default PopUp;
