import React, { Component } from 'react';
import './style/resultSearch.css';

export default class ResultSearchTv extends Component {
  render() {
    const {
      result: { original_name, poster_path },
      isHighLighted,
    } = this.props;
    return (
      <div className={isHighLighted ? 'isHighLightedResult' : 'resultMovie'}>
        <div className="containerImgSearch">
          <img
            src={
              !poster_path
                ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiBjnCHmg6X7YGEZ4vY_sYT1bcYtwzFYDFujnWyyOhCmzuV_421w&s'
                : `https://image.tmdb.org/t/p/w500/${poster_path}`
            }
            alt=""
          />
        </div>
        <p className="titleSearch">{original_name}</p>
      </div>
    );
  }
}
