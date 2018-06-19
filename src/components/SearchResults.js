import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Library.css';
import Movie from './Movie'

const MOVIEDB_KEY = '32d7cfaf6ce21cc76643993aa46a7590';

class SearchResults extends Component {

  constructor(props) {
  super(props);

  this.state = {
    movies: [],
    movieName: '',
  };
}

  componentDidMount = () => {
    axios.get(`http://api.themoviedb.org/3/search/movie?api_key=${MOVIEDB_KEY}&query=${this.props.movieName}`)

    .then ((movieData) => {
      console.log(movieData.results);
      this.setState({
        movies: movieData.results,
      })
    })
    .catch(() => {
      this.setState({
        error: 'Sorry, no movies match your description'
      })
    });
  }

  showMovies = () => {
    const movieLibrary = this.state.movies.map((movie, index) => {
      return (
        <Movie
          key={index}
          image_url={movie.poster_path}
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
      <span>{this.state.error}</span>
        <div className='movie-library'>
          {this.state.movies ? this.showMovies() : ''}
        </div>

        <div>
          {this.props.test}
        </div>
      </section>
    )
  }

}

SearchResults.propTypes = {
  test: PropTypes.string,
  movies: PropTypes.array,
  movieName: PropTypes.string,
};

export default SearchResults;
