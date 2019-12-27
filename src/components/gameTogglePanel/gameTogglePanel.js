import get from "lodash/get";
import React from "react";
import Grid from "../grid/grid";
import { fetchGames } from "../../api/gamesApi";
import { ENDPOINTS } from "../../../common/routes";
import { useDataFetch } from "../../common/hooks";
import GameToggleItem from "../gameToggleItem/gameToggleItem";
import "./styles.scss";
import ArrowSVG from "../../assets/arrow.svg";
import { getColor } from "../../common/utils";
import Title from "../title/title";

function GameTogglePanel({
  handleToggleGame,
  handleClosePanel,
  currentCollectionGames,
  user
}) {
  // currentCollectionGames is used to compare all games to what games the user has in the collection

  let fetchUrl = ENDPOINTS.GAME;
  const { data: games, error } = useDataFetch({ user: get(user, "id") }, fetchUrl);

  return (
    <section className="games-toggle-panel">
      <button
        className="games-toggle-panel-close button button-secondary"
        onClick={handleClosePanel}
      >
        <a>
          <ArrowSVG stroke={getColor("--main-blue")} />
        </a>
      </button>
      <Title header={"Add to Shelf"} borderColor="blue" />
      {/* This component should contain all games - Search/Toggle in collection*/}
      <Grid
        data={games || []}
        compareItems={currentCollectionGames}
        size="small"
        handleToggle={handleToggleGame}
        gridItem={props => <GameToggleItem handleToggle={handleToggleGame} {...props} />}
      />
    </section>
  );
}

export default GameTogglePanel;
