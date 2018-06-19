import React, { Component } from 'react';
import './App.css';
import Library from './components/Library';
import CustomerList from './components/CustomerList';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import SearchContainer from './components/SearchForm'



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rentalMovie: '',
      rentalCustomer: {},
    };
  }

  showCustomers = (event) => {
    this.setState({
      movies: [],
      customers: <CustomerList url="http://localhost:3000/customers" updateRentalCallback={this.updateRentalCustomer}/>
    });
  }

  updateRentalCustomer = (name, id) => {
    this.setState({
      rentalCustomer: {'name': name,
                        'id': id}
    })
  }

  updateRentalMovie = (title) => {
    this.setState({
      rentalMovie: title
    })
  }

  defMovieName = (title) => {
    this.setState({
      movieName: title,
    })
  }

  createRental = () => {
    if (this.state.rentalCustomer.id && this.state.rentalMovie) {
    axios.post(`http://localhost:3000/rentals/${this.state.rentalMovie}/check-out?customer_id=${this.state.rentalCustomer.id}&due_date=2018-06-21`)
    .then( (response) => {

      this.setState({
        message: `New Rental Added!`
      })
    })
    .catch( (error) => {
      this.setState({
        error: error.message
      });
    });

    this.setState({
      rentalMovie: '',
      rentalCustomer: {}
    })
  }
  else {
    console.log('some errors');
  }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <p>{this.state.message}</p>
          <header>

            <h1>Poseiden Rental</h1>

            <Link to={'/'}>
              <button className="see-customers">
               Home
              </button>
            </Link>

             <Link to={'/library'}>
                <button className="see-library" onClick={this.showLibrary}>
                 Faves
                </button>
              </Link>

            <Link to={'/customers'}>
              <button className="see-customers" onClick={this.showCustomers}>
               Customers
              </button>
            </Link>

            <Link to={'/search'}>
              <button className="see-customers" onClick={this.toSearch}>
               Search the Sea
              </button>
            </Link>

            <section className="rental">
            <p>Selected Movie: {this.state.rentalMovie}</p>
            <p>Selected Customer: {this.state.rentalCustomer.name}</p>

            <button className="create-rental" onClick={this.createRental}>
              Create Rental
            </button>
            </section>

          </header>

          <Route exact={true} path="/" render={() => (
            <h1>Welcome</h1>
          )}/>

          <Route path="/library" render={() => (
            <Library updateRentalCallback={this.updateRentalMovie}/>
          )}/>

          <Route path="/search" render={() => (
              <SearchContainer />
          )}/>

          <Route path="/customers" render={() => (
            <CustomerList url="http://localhost:3000/customers" updateRentalCallback={this.updateRentalCustomer}/>
          )}/>

        </div>
      </Router>
    );
  }
}

export default App;
