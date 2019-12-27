import isNull from "lodash/isNull";
import get from "lodash/get";
import { isRegExp } from "util";

export const lastItem = (arr, index, cols = 3) => {
  if ((index + 1) % cols === 0) {
    return true;
  } else if (index + 1 === arr.length) {
    return true;
  }
  return false;
};

export const genTestObj = (length, obj = { name: "test" }) => Array(length).fill(obj);

export const createUrl = (req, endpoint, ssl = false) =>
  `http${ssl ? "s" : ""}://${req ? req.headers.host : window.location.host}${endpoint}`;

export const formatUserName = user => {
  if (user && user.displayName) {
    return user.displayName.split("@")[0];
  }
  return "Hello!";
};

export const debounce = (timer, callback, ...args) => {
  if (timer) clearTimeout(timer);
  return setTimeout(() => {
    callback(...args);
  }, 500);
};

export const appendParam = (url, { key, value }) => {
  if (!url.includes("?")) {
    url += "?";
  } else {
    url += "&";
  }
  return (url += `${key}=${value}`);
};

export const escapeNull = (value, fallback) => {
  if (!isNull(value)) {
    return value;
  }
  return fallback;
};

export const getColor = color => {
  if (document && document.body) {
    return getComputedStyle(document.body).getPropertyValue(color);
  }
  return null;
};

export const handleServerResponse = (response = {}) => {
  if (+get(response, "code") === 400) {
    return response.msg;
  }
  return null;
};
