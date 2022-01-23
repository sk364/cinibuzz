import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import createMiddleware from "redux-saga";

import PageLayout from "./components/PageLayout";
import MovieList from "./screens/MovieList";
import MovieDetail from "./screens/MovieDetail";

import configureStore from "./store";
import reducer from "./reducers";
import sagas from "./sagas";

const sagaMiddleware = createMiddleware();
const store = configureStore(reducer, sagaMiddleware);

sagaMiddleware.run(sagas);

const NoMatch = () => {
  return <div>Nothing here</div>;
};

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/cinibuzz" element={<MovieList />} />
          <Route path="/cinibuzz/:id" element={<MovieDetail />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
