import React from 'react';
import { Flag } from './style/Language';

export const Language = ({ changeLanguage }) => {
  return (
    <div>
      <Flag
        onClick={changeLanguage.bind(null, 'fr')}
        src="https://img.icons8.com/color/48/000000/france.png"
      />
      <Flag
        onClick={changeLanguage.bind(null, 'en')}
        src="https://img.icons8.com/color/48/000000/usa.png"
      />
    </div>
  );
};
