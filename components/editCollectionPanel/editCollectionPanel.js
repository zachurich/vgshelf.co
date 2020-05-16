import _ from "lodash";
import React, { useState } from "react";
import Grid from "../grid/grid";
import { useGameFetch } from "../../common/hooks";
import GameToggleItem from "../gameToggleItem/gameToggleItem";
import Title from "../title/title";
import Loader from "../loader/loader";
import { ButtonToggle } from "../buttons/buttons";
import { toggleItemInArray } from "../../common/utils";
import FormControls from "../formControls/formControls";

function EditCollectionPanel({
  user, // available when logged in
  collection,
  initialGames,
  handleSubmitChanges, // add/remove game from collection
  handleClosePanel, // close this panel
}) {
  const { data: games, error } = useGameFetch(initialGames, { userId: user.sub });
  const [collectionTitle, setCollectionTitle] = useState(collection.title);
  const [gamesToggled, setGamesToggled] = useState(collection.games);

  const handleToggleGame = (game) => {
    const { newItems, newItemsProps } = toggleItemInArray(gamesToggled, game, "id");
    setGamesToggled(newItems);
  };

  return (
    <div className="collection-edit">
      <form onSubmit={(e) => handleSubmitChanges(e, collectionTitle, gamesToggled)}>
        <section className="collection-edit-title">
          <label htmlFor="collection-title">Shelf Title</label>
          <input
            name="collection-title"
            placeholder="Shelf Title"
            type="text"
            value={collectionTitle}
            onChange={(e) => setCollectionTitle(e.target.value)}
          />
        </section>
        <section className="collection-edit-toggle-panel">
          <label>All Games</label>
          {/* This component should contain all games - Search/Toggle in collection*/}
          {!collection.games ? (
            <Loader />
          ) : (
            <Grid
              data={games}
              compareItems={gamesToggled}
              size="small"
              filtering={{ limit: 6, enabled: true, type: "title" }}
              canAdd={!!user}
              handleToggle={handleToggleGame}
              gridItem={(props) => (
                <GameToggleItem handleToggle={handleToggleGame} {...props} />
              )}
            />
          )}
        </section>
        <FormControls
          handleDismiss={handleClosePanel}
          closeText={"Cancel"}
          disabled={
            collection.games === gamesToggled && collection.title === collectionTitle
          }
          submitText={"Submit"}
          handleSubmit={(e) => handleSubmitChanges(e, collectionTitle, gamesToggled)}
        />
      </form>
    </div>
  );
}

export default EditCollectionPanel;
