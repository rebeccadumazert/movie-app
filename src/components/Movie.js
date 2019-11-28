import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    this.setState({ movie }, () => {});
    console.log(this.state.movie);
  }

  async fetchMovieCredits() {
    const {
      match: { params },
    } = this.props;
    const { cast: credits } = await callMovieCredits(params.id);
    this.setState({ credits }, () => {});
    console.log(this.state.credits, 'credit');
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
          <h1
            style={{
              fontFamily: 'Roboto, sans-serif',
              textAlign: 'center',
              margin: '10px',
            }}
          >
            Title: {title}
          </h1>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              height: '500px',
            }}
          >
            <img
              style={{
                borderRadius: '7px',
                height: '100%',
                display: 'block',
              }}
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt="movie cover"
            />
          </div>
          <p>
            Genre :{' '}
            {genres.map(genre => (
              <span>{genre.name} </span>
            ))}
          </p>
          <p>Synopsis: {overview} </p>
          <p>
            Acteurs et actrices :{' '}
            {credits.map(credit => (
              <Link to={`/credit/${credit.id}`}>
                <span>{credit.name} - </span>
              </Link>
            ))}
          </p>
        </div>
      )
    );
  }
}
