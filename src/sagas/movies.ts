import { put } from "redux-saga/effects";

import {
  setMoviesLoading,
  setMovieLoading,
  setMoviesFailure,
  setMovieFailure,
  rcvMovies,
  rcvMovie,
} from "../actions";
import { transformMovieDetails } from "../utils";

const BASE_API_URL = "https://api.themoviedb.org/3";
const API_KEY = "320854ae9ddd07a5edfc94fc798ffc31";

function* fetchMovies(action) {
  const { payload } = action;

  let url = BASE_API_URL;
  if (payload.search?.length > 0) {
    url += `/search/movie?query=${payload.search}`;
  } else if (payload.listType) {
    url += `/movie/${payload.listType}`;
  } else if (payload.genre) {
    url += `/discover/movie?with_genres=${payload.genre}`;
  } else{
    url += `/movie/upcoming`;
  }

  url += (url.includes("?") ? "&" : "?") + `api_key=${API_KEY}`;
  url += `&page=${payload.page || 1}`;

  try {
    yield put(setMoviesLoading());

    const movies = yield fetch(url).then(data => data.json());
    yield put(rcvMovies(movies));
  } catch(err) {
    console.log(err);
    yield put(setMoviesFailure(err));
  }
}

function* fetchMovie(action) {
  const { payload } = action;
  const { id } = payload;

  const urls = [
    `${BASE_API_URL}/movie/${id}?api_key=${API_KEY}`,
    `${BASE_API_URL}/movie/${id}/credits?api_key=${API_KEY}`,
    `${BASE_API_URL}/movie/${id}/keywords?api_key=${API_KEY}`,
    `${BASE_API_URL}/movie/${id}/recommendations?api_key=${API_KEY}`,
  ];

  try {
    yield put(setMovieLoading());

    const [details, credits, keywords, recommendations] = yield Promise
      .all(urls.map((url) => fetch(url).then(data => data.json())))

    yield put(rcvMovie(transformMovieDetails(details, credits, keywords, recommendations)));
  } catch(err) {
    console.log(err);
    yield put(setMovieFailure(err));
  }
}

export {
  fetchMovies,
  fetchMovie
};
