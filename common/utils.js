import _ from "lodash";

import { ERROR_CODES, HTTP_STATUS } from "./constants";
import { APP_ROUTES } from "./routes";

export const sortByDate = (arr, sortKey) => {
  return arr.sort((prior, next) => new Date(next[sortKey]) - new Date(prior[sortKey]));
};

export const lastItem = (arr, index, cols = 3) => {
  if ((index + 1) % cols === 0) {
    return true;
  } else if (index + 1 === arr.length) {
    return true;
  }
  return false;
};

export const genTestObj = (length, obj = { name: "test" }) => Array(length).fill(obj);

export const createUrl = (base, endpoint) => `${base}${endpoint}`;

export const formatUserName = (user) => {
  if (user && user.displayName) {
    return user.displayName.split("@")[0];
  }
  return "Hello!";
};

export const debounce = (timer, callback, ...args) => {
  if (timer) clearTimeout(timer);
  return setTimeout(() => {
    callback(...args);
  }, 300);
};

export const appendParam = (url, { key, value }) => {
  if (!url.includes("?")) {
    url += "?";
  } else {
    url += "&";
  }
  return (url += `${key}=${value}`);
};

export const appendMultipleParams = (url, params) => {
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url = appendParam(url, { key, value });
    }
  });
  return url;
};

export const scrollTop = () => {
  if (isClientSide()) {
    window.scrollTo(0, 0);
  }
};

export const escapeNull = (value, fallback) => {
  if (!_.isNull(value)) {
    return value;
  }
  return fallback;
};

export const isClientSide = () => typeof window !== "undefined";

export const getColor = (color) => {
  if (isClientSide()) {
    return getComputedStyle(document.body).getPropertyValue(color);
  }
  return null;
};

export const handleServerResponse = (response = {}) => {
  const errorCodes = new Set([400, 500]);
  if (errorCodes.has(+_.get(response, "code"))) {
    return response.msg;
  }
  return null;
};

/**
 *
 * @param {Array} array - Array to add/remove from
 * @param {*} item - Object or string
 * @param {String} property - Optionally provide a property to search an array of objects
 * @returns {Object} - Object containing:
 * - newItems (updated array)
 * - newItemsProps (array of only the properties of the updates items)
 */
export const toggleItemInArray = (array, item, property = null) => {
  const currentItems = array && array.length ? _.cloneDeep(array) : [];
  const itemOrObj = property ? item[property] : item;
  let newItems = [];
  if (_.some(currentItems, property ? [property, itemOrObj] : itemOrObj)) {
    newItems = currentItems.filter((currentItem) => currentItem[property] !== itemOrObj);
  } else {
    newItems = currentItems.concat(item);
  }
  return {
    newItems,
    newItemsProps: property ? newItems.map((item) => item[property]) : null,
  };
};

export const createBufferFromQuery = (params = {}) => {
  const keys = Object.keys(params);
  return Buffer.from(
    keys.map((param) => params[param]).join("|") || [APP_ROUTES.APP].join("")
  );
};

export const redirect = (res, location) => {
  res.writeHead(302, {
    Location: location,
  });
  res.end();
};

export const handleServerError = (e, res) => {
  const response = _.get(e, "response.data", {});
  if (
    (response.data && response.data.includes(ERROR_CODES.NO_USER)) ||
    response.code === HTTP_STATUS.MISSING
  ) {
    return redirect(res, APP_ROUTES.REGISTER);
  }
  return redirect(res, APP_ROUTES.ERROR);
};

export const userCanEdit = (authedUser, accessedUserName) => {
  return !!authedUser && authedUser.nickname === accessedUserName;
};
