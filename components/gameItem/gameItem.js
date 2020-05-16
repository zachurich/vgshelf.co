import react from "react";
import MissingCover from "../../assets/missingCover.svg";
import { ImageLoader } from "../formSelections/formSelections";

const GameItem = ({ item, handleAction }) => {
  return (
    <li key={item.id} className="game-item" onClick={() => handleAction(item)}>
      <div className="game-item-content">
        <span className="game-item-image-wrap">
          <div className={`game-item-image`}>
            {item.imageUrl ? (
              <ImageLoader src={`${item.imageUrl.replace("thumb", "cover_big")}`} />
            ) : (
              <MissingCover />
            )}
          </div>
        </span>
        <span className="game-item-text">{item.title}</span>
      </div>
    </li>
  );
};

export default GameItem;
