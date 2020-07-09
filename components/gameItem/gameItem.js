import Link from "next/link";
import react from "react";

import MissingCover from "../../assets/missingCover.svg";
import { useParams } from "../../common/hooks";
import { APP_ROUTES } from "../../common/routes";
import { ImageLoader } from "../formSelections/formSelections";

const GameItem = ({ item }) => {
  const { userName } = useParams();
  return (
    <li key={item.id} className="game-item">
      <Link
        href={APP_ROUTES.GAME}
        as={APP_ROUTES.GAME.replace("[userName]", userName).replace(
          "[gameSlug]",
          item.slug
        )}
      >
        <a>
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
        </a>
      </Link>
    </li>
  );
};

export default GameItem;
