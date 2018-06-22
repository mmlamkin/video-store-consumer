import React, { Component } from 'react';
import './App.css';
import Library from './components/Library';
import CustomerList from './components/CustomerList';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
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

  defHomePage = () => {
    return(
      <div className="homepage">
        <header className="storeName">Welcome to WaterFlix -- a sea of movies to enjoy</header>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSdUvCvTeimO9N_PLhmkwUySrOBjvE53CbIWuH2wzityRfDusc' height='500' width='500'/>
      </div>
    )
  }

  render() {
    const anyErrors = () => {
      if (this.state.error) {
        return <p className="error">{this.state.error}</p>
      }
    }
    return (

      <Router>
      <div className="grid-container">
      <div className="heading">
      <h1 id="mainHeader">Waterflix</h1>
      <div className="header">
      <ul>
      <li>
      <Link to={'/'}>
      <button className="button">
      Home
      </button>
      </Link>
      </li>
      <li>
      <Link to={'/library'}>
      <button className="see-library button" onClick={this.showLibrary}>
      Faves
      </button>
      </Link>
      </li>
      <li>
      <Link to={'/customers'}>
      <button className="button" onClick={this.showCustomers}>
      Customers
      </button>
      </Link>
      </li>
      <li>
      <Link to={'/search'}>
      <button className="button" onClick={this.showSearchPage}>
      Search the Sea
      </button>
      </Link>
      </li>
      </ul>
      <img id="wavey"
      src='https://blog.csiro.au/wp-content/uploads/2014/07/waves-1024x682.jpg' alt='waves'/>
      </div>
      </div>

      <div className="rentalClass">
      <p  className="message"> {this.state.message}</p>
      {anyErrors()}
      <ul>
      <li>
      <h4>Your Rental</h4>
      </li>
      <li>
      <p>Selected Movie: {this.state.rentalMovie}</p></li>
      <li>
      <p>Selected Customer: {this.state.rentalCustomer.name}</p></li>
      <li>
      <button className="button" onClick={this.createRental}>
      Create Rental
      </button>
      </li>
      </ul>
      </div>

      <div className="showContent">
        <Route exact={true} path="/" render={() => (
          this.defHomePage()
        )}/>
      </div>

      <div className="showContent">
        <Route path="/library" render={() => (
          <Library updateRentalCallback={this.updateRentalMovie}/>
        )}/>
      </div>

      <div className="showContent">
        <Route path="/search" render={() => (
          <SearchResults />
        )}/>
      </div>

      <div className="showContent">
        <Route path="/customers" render={() => (
          <CustomerList url="http://localhost:3000/customers" updateRentalCallback={this.updateRentalCustomer}/>
        )}/>
      </div>
      </div>
      </Router>

    );
  }
}

export default App;
