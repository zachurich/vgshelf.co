import get from "lodash/get";
import React from "react";
import { Meta } from "../components/index";
import CollectionsPanel from "../components/collectionsPanel/collectionsPanel";
import { fetchGames, fetchGamesByUserName } from "../api/gamesApi";
import GamesPanel from "../components/gamesPanel/gamesPanel";
import { useParams } from "../common/hooks";

const Dashboard = ({ initialGames = [], initialCollections = [], user }) => {
  const { userName } = useParams();
  return (
    <div className="dashboard">
      <Meta title={"Dashboard"} />
      <main className="main">
        <GamesPanel user={user} userName={userName} initialGames={initialGames} />
      </main>
      <section className="panel-right">
        <CollectionsPanel
          user={user}
          userName={userName}
          initialCollections={initialCollections}
        />
      </section>
    </div>
  );
};

/**
 * THIS RUNS ONCE ON THE SERVER, ON REFRESH
 * ON CLIENT SIDE ROUTING, FETCH ON THE CLIENT DUH
 */
Dashboard.getInitialProps = async ({ req, query }) => {
  if (req) {
    let games = [];
    const { userName, id: collectionId } = query;
    const userId = get(req, "user.id");
    try {
      if (req.user && userId) {
        games = await fetchGames(req, userId, collectionId);
      } else if (userName) {
        games = await fetchGamesByUserName(req, userName);
      }
      return { initialGames: games };
    } catch (e) {
      console.log(e);
    }
  }
  return {};
};

export default Dashboard;
