import "./MovieList.scss";

import BlockUi from "react-block-ui";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";

import { Loading, Success, Failure } from "../interfaces";
import { fetchMovies, setMoviesInitial } from "../actions";
import SearchBox from "../components/SearchBox";
import Filters from "../components/Filters";
import Grid from "../components/Grid";
import Paginator from "../components/Paginator";

const MovieList = () => {
  const filterItems = [
    {
      id: "upcoming",
      label: "Upcoming",
    },
    {
      id: "28",
      label: "Action",
    },
    {
      id: "35",
      label: "Comedy",
    },
    {
      id: "18",
      label: "Drama",
    },
    {
      id: "53",
      label: "Thriller",
    },
    {
      id: "878",
      label: "Sci-Fi",
    },
    {
      id: "10751",
      label: "Family",
    },
    {
      id: "27",
      label: "Horror",
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const movies = useSelector((state) => state.movies);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQueryParam = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(searchQueryParam);
  const [selectedCategory, setSelectedCategory] = useState("upcoming");
  const [page, setPage] = useState(1);

  const buildReqOptions = () => {
    const options = {};
    if (searchInput.length > 0) {
      options.search = searchInput;
    }

    if (selectedCategory !== "upcoming") {
      options.genre = selectedCategory;
    } else {
      options.listType = selectedCategory;
    }

    options.page = page;

    return options;
  };

  const reqMovies = () => {
    dispatch(fetchMovies(buildReqOptions()));
  };

  useEffect(() => {
    return () => {
      dispatch(setMoviesInitial());
    };
  }, []);

  useEffect(() => {
    const search = searchQueryParam;
    if (search.length === 0) {
      reqMovies();
    }
  }, [searchParams]);

  useEffect(() => {
    setSearchInput(searchQueryParam);
  }, [searchParams]);

  useEffect(() => reqMovies(), [page, selectedCategory]);

  const handleSearch = () => {
    setSearchParams({ search: searchInput });
    reqMovies();
  };

  const handleChangeCategory = (item) => {
    setSelectedCategory(item);
  };

  const handlePageNext = () => {
    if (page + 1 <= movies.data.total_pages) {
      setPage(page + 1);
    }
  };

  const handlePagePrev = () => {
    if (page - 1 >= 0) {
      setPage(page - 1);
    }
  };

  const handlePageTo = (pageNum) => {
    if (pageNum !== page) {
      setPage(pageNum);
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/${movieId}`);
  };

  const isLoading = movies?.type === Loading;
  const isSuccess = movies?.type === Success;
  const isFailure = movies?.type === Failure;

  return (
    <div className="movies-container">
      <SearchBox searchInput={searchInput} onChangeSearchInput={setSearchInput} onSearch={handleSearch} />

      <BlockUi tag="div" blocking={isLoading}>
        <div className="sub-header">
          {searchQueryParam.length > 0 && (
            <div className="sub-header-text">
              Showing results for '<b>{searchInput}</b>'
            </div>
          )}
          {searchQueryParam.length === 0 && (
            <>
              <div className="sub-header-text">Browse movies by category</div>
              <Filters
                items={filterItems}
                selectedItem={selectedCategory}
                onSelectItem={handleChangeCategory} />
            </>
          )}
        </div>

        <>
          {isSuccess && (
            <div className="movies-list">
              <Grid items={movies?.data?.results} onItemClick={handleMovieClick} />
              <Paginator
                currentPage={page}
                totalPages={movies?.data?.total_pages}
                onNext={handlePageNext}
                onPrev={handlePagePrev}
                onGoToPage={handlePageTo} />
            </div>
          )}

          {isFailure && (<div>{movies?.error}</div>)}
        </>
      </BlockUi>
    </div>
  );
};

export default MovieList;
