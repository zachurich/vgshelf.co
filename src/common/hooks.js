import { useState, useEffect } from "react";
import random from "lodash/random";
import { useRouter } from "next/router";
import { fetchSimple } from "../api/gamesApi";
import useSWR from "@zeit/swr";
import { appendParam, getColor, debounce } from "./utils";
import { siteColors } from "./constants";

/**
 * @description Simple wrapper for next's useRouter
 * @param {Object} params - Key/value pairs for appending query params to the request url
 */
export const useParams = params => {
  const router = useRouter();
  return router.query;
};

/**
 * @description Wraps Zeit's useSWR hook used for cache invalidation/revalidation and polling
 * @param {Object} params - Key/value pairs for appending query params to the request url
 * @param {String} endpoint - the base endpoint
 */
export const useDataFetch = (params, endpoint) => {
  let fetchUrl = endpoint;
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      fetchUrl = appendParam(fetchUrl, { key, value });
    }
  });
  return { ...useSWR(fetchUrl, fetchSimple), finalUrl: fetchUrl };
};

export const useRandomColor = (initialColor = "#017BFD") => {
  const [color, setColor] = useState(() => initialColor);
  useEffect(() => {
    setColor(() => getColor(siteColors[random(siteColors.length - 1)]));
  }, [process.browser]);
  return color;
};

export const useDebounce = () => {
  const [timer, setTimer] = useState(null);
  return {
    timer,
    debounce: function(fnToDebounce, input) {
      let timeout = debounce(timer, fnToDebounce, input);
      setTimer(() => timeout);
    }
  };
};
