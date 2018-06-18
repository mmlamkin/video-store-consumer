import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Movie.css';

class Movie extends Component {


  render() {

    return (
      <section>
        <img src={this.props.image_url} alt="movie thumbnail"/>
        <p>{this.props.title} {this.props.release_date}</p>
      </section>
    )
  }

}


export default Movie;
