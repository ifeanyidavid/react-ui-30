import React, { Component } from "react";
import axios from "axios";
import "./slider.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      array: [],
      slider: 10
    };
    this.handleRange = this.handleRange.bind(this);
  }
  componentDidMount() {
    axios
      .get(
        "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"
      )
      .then(response => {
        const fetchedData = response.data.data;
        const data = this.state.data.concat(fetchedData);
        const array = this.state.array.concat(fetchedData);
        this.setState({
          data: data,
          array: array
        });
      });
  }
  handleRange(event) {
    const num = parseInt(event.target.value);
    this.setState({
      array: [],
      slider: num
    });
    const currData = this.state.data.slice(0);
    const scaledData = currData.splice(num, currData.length);
    this.setState({
      array: scaledData
    });
  }
  render() {
    const width = {
      width: "20%"
    };
    const dates = [];
    const data = this.state.array;
    const renderData = data.map((item, index) => {
      if (index % 25 === 0) {
        dates[index] = item[0].substr(0, 4);
      }
      return (
        <div>
          <div
            className="bar"
            id="index"
            style={{
              height: Math.round(parseFloat(item[1])) / 30,
              width: 1000 / (data.length - 1)
            }}
          >
            <span className="barValue">
              <span>Date: </span> {item[0]} <br />
              <span>GDP: $</span> {item[1]} <span>(billions)</span>
            </span>
            <div>
              <span className="dates">{dates[index]}</span>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="outerwrapper">
        <h1>Modeling US GDP Economic Data with React</h1>
        <p>
          — A remix of the{" "}
          <a href="https://www.freecodecamp.com/challenges/visualize-data-with-a-bar-chart">
            Free Code Camp D3.js Bar Chart Zipline —
          </a>
        </p>
        <div className="chart">{renderData}</div>
        <SliderControl
          handleRange={this.handleRange}
          slider={this.state.slider}
        />
      </div>
    );
  }
}

class SliderControl extends Component {
  constructor(props) {
    super(props);

    this.handleRange = this.handleRange.bind(this);
  }
  handleRange(event) {
    this.props.handleRange(event);
  }
  render() {
    return (
      <div className="scroll">
        <h2>Zoom the chart range:</h2>
        <input
          type="range"
          name="slider"
          min="1"
          max="273"
          value={this.props.slider}
          onChange={this.handleRange}
          className="slider"
          style={{ width: "500px" }}
        />
      </div>
    );
  }
}
