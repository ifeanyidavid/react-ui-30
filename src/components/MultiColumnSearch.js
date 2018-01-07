import React, { Component } from "react";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      country: "",
      capital: "",
      region: "",
      subregion: "",
      data: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    axios
      .get(
        "https://raw.githubusercontent.com/mledoze/countries/master/countries.json"
      )
      .then(response => {
        const array = [];
        const responseData = response.data;
        for (let i = 0; i < responseData.length; i++) {
          let entry = {};
          entry.country = responseData[i].name.official;
          entry.capital = responseData[i].capital;
          entry.region = responseData[i].region;
          entry.subregion = responseData[i].subregion;
          entry.coordinates = responseData[i].latlng;
          array[i] = entry;
        }
        this.setState({
          data: array
        });
      });
  }

  handleChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  render() {
    const countryQuery = this.state.country;
    const capitalQuery = this.state.capital;
    const regionQuery = this.state.region;
    const subregionQuery = this.state.subregion;
    let data = this.state.data;
    if (countryQuery.length > 0) {
      data = data.filter(item =>
        item.country.toLocaleLowerCase().match(countryQuery)
      );
    }
    if (capitalQuery.length > 0) {
      data = data.filter(item =>
        item.capital.toLocaleLowerCase().match(capitalQuery)
      );
    }
    if (regionQuery.length > 0) {
      data = data.filter(item =>
        item.region.toLocaleLowerCase().match(regionQuery)
      );
    }
    if (subregionQuery.length > 0) {
      data = data.filter(item =>
        item.subregion.toLocaleLowerCase().match(subregionQuery)
      );
    }

    const list = data.map((entry, index) => {
      return (
        <tr>
          <td className="country">{entry.country.substr(0, 30)}</td>
          <td className="capital">{entry.capital}</td>
          <td className="region">{entry.region}</td>
          <td className="subregion">{entry.subregion}</td>
          <td className="lat">{parseFloat(entry.coordinates[0].toFixed(2))}</td>
          <td className="lon">{parseFloat(entry.coordinates[1].toFixed(2))}</td>
        </tr>
      );
    });
    return (
      <div>
        <h3>Country/Capital Data Multi-Search Service</h3>
        <Search
          handleChange={this.handleChange}
          country={this.state.country}
          capital={this.state.capital}
          region={this.state.region}
          subregion={this.state.subregion}
        />
        <Table list={list} />
      </div>
    );
  }
}

class Search extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleChange(e.target.name, e.target.value);
  }

  render() {
    return (
      <div className="search-fields">
        <input
          type="text"
          placeholder="Filter by country"
          value={this.props.country}
          name="country"
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="Filter by capital"
          value={this.props.capital}
          name="capital"
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="Filter by region"
          value={this.props.region}
          name="region"
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="Filter by subregion"
          value={this.props.subregion}
          name="subregion"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const Table = props => {
  return (
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>Capital</th>
          <th>Region</th>
          <th>Subregion</th>
          <th>Latitude</th>
          <th>Longitude</th>
        </tr>
      </thead>
      <tbody>{props.list}</tbody>
    </table>
  );
};
