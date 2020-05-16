import React from "react";
import Link from "next/link";
import { sortByDate } from "../../common/utils";

const List = ({
  data = [],
  userName = null,
  destRoute,
  prettyRoute = destRoute, // optionally override the appearance of the url
  canAdd = false,
}) => {
  if (data && !data.length) {
    return (
      <div className="grid-empty">
        <p>This user has no shelves.</p>
      </div>
    );
  }
  return (
    <ul className="list list-row">
      {data.length > 0 &&
        sortByDate(data, "created").map((item, index) => {
          return (
            <li key={item.id} className="list-item">
              <Link
                href={{
                  pathname: destRoute,
                  query: { userName, collectionSlug: item.slug },
                }}
                as={`${prettyRoute}/${userName}/${item.slug}`}
              >
                <a className="">
                  <span>{item.title}</span>
                </a>
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default List;
