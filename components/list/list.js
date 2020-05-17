import React from "react";
import Link from "next/link";
import { sortByDate } from "../../common/utils";
import { useFilterData } from "../../common/hooks/useFilterData";

const List = ({
  data = [],
  filtering = {
    enabled: true,
    type: "title",
    inputText: "Search...",
  },
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
          className="list-filter"
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
