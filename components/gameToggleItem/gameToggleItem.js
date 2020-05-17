import react from "react";
import MissingCover from "../../assets/missingCover.svg";

const GameToggleItem = ({ item, itemAlreadyToggled, handleToggle }) => {
  if (!item) return null;
  return (
    <li
      key={item.id}
      className={`game-toggle-item ${itemAlreadyToggled ? "toggled" : ""}`}
      onClick={() => handleToggle(item)}
    >
      <div className="game-toggle-item-content">
        <div className="game-toggle-item-image">
          {item.imageUrl ? (
            <img className="" src={`${item.imageUrl.replace("thumb", "cover_small")}`} />
          ) : (
            <MissingCover />
          )}
        </div>
        <span className="game-toggle-item-text">{item.title}</span>
      </div>
    </li>
  );
};

export default GameToggleItem;
