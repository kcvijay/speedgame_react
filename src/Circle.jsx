import React from "react";
import "./Circle.css";

const Circle = (props) => {
  return (
    <button
      className={`circle ${props.active ? "active" : ""}`}
      onClick={props.clickHandler}
    ></button>
  );
};

export default Circle;
