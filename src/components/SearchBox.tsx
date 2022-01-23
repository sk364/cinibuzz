import "./SearchBox.scss";

import React from "react";

interface Props {
  searchInput?: string;
  onChangeSearchInput: (text: string) => void;
  onSearch: () => void;
}

const SearchBox = ({ searchInput, onChangeSearchInput, onSearch }: Props) => {
  const getTimePeriod = () => {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 5 && hours < 12) {
      return "morning";
    } else if (hours >= 12 && hours < 18) {
      return "afternoon";
    } else if (hours >= 18 && hours < 22) {
      return "evening";
    } else {
      return "night";
    }
  };

  const handleSearch = (event) => {
    const { value } = event?.target;
    onChangeSearchInput(value);
  };

  return (
    <div className="search-box">
      <div className="heading">Find perfect movie for the <b>{getTimePeriod()}</b></div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Search movie"
          value={searchInput}
          onChange={handleSearch} />
        <button
          type="button"
          className={`btn search-btn ${searchInput.length === 0 ? "disabled" : ""}`}
          onClick={onSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

SearchBox.defaultProps = {
  searchInput: "",
};

export default SearchBox;
