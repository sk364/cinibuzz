import "./Filters.scss";

import React from "react";

const Filters = ({ items, selectedItem, onSelectItem }) => {
  return (
    <div className="filter-container">
      {items.map((item) => {
        return (
          <div
            key={item.id}
            className={`filter-label ${item.id === selectedItem ? "selected" : ""}`}
            onClick={() => onSelectItem(item.id)}>
            {item.label}
          </div>
        );
      })}
    </div>
  );
};

export default Filters;
