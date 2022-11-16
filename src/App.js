import React, { Component } from "react";
import Header from "./Header";
import Circle from "./Circle";
import Footer from "./Footer";
import PopUp from "./PopUp";
import click from "./Assets/diamond-click.mp3";
import "./App.css";

// import click from /*files*/

let clickSound = new Audio(click);

class App extends Component {
  state = {
    score: 0,
    lives: 3,
    circles: [1, 2, 3, 4],
    active: undefined,
    pace: 1000,
    showScore: false,
    gameActive: false,
    buttonDisabled: true,
  };

  timer;

  makeRandom = (min, max) => {
    let random = Math.floor(Math.random() * (max - min));
    return random;
  };

  // Creating a unique number every moment
  newActiveHandler = () => {
    let newActive = this.makeRandom(0, this.state.circles.length);
    if (this.state.active !== newActive) {
      this.setState({
        active: newActive,
        pace: this.state.pace * 0.97,
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

  //Actions on clicking correct and incorrect diamonds
  clickHandler = (i) => {
    // if correct button clicking, score adds by 1, else lives reduces by 1. on all lives reduced, score popup opens.
    clickSound.play();
    if (i === this.state.active) {
      this.setState({
        score: this.state.score + 1,
      });
    } else {
      this.setState({
        lives: this.state.lives - 1,
      });
    }

    //As a challenge, if score is equal or more than 15, diamonds increase to 5.
    if (this.state.score >= 15) {
      this.setState({
        circles: [1, 2, 3, 4, 5],
      });
    }
  };

  // Score shows as popup
  popupHandler = () => {
    this.setState({
      showScore: !this.state.showScore,
    });
  };

  // Game reloads
  reloadGame = () => {
    this.popupHandler();
    window.location.reload();
  };

  // Game starts
  startGameHandler = () => {
    this.newActiveHandler();
    this.setState({
      gameActive: !this.state.gameActive,
      buttonDisabled: !this.state.buttonDisabled,
    });
  };

  // Game ends
  stopGameHandler = () => {
    clearTimeout(this.timer);
    this.popupHandler();
    this.setState({
      gameActive: !this.state.gameActive,
    });
  };

  render() {
    const circles = this.state.circles.map((circle, i) => {
      return (
        <Circle
          clickHandler={() => this.clickHandler(i)}
          key={i}
          id={i + 1}
          active={this.state.active === i}
          buttonDisabled={this.state.buttonDisabled}
        />
      );
    });

    return (
      <div className="App">
        <Header score={this.state.score} lives={this.state.lives} />
        <div className="circles">{circles}</div>
        <div className="buttons">
          {this.state.gameActive ? (
            <button onClick={this.stopGameHandler} className="btn">
              Stop Game
            </button>
          ) : (
            <button onClick={this.startGameHandler} className="btn">
              Start Game
            </button>
          )}
        </div>
        <Footer />
        {this.state.showScore && (
          <PopUp
            closePopup={this.reloadGame}
            score={this.state.score}
            key={this.state.circles.key}
            greeting={
              this.state.score <= 15
                ? `Poor you! You collected only ${this.state.score} diamonds.`
                : `Oh Congrats! You collected ${this.state.score} diamonds!`
            }
          />
        )}
      </div>
    );
  }
}

export default App;

//Margits code

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
