import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Library from './components/Library';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Library url="http://localhost:3000/movies" />
      </div>
    );
  }
}

export default App;
