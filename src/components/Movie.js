import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/movie.css';

import { callDetailsMovie, callMovieCredits } from './../services/moviesDb';

export default class Movie extends Component {
  state = {
    movie: {},
    credits: [],
  };
  componentDidMount() {
    this.fetchMovieDetails();
    this.fetchMovieCredits();
  }

  async fetchMovieDetails() {
    const {
      match: { params },
    } = this.props;
    const movie = await callDetailsMovie(params.id);
    this.setState({ movie });
  }

  async fetchMovieCredits() {
    const {
      match: { params },
    } = this.props;
    const { cast: credits } = await callMovieCredits(params.id);
    this.setState({ credits });
  }

  render() {
    const {
      movie: { genres = [], title, poster_path, overview },
    } = this.state;
    const { credits } = this.state;

    const loader = !title && <p>LOADING...</p>;

    return (
      loader || (
        <div>
          <h1 className="titleMovie">Title: {title}</h1>
          <div className="containerMovie">
            <img
              className="imgMovie"
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt="movie cover"
            />
            <div className="infoMovie">
              <p>
                Genre :{' '}
                {genres.map(genre => (
                  <span key={genre.id}>{genre.name} </span>
                ))}
              </p>
              <p>Synopsis: {overview} </p>
              <p>
                Acteurs et actrices :{' '}
                {credits.map(credit => (
                  <Link key={credit.id} to={`/credit/${credit.id}`}>
                    <span>{credit.name} - </span>
                  </Link>
                ))}
              </p>
            </div>
          </div>
        </div>
      )
    );
  }
}
