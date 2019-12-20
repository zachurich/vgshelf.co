import React from "react";
import Link from "next/link";
import { Menu } from "../index";

import "./nav.scss";
import { formatUserName } from "../../common/utils";
import { ROUTES } from "../../../common/routes";
import { LoginButton } from "../buttons/buttons";

const Nav = ({ user, menuVisible }) => {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <Link href="/">
          <a className="">vgshelf</a>
        </Link>
      </div>
      <ul className="nav-links">
        {/* {user && (
          <li className="nav-link-item">
            <Link href="/collections">
              <a>Collections</a>
            </Link>
          </li>
        )} */}
        <li className="nav-link-item flex">
          {user ? (
            <Menu showMenu={menuVisible} user={user} />
          ) : (
            <Link href={ROUTES.LOGIN}>
              <LoginButton user={user} classes={"button-nav"} />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
