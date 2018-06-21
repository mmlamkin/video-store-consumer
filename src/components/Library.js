import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Library.css';
import Movie from './Movie'

class Library extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      url: "http://localhost:3000/movies",
    };
  }

  componentDidMount = () => {
    axios.get(`${this.state.url}`)

    .then( (response) => {
      this.setState({
        movies: response.data,
      });
    })
    .catch( (error) => {
      this.setState({
        error: error.message
      });
    });
  }

  updateRental = (title) => {
    this.props.updateRentalCallback(title)
  }

  renderMovies = () => {

    const movieLibrary = this.state.movies.map((movie, index) => {

      return (
        <div>
          <Movie
          key={index}
          image_url={movie.image_url}
          title={movie.title}
          release_date={movie.release_date}
          addMovieToRentalCallback={this.updateRental}
          />

          <button className="rental-movie" onClick={() => {this.updateRental(movie.title)}}>
            Add Movie to Rental
          </button>
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

Library.PropTypes = {
  updateRentalCallback: PropTypes.func.required,
};


export default Library;
