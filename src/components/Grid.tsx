import "./Grid.scss";

import React from "react";
import { Table } from "react-bootstrap";

import MovieItem from "./MovieItem";

interface Props {
  items: Array<object>;
  onItemClick: (itemId: number | string) => void;
}

const Grid = ({ items, onItemClick }: Props) => {
  const numCols = 4;
  const numRows = Math.ceil(items.length / numCols);

  return (
    <div className="grid-container">
      <Table responsive>
        <tbody>
          {
            Array.apply(null, Array(numRows)).map((_, rowIdx) => {
              return (
                <tr key={rowIdx.toString()}>
                  {Array.apply(null, Array(numCols)).map((_, colIdx) => {
                    const item = items[(rowIdx * numCols) + colIdx];

                    if (!item) return;

                    return (
                      <td key={colIdx.toString()}>
                        <MovieItem
                          title={item.title}
                          imgURL={item.poster_path}
                          releaseDate={item.release_date}
                          onClick={() => onItemClick(item.id)} />
                      </td>
                    );
                  })}
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    </div>
  );
};

export default Grid;
