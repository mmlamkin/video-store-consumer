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

  componentDidMount = () => {
    axios.get(`http://localhost:3000/movies?query=${this.props.searchTitle}`)
    .then ((response) => {

      this.setState({
        movies: response.data,
      });
    })
    .catch(() => {
      console.log(this.state.movies);
      this.setState({
        error: 'Sorry, no movies match your description'
      })
    });
  }

  addToLib = () =>{
    this.setState({
      message: "added movie to library"
    })
  }

  showMovies = () => {

    const movieLibrary = this.state.movies.map((movie, index) => {
      return (
        <div>
          <Movie
            key={index}
            image_url={movie.image_url}
            title={movie.title}
            release_date={movie.release_date}
          />

          <button className="rental-movie" onClick={this.addToLib}>
            Add Movie to Library
          </button>
        </div>
      );
    });

    return movieLibrary
  }

  render() {

    return (
      <section>
        <span>{this.state.message}</span>
        <span>{this.state.error ? this.state.error : ''}</span>
        <div className='movie-library'>
          {this.state.movies ? this.showMovies() : ''}
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
