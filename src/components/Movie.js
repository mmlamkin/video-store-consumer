import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Movie.css';

class Movie extends Component {

  // addMovieToRental= () => {
  //   this.props.addMovieToRentalCallback(this.props.title)
  // }

  render() {

    return (
      <section className="movie">
        <img src={this.props.image_url} alt="movie thumbnail"/>
        <p>{this.props.title}</p>
        <p>{this.props.release_date}</p>
      </section>
    )
  }

}

Movie.propTypes = {
  release_date: PropTypes.string,
  title: PropTypes.string,
  image_url: PropTypes.string,
};

export default Movie;
