import React, { useState } from "react";
import Link from "next/link";
import { sortByDate } from "../../common/utils";

const Grid = ({
  data = [],
  size, // ["small", "med", "large"]
  compareItems = [],
  sortKey = "added",
  filtering = {
    enabled: false,
    type: "title",
  },
  handleClickItem = () => {},
  gridItem = () => {},
}) => {
  const [search, setSearch] = useState("");

  if (!data) return null;

  if (data && !data.length) {
    return (
      <div className="grid-empty">
        <p>No games found.</p>
      </div>
    );
  }

  // Data passes thru as is if filtering is not enabled
  const filterData = (data) => {
    if (!filtering.enabled) {
      return data;
    }
    return data
      .filter((item) => {
        return (
          item[filtering.type].includes(search) ||
          item[filtering.type].toLowerCase().includes(search.toLowerCase())
        );
      })
      .slice(0, filtering.limit || data.length);
  };

  return (
    <>
      {filtering.enabled && (
        <input
          className="grid-filter"
          type="text"
          value={search}
          placeholder="Search by Title..."
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
      <ul className={`grid grid-${size}`}>
        {filterData(sortByDate(data, sortKey)).map((item, index) => {
          const itemAlreadyToggled = compareItems
            .map((item) => item.id)
            .includes(item.id);
          return (
            <React.Fragment key={item.id}>
              {gridItem({
                item,
                itemAlreadyToggled,
              })}
            </React.Fragment>
          );
        })}
      </ul>
    </>
  );
};

export default Grid;
