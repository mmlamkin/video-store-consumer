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
      <div className="customer">
        <div className="customer-name">

        <div className="customer-name">{this.props.name}</div>
        <button className="customer-button button" onClick={this.addCustomerToRental}>
          Add Customer to Rental
        </button>
        </div>
      </div>
    )
  }

}

Customer.PropTypes = {
  addCustomerToRentalCallback: PropTypes.func.required,
};

export default Customer;
