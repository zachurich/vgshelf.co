import React from "react";
import Link from "next/link";
import { ROUTES } from "../../common/routes";

export function LoginButton({ user, classes = "button-secondary" }) {
  return (
    <Link
      href={{ pathname: user ? "/dashboard/[user]" : ROUTES.LOGIN }}
      as={user ? `/dashboard/${user.nickname}` : ROUTES.LOGIN}
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

export function ButtonToggle({
  containerRef,
  handleToggle,
  additionalClasses = "",
  ...props
}) {
  return (
    <div
      onClick={handleToggle}
      className={`button button-toggle button-secondary ${additionalClasses}`}
      ref={containerRef}
      {...props}
    >
      {props.children || <a>+</a>}
    </div>
  );
}
