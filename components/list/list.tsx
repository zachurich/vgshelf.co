import Link from "next/link";
import React from "react";

import { useFilterData } from "../../common/hooks/useFilterData";
import { sortByDate } from "../../common/utils";

const List = ({
  data = [],
  filtering = {
    enabled: true,
    type: "title",
    inputText: "Search...",
  },
  filterClass = "",
  listItem = (props) => <div {...props} />,
}) => {
  const { search, setSearch, filterData } = useFilterData(data, filtering);
  if (data && !data.length) {
    return (
      <div className="grid-empty">
        <p>This user has no shelves.</p>
      </div>
    );
  }
  return (
    <>
      {filtering.enabled && (
        <input
          className={`list-filter ${filterClass}`}
          type="text"
          value={search}
          placeholder={filtering.inputText}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
      <ul className="list list-row">
        {data.length > 0 &&
          filterData(sortByDate(data, "created")).map((item, index) =>
            listItem({ item, index })
          )}
      </ul>
    </>
  );
};

export default List;
