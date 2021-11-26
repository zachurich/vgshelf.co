import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import AddSVG from "../../assets/add.svg";
import useAuth from "../../common/hooks/useAuth";
import { API_ROUTES, APP_ROUTES } from "../../common/routes";

export function LoginButton({ classes = "button-secondary" }) {
  const user = useAuth();
  const router = useRouter();
  const loginPath = API_ROUTES.LOGIN;
  return (
    <Link
      href={user ? `${APP_ROUTES.APP}` : loginPath}
      as={
        user
          ? `${APP_ROUTES.APP.replace("[userName]", user.nickname)}`
          : loginPath
      }
    >
      <a className={`button ${classes}`}>{user ? "Continue" : "Log In"}</a>
    </Link>
  );
}

export function SignUpButton({ text, classes = "button-primary" }) {
  const user = useAuth();
  if (!user) {
    return (
      <Link href={API_ROUTES.LOGIN}>
        <a className={`button ${classes}`}>{text}</a>
      </Link>
    );
  }
  return null;
}

export function ButtonToggle({
  handleToggle,
  additionalClasses = "",
  ...props
}) {
  return (
    <div
      onClick={handleToggle}
      className={`button button-toggle ${additionalClasses}`}
      {...props}
    >
      {props.children || (
        <a>
          <AddSVG />
        </a>
      )}
    </div>
  );
}

export function ButtonAction({
  handleAction,
  additionalClasses = "",
  disabled = false,
  ...props
}) {
  return (
    <div
      onClick={handleAction}
      className={`button button-action ${
        disabled ? "disabled" : ""
      } ${additionalClasses}`}
      {...props}
    >
      {props.children || <AddSVG size={14} />}
    </div>
  );
}
