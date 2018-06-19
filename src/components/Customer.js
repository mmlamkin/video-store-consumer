import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Customer.css';

class Customer extends Component {

  addCustomerToRental= () => {
    this.props.addCustomerToRentalCallback(this.props.name)
  }

  render() {

    return (
      <section>
        <p>{this.props.name}</p>
        <button className="rental-customer" onClick={this.addCustomerToRental}>
          Add Customer to Rental
        </button>
      </section>
    )
  }

}


export default Customer;
