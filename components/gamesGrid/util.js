import { APP_ROUTES } from "../../common/routes";

export const decideHeader = (title, user, userName) => {
  if (title) {
    return title;
  } else if (user) {
    return "My Games";
  } else {
    return `${userName}'s Games`;
  }
};

export const decideBreadCrumb = (subpage, loggedIn, userName) => {
  if (subpage) {
    return {
      route: APP_ROUTES.APP,
      as: APP_ROUTES.APP.replace("[userName]", userName),
      text: loggedIn ? "My Dashboard" : `${userName}'s Dashboard`,
    };
  }
  return null;
};
