import {
  FETCH_MOVIES,
  FETCH_MOVIE,
  FETCH_MOVIES_INITIAL,
  FETCH_MOVIES_LOADING,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIE_INITIAL,
  FETCH_MOVIE_LOADING,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAILURE
} from "../action-types";

export const fetchMovies = (options) => ({
  type: FETCH_MOVIES,
  payload: options,
});

export const setMoviesInitial = () => ({
  type: FETCH_MOVIES_INITIAL,
});

export const setMoviesLoading = () => ({
  type: FETCH_MOVIES_LOADING,
});

export const setMoviesFailure = (err) => ({
  type: FETCH_MOVIES_FAILURE,
  payload: err
});

export const rcvMovies = (movies) => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: movies,
});

export const fetchMovie = (id) => ({
  type: FETCH_MOVIE,
  payload: { id }
});

export const setMovieInitial = () => ({
  type: FETCH_MOVIE_INITIAL,
});

export const setMovieLoading = () => ({
  type: FETCH_MOVIE_LOADING,
});

export const setMovieFailure = (err) => ({
  type: FETCH_MOVIE_FAILURE,
  payload: err
});

export const rcvMovie = (movie) => ({
  type: FETCH_MOVIE_SUCCESS,
  payload: movie,
});
