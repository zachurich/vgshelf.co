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
import Loader from "../loader/loader";

function GameTogglePanel({
  handleToggleGame, // add/remove game from collection
  handleClosePanel, // close this panel
  currentCollectionGames, // used to compare all games to what games the user has in the collection
  user // available when logged in
}) {
  const { data, error } = useDataFetch({ user: get(user, "id") }, ENDPOINTS.GAME);
  const games = get(data, "games", null);

  return (
    <section className="games-toggle-panel">
      <button
        className="games-toggle-panel-close button button-toggle button-secondary"
        onClick={handleClosePanel}
      >
        <a>
          <ArrowSVG stroke={getColor("--main-blue") || "#017bfd"} />
        </a>
      </button>
      <Title header={"Add to Shelf"} borderColor="blue" />
      {/* This component should contain all games - Search/Toggle in collection*/}
      {!currentCollectionGames ? (
        <Loader />
      ) : (
        <Grid
          data={games || []}
          compareItems={currentCollectionGames}
          size="small"
          filtering={{ enabled: true, type: "title" }}
          canAdd={!!user}
          handleToggle={handleToggleGame}
          gridItem={props => (
            <GameToggleItem handleToggle={handleToggleGame} {...props} />
          )}
        />
      )}
    </section>
  );
}

export default GameTogglePanel;
