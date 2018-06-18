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
    };
  }

  showLibrary = (event) => {
    this.setState({
      movies: <Library url="http://localhost:3000/movies" />
    });
  }

  render() {
    return (
      <div className="App">
        <button className="see-library" onClick={this.showLibrary}>
          Poseiden Faves
        </button>
        <section>
          {this.state.movies}
        </section>
        <CustomerList url="http://localhost:3000/customers"/>
      </div>
    );
  }
}

export default App;
