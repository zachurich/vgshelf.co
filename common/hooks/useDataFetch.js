import _ from "lodash";
import { useContext } from "react";
import { appendParam, appendMultipleParams } from "../utils";
import useSWR from "@zeit/swr";
import GlobalMessageContext from "../../contexts/globalMessage";
import { fetcher } from "../../api/gamesApi";

export const swrOptions = {
  refreshInterval: 0,
  revalidateOnFocus: false
};

/**
 * @description Wraps Zeit's useSWR hook used for cache invalidation/revalidation and polling
 * @param {Object} params - Key/value pairs for appending query params to the request url
 * @param {String} endpoint - the base endpoint
 * @returns {Object} {
 *   data?: Data;
 *   error?: Error;
 *   revalidate: () => Promise<boolean>;
 *   isValidating: boolean;
 * }
 */
const useDataFetch = (params, endpoint, dataKey, initialData) => {
  const { promptMessage } = useContext(GlobalMessageContext);
  let fetchUrl = appendMultipleParams(endpoint, params);
  const { data, error, isValidating } = useSWR(fetchUrl, fetcher, {
    ...swrOptions,
    onError: error => {
      if (error.message) {
        promptMessage(error.message);
      } else {
        promptMessage(JSON.stringify(error));
      }
    }
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
    isLoading: isValidating
  };
};

export default useDataFetch;
