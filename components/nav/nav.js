import Link from "next/link";
import React from "react";

import Logo from "../../assets/logo.svg";
import useAuth from "../../common/hooks/useAuth";
import { APP_ROUTES } from "../../common/routes";
import { LoginButton } from "../buttons/buttons";
import { Menu } from "../index";

const Nav = () => {
  const user = useAuth();
  return (
    <nav className="nav">
      <div className="nav-logo">
        <Link href={APP_ROUTES.HOME}>
          <a>
            <Logo />
          </a>
        </Link>
      </div>
      <ul className="nav-links">
        <li className="nav-link-item flex">
          {user && user.userName ? (
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
