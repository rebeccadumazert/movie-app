import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import './style/resultSearch.css';

class RsltSearchMovie extends PureComponent {
  navigate = id => {
    const {
      history: { push },
      clearSearch,
    } = this.props;
    push(`/movie/${id}`);
    clearSearch();
  };

  render() {
    const {
      result: { original_title, poster_path, id },
      isHighLighted,
    } = this.props;
    return (
      <div className={isHighLighted ? 'isHighLightedResult' : 'resultMovie'}>
        <div
          className="containerImgSearch"
          onClick={this.navigate.bind(null, id)}
        >
          <img
            src={
              !poster_path
                ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiBjnCHmg6X7YGEZ4vY_sYT1bcYtwzFYDFujnWyyOhCmzuV_421w&s'
                : `https://image.tmdb.org/t/p/w500/${poster_path}`
            }
            alt=""
          />
        </div>
        <p className="titleSearch">{original_title}</p>
      </div>
    );
  }
}
export const ResultSearchMovie = withRouter(RsltSearchMovie);
