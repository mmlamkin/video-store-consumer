import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


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
      console.log(response);
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

  addCustomer= () => {
    this.props.addCustomerCallback()
  }

  renderCustomers= () => {
    const List = this.state.customers.map((customer) => {

      return (
        <section>
          <p>
            {customer.name}
          </p>
          <button className="rental-customer" onClick={this.addCustomer}>
            Add to Rental
          </button>
        </section>
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
      <section>
        {anyErrors()}
        {this.renderCustomers()}
      </section>
    )
  }

}


export default CustomerList;
