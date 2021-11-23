import useParams from "./useParams";
import useDataFetch from "./useDataFetch";
import { API_ENDPOINTS } from "../routes";

const useFetchCollection = (initialData = []) => {
  const { userName, collectionSlug } = useParams();
  return useDataFetch(
    API_ENDPOINTS.COLLECTION,
    { userName, collectionSlug },
    null,
    initialData
  );
};

export default useFetchCollection;
