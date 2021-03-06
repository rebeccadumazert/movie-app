import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { callDiscoverMovies } from '../services/moviesDb';
import './style/movies.css';
const START_URL = 'https://image.tmdb.org/t/p/w300/';

export default class Movies extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    this.fetchMoviesToDiscover();
  }

  componentDidUpdate({ lang }) {
    if (lang !== this.props.lang) {
      this.fetchMoviesToDiscover();
    }
  }
  fetchMoviesToDiscover = async () => {
    const { lang } = this.props;

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
          {movies.map(({ id, title, poster_path }) => (
            <div key={id} className="divGridFilms">
              <Link
                className={night ? 'linkMoviesNight' : 'linkMovies'}
                to={`/movie/${id}`}
              >
                <img
                  className={night ? 'imgMoviesNight' : 'imgMovies'}
                  key={id}
                  alt="film cover"
                  src={`${START_URL}${poster_path}`}
                />
                <p>{title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
