import React, { Component } from 'react';
import './style/resultSearch.css';

export default class ResultSearchPerson extends Component {
  render() {
    const {
      result: { name, profile_path },
      isHighLighted,
    } = this.props;
    return (
      <div className={isHighLighted ? 'isHighLightedResult' : 'resultMovie'}>
        <div className="containerImgSearch">
          <img
            src={
              !profile_path
                ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiBjnCHmg6X7YGEZ4vY_sYT1bcYtwzFYDFujnWyyOhCmzuV_421w&s'
                : `https://image.tmdb.org/t/p/w500/${profile_path}`
            }
            alt=""
          />
        </div>
        <p className="titleSearch">{name}</p>
      </div>
    );
  }
}
