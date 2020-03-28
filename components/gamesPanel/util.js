import { APP_ROUTES } from "../../common/routes";

export const decideHeader = (title, user, userName) => {
  if (title) {
    return title;
  } else if (user) {
    return "All My Games";
  } else {
    return `${userName}'s Games`;
  }
};

export const decideBreadCrumb = (collection, loggedIn, userName) => {
  if (collection) {
    return {
      route: `${APP_ROUTES.APP}/${userName}`,
      text: loggedIn ? "My Dashboard" : `${userName}'s Dashboard`
    };
  }
  return null;
};
