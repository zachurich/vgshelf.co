import React from "react";

import MissingCover from "../../assets/missingCover.svg";
import { ImageLoader } from "../formSelections/formSelections";

function GameDetails({ game = {} }) {
  const { properties = {} } = game;
  return (
    <div className="game-details">
      <div className="game-details-image">
        {game.imageUrl ? (
          <ImageLoader src={game.imageUrl && game.imageUrl.replace("thumb", "1080p")} />
        ) : (
          <MissingCover />
        )}
      </div>
      <div className="game-details-content">
        <h2>{game.title}</h2>
        <p>Copies: {properties.quantity}</p>
        <p>Type: {properties.type}</p>
        <p>Status: {properties.completeness}</p>
        <p>Packaging: {properties.packaging}</p>
      </div>
    </div>
  );
}

export default GameDetails;
