import get from "lodash/get";
import React from "react";
import { Meta } from "../../components/index";
import CollectionsPanel from "../../components/collectionsPanel/collectionsPanel";
import { fetchGamesByUserName } from "../../api/gamesApi";
import GamesPanel from "../../components/gamesPanel/gamesPanel";
import { useParams } from "../../common/hooks";

const Dashboard = ({ user, initialGames = [], initialCollections = [] }) => {
  const { username } = useParams();
  return (
    <div className="dashboard">
      <Meta title={"Dashboard"} />
      <main className="main">
        <GamesPanel user={user} userName={username} initialGames={initialGames} />
      </main>
      <section className="panel-right">
        <CollectionsPanel
          user={user}
          userName={username}
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
    let response;
    const { username } = query;
    try {
      response = await fetchGamesByUserName(username);
      return { initialGames: response.games };
    } catch (e) {
      console.log(e);
    }
  }
  return {};
};

export default Dashboard;
