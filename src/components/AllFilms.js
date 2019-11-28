import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { callDiscoverMovies } from './../services/moviesDb';

export default class AllFilms extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    this.fetchMoviesToDiscover();
  }

  fetchMoviesToDiscover = async () => {
    const movies = await callDiscoverMovies();
    this.setState({
      movies,
    });
    console.log('hi', this.state.movies);
  };

  render() {
    const { movies = [] } = this.state;
    return (
      <React.Fragment>
        <h1 style={{ textAlign: 'center' }}>LISTE DES FILMS</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {movies.map(movie => (
            <div style={{ flex: '1 1 250px', padding: '5px' }}>
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'grey',
                  fontFamily: 'Roboto, sans-serif',
                  borderRadius: '7px',
                }}
                to={`/movie/${movie.id}`}
              >
                <img
                  style={{ width: '100%', borderRadius: '7px' }}
                  key={movie.id}
                  alt="film cover"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                />
                <p style={{ textAlign: 'center' }}>{movie.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}
