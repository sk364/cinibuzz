import "./List.scss";

import React, { useState } from "react";
import { Image } from "react-bootstrap";

const List = ({ horizontal, items, pageSize, title }) => {
  const totalPages = items / pageSize;

  const [page, setPage] = useState(0);

  const handleShiftLeft = () => {
    if (page !== 0) {
      setPage(page - 1);
    }
  };

  const handleShiftRight = () => {
    if (page !== totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className={`list-container ${horizontal ? "horizontal" : ""}`}>
      <div className="list-header">
        <div className="title">{title}</div>
        <div className="scroller">
          <div className={`btn ${page === 0 ? "disabled" : ""}`} onClick={handleShiftLeft}>{"<"}</div>
          <div className={`btn ${page === totalPages ? "disabled" : ""}`} onClick={handleShiftRight}>{">"}</div>
        </div>
      </div>
      <div className="list-body">
        {
          items
          ?.slice(page * pageSize, (page * pageSize) + pageSize)
          ?.map((item, idx) => {
            return (
              <div className="item" key={idx.toString()}>
                <Image fluid src={`https://image.tmdb.org/t/p/w500${item.picture}`} />
                <div className="name">{item.name}</div>
                <div className="character">{item.character}</div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

List.defaultProps = {
  pageSize: 4,
}

export default List;
