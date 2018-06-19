import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './SearchForm.css'

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



    //eventually will pull the searchapi call function from props
    onFormSubmit = (event) => {
      event.preventDefault();
      console.log(this.state.movieName);
      this.props.searchMovie(this.state.movieName);
      this.clearForm();
    }


    render() {
      return (
        <form onSubmit={this.onFormSubmit}>
          <div key="movieName">
            <label htmlFor="movieName">Find a Movie: </label>
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
  }

export default SearchForm;
