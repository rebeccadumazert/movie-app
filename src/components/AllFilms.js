import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { callDiscoverMovies } from './../services/moviesDb';
import './style/allFilms.css';

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
  };

  render() {
    const { movies = [] } = this.state;
    return (
      <React.Fragment>
        <h1 className="titleFilms">LISTE DES FILMS</h1>
        <div className="gridFilms">
          {movies.map(movie => (
            <div key={movie.id} className="divGridFilms">
              <Link className="linkAllFilms" to={`/movie/${movie.id}`}>
                <img
                  className="imgAllFilms"
                  key={movie.id}
                  alt="film cover"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                />
                <p>{movie.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}
