import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Customer from './Customer'
import './CustomerList.css'


class CustomerList extends Component {

  constructor(props) {
  super(props);

  this.state = {
    customers: [],
    rentalCustomer: ''
  };
}

  componentDidMount = () => {
    axios.get(`${this.props.url}`)
    .then( (response) => {
      this.setState({
        customers: response.data
      });
    })
    .catch( (error) => {
      this.setState({
        error: error.message
      });
    });
  }

  updateRental = (name, id) => {
    this.props.updateRentalCallback(name, id)
  }

  renderCustomers= () => {
    const List = this.state.customers.map((customer) => {

      return (
          <Customer name={customer.name}
          id={customer.id} addCustomerToRentalCallback={this.updateRental}/>
      );
    });

    return List
  }

  render() {

    const anyErrors = () => {
    if (this.state.error) {
      return <p>{this.state.error}</p>
    }
  }

    return (
      <section className="customers">
        {anyErrors()}
        {this.renderCustomers()}
      </section>
    )
  }

}


export default CustomerList;
