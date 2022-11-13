import React from "react";
import "./Buttons.css";

const Buttons = (props) => {
  return (
    <div className="buttons">
      <button className="start" onClick={props.startGame}>
        Start Game
      </button>
      <button className="stop">Stop Game</button>
    </div>
  );
};

export default Buttons;
