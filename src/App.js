import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import AllFilms from './components/AllFilms';
import Movie from './components/Movie';
import Actor from './components/Actor';
import Home from './components/Home';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Home}></Route>
      <Route exact path="/" component={AllFilms}></Route>
      <Route path="/movie/:id" component={Movie}></Route>
      <Route path="/credit/:idCredit" component={Actor}></Route>
    </BrowserRouter>
  );
}

export default App;
