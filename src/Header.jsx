import React from "react";
import "./Header.css";

const Header = (props) => {
  return (
    <header>
      <h1>Speed Game</h1>
      <h3>
        Your Score: <span className="score">{props.score}</span>
      </h3>
    </header>
  );
};

export default Header;