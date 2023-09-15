import axios from 'axios';
// import { API_KEY } from 'react-native-dotenv';

const apiKey = process.env.apiKey!;

//endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

//dynamic endpoints
const movieDetailsEndpoint = (id: number) =>
  `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;

const movieCreditEndpoint = (id: number) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;

const movieSimilarEndpoint = (id: number) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

const personDetailsEndpoint = (id: number) =>
  `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;

const personMoviesEndpoint = (id: number) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

//Image Poster sizes
export const image500w = (path: string) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;

export const image342w = (path: string) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;

export const image185w = (path: string) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

//fallback images
export const fallbackPersonImage =
  'https://c8.alamy.com/comp/MFEXXE/photo-not-available-icon-isolated-on-white-background-vector-illustration-MFEXXE.jpg';

export const fallbackMoviePoster =
  'https://static.spotapps.co/assets/widgets/loading.gif';

//api function
const apiCall = async (endpoint: string, params?: any) => {
  const options = {
    method: 'GET',
    url: endpoint,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTk5ZDljZDU4ZjU3ODZmZWNlMTdjYzlkYTQyMTZkMCIsInN1YiI6IjY1MDM3MDI5ZWZlYTdhMDExYWI5NWNmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1dy1b-F3pAnQrjV-REQoqh7AZDyWq6p8PjfXrF4w6Zc`, //${process.env.apiToken as string}`
    },
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log('error :', error);
  }
};

//get trendingMovies
export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};

//get upcoming movies
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
};

//get topRated movies
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};

//fetch movie details
export const fetchMovieDetails = (id: number) => {
  return apiCall(movieDetailsEndpoint(id));
};

//fetch movie credits
export const fetchMovieCredits = (id: number) => {
  return apiCall(movieCreditEndpoint(id));
};

//fetch similar movies
export const fetchSimilarMovies = (id: number) => {
  return apiCall(movieSimilarEndpoint(id));
};

//fetch person details
export const fetchPersonDetails = (id: number) => {
  return apiCall(personDetailsEndpoint(id));
};

//fetch person movies
export const fetchPersonMovies = (id: number) => {
  return apiCall(personMoviesEndpoint(id));
};

//search movie param
export const searchMovies = (params: {}) => {
  return apiCall(searchMoviesEndpoint, params);
};
