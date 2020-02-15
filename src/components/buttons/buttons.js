import React from "react";
import Link from "next/link";

export function LoginButton({ user, classes = "button-secondary" }) {
  return (
    <Link
      href={{ pathname: user ? "/dashboard/[user]" : "/login" }}
      as={user ? `/dashboard/${user.nickname}` : "/login"}
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
      className={`button button-toggle button-secondary ${additionalClasses}`}
      {...props}
    >
      {props.children || <a>+</a>}
    </div>
  );
}
