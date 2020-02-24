import axios from 'axios';
import { callDiscoverMovies } from './moviesDb';

describe('test call axios for moviesDb', () => {
  afterEach(() => {
    axios.reset();
  });
  // test('callDiscoverMovies should get data from server and return list of movies', async () => {
  //   const catchFn = jest.fn(),
  //     thenFn = jest.fn();
  //   const clientMessage = 'client is saying hello';
  //   callDiscoverMovies(clientMessage)
  //     .then(thenFn)
  //     .catch(catchFn);

  //   expect(mockAxios.get).toHaveBeenCalledWith('/api.themoviedb.org/3/', {
  //     data: clientMessage,
  //   });
  // });
  test('should call axios with good params', async () => {
    axios.get.mockImplementationOnce(() => {
      return Promise.resolve({
        data: { results: ['movie.png'] },
      });
    });
    const response = await callDiscoverMovies('FR');

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/discover/movie',
      {
        params: {
          api_key: 'b35fb14b962b39050406502348353b36',
          language: 'FR',
        },
      }
    );
  });
});
