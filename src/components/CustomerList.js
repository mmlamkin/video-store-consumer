import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


class CustomerList extends Component {

  constructor(props) {
  super(props);

  this.state = {
    customers: [],
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

  renderCustomers= () => {
    const List = this.state.customers.map((customer) => {

      return (
        <p>
          {customer.name}
        </p>
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
      <span>{anyErrors()}</span>
        <div>
          {this.renderCustomers()}
        </div>
      </section>
    )
  }

}


export default CustomerList;
