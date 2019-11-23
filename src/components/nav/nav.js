import React from "react";
import Link from "next/link";
import { Menu } from "../index";

import "./nav.css";
import { formatUserName } from "../../common/utils";

const Nav = props => {
  const { user } = props;
  const [showMenu, setShowMenu] = React.useState(false);
  const toggleMenu = () => setShowMenu(() => !showMenu);
  return (
    <nav className="flex items-center justify-between flex-wrap relative px-6 py-2 border-b border-gray">
      <div className="nav-logo flex items-center flex-shrink-0 mr-6">
        <Link href="/">
          <a className="font-black text-lg">vgshelf</a>
        </Link>
      </div>
      {/* <div className="nav-user flex-grow text-right">
        <span>{formatUserName(user)}</span>
      </div> */}
      <ul className="nav-links flex justify-end flex-grow items-center">
        {user && (
          <li className="mr-6">
            <Link href="/collections">
              <a>Collections</a>
            </Link>
          </li>
        )}
        <li className="flex">
          <Menu showMenu={showMenu} toggleMenu={toggleMenu} user={user} />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
