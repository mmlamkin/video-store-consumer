import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Library.css';
import Movie from './Movie'
import SearchForm from './SearchForm'
import SearchResults from './SearchResults'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';



class SearchContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  updateRentalMovie = (title) => {
    this.setState({
      rentalMovie: title
    })
  }

  defMovieName = (title) => {
    this.setState({
      movieName: title,
    })
  }

  defSearchMovie = () => {
    return(
      <SearchResults
        searchTitle={this.state.movieName}
      />
    )
  }

  setMovieName= (title) => {
    this.setState({
      movieName: title,
    })
  }

  showSearchPage = () => {
     return (
       <SearchForm
        setMovieName={this.setMovieName}
       />
     )
  }

  render() {
    return(
      <Route path="/search" render={() => (
        <div>
          {this.showSearchPage()}
          <h1>{this.state.movieName}</h1>
          {this.state.movieName ? this.defSearchMovie() : ''}
        </div>

      )}/>
    )
  }

}


export default SearchContainer;
