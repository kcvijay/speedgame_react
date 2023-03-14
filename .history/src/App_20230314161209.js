import React, { Component } from "react";
import Header from "./Header";
import Diamonds from "./Diamonds";
import Footer from "./Footer";
import PopUp from "./PopUp";
import click from "./Assets/diamond-click.mp3";
import "./App.css";

let clickSound = new Audio(click);

class App extends Component {
  state = {
    score: 0,
    lives: 3,
    diamonds: [1, 2, 3, 4],
    active: undefined,
    pace: 1000,
    showScore: false,
    gameActive: false,
    buttonDisabled: true,
    audioMuted: false,
  };

  timer;

  // Function for mute and unmute audio.
  audioMuteHandler = () => {
    this.setState({
      audioMuted: !this.state.audioMuted,
    });
    clickSound.muted = !this.state.audioMuted;
  };

  makeRandom = (min, max) => {
    let random = Math.floor(Math.random() * (max - min));
    return random;
  };

  // Creating a unique number every moment
  newActiveHandler = () => {
    let newActive = this.makeRandom(0, this.state.diamonds.length);
    if (this.state.active !== newActive) {
      this.setState({
        active: newActive,
        pace: this.state.pace * 0.97, // speed increases by 3%
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
  // if correct button clicking, score adds by 1, else lives reduces by 1. On all lives reduced, score popup opens.
  clickHandler = (i) => {
    if (i === this.state.active) {
      this.setState({
        score: this.state.score + 1,
      });
      clickSound.play();
    } else {
      this.setState({
        lives: this.state.lives - 1,
      });
    }

    //As a challenge, if score is equal or more than 15, diamonds increase to 5.
    if (this.state.score >= 15) {
      this.setState({
        diamonds: [1, 2, 3, 4, 5],
      });
    }
  };

  // Score shows as popup on both game ending plus clicking 'stop game' button
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

  // Game starts..Game active is 'true' and button disabling 'false' on game start.
  startGameHandler = () => {
    this.newActiveHandler();
    this.setState({
      gameActive: !this.state.gameActive,
      buttonDisabled: !this.state.buttonDisabled,
    });
  };

  // Game ends..Repetitive active diamonds are disabled, score popup opens and game activeness is reversed.
  stopGameHandler = () => {
    clearTimeout(this.timer);
    this.popupHandler();
    this.setState({
      gameActive: !this.state.gameActive,
    });
  };

  render() {
    const diamonds = this.state.diamonds.map((diamond, i) => {
      return (
        <Diamonds
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
        <Header
          score={this.state.score}
          lives={this.state.lives}
          audioMute={this.audioSoundHandler}
        />
        <div className="mute-unmute">
          {!this.state.audioMuted ? (
            <button onClick={this.audioMuteHandler} className="mute">
              🔈<span class="tooltip">Mute Audio</span>
            </button>
          ) : (
            <button onClick={this.audioMuteHandler} className="unmute">
              🔇 <span class="tooltip">Unmute Audio</span>
            </button>
          )}
        </div>
        <div className="diamonds">{diamonds}</div>
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
            key={this.state.diamonds.key}
            greeting={
              this.state.score === 0
                ? `Too bad. You collected nothing.`
                : this.state.score === 1
                ? `Not too bad. You collected one diamond.`
                : `Oh Congrats! You collected ${this.state.score} diamonds!`
            }
          />
        )}
      </div>
    );
  }
}

export default App;
