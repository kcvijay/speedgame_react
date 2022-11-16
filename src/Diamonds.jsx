import React from "react";
import "./Diamonds.css";

const Diamonds = (props) => {
  return (
    <button
      className={`diamond ${props.active ? "active" : ""}`}
      onClick={props.clickHandler}
      disabled={props.buttonDisabled}
    ></button>
  );
};

export default Diamonds;
