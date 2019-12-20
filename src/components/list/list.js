import "./list.scss";
import React from "react";
import Link from "next/link";

const List = ({
  data = [],
  handlePrompt = null,
  destRoute,
  prettyRoute,
  handleToggle = () => {},
  handleDelete,
  canAdd = false
}) => {
  return (
    <ul className="list list-row">
      {data.length > 0 &&
        data.map((item, index) => {
          return (
            <li key={item.id} className="list-item" onClick={() => handleToggle(item.id)}>
              <Link
                href={{
                  pathname: destRoute,
                  query: { id: item.id, title: item.title }
                }}
                as={`${prettyRoute}/${item.title}/${item.id}`}
              >
                <a className="">
                  <span>{item.title}</span>
                </a>
              </Link>
            </li>
          );
        })}
      {canAdd && handlePrompt && (
        <div className="item-add" onClick={() => handlePrompt(true)}>
          <span className="list-add-item">+</span>
        </div>
      )}
    </ul>
  );
};

export default List;
