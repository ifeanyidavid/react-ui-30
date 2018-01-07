import React, { Component } from "react";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    axios
      .get(
        "https://gist.githubusercontent.com/anonymous/1295788c7bff052a1e8a/raw/6e109604c7a7f3efe77c8048bb2fe2f3e1cdcb7b/gistfile1.json"
      )
      .then(response => {
        this.setState({
          data: response.data.Reggae
        });
      })
      .catch(e => {
        console.log(e.message);
      });
  }
  handleChange(value) {
    this.setState({
      value: value
    });
  }
  render() {
    let data = this.state.data;
    const searchStr = this.state.value.trim().toLocaleLowerCase();
    if (searchStr.length > 0) {
      data = data.filter(artiste =>
        artiste.toLocaleLowerCase().match(searchStr)
      );
    }
    const list = data.map((artiste, index) => (
      <List key={index} artiste={artiste} />
    ));
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center"
        }}
      >
        <Header />
        <Search handleChange={this.handleChange} value={this.state.value} />
        {list}
      </div>
    );
  }
}

const Header = () => {
  return (
    <div className="header">
      <h3>React Realtime Search Demo!</h3>
    </div>
  );
};

class Search extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleChange(e.target.value);
  }

  render() {
    return (
      <div className="search">
        <h3>Search</h3>
        <input
          type="text"
          placeholder="Search for an artiste"
          value={this.props.value}
          name="value"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const List = props => {
  return (
    <ul
      className="list"
      style={{ textAlign: "center", listStyle: "none", margin: "0" }}
    >
      <li>{props.artiste}</li>
    </ul>
  );
};
