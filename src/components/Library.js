import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Library.css';

class Library extends Component {

  constructor(props) {
  super(props);

  this.state = {
    movies: [],
  };
}

  componentDidMount = () => {
    axios.get(`${this.props.url}`)
    .then( (response) => {
      console.log(response);
      this.setState({
        movies: response.data
      });
    })
    .catch( (error) => {
      this.setState({
        error: error.message
      });
    });
  }

  renderMovies = () => {
    const movieLibrary = this.state.movies.map((movie) => {

      return (
        <div>
          <img src={movie.image_url} alt="movie thumbnail"/>
          <p>{movie.title} {movie.release_date}</p>
        </div>
      );
    });

    return movieLibrary
  }

  render() {

    const anyErrors = () => {
    if (this.state.error) {
      return <p>{this.state.error}</p>
    }
  }

    return (
      <section>
      <span>{anyErrors()}</span>
        <div className='movie-library'>
          {this.renderMovies()}
        </div>
      </section>
    )
  }

}


export default Library;