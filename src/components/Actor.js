import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  callDetailCredit,
  callDetailCreditMovie,
} from './../services/moviesDb';
import './style/actor.css';

export default class Actor extends Component {
  state = {
    actor: {},
    filmography: [],
  };

  componentDidMount() {
    this.fetchActorData();
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.idCredit !== prevProps.match.params.idCredit) {
      this.fetchActorData();
    }
  }

  fetchActorData = () => {
    this.fetchDetailsActor();
    this.fetchCreditMovie();
  };

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
    this.setState({
      filmography,
    });
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
        <h1 className="titleActor">{name}</h1>
        <div className="containerImgActor">
          <img
            className="imgActor"
            src={
              !profile_path
                ? `http://cul7ure.fr/wp-content/uploads/2017/09/1216-1024x1024.jpg`
                : `https://image.tmdb.org/t/p/w500/${profile_path}`
            }
            alt="actor"
          />

          <div className="infoActorContainer">
            <p>Lieu de naissance : {place_of_birth}</p>
            <p>Anniversaire : {birthday}</p>
            <p>Biographie : {biography}</p>
            {!!homepage && (
              <p>
                Site Web : <a href={homepage}>{homepage}</a>
              </p>
            )}
            <div>
              Filmographie :{' '}
              {filmography.map(movie => (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <p>{movie.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
