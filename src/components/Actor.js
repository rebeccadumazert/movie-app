import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  callDetailCredit,
  callDetailCreditMovie,
} from './../services/moviesDb';

export default class Actor extends Component {
  state = {
    actor: {},
    filmography: [],
  };
  componentDidMount() {
    this.fetchDetailsActor();
    this.fetchCreditMovie();
  }
  async fetchDetailsActor() {
    const {
      match: { params },
    } = this.props;
    const { data: actor } = await callDetailCredit(params.idCredit);
    this.setState({
      actor,
    });
  }
  async fetchCreditMovie() {
    const {
      match: { params },
    } = this.props;
    const {
      data: { cast: filmography },
    } = await callDetailCreditMovie(params.idCredit);
    this.setState(
      {
        filmography,
      },
      () => {
        console.log('toto', this.state.filmography);
      }
    );
  }
  render() {
    const {
      actor: {
        name,
        homepage,
        biography,
        birthday,
        place_of_birth,
        profile_path,
      },
      filmography,
    } = this.state;
    return (
      <div>
        <h1>{name}</h1>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
            alt="actor"
          />
        </div>
        <p>Lieu de naissance : {place_of_birth}</p>
        <p>Anniversaire : {birthday}</p>
        <p>Biographie : {biography}</p>
        {!!homepage && (
          <p>
            Site Web : <a href={homepage}>{homepage}</a>
          </p>
        )}
        <p>
          Filmographie :{' '}
          {filmography.map(movie => (
            <Link to={`/movie/${movie.id}`}>
              <p key={movie.id}>{movie.title}</p>
            </Link>
          ))}
        </p>
      </div>
    );
  }
}
