import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { callDiscoverMovies } from '../services/moviesDb';
import './style/movies.css';

export default class Movies extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    this.fetchMoviesToDiscover();
  }

  componentDidUpdate({ lang: { lang } }) {
    if (lang !== this.props.lang) {
      this.fetchMoviesToDiscover();
    }
  }
  fetchMoviesToDiscover = async () => {
    const {
      lang: { lang },
    } = this.props;

    const movies = await callDiscoverMovies(lang);
    this.setState({
      movies,
    });
  };

  render() {
    const {
      night: { night },
    } = this.props;
    const { movies = [] } = this.state;
    return (
      <div className={night ? 'themeNight' : 'themeDay'}>
        <h1 className="titleFilms">LISTE DES FILMS</h1>
        <div className="gridFilms">
          {movies.map(movie => (
            <div key={movie.id} className="divGridFilms">
              <Link
                className={night ? 'linkMoviesNight' : 'linkMovies'}
                to={`/movie/${movie.id}`}
              >
                <img
                  className={night ? 'imgMoviesNight' : 'imgMovies'}
                  key={movie.id}
                  alt="film cover"
                  src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                />
                <p>{movie.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
