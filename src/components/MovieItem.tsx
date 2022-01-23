import "./MovieItem.scss";

import React from "react";
import { Image } from "react-bootstrap";

const MovieItem = ({ title, imgURL, releaseDate, onClick }) => {
  return (
    <div className="movie-item" onClick={onClick}>
      <Image fluid src={`https://image.tmdb.org/t/p/w500${imgURL}`} />
      <div className="movie-title">{title}</div>
      <div className="movie-date">{releaseDate}</div>
    </div>
  );
};

export default MovieItem;
