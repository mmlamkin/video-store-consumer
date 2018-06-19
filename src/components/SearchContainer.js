import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Library.css';
import Movie from './Movie'
import SearchForm from './SearchForm'
import SearchResults from './SearchResults'



class SearchContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  defMovieName = (title) => {
    this.setState({
      movieName: title,
    })
  }

  defSearchMovie = () => {
    return (
      <SearchResults
        test="This is the SerchResults"
        movieName={this.state.movieName}
      />
    )
  }

  render() {

    return (
      <section>
        <SearchForm
          test="This is the SearchForm"
          searchTerm={this.defMovieName}
        />

        {this.state.movieName ? this.defSearchMovie() : ''}
      </section>
    )
  }

}


export default SearchContainer;
