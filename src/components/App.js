import React, { Component, useState } from "react";
import "../styles/App.css";
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.keyDownEvent = this.keyDownEvent.bind(this);
    this.timer = 0;
    this.startGame = this.startGame.bind(this);
    this.state = { time: 0, x: 0, y: 0, gameStarted: false };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyDownEvent, false);
  }

  componentDidUpdate() {
    if (this.state.x === 250 && this.state.y === 250) {
      clearInterval(this.timer);
      document.removeEventListener("keydown", this.keyDownEvent);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyDownEvent);
    clearInterval(this.timer);
  }

  keyDownEvent(event) {
    if (this.state.gameStarted === false) {
      return;
    }
    if (event.keyCode === 37) {
      this.setState({ x: this.state.x - 5 });
    } else if (event.keyCode === 38) {
      this.setState({ y: this.state.y - 5 });
    } else if (event.keyCode === 39) {
      this.setState({ x: this.state.x + 5 });
    } else if (event.keyCode === 40) {
      this.setState({ y: this.state.y + 5 });
    }
  }

  startGame() {
    this.setState({ gameStarted: true });
    this.timer = setInterval(() => {
      if (this.state.gameStarted) {
        this.setState({ time: this.state.time + 1 });
      }
    }, 1000);
  }

  render() {
    return (
      <>
        <button className="start" onClick={this.startGame}>
          start
        </button>
        <div className="heading-timer">{this.state.time}</div>
        <div className="hole"></div>
        <div
          className="ball"
          style={{ left: this.state.x + "px", top: this.state.y + "px" }}
        ></div>
      </>
    );
  }
}

export default Timer;
