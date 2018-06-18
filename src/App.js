import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Library from './components/Library';
import CustomerList from './components/CustomerList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      customers: [],
    };
  }

  showLibrary = (event) => {
    this.setState({
      movies: <Library url="http://localhost:3000/movies" />,
      customers: []
    });
  }



  showCustomers = (event) => {
    this.setState({
      movies: [],
      customers: <CustomerList url="http://localhost:3000/customers" addCustomerCallback={this.updateRental}/>
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <button className="see-library" onClick={this.showLibrary}>
            Poseiden Faves
          </button>
          <button className="see-customers" onClick={this.showCustomers}>
            Poseiden Customers
          </button>
        </header>

        <section>
          {this.state.movies}
          {this.state.customers}
        </section>

      </div>
    );
  }
}

export default App;
