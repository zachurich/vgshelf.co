import Link from "next/link";
import React, { useState } from "react";

import { useParams } from "../../common/hooks";
import { APP_ROUTES } from "../../common/routes";
import { userCanEdit } from "../../common/utils";
import { ButtonToggle } from "../buttons/buttons";
import List from "../list/list";
import Loader from "../loader/loader";
import Title from "../title/title";

function CollectionsList({
  user,
  userName,
  collections,
  showModal,
  handlePrompt,
  isLoading,
  fetchKey,
}) {
  const { collectionSlug } = useParams();
  return (
    <section className="collections-panel">
      <Title header={user ? "Shelves" : `${userName} Shelves`} color="pink">
        {userCanEdit(user, userName) && (
          <ButtonToggle
            additionalClasses="pink"
            handleToggle={() => handlePrompt(true)}
          />
        )}
      </Title>
      {isLoading ? (
        <Loader />
      ) : (
        <List
          filterClass="collections-filter"
          data={collections}
          filtering={{
            enabled: true,
            type: "title",
            inputText: "Search shelves...",
          }}
          listItem={({ item }) => (
            <li
              key={item.id}
              className={`list-item ${
                collectionSlug === item.slug ? "current-page" : ""
              }`}
            >
              <Link
                href={APP_ROUTES.GAMES}
                as={`${APP_ROUTES.GAMES.replace("[userName]", userName).replace(
                  "[collectionSlug]",
                  item.slug
                )}`}
              >
                <a className="">
                  <span>{item.title}</span>
                </a>
              </Link>
            </li>
          )}
        />
      )}
    </section>
  );
}

export default CollectionsList;
