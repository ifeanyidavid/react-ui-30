import React, { Component } from "react";
import "./styles.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 5,
      subtract: false
    };

    this.autoPlay = this.autoPlay.bind(this);
  }
  componentDidMount() {
    this.autoPlay();
  }
  autoPlay() {
    setInterval(() => {
      let newCount;
      const count = this.state.count;

      if (count === 75) {
        this.setState({
          subtract: true
        });
      } else if (count === 0) {
        this.setState({
          subtract: false
        });
      }

      if (this.state.subtract) {
        newCount = count - 1;
      } else if (!this.state.subtract) {
        newCount = count + 1;
      }

      this.setState({
        count: newCount
      });
    }, 40);
  }

  render() {
    return (
      <div>
        <Create count={this.state.count} />
      </div>
    );
  }
}

class Create extends Component {
  constructor(props) {
    super(props);
  }

  generateRandomNumber = () => Math.round(Math.random() * 255);

  generateRandomColor = () => {
    return {
      background: `rgb(${this.generateRandomNumber()},${this.generateRandomNumber()},${this.generateRandomNumber()})`
    };
  };

  render() {
    const array = new Array(parseFloat(this.props.count));
    for (let i = 0; i < array.length; i++) {
      array[i] = i;
    }
    const coloredBoxes = array.map((val, index) => (
      <div className="box" key={index} style={this.generateRandomColor()} />
    ));
    return (
      <div className="container">
        {coloredBoxes}
      </div>
    );
  }
}
