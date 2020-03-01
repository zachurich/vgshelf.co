import _ from "lodash";
import { useState, useEffect, useRef } from "react";
import random from "lodash/random";
import { useRouter } from "next/router";
import { fetchSimple } from "../api/gamesApi";
import useSWR from "@zeit/swr";
import { appendParam, getColor, debounce } from "./utils";
import { siteColors } from "./constants";
import { ENDPOINTS } from "./routes";

/**
 * @description Simple wrapper for next's useRouter
 * @param {Object} params - Key/value pairs for appending query params to the request url
 */
export const useParams = params => {
  const router = useRouter();
  return router.query;
};

export const useGameFetch = (initialData = [], params = {}) => {
  return useDataFetch(params, ENDPOINTS.GAME, "games", initialData);
};

export const useCollectionFetch = (initialData = []) => {
  const { username } = useParams();
  return useDataFetch({ userName: username }, ENDPOINTS.COLLECTION, "", initialData);
};

/**
 * @description Wraps Zeit's useSWR hook used for cache invalidation/revalidation and polling
 * @param {Object} params - Key/value pairs for appending query params to the request url
 * @param {String} endpoint - the base endpoint
 */
export const useDataFetch = (params, endpoint, dataKey, initialData) => {
  let fetchUrl = endpoint;
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      fetchUrl = appendParam(fetchUrl, { key, value });
    }
  });
  const { data, error } = useSWR(fetchUrl, fetchSimple);
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
    finalUrl: fetchUrl
  };
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

/**
 * @description Attach a ref to both the trigger and element to toggle
 * to enable open/closing and close on outside click
 */
export const useToggle = () => {
  const [open, setOpen] = useState(false);

  const toggledElement = useRef(null); // thing to open/close
  const triggerElement = useRef(null); // button

  const closeOnBodyClick = (e, state = true) => {
    if (
      triggerElement.current &&
      !triggerElement.current.contains(e.target) &&
      toggledElement.current &&
      !toggledElement.current.contains(e.target)
    ) {
      setOpen(() => false);
    }
  };

  const handleToggle = state => {
    setOpen(() => (state ? state : !open));
  };

  useEffect(() => {
    if (document) {
      document.addEventListener("click", closeOnBodyClick);
    }

    return () => {
      if (document) {
        document.removeEventListener("click", closeOnBodyClick);
      }
    };
  });
  return {
    toggleState: open,
    handleToggle,
    toggledElement,
    triggerElement
  };
};
