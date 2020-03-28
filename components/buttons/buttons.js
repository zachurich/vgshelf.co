import React from "react";
import Link from "next/link";
import { APP_ROUTES } from "../../common/routes";
import AddSVG from "../../assets/add.svg";

export function LoginButton({ user, classes = "button-secondary" }) {
  return (
    <Link
      href={{ pathname: user ? "/dashboard/[user]" : APP_ROUTES.LOGIN }}
      as={user ? `/dashboard/${user.nickname}` : APP_ROUTES.LOGIN}
    >
      <a className={`button ${classes}`}>{user ? "Continue" : "Log In"}</a>
    </Link>
  );
}

export function SignUpButton({ user, text, classes = "button-primary" }) {
  if (!user) {
    return (
      <Link href={{ pathname: "/signup" }}>
        <a className={`button ${classes}`}>{text}</a>
      </Link>
    );
  }
  return null;
}

export function ButtonToggle({ handleToggle, additionalClasses = "", ...props }) {
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
