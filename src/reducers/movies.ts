import {
  FETCH_MOVIES_INITIAL,
  FETCH_MOVIES_LOADING,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE
} from "../action-types";
import { Initial, Loading, Success, Failure, reducerType, dataType, errorType } from "../interfaces";

interface Action {
  type: reducerType;
  payload: dataType | errorType;
}

const initialState = {
  type: Initial,
  data: [],
  error: {},
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_MOVIES_INITIAL:
      return { type: Initial, data: [], error: {} };
    case FETCH_MOVIES_LOADING:
      return { type: Loading };
    case FETCH_MOVIES_SUCCESS:
      return { type: Success, data: action.payload };
    case FETCH_MOVIES_FAILURE:
      return { type: Failure, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
