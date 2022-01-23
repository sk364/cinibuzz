import "./MovieDetail.scss";

import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import List from "../components/List";
import { fetchMovie, setMovieInitial } from "../actions";
import { LANGUAGE_CODES_MAP } from "../constants";

const MovieDetail = ({ match }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedTab, setSelectedTab] = useState("mostPopular");

  const movie = useSelector((state) => state.movie);

  useEffect(() => {
    return () => {
      dispatch(setMovieInitial());
    };
  }, []);

  useEffect(() => {
    dispatch(fetchMovie(id));
  }, [id]);

  const handleChangeTab = (tab) => {
    setSelectedTab(tab);
  };

  const {
    backdrop_path: imgURL,
    poster_path: posterImgURL,
    title,
    release_date: releaseDate,
    genres,
    vote_average: voteAvg,
    overview,
    status,
    revenue,
    budget,
    original_language: langCode,
    cast,
    directors,
    screenwriters,
    keywords,
    recommendations,
    runtime
  } = movie?.data || {};

  const formatMovieLength = (runtime) => {
    if (runtime) {
      const hours = Math.floor(runtime / 60);
      const minutes = runtime - (hours * 60);

      let movieLength = "";
      if (hours !== 0) {
        movieLength += `${hours}h `;
      }

      if (minutes !== 0) {
        movieLength += `${minutes}m`;
      }

      return movieLength;
    }

    return "";
  };

  const handleMovieClick = (movieId) => {
    navigate(`/cinibuzz/${movieId}`);
  };

  const rating = voteAvg * 10;
  let ratingColor = "red";
  if (rating > 33 && rating <= 66) {
    ratingColor = "orange";
  } else if (rating > 66) {
    ratingColor  = "green";
  }

  return (
    <div className="movie-details-container">
      <div className="banner">
        {imgURL && <Image fluid src={`https://image.tmdb.org/t/p/w500${imgURL}`} />}
        <div className="basic-details">
          <div className="title">{title}</div>
          <div className="release-date">{releaseDate} &nbsp;&nbsp;&nbsp;|</div>
          <div className="genre">{genres?.map((genre) => genre.name).join(", ")} &nbsp;&nbsp;&nbsp;| </div>
          <div className="movie-length">{formatMovieLength(runtime)}</div>
          <div className="rating-container">
            <div className="rating-label">User Score</div>
            <div className="rating-value">
              <div className={ratingColor}>{rating}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="more-info">
        <div className="overview-wrap">
          <div className="sub-heading">Overview</div>
          <div className="overview">
            {overview}
          </div>

          <div className="crew">
            <div className="directors">
              <>
                {directors?.slice(0, 2)?.map((director, idx) => {
                  return (
                    <div className="director" key={idx.toString()}>
                      <div className="name">{director.name}</div>
                      <div className="role">Director</div>
                    </div>
                  );
                })}

                {screenwriters?.slice(0, 2)?.map((writer, idx) => {
                  return (
                    <div className="director" key={idx.toString()}>
                      <div className="name">{writer.name}</div>
                      <div className="role">Screenplay</div>
                    </div>
                  );
                })}
              </>
            </div>
          </div>
        </div>

        <div className="financials">
          <div className="status">
            <div className="label">Status</div>
            <div className="value">{status}</div>
          </div>
          <div className="lang">
            <div className="label">Original Language</div>
            <div className="value">{LANGUAGE_CODES_MAP[langCode] || ""}</div>
          </div>
          <div className="budget">
            <div className="label">Budget</div>
            <div className="value">${new Intl.NumberFormat().format(budget)}</div>
          </div>
          <div className="revenue">
            <div className="label">Revenue</div>
            <div className="value">${new Intl.NumberFormat().format(revenue)}</div>
          </div>
        </div>
      </div>

      <div className="cast">
        <List horizontal items={cast} title="Cast" />
      </div>

      <div className="media-keywords">
        <div className="media">
          <div className="sub-heading">Media</div>
          <div className="tabs">
            <div
              className={`tab ${selectedTab === "mostPopular" ? "selected" : ""}`}
              onClick={() => handleChangeTab("mostPopular")}>
              Most Popular
            </div>
            <div
              className={`tab ${selectedTab === "videos" ? "selected" : ""}`}
              onClick={() => handleChangeTab("videos")}>
              Videos
            </div>
            <div
              className={`tab ${selectedTab === "backdrops" ? "selected" : ""}`}
              onClick={() => handleChangeTab("backdrops")}>
              Backdrops
            </div>
            <div
              className={`tab ${selectedTab === "posters" ? "selected" : ""}`}
              onClick={() => handleChangeTab("posters")}>
              Posters
            </div>
          </div>

          <div className="content">
            <>
              {selectedTab === "mostPopular" && (
                <Image fluid src={`https://image.tmdb.org/t/p/w500${imgURL}`} />
              )}

              {selectedTab === "videos" && (
                <div>Look out for this feature, coming out soon!</div>
              )}

              {selectedTab === "backdrops" && (
                <Image className="backdrop" fluid src={`https://image.tmdb.org/t/p/w500${imgURL}`} />
              )}

              {selectedTab === "posters" && (
                <Image className="poster" fluid src={`https://image.tmdb.org/t/p/w500${posterImgURL}`} />
              )}
            </>
          </div>
        </div>

        <div className="keywords">
          <div className="sub-heading">Keywords</div>
          <div className="content">
            {keywords?.map((keyword, idx) => {
              return (
                <div className="keyword" key={idx.toString()}>
                  {keyword}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="recommendations">
        <div className="sub-heading">Recommendations</div>
        <div className="content">
          {recommendations?.slice(0, 3)?.map((recommendation, idx) => {
            return (
              <div
                key={idx.toString()}
                className="recommendation"
                onClick={() => handleMovieClick(recommendation.id)}>
                <Image fluid src={`https://image.tmdb.org/t/p/w500${recommendation.imgURL}`} />
                <div className="title">{recommendation.title}</div>
                <div className="rating">{`${recommendation.rating.toFixed(2)}%`}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
