import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import {
  callDetailCredit,
  callDetailCreditMovie,
} from './../services/moviesDb';
import './style/actor.css';

const URL_IMG = 'https://image.tmdb.org/t/p/w500/';

export default class Actor extends PureComponent {
  state = {
    actor: {},
    filmography: [],
  };

  componentDidMount() {
    this.fetchActorData();
  }
  componentDidUpdate({
    match: {
      params: { idCredit: id },
    },
  }) {
    const {
      match: {
        params: { idCredit },
      },
    } = this.props;
    if (idCredit !== id) {
      this.fetchActorData();
    }
  }

  fetchActorData = () => {
    this.fetchDetailsActor();
    this.fetchCreditMovie();
  };

  async fetchDetailsActor() {
    const {
      match: {
        params: { idCredit },
      },
    } = this.props;
    const { data: actor } = await callDetailCredit(idCredit);
    this.setState({
      actor,
    });
  }
  async fetchCreditMovie() {
    const {
      match: {
        params: { idCredit },
      },
    } = this.props;
    const {
      data: { cast: filmography },
    } = await callDetailCreditMovie(idCredit);
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
        place_of_birth: placeOfBirth,
        profile_path: profilePath,
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
              !profilePath
                ? `http://cul7ure.fr/wp-content/uploads/2017/09/1216-1024x1024.jpg`
                : `${URL_IMG}${profilePath}`
            }
            alt="pix actor/actress"
          />

          <div className="infoActorContainer">
            <p>Lieu de naissance : {placeOfBirth}</p>
            <p>Anniversaire : {birthday}</p>
            <p>Biographie : {biography}</p>
            {!!homepage && (
              <p>
                Site Web :{' '}
                <a target={'_blank'} href={homepage}>
                  {homepage}
                </a>
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
