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
        <p>Reload Game?</p>
        <div className="btns">
          <button className="reload-btn" onClick={props.reload}>
            Yes
            <span className="tooltip-msg">
              Warning! Your scores and lives will be restored.
            </span>
          </button>
          <button className="cancel-btn" onClick={props.cancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
