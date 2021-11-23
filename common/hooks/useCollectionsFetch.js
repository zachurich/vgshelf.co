import useParams from "./useParams";
import useDataFetch from "./useDataFetch";
import { API_ENDPOINTS } from "../routes";

// // export const useRandomColor = (initialColor = "#017BFD") => {
// //   const [color, setColor] = useState(() => initialColor);
// //   useEffect(() => {
// //     setColor(() => getColor(siteColors[random(siteColors.length - 1)]));
// //   }, [process.browser]);
// //   return color;
// // };

const useCollectionsFetch = (initialData = []) => {
  const { userName } = useParams();
  return useDataFetch(API_ENDPOINTS.COLLECTION, { userName }, "", initialData);
};

export default useCollectionsFetch;
