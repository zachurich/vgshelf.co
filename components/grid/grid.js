import React, { useState } from "react";
import Link from "next/link";
import { sortByDate } from "../../common/utils";
import { useFilterData } from "../../common/hooks/useFilterData";

const Grid = ({
  data = [],
  size, // ["small", "med", "large"]
  compareItems = [],
  sortKey = "added",
  filtering = {
    enabled: false,
    type: "title",
    inputText: "Search...",
  },
  gridItem = () => <div />,
}) => {
  const { search, setSearch, filterData } = useFilterData(data, filtering);

  if (!data) return null;

  if (data && !data.length) {
    return (
      <div className="grid-empty">
        <p>No games found.</p>
      </div>
    );
  }

  return (
    <>
      {filtering.enabled && (
        <input
          className="grid-filter"
          type="text"
          value={search}
          placeholder={filtering.inputText}
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
