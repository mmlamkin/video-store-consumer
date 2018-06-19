import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Library.css';
import Movie from './Movie'


class SearchResults extends Component {

  constructor(props) {
  super(props);

  this.state = {
    movies: [],
  };
}
// this should only be run once search button is clicked
  componentDidMount = () => {
    axios.get(`http://localhost:3000/movies/${this.props.movieName}`)
    .then ((response) => {
      console.log(response);

      let results = response.data;

      typeof(results) === 'object' ? results = [results]: '';

      this.setState({
        movies: results,
      });
    })
    .catch(() => {
      console.log(this.state.movies);
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
      <span>{this.state.error ? this.state.error : ''}</span>
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
  movieName: PropTypes.string,
  test: PropTypes.string,
  movies: PropTypes.array,
};

export default SearchResults;
