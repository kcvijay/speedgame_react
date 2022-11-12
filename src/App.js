import React, { Component } from "react";
import Header from "./Header";
import Circle from "./Circle";
import Footer from "./Footer";
import PopUp from "./PopUp";
import "./App.css";

class App extends Component {
  state = {
    score: 0,
    circles: [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }],
    showScore: false,
  };

  clickHandler = () => {
    this.setState({
      score: this.state.score + 1,
    });
    this.randomNumHandler();
    console.log(this.randomNumHandler());
  };

  randomNumHandler = () => {
    const rand = Math.floor(Math.random() * 4);
    return rand;
  };

  closePopupHandler = () => {
    this.setState({
      showScore: !this.state.showScore,
    });
  };

  render() {
    const circles = this.state.circles.map((circle) => {
      return (
        <Circle click={() => this.clickHandler()} buttonKey={circle.key} />
      );
    });
    return (
      <div className="App">
        <Header score={this.state.score} />
        <div className="circles">{circles}</div>
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
