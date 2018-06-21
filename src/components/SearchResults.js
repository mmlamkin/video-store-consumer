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

  componentDidMount = () => {
    let interval = setInterval(this.timer, 10000);
  }

  timer = () => {
    this.setState({
      message: '',
      error: ''
    })
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
    let picture = movie.image_url.split('/w185')
    movie.image_url = picture[1]
    
    axios.post(`http://localhost:3000/add_movie/`, movie)

    .then( () => {
      this.setState({
        message: `Added ${movie.title} to library`
      })
    })
    .catch( (error) => {
      this.setState({
        message: 'Movie is already available in library',
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
        <p className="error">{this.state.error ? this.state.error : ''}</p>
        <p className="message">{this.state.message ? this.state.message : ''}</p>
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
