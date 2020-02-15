import React from "react";
import Link from "next/link";
import { sortByDate } from "../../common/utils";

import "./styles.scss";

const List = ({
  data = [],
  handlePrompt = null,
  destRoute,
  prettyRoute = destRoute, // optionally override the appearance of the url
  handleToggle = () => {},
  handleDelete,
  canAdd = false
}) => {
  return (
    <ul className="list list-row">
      {data.length > 0 &&
        sortByDate(data, "created").map((item, index) => {
          return (
            <li key={item.id} className="list-item" onClick={() => handleToggle(item.id)}>
              <Link
                href={{
                  pathname: destRoute,
                  query: { id: item.id, title: item.title }
                }}
                as={`${prettyRoute}/${item.title.toLowerCase()}/${item.id}`}
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
