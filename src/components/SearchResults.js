import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Library.css';
import Movie from './Movie'
import SearchForm from './SearchForm'


class SearchResults extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  movieSearch = (title) => {

    axios.get(`http://localhost:3000/movies?query=${title}`)

    .then ((response) => {
      this.setState({
      movies: response.data,
      });
        console.log(this.state.movies)
    })
    .catch((error) => {
      console.log(this.state.movies);
      this.setState({
        error: error.message
      })
    });
  }

  clearSearch = () => {
    this.setState({
      movies: []
    })
  }

  showMovies = () => {
    const movieLibrary = this.state.movies.map((movie, index) => {
    return (
      <Movie
      key={index}
      image_url={movie.image_url}
      title={movie.title}
      release_date={movie.release_date}
      />
    );
  });
  return movieLibrary
}


render() {

  return (
    <section>
      <SearchForm
      clearSearchCallback={this.clearSearch}
      movieSearchCallback={this.movieSearch}
      />
      <span>{this.state.error ? this.state.error : ''}</span>
      <div className='movie-library'>
        {this.showMovies()}
      </div>
    </section>
  )
}

}

SearchResults.propTypes = {
  searchTitle: PropTypes.string,
  movies: PropTypes.array,
};

export default SearchResults;
