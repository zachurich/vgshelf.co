import _ from "lodash";
import React from "react";

import { userCanEdit } from "../../common/utils";
import { ButtonToggle } from "../buttons/buttons";
import GameItem from "../gameItem/gameItem";
import Grid from "../grid/grid";
import Loader from "../loader/loader";
import Title from "../title/title";
import { decideBreadCrumb, decideHeader } from "./util";

function GamesGrid({
  games = [],
  collectionId = null,
  user = null,
  userName = null,
  showModal,
  handlePrompt = null,
  showTogglePanel = false,
  title = null,
  isLoading = false,
}) {
  return (
    <div className="games-panel">
      <Title
        header={decideHeader(
          title,
          !!user && user.userName.toLowerCase() === userName,
          userName
        )}
        breadCrumb={decideBreadCrumb(collectionId, userCanEdit(user, userName), userName)}
        color={collectionId ? "pink" : "blue"}
      >
        {userCanEdit(user, userName) && (
          <ButtonToggle
            additionalClasses={`button-add ${
              showTogglePanel || showModal ? "button-add-close" : "button-add-open"
            }`}
            handleToggle={() => handlePrompt()}
          />
        )}
      </Title>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid
          data={games}
          size="large"
          filtering={{ enabled: true, type: "title", inputText: "Search games..." }}
          handlePrompt={() => handlePrompt(true)}
          canAdd={!!user}
          sortKey={"added"}
          gridItem={(props) => <GameItem {...props} />}
        />
      )}
    </div>
  );
}

export default GamesGrid;
