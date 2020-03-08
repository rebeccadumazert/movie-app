import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Movies from './components/Movies';
import Movie from './components/Movie';
import Actor from './components/Actor';
import Header from './components/Header';
import LanguageContext from './LanguageContext';

import './App.css';
import NightContext from './components/NightContext';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: 'fr',
      changeLanguage: this.changeLanguage,
      night: false,
      changeNightMode: this.changeNightMode,
    };
  }

  changeNightMode = () => {
    this.setState(({ night }) => {
      return {
        night: !night,
      };
    });
  };

  changeLanguage = lang => {
    this.setState({
      lang,
    });
  };
  render() {
    return (
      <NightContext.Provider
        value={{
          night: this.state.night,
          changeNightMode: this.state.changeNightMode,
        }}
      >
        <NightContext.Consumer>
          {night => (
            <LanguageContext.Provider value={this.state}>
              <LanguageContext.Consumer>
                {({ lang, changeLanguage }) => (
                  <BrowserRouter>
                    <Route
                      path="/"
                      render={props => (
                        <Header
                          {...props}
                          lang={lang}
                          changeLanguage={changeLanguage}
                          night={night}
                        ></Header>
                      )}
                    ></Route>
                    <Route
                      exact
                      path="/"
                      render={props => (
                        <Movies
                          {...props}
                          changeLanguage={changeLanguage}
                          lang={lang}
                          night={night}
                        ></Movies>
                      )}
                    ></Route>
                    <Route path="/movie/:id" component={Movie}></Route>
                    <Route path="/credit/:idCredit" component={Actor}></Route>
                  </BrowserRouter>
                )}
              </LanguageContext.Consumer>
            </LanguageContext.Provider>
          )}
        </NightContext.Consumer>
      </NightContext.Provider>
    );
  }
}

export default App;
