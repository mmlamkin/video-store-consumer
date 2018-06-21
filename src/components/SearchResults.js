import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Library.css';
import Movie from './Movie'


class SearchResults extends Component {

  constructor(props) {
  super(props);

  this.state = {
    movies: [],
  };
}

  componentDidMount = () => {
    axios.get(`http://localhost:3000/movies?query=${this.props.searchTitle}`)
    .then ((response) => {

      this.setState({
        movies: response.data,
      });
    })
    .catch(() => {
      console.log(this.state.movies);
      this.setState({
        error: 'Sorry, no movies match your description'
      })
    });
  }

  addToLib = (movie) => {
    axios.post('http://localhost:3000/add_movie',
  //   {
  //     title:'Cruel Jaws',
  //     overview: 'A tiger shark bred by the Navy\
  //      as a killing machine is wrecking havoc\
  //       in the sleepy tourist town of Hampton Bay.',
  //     release_date:'1995-05-05',
  //     image_url:'https://image.tmdb.org/t/p/w185/tq9swm2dKN0bNb48HArwSDGuF12.jpg',
  //     external_id: '84060',
  // }
  movie)
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

          <button className="rental-movie" onClick={ () => {this.addToLib(movie)}}>
            Add Movie to Library
          </button>
        </div>
      );
    });

    return movieLibrary
  }

  render() {

    return (
      <section>
        <span>{this.state.message}</span>
        <span>{this.state.error ? this.state.error : ''}</span>
        <div className='movie-library'>
          {this.state.movies ? this.showMovies() : ''}
        </div>
      </section>
    )
  }

}

SearchResults.propTypes = {
  searchTitle: PropTypes.string,
  movies: PropTypes.array,
};

export default SearchResults;
