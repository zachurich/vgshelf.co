import useParams from "./useParams";
import useDataFetch from "./useDataFetch";
import { API_ENDPOINTS } from "../routes";

const useGamesFetchByUserAndCollection = (initialData = []) => {
  const { userName, collectionSlug } = useParams();
  return useDataFetch(
    { userName, collectionSlug },
    API_ENDPOINTS.GAME,
    "games",
    initialData
  );
};

export default useGamesFetchByUserAndCollection;
