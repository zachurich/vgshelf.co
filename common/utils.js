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
