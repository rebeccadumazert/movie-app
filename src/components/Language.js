import React from 'react';

export const Language = ({ language }) => {
  return (
    <div>
      <select onChange={language.changeLanguage} name="lang" id="">
        <option value="fr">Fr</option>
        <option value="en">En</option>
      </select>
    </div>
  );
};
