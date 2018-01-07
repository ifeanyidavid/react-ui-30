import React, { Component } from "react";

const initialState = [
  "Finish Redux Tutorials",
  "Learn more about Relay",
  "Build 5 more React apps",
  "Review React Component Lifecycle",
  "Obtain Data Visualization Certificate",
  "Review Algorithms",
  "Tweet Progress",
  "Get a coffee!",
  "Browse Google Fonts",
  "Learn more about React Native"
];
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: "",
      filterText: "",
      data: initialState
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.reset = this.reset.bind(this);
    this.clear = this.clear.bind(this);
  }

  saveToLocalStorage(data) {
    localStorage.setItem("Todo Items", data);
  }

  componentWillMount() {
    if (localStorage.getItem("Todo Items")) {
      const dataFromLocalStorage = localStorage.getItem("Todo Items");
      if (dataFromLocalStorage.length > 0) {
        const dataFromLocalStorageArray = dataFromLocalStorage.split(",");
        this.setState({
          data: dataFromLocalStorageArray
        });
      } else {
        this.setState({
          data: []
        });
      }
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit() {
    const itemToAdd = this.state.item;
    const newData = this.state.data.concat(itemToAdd);
    if (itemToAdd.length < 1) {
      return "";
    } else {
      this.setState({
        data: newData,
        item: ""
      });
      this.saveToLocalStorage(newData);
    }
  }

  handleDelete(itemIndex) {
    const clonedData = this.state.data;
    const newData = clonedData.filter((item, index) => {
      return itemIndex !== index;
    });
    this.saveToLocalStorage(newData);
    this.setState({
      data: newData
    });
    // const clonedData = this.state.data.slice();
    // clonedData.splice(index, 1);
    // console.log(clonedData);
  }

  clear() {
    this.setState({
      data: []
    });
  }

  reset() {
    this.setState({
      data: initialState
    });
  }

  render() {
    let data = this.state.data;
    const filterText = this.state.filterText;

    if (filterText.length > 0) {
      data = data.filter(text => text.toLowerCase().match(filterText));
    }

    const items = data.map((item, index) => (
      <li key={index}>
        Todo {index + 1} -
        <strong>{item}</strong>
        <input
          type="submit"
          onClick={() => this.handleDelete(index)}
          value="Delete"
        />
      </li>
    ));

    console.log(data.length);

    return (
      <div>
        <h3>React To-do App</h3>
        <p>Enhance your productivity</p>
        <hr />
        <input
          type="text"
          name="item"
          placeholder="Enter new item"
          value={this.state.item}
          onChange={this.handleChange}
        />
        <input
          type="submit"
          value="Enter new item"
          onClick={this.handleSubmit}
        />
        <input
          type="text"
          name="filterText"
          placeholder="Filter"
          value={this.state.filterText}
          onChange={this.handleChange}
        />
        <input type="submit" onClick={this.reset} value="Reset" />
        <input type="submit" onClick={this.clear} value="Clear" />
        <ul>{items}</ul>
      </div>
    );
  }
}
