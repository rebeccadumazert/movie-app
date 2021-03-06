import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { searchMovie } from './../services/moviesDb';
import { ResultSearchMovie } from './ResultSearchMovie';
import ResultSearchPerson from './ResultSearchPerson';
import { ResultSearchTv } from './ResultSearchTv';
import './style/searchBar.css';

const MEDIA_URL = {
  person: 'credit',
  movie: 'movie',
  tv: 'tv',
};
class SearchBar extends PureComponent {
  state = {
    userSearch: '',
    resultsSearch: [],
    highlightIndex: -1,
  };

  clearSearchBar = () => {
    this.setState({
      userSearch: '',
      resultsSearch: [],
    });
  };

  async fetchSearchMovie() {
    const {
      data: { results: resultsSearch = [] },
    } = await searchMovie(this.state.userSearch);
    this.setState({
      resultsSearch: resultsSearch.slice(0, 5),
    });
  }

  onChangeSearch = ({ target: { value: userSearch } }) => {
    this.setState({
      userSearch,
      highlightIndex: -1,
    });
  };
  clickBtnSearch = () => {
    this.fetchSearchMovie();
  };

  selectComponent = (result, index) => {
    const isHighLighted = index === this.state.highlightIndex;
    const medias = {
      movie: (
        <ResultSearchMovie
          key={result.id}
          result={result}
          clearSearch={this.clearSearchBar}
          isHighLighted={isHighLighted}
        />
      ),
      person: (
        <ResultSearchPerson
          key={result.id}
          result={result}
          isHighLighted={isHighLighted}
        />
      ),
      tv: (
        <ResultSearchTv
          key={result.id}
          result={result}
          isHighLighted={isHighLighted}
        />
      ),
    };
    return medias[result.media_type];
  };

  enterResearch = ({ keyCode }) => {
    if (keyCode === 13) {
      if (this.state.highlightIndex >= 0) {
        const media = this.state.resultsSearch[this.state.highlightIndex];
        this.props.history.push(`/${MEDIA_URL[media.media_type]}/${media.id}`);
        this.clearSearchBar();
      } else {
        this.fetchSearchMovie();
      }
    }
    if (keyCode === 40) {
      this.setState(({ highlightIndex, resultsSearch }) => {
        return {
          highlightIndex: Math.min(
            highlightIndex + 1,
            resultsSearch.length - 1
          ),
        };
      });
    }
    if (keyCode === 38) {
      this.setState(({ highlightIndex }) => {
        return {
          highlightIndex: Math.max(0, highlightIndex - 1),
        };
      });
    }
    if (keyCode === 27) {
      this.clearSearchBar();
    }
  };

  render() {
    return (
      <div className="searchBarContainer">
        <input
          className="inputSearch"
          value={this.state.userSearch}
          onChange={this.onChangeSearch}
          type="text"
          onKeyDown={this.enterResearch}
        />

        <button className="buttonStyle" onClick={this.clickBtnSearch}>
          <img
            src="https://img.icons8.com/ios-glyphs/30/000000/search.png"
            alt="magnifying glass"
          />
        </button>
        <div className="selectedComponent">
          {this.state.resultsSearch.map((result, i) =>
            this.selectComponent(result, i)
          )}
        </div>
      </div>
    );
  }
}
export default withRouter(SearchBar);
