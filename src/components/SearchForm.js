import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieName: '',
    };
  }

  onFieldChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    const updateState = {};

    updateState[fieldName] = fieldValue;
    this.setState(updateState);
  }

  clearForm = () => {
    this.setState({
      movieName: '',
    });
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.clearForm();
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div key="movieName">
          <label htmlFor="movieName">Movie: </label>
          <input
            id="movieName"
            name="movieName"
            value={this.state.movieName}
            onChange={this.onFieldChange}
            type="text"
          />
        </div>

        <input
        type="submit"
        value="Search"
        />
      </form>

    );
  }

}
SearchForm.propTypes = {
  defMovieName: PropTypes.func,
  test: PropTypes.string,
}

export default SearchForm;
