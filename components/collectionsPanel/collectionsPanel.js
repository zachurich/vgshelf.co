import React, { useState } from "react";
import { BasicForm } from "../basicForm/basicForm";
import { APP_ROUTES } from "../../common/routes";
import { createCollection, deleteCollection } from "../../api/collectionsApi";
import Title from "../title/title";
import List from "../list/list";
import Loader from "../loader/loader";
import { ButtonToggle } from "../buttons/buttons";
import { userCanEdit } from "../../common/utils";
import useCheckAuth from "../../common/hooks/useCheckAuth";
import Link from "next/link";

function CollectionsPanel({
  user,
  collections,
  userName,
  showModal,
  setShowModal,
  setModalContent,
  isLoading,
  fetchKey,
  refreshData = () => {},
}) {
  const { performAuthCheck } = useCheckAuth();
  const handleToggleModal = async (toggle) => {
    const authed = await performAuthCheck();
    if (!authed) return;
    setModalContent(() => ({
      header: "Create a Shelf",
      component: (
        <BasicForm
          inputName="Create a Shelf"
          placeholder="Shelf Name"
          handleSubmit={handleCreateCollection}
          handleDismiss={() => setShowModal(false)}
          closeText="Cancel"
          submitText="Add Shelf"
        />
      ),
    }));
    setShowModal(toggle || !showModal);
  };

  const handleCreateCollection = async (title) => {
    if (title.length > 0) {
      handleToggleModal(false);
      await createCollection({
        userId: user.sub,
        collectionName: title,
        games: [],
      });
      setShowModal(false);
      refreshData();
    }
  };

  const handleDeleteCollection = async (collectionId) => {
    await deleteCollection({ collectionId });
    refreshData();
  };

  return (
    <section className="collections-panel">
      <Title header={user ? "Shelves" : `${userName} Shelves`} color="pink">
        {userCanEdit(user, userName) && (
          <ButtonToggle
            additionalClasses="pink"
            handleToggle={() => handleToggleModal(true)}
          />
        )}
      </Title>
      {isLoading ? (
        <Loader />
      ) : (
        <List
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

export default CollectionsPanel;
