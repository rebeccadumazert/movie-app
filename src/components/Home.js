import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import './style/home.css';

export default function Home() {
  return (
    <div className="containerHomeImg">
      <Link to="/">
        <img
          className="imgHome"
          src="https://img.icons8.com/dusk/64/000000/home.png"
          alt="home"
        />
      </Link>
      <SearchBar></SearchBar>
    </div>
  );
}
