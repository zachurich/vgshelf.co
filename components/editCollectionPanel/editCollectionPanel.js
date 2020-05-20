import _ from "lodash";
import React, { useState } from "react";

import { useGameFetch } from "../../common/hooks";
import { toggleItemInArray } from "../../common/utils";
import { ButtonToggle } from "../buttons/buttons";
import FormControls from "../formControls/formControls";
import GameToggleItem from "../gameToggleItem/gameToggleItem";
import Grid from "../grid/grid";
import List from "../list/list";
import Loader from "../loader/loader";
import Title from "../title/title";

function EditCollectionPanel({
  user, // available when logged in
  collection,
  initialGames,
  title,
  toggled,
}) {
  const { data: games, error } = useGameFetch(initialGames, { userId: user.sub });
  const [collectionTitle, setCollectionTitle] = title;
  const [gamesToggled, setGamesToggled] = toggled;

  const handleToggleGame = (game) => {
    const { newItems, newItemsProps } = toggleItemInArray(gamesToggled, game, "id");
    setGamesToggled(newItems);
  };

  return (
    <div className="collection-edit">
      <form>
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
          <label>All My Games</label>
          {/* This component should contain all games - Search/Toggle in collection*/}
          {!collection.games ? (
            <Loader />
          ) : (
            <List
              data={games}
              filtering={{
                enabled: true,
                type: "title",
                inputText: "Search games...",
              }}
              listItem={({ item }) => (
                <GameToggleItem
                  item={item}
                  itemAlreadyToggled={_.find(gamesToggled, ["id", item.id])}
                  handleToggle={handleToggleGame}
                />
              )}
            />
          )}
        </section>
      </form>
    </div>
  );
}

export default EditCollectionPanel;
