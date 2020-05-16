import React from "react";
import Link from "next/link";
import { Menu } from "../index";
import { LoginButton } from "../buttons/buttons";
import Logo from "../../assets/logo.svg";

const Nav = ({ user }) => {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
      </div>
      <ul className="nav-links">
        <li className="nav-link-item flex">
          {user ? (
            <Menu user={user} />
          ) : (
            <LoginButton user={user} classes={"button-nav"} />
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
