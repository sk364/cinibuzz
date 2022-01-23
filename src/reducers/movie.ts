import {
  FETCH_MOVIE_INITIAL,
  FETCH_MOVIE_LOADING,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAILURE
} from "../action-types";
import { Initial, Loading, Success, Failure, reducerType, dataType, errorType } from "../interfaces";

interface Action {
  type: reducerType;
  payload: dataType | errorType;
}

const initialState = {
  type: Initial,
  data: {},
  error: {},
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_MOVIE_INITIAL:
      return { type: Initial, data: {}, error: {} };
    case FETCH_MOVIE_LOADING:
      return { type: Loading };
    case FETCH_MOVIE_SUCCESS:
      return { type: Success, data: action.payload };
    case FETCH_MOVIE_FAILURE:
      return { type: Failure, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
