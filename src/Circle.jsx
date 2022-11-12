import React from "react";
import "./Circle.css";

const Circle = (props) => {
  return <button onClick={props.click}>{props.buttonKey}</button>;
};

export default Circle;
