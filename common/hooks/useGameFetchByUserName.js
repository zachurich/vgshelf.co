import useParams from "./useParams";
import useDataFetch from "./useDataFetch";
import { API_ENDPOINTS } from "../routes";

const useGamesFetchByUserName = (initialData = []) => {
  const { userName } = useParams();
  return useDataFetch(
    `${API_ENDPOINTS.GAME}/${userName}`,
    {},
    "games",
    initialData
  );
};

export default useGamesFetchByUserName;
