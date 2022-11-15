import React from "react";
import "./Header.css";

const Header = (props) => {
  return (
    <header>
      <h1>Diamonds are Forever!</h1>
      <h2 className="lives">Lives:&nbsp;{props.lives}</h2>
      <h3 className="score-board">
        Your collection: <span className="score">{props.score}&nbsp;💎</span>
      </h3>
    </header>
  );
};

export default Header;
