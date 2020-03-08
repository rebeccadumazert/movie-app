import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './style/movie.css';

import { callDetailsMovie, callMovieCredits } from './../services/moviesDb';

const IMAGE_DEFAULT =
  'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/86498628_2381987375236631_9128895929007472640_n.jpg?_nc_cat=107&_nc_sid=110474&_nc_ohc=s94zp1umFVkAX92o2sj&_nc_ht=scontent-cdg2-1.xx&oh=37baf71ea865a47d73e637c775fb3056&oe=5E9292F7';
const URL_IMG = 'https://image.tmdb.org/t/p/w500/';
export default class Movie extends PureComponent {
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
      match: {
        params: { id },
      },
    } = this.props;
    const movie = await callDetailsMovie(id);
    this.setState({ movie });
  }

  async fetchMovieCredits() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { cast: credits } = await callMovieCredits(id);
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
          <h1 className="titleMovie">{title}</h1>
          <div className="containerMovie">
            <div className="containerImgMovie">
              <img
                className="imgMovie"
                src={!poster_path ? IMAGE_DEFAULT : `${URL_IMG}${poster_path}`}
                alt="movie cover"
              />
            </div>
            <div className="infoMovie">
              <p>
                Genre :
                {genres.map(({ id, name }) => (
                  <span key={id}> {name} </span>
                ))}
              </p>
              <p>Synopsis : {overview} </p>Acteurs et actrices :
              <div className="containerActorInfo">
                {credits.map(({ id, name, profile_path }) => (
                  <Link className="actorName" key={id} to={`/credit/${id}`}>
                    <div className="actorImageContainer">
                      <img
                        className="actorImage"
                        src={
                          !profile_path
                            ? IMAGE_DEFAULT
                            : `${URL_IMG}${profile_path}`
                        }
                        alt=""
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}
