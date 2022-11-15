import React, { Component } from "react";
import Header from "./Header";
import Circle from "./Circle";
import Buttons from "./Buttons";
import Footer from "./Footer";
import PopUp from "./PopUp";
import "./App.css";

// import click from /*files*/

// let clickSound = new Audio(click)

class App extends Component {
  state = {
    score: 0,
    lives: 5,
    circles: [1, 2, 3, 4],
    active: undefined,
    pace: 1000,
    showScore: false,
  };

  timer;

  makeRandom = (min, max) => {
    let random = Math.floor(Math.random() * (max - min));
    return random;
  };

  //MArgits code

  // nextCircle = () => {
  //   let nextActiveNum;

  //   do {
  //     nextActiveNum = this.makeRandom();
  //   } while (nextActiveNum === this.state.active);

  //   this.setState({
  //     active: nextActiveNum,
  //   });

  //   this.timer = setTimeout(this.nextCircle, 1000);
  // };

  // startHandler = () => {
  //   this.nextCircle();
  // };

  // Creating a unique number
  newActiveHandler = () => {
    let newActive = this.makeRandom(0, this.state.circles.length);
    if (this.state.active !== newActive) {
      this.setState({
        active: newActive,
        pace: this.state.pace * 0.99,
      });
    } else return this.newActiveHandler();

    this.timer = setTimeout(() => {
      this.newActiveHandler();
    }, this.state.pace);

    if (this.state.lives < 1) {
      this.stopGameHandler();
      this.popupHandler();
    }
  };

  stopGameHandler = () => {
    clearTimeout(this.timer);
    this.popupHandler();
  };

  clickHandler = (i) => {
    // clickSound.play();
    // if correct button clicking, score adds by 1, else lives reduces by 1. on all lives reduced, score popup opens.
    if (i === this.state.active) {
      this.setState({
        score: this.state.score + 1,
      });
    } else {
      this.setState({
        lives: this.state.lives - 1,
      });
    }
  };

  popupHandler = () => {
    this.setState({
      showScore: !this.state.showScore,
    });
  };

  reloadGame = () => {
    window.location.reload();
  };

  render() {
    const circles = this.state.circles.map((circle, i) => {
      return (
        <Circle
          clickHandler={() => this.clickHandler(i)}
          key={i}
          id={i + 1}
          active={this.state.active === i}
        />
      );
    });

    return (
      <div className="App">
        <Header score={this.state.score} lives={this.state.lives} />
        <div className="circles">{circles}</div>
        <Buttons
          startGame={this.newActiveHandler}
          endGame={this.stopGameHandler}
        />
        <Footer />
        {this.state.showScore && (
          <PopUp
            closePopup={this.popupHandler}
            score={this.state.score}
            key={this.state.circles.key}
            reload={this.reloadGame}
            cancel={this.popupHandler}
          />
        )}
      </div>
    );
  }
}

export default App;
