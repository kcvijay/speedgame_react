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
        <button className="reload-btn" onClick={props.reload}>
          Reload Game?
        </button>
      </div>
    </div>
  );
};

export default PopUp;
