import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Customer.css';

class Customer extends Component {

  addCustomerToRental= () => {
    this.props.addCustomerToRentalCallback(this.props.name, this.props.id)
  }

  render() {

    return (
      <section className="customer">
        <span>{this.props.name}</span>
        <button className="rental-customer" onClick={this.addCustomerToRental}>
          Add Customer to Rental
        </button>
      </section>
    )
  }

}

CustomerList.PropTypes = {
  updateRentalCallback: PropTypes.func.required,
  url: PropTypes.string
};

export default Customer;
