import React, { Component } from 'react';
import './App.css';
import Library from './components/Library';
import CustomerList from './components/CustomerList';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import SearchContainer from './components/SearchForm'
import SearchForm from './components/SearchForm'
import SearchResults from './components/SearchResults'


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rentalMovie: '',
      rentalCustomer: {},
      movieLib: [],
    };
  }

  componentDidMount = () => {
    let interval = setInterval(this.timer, 10000);
  }

  timer = () => {
    this.setState({
      message: '',
      error: ''
    })
  }

  updateRentalCustomer = (name, id) => {
    this.setState({
      rentalCustomer: {
        'name': name,
        'id': id
      }
    })
  }

  updateRentalMovie = (title) => {
    this.setState({
      rentalMovie: title
    })
  }

  updateMovieLib = (title) => {
    this.setState({
      rentalMovie: title
    })
  }

  createRental = () => {

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

  defMovieName = (title) => {
    this.setState({
      movieName: title,
    })
  }

  render() {
    const anyErrors = () => {
      if (this.state.error) {
        return <p className="error">{this.state.error}</p>
      }
    }
    return (

      <Router>
        <div className="App">
          <header>
            <h1>Poseidon Rentals</h1>

            <section className="rental">
              <h4>Your Rental</h4>
              <p>Selected Movie: {this.state.rentalMovie}</p>
              <p>Selected Customer: {this.state.rentalCustomer.name}</p>
              <button className="create-rental" onClick={this.createRental}>
                Create Rental
              </button>
            </section>
          </header>

          <nav className="navbar">
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
              <button className="see-customers" onClick={this.showSearchPage}>
                Search the Sea
              </button>
            </Link>
          </nav>

          <p className="message">{this.state.message}</p>

      <section className="display">
      <Route exact={true} path="/" render={() => (
        <h1>Welcome</h1>
      )}/>

      <Route path="/library" render={() => (
        <Library updateRentalCallback={this.updateRentalMovie}/>
      )}/>

      <Route path="/search" render={() => (
        <SearchResults />
      )}/>

      <Route path="/customers" render={() => (
        <CustomerList url="http://localhost:3000/customers" updateRentalCallback={this.updateRentalCustomer}/>
      )}/>
      </section>
      </div>

      </Router>

    );
  }
}

export default App;
