import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Movie.css';

class Movie extends Component {

  addMovieToRental= () => {
    this.props.addMovieToRentalCallback(this.props.title)
  }

  render() {

    return (
      <section className="movie">
        <img src={this.props.image_url} alt="movie thumbnail"/>
        <p>{this.props.title}</p>
        <p>{this.props.release_date}</p>
        <button className="rental-movie" onClick={this.addMovieToRental}>
          Add Movie to Rental
        </button>
      </section>
    )
  }

}


export default Movie;
