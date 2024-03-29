import _ from "lodash";
import { useContext } from "react";
import { appendParam, appendMultipleParams } from "../utils";
import useSWR from "swr";
import GlobalMessageContext from "../../contexts/globalMessage";
import { fetcher } from "../../api/gamesApi";

export const swrOptions = {
  refreshInterval: 0,
  revalidateOnFocus: false,
};

/**
 * @description Wraps Zeit's useSWR hook used for cache invalidation/revalidation and polling
 * @param {Object} params - Key/value pairs for appending query params to the request url
 * @param {String} endpoint - the base endpoint
 * @param {String} dataKey - Key for validating
 * @param {any} initialData - Initial data, usually pre-fetched in server code
 * @param {Function} fetcher - Function used for data fetching, generic default
 * @returns {Object} {
 *   data?: Data;
 *   error?: Error;
 *   revalidate: () => Promise<boolean>;
 *   isValidating: boolean;
 * }
 */
const useDataFetch = (
  endpoint,
  params,
  dataKey,
  initialData,
  fetcher = fetcher
) => {
  const { promptMessage } = useContext(GlobalMessageContext);
  let fetchUrl = appendMultipleParams(endpoint, params);
  const { data, error, isValidating } = useSWR(fetchUrl, fetcher, {
    ...swrOptions,
    onError: (error) => {
      if (error.message) {
        promptMessage({
          header: "Error",
          message: error.message,
        });
      } else {
        promptMessage({
          header: "Error",
          message: JSON.stringify(error),
        });
      }
    },
  });
  let returnData;
  if (dataKey) {
    returnData = _.get(data, dataKey, initialData);
  } else if (data) {
    returnData = data;
  } else {
    returnData = initialData;
  }
  return {
    data: returnData,
    error,
    finalUrl: fetchUrl,
    isLoading: isValidating,
  };
};

export default useDataFetch;
