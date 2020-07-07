import { mutate } from "@zeit/swr";
import _ from "lodash";
import React from "react";

import { useCollectionsFetch, useParams } from "../../common/hooks";
import useCheckAuth from "../../common/hooks/useCheckAuth";
import useModal from "../../common/hooks/useModal";
import { scrollTop } from "../../common/utils";
import { CollectionForm } from "../collectionForm/collectionForm";
import CollectionsList from "../collectionsList/collectionsList";

const CollectionsPanel = ({
  user,
  collections = [],
  collectionsCacheKey,
  isCollectionsLoading,
}) => {
  const { userName } = useParams();
  const { showModal, setShowModal } = useModal();
  const { performAuthCheck } = useCheckAuth();

  const handleToggleModal = async (toggle) => {
    const authed = await performAuthCheck();
    if (!authed) return;
    scrollTop();
    setShowModal(() => toggle || !showModal);
  };
  return (
    <section className="panel-right">
      <CollectionsList
        user={user}
        userName={userName}
        collections={collections}
        isLoading={isCollectionsLoading && !collections.length}
        fetchKey={collectionsCacheKey}
        showModal={showModal}
        handlePrompt={handleToggleModal}
        refreshData={() => trigger(collectionsCacheKey)}
      />
      <CollectionForm
        user={user}
        isOpen={showModal}
        inputName="Create a Shelf"
        placeholder="Shelf Name"
        handleToggleModal={handleToggleModal}
        closeText="Cancel"
        submitText="Add Shelf"
        refreshData={(data) => {
          mutate(collectionsCacheKey, { collections: data });
        }}
      />
    </section>
  );
};

export default CollectionsPanel;
