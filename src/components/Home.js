import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <Link to="/">
        <img
          style={{ margin: '10px' }}
          src="https://img.icons8.com/dusk/64/000000/home.png"
          alt="home"
        />
      </Link>
    </div>
  );
}
