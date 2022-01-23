import { takeEvery } from "redux-saga/effects";

import { FETCH_MOVIES, FETCH_MOVIE } from "../action-types";
import { fetchMovies, fetchMovie } from "./movies";

export default function* sagas() {
  yield takeEvery(FETCH_MOVIES, fetchMovies);
  yield takeEvery(FETCH_MOVIE, fetchMovie);
}
