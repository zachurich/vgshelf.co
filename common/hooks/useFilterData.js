import React, { useState } from "react";

export const useFilterData = (
  data,
  filtering = {
    enabled: false,
    type: "title",
    limit: null,
  }
) => {
  const [search, setSearch] = useState("");
  // Data passes thru as is if filtering is not enabled
  const filterData = (data) => {
    if (!filtering.enabled) {
      return data;
    }
    return data
      .filter((item) => {
        if (item) {
          console.log(item);
          return (
            item[filtering.type].includes(search) ||
            item[filtering.type].toLowerCase().includes(search.toLowerCase())
          );
        }
      })
      .slice(0, filtering.limit || data.length);
  };

  return { search, setSearch, filterData };
};
