import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { Language } from './Language';
import { NightMode } from './NightMode';
import home from './home.png';

import './style/header.css';

export default function Header(props) {
  const {
    night: { night, changeNightMode },
    lang,
    changeLanguage,
  } = props;
  return (
    <div className={night ? 'containerHeaderImgNight' : 'containerHeaderImg'}>
      <Link to="/">
        <img className="imgHeader" src={home} alt="home" />
      </Link>
      <Language language={lang} changeLanguage={changeLanguage}></Language>
      <SearchBar></SearchBar>
      <NightMode night={night} changeNightMode={changeNightMode}></NightMode>
    </div>
  );
}
