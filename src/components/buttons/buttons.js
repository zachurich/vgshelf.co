import React from "react";
import Link from "next/link";

export function LoginButton({ user }) {
  return (
    <Link
      href={{ pathname: user ? "/dashboard?userName=[user]" : "/login" }}
      as={user ? `/dashboard?userName=${user.nickname}` : "/login"}
    >
      <a className="button button-secondary">{user ? "Continue" : "Login"}</a>
    </Link>
  );
}

export function SignUpButton({ user, text }) {
  if (!user) {
    return (
      <Link href={{ pathname: "/signup" }}>
        <a className="button button-primary">{text}</a>
      </Link>
    );
  }
  return null;
}
