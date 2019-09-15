import React from "react";
import Link from "next/link";
import { Menu } from "../index";

import "./nav.css";

const Nav = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const toggleMenu = () => setShowMenu(() => !showMenu);
  return (
    <nav className="flex items-center justify-between flex-wrap relative p-6">
      <div className="nav-logo flex items-center flex-shrink-0 mr-6">
        <Link href="/">
          <a>vgshelf</a>
        </Link>
      </div>
      <ul className="flex justify-end  flex-grow items-center">
        <li className="mr-6">
          <Link href="/collections">
            <a>Collections</a>
          </Link>
        </li>
        <li className="">
          <Menu showMenu={showMenu} toggleMenu={toggleMenu} />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
