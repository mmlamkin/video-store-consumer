import React, { Component } from 'react';
import SearchForm from './components/SearchForm.js';


class App extends Component {

  searchMovieAPICall(movieName) {
    return (
      <h3> `api makes a call for movie ${movieName} and calls function to show results`</h3>
    )
  }

  render() {
    return (
      <div className="App">
        <SearchForm
          searchMovie={this.searchMovieAPICall}
         />

      </div>
    );
  }
}

export default App;
