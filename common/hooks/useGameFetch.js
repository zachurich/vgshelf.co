import { API_ENDPOINTS } from "../routes";
import useDataFetch from "./useDataFetch";

const useGameFetch = (initialData = {}, params = {}, key = null) => {
  return useDataFetch(API_ENDPOINTS.GAME, params, key, initialData);
};

export default useGameFetch;
