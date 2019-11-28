import axios from 'axios';
import { auth } from './auth';

export async function callDiscoverMovies() {
  const {
    data: { results: movies },
  } = await axios.get('https://api.themoviedb.org/3/discover/movie', {
    params: auth,
  });
  return movies;
}

export async function callDetailsMovie(id) {
  const { data: movie } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}`,
    {
      params: auth,
    }
  );
  return movie;
}

export async function callMovieCredits(id) {
  const { data: movie } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits`,
    {
      params: auth,
    }
  );
  return movie;
}

export async function callDetailCredit(id) {
  const results = await axios.get(`https://api.themoviedb.org/3/person/${id}`, {
    params: auth,
  });
  return results;
}

export async function callDetailCreditMovie(id) {
  const results = await axios.get(
    `https://api.themoviedb.org/3/person/${id}/movie_credits`,
    {
      params: auth,
    }
  );
  return results;
}
