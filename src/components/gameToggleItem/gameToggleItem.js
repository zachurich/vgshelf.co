import react from "react";

import "./style.scss";
import MissingCover from "../../assets/missingCover.svg";

const GameToggleItem = ({ item, itemAlreadyToggled, handleToggle }) => {
  if (!item) return null;
  return (
    <li
      key={item.id}
      className={`game-toggle-item ${itemAlreadyToggled ? "toggled" : ""}`}
      onClick={() => handleToggle(item.id)}
    >
      <div className="game-toggle-item-content">
        <span className="game-toggle-item-image-wrap">
          <div className={`game-toggle-item-image`}>
            {item.imageUrl ? (
              <img
                className=""
                src={`${item.imageUrl.replace("thumb", "cover_small")}`}
              />
            ) : (
              <MissingCover />
            )}
          </div>
        </span>
        <span className="game-toggle-item-text">{item.title}</span>
      </div>
    </li>
  );
};

export default GameToggleItem;
