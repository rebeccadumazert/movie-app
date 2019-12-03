import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { Language } from './Language';
import { NightMode } from './NightMode';

import './style/home.css';

export default function Home(props) {
  const {
    night: { night, changeNightMode },
    lang,
  } = props;
  return (
    <div className={night ? 'containerHomeImgNight' : 'containerHomeImg'}>
      <Link to="/">
        <img
          className="imgHome"
          src="https://img.icons8.com/dusk/64/000000/home.png"
          alt="home"
        />
      </Link>
      <Language language={lang}></Language>
      <SearchBar></SearchBar>
      <NightMode night={night} changeNightMode={changeNightMode}></NightMode>
    </div>
  );
}
