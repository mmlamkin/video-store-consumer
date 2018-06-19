import React, { Component } from 'react';
import './App.css';
import Library from './components/Library';
import CustomerList from './components/CustomerList';
import SearchContainer from './components/SearchContainer';
import axios from 'axios';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      customers: [],
      rentalMovie: '',
      rentalCustomer: {}
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

  showLibrary = (event) => {
    this.setState({
      movies: <Library url="http://localhost:3000/movies" updateRentalCallback={this.updateRentalMovie}/>,
      customers: []
    });
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

  searchMovieAPICall = (movieName) => {
    this.setState({
      movies: `api makes a call for movie ${movieName} and calls function to show results`,
      customers: [],
    });
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


  render() {

    const anyErrors = () => {
    if (this.state.error) {
      return <p>{this.state.error}</p>
    }
  }
    return (
      <div className="App">
        <p>{this.state.message}</p>
        <span>{anyErrors()}</span>
        <header>
          <h1>Poseiden Rental</h1>
          <button className="see-library" onClick={this.showLibrary}>
            Poseiden Faves
          </button>
          <button className="see-customers" onClick={this.showCustomers}>
            Poseiden Customers
          </button>
          <section className="rental">
          <p>Selected Movie: {this.state.rentalMovie}</p>
          <p>Selected Customer: {this.state.rentalCustomer.name}</p>
          <button className="create-rental" onClick={this.createRental}>
            Create Rental
          </button>
          </section>
          <section className="search-form">
          <SearchContainer />
          </section>
        </header>

        <section className="display">
          {this.state.movies}
          {this.state.customers}
        </section>


      </div>
    );
  }
}

export default App;
