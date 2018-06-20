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

  defMovieName = () => {
    this.setState({
      movieName: this.props.movieName,
    })
  }


  render() {

    return (
      <section>
        <SearchForm/>
        <SearchResults
          searchTitle={this.props.movieName}
        />
      </section>
    )
  }

}


export default SearchContainer;
