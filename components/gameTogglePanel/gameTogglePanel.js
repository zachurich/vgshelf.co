import React from "react";
import Grid from "../grid/grid";
import { useGameFetch } from "../../common/hooks";
import GameToggleItem from "../gameToggleItem/gameToggleItem";
import Title from "../title/title";
import Loader from "../loader/loader";
import { ButtonToggle } from "../buttons/buttons";

import "./styles.scss";

function GameTogglePanel({
  user, // available when logged in
  initialGames,
  handleToggleGame, // add/remove game from collection
  handleClosePanel, // close this panel
  currentCollectionGames // used to compare all games to what games the user has in the collection
}) {
  const { data: games, error } = useGameFetch(initialGames, { userId: user.sub });
  return (
    <section className="games-toggle-panel">
      {/* This component should contain all games - Search/Toggle in collection*/}
      {!currentCollectionGames ? (
        <Loader />
      ) : (
        <Grid
          data={games}
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
