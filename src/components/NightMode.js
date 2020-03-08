import React from 'react';
import './style/nightMode.css';

export const NightMode = ({ night, changeNightMode }) => {
  return (
    <div className="nightMode">
      {!night && (
        <div className="moonSun">
          <img
            src="https://img.icons8.com/dusk/64/000000/sun.png"
            alt="icon sun"
          />
        </div>
      )}
      {night && (
        <div className="moonSun">
          <img
            src="https://img.icons8.com/dusk/64/000000/new-moon.png"
            alt="icon Night"
          ></img>
        </div>
      )}
      <label className="label">
        <div className="toggle">
          <input
            onChange={changeNightMode}
            className="toggle-state"
            type="checkbox"
            name="check"
            checked={night}
          />
          <div className="toggle-inner">
            <div className="indicator"></div>
          </div>
          <div className="active-bg"></div>
        </div>
      </label>
    </div>
  );
};
