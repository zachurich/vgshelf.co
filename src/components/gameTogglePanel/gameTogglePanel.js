import React from "react";
import Grid from "../grid/grid";
import { fetchGames } from "../../api/gamesApi";

function GameTogglePanel({
  handleToggleGame,
  handleClosePanel,
  currentCollectionGames,
  user
}) {
  // currentCollectionGames is used to compare all games to what games the user has in the collection
  const [games, setGames] = React.useState([]);

  const retrieveAllGames = async () => {
    const games = await fetchGames(null, user.id);
    return games;
  };

  React.useEffect(() => {
    retrieveAllGames()
      .then(data => {
        setGames(() => data);
      })
      .catch(err => err);
  }, [0]);
  return (
    <section
      className="toggle-games w-1/4 relative bg-gray-500"
      style={{
        minHeight: "calc(100vh - 94px)"
      }}
    >
      <button className="m-auto block mt-5 button submit" onClick={handleClosePanel}>
        <a>Close</a>
      </button>
      {/* This component should contain all games - Search/Toggle in collection*/}
      <Grid
        data={games}
        compareItems={currentCollectionGames}
        size="small"
        handleToggle={handleToggleGame}
      />
    </section>
  );
}

export default GameTogglePanel;
