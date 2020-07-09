import { API_ENDPOINTS } from "../routes";
import useDataFetch from "./useDataFetch";

const useGameFetch = (initialData = {}, params = {}, key = null) => {
  return useDataFetch(params, API_ENDPOINTS.GAME, key, initialData);
};

export default useGameFetch;
