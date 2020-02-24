import axios from 'axios';
import { auth } from './auth';

const START_URL = 'https://api.themoviedb.org/3/';

export async function callDiscoverMovies(language) {
  const {
    data: { results: movies },
  } = await axios.get(`${START_URL}discover/movie`, {
    params: { ...auth, language },
  });
  return movies;
}

export async function callDetailsMovie(id) {
  const { data: movie } = await axios.get(`${START_URL}movie/${id}`, {
    params: auth,
  });
  return movie;
}

export async function callMovieCredits(id) {
  const { data: movie } = await axios.get(`${START_URL}movie/${id}/credits`, {
    params: auth,
  });
  return movie;
}

export async function callDetailCredit(id) {
  const results = await axios.get(`${START_URL}person/${id}`, {
    params: auth,
  });
  return results;
}

export async function callDetailCreditMovie(id) {
  const results = await axios.get(`${START_URL}person/${id}/movie_credits`, {
    params: auth,
  });
  return results;
}

export async function searchMovie(query) {
  const results = await axios.get(`${START_URL}search/multi`, {
    params: { ...auth, query: query },
  });
  return results;
}
