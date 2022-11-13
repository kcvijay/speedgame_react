import React, { Component } from "react";
import Header from "./Header";
import Circle from "./Circle";
import Buttons from "./Buttons";
import Footer from "./Footer";
import PopUp from "./PopUp";
import "./App.css";

class App extends Component {
  state = {
    score: 0,
    circles: [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }],
    active: 1,
    showScore: false,
  };

  randArray = [];

  makeRandom = () => {
    let random = Math.floor(Math.random() * 4) + 1;
    return random;
  };

  // Creating a unique number
  makeUniqueNum = () => {
    let newActive = this.makeRandom();
    if (this.state.active !== newActive) {
      this.setState({
        active: newActive,
      });
    } else return this.makeUniqueNum();
    console.log(this.state.active);
  };

  clickHandler = () => {
    this.setState({
      score: this.state.score + 1,
    });
  };

  randomNumHandler = () => {
    const rand = Math.floor(Math.random() * 4) + 1;
    const lastEl = this.randArray[this.randArray.length - 1];
    if (lastEl === rand) {
      this.randomNumHandler();
    } else {
      this.randArray.push(rand);
      console.log(this.randArray);
    }
  };

  closePopupHandler = () => {
    this.setState({
      showScore: !this.state.showScore,
    });
  };

  // addActiveClassHandler = () => {
  //   this.setState({
  //     active: this.randomNumHandler(),
  //   });
  // };

  render() {
    const circles = this.state.circles.map((circle, i) => {
      return (
        <Circle
          clickHandler={() => this.clickHandler(i)}
          buttonKey={circle.key}
          key={circle.key}
        />
      );
    });
    return (
      <div className="App">
        <Header score={this.state.score} />
        <div className="circles">{circles}</div>
        <Buttons startGame={this.makeUniqueNum} />
        <Footer />
        {this.state.showScore && (
          <PopUp
            closePopup={this.closePopupHandler}
            score={this.state.score}
            key={this.state.circles.key}
          />
        )}
      </div>
    );
  }
}

export default App;
