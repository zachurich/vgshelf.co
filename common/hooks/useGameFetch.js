import { API_ENDPOINTS } from "../routes";
import useDataFetch from "./useDataFetch";

const useGameFetch = (initialData = [], params = {}) => {
  return useDataFetch(params, API_ENDPOINTS.GAME, "games", initialData);
};

export default useGameFetch;
