import React from "react";
import Grid from "../grid/grid";
import { fetchGames } from "../../api/gamesApi";
import { ENDPOINTS } from "../../../common/routes";
import { useDataFetch } from "../../common/hooks";

function GameTogglePanel({
  handleToggleGame,
  handleClosePanel,
  currentCollectionGames,
  user
}) {
  // currentCollectionGames is used to compare all games to what games the user has in the collection

  let fetchUrl = ENDPOINTS.GAME;
  const { data: games, error } = useDataFetch({ user: user.id }, fetchUrl);

  return (
    <section
      className="toggle-games"
      style={{
        minHeight: "calc(100vh - 94px)"
      }}
    >
      <button className="button submit" onClick={handleClosePanel}>
        <a>Close</a>
      </button>
      {/* This component should contain all games - Search/Toggle in collection*/}
      <Grid
        data={games || []}
        compareItems={currentCollectionGames}
        size="small"
        handleToggle={handleToggleGame}
      />
    </section>
  );
}

export default GameTogglePanel;
