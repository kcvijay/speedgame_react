import React from "react";
import "./Buttons.css";

const Button = (props) => {
  return <button className="btn">{props.btnName}</button>;
};

export default Button;
