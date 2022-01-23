import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

const store = (reducer, sagaMiddleware) => {
  const composeFn = process.env.NODE_ENV !== "production"
    ? composeWithDevTools : compose;
  const middlewares = composeFn(applyMiddleware(sagaMiddleware));
  return createStore(reducer, {}, middlewares);
};

export default store;
