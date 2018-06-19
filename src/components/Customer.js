import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Customer.css';

class Customer extends Component {


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


export default Movie;
