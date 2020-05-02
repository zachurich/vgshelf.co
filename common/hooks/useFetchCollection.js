import useParams from "./useParams";
import useDataFetch from "./useDataFetch";
import { API_ENDPOINTS } from "../routes";

const useFetchCollection = (initialData = []) => {
  const { userName, collectionSlug } = useParams();
  return useDataFetch(
    { userName, collectionSlug },
    API_ENDPOINTS.COLLECTION,
    null,
    initialData
  );
};

export default useFetchCollection;
