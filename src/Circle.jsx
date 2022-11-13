import React from "react";
import "./Circle.css";

const Circle = (props) => {
  return (
    <button
      key={props.buttonKey}
      className="circle"
      onClick={props.clickHandler}
    >
      {props.buttonKey}
    </button>
  );
};

export default Circle;
