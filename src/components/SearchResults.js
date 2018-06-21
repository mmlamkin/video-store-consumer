import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Library.css';
import Movie from './Movie'
import SearchForm from './SearchForm'


class SearchResults extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  movieSearch = (title) => {

    axios.get(`http://localhost:3000/movies?query=${title}`)

    .then ((response) => {
      this.setState({
        movies: response.data,
      });
      console.log(this.state.movies)
    })
    .catch((error) => {
      console.log(this.state.movies);
      this.setState({
        error: error.message
      })
    });
  }

  clearSearch = () => {
    this.setState({
      movies: []
    })
  }

  addToLib = (movie) =>{

    axios.post(`http://localhost:3000/movies/addLib`, movie)

    .then( () => {
      //api post request with movie
      this.setState({
        message: `added ${movie.title} to library`
      })
    })
    .catch( (error) => {
      this.setState({
        error: error.message
      });
    });
  }


  showMovies = () => {
    const movieLibrary = this.state.movies.map((movie, index) => {
      return (
        <div>
          <Movie
          key={index}
          image_url={movie.image_url}
          title={movie.title}
          release_date={movie.release_date}
          />

          <button className="see-customers" onClick={() => {this.addToLib(movie)}}>
            Add to library
          </button>

        </div>
      );
    });
    return movieLibrary
  }


  render() {

    return (
      <section>
      <SearchForm
      clearSearchCallback={this.clearSearch}
      movieSearchCallback={this.movieSearch}
      />
      <span>{this.state.error ? this.state.error : ''}</span>
      <div className='movie-library'>
      {this.showMovies()}
      </div>
      </section>
    )
  }
}

SearchResults.PropTypes = {
  searchTitle: PropTypes.string,
  movies: PropTypes.array,
};


export default SearchResults;
