import { mutate } from "@zeit/swr";
import _ from "lodash";
import React from "react";

import { useParams } from "../../common/hooks";
import useCheckAuth from "../../common/hooks/useCheckAuth";
import useModal from "../../common/hooks/useModal";
import { scrollTop } from "../../common/utils";
import GamesGrid from "../gamesGrid/gamesGrid";
import { SearchForm } from "../searchForm/searchForm";

const GamesPanel = ({ user, games = [], gamesCacheKey, isGamesLoading }) => {
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
    <>
      <GamesGrid
        user={user}
        userName={userName}
        games={games}
        isLoading={isGamesLoading && !games.length}
        fetchKey={gamesCacheKey}
        showModal={showModal}
        handlePrompt={handleToggleModal}
      />
      <SearchForm
        user={user}
        isOpen={showModal}
        inputName="Search by Game Title"
        placeholder="Game Title"
        closeText="Cancel"
        handleToggleModal={handleToggleModal}
        refreshData={(data) => {
          mutate(gamesCacheKey, { games: data });
        }}
      />
    </>
  );
};

export default GamesPanel;
