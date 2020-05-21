import Link from "next/link";
import React, { useState } from "react";

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
  // const handleDeleteCollection = async (collectionId) => {
  //   await deleteCollection({ collectionId });
  //   refreshData();
  // };

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
            <li key={item.id} className="list-item">
              <Link
                href={{
                  pathname: APP_ROUTES.GAMES,
                  query: { userName, collectionSlug: item.slug },
                }}
                as={`${APP_ROUTES.GAMES}/${userName}/${item.slug}`}
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
