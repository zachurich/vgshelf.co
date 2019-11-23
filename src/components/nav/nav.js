import React from "react";
import Link from "next/link";
import { Menu } from "../index";

import "./nav.scss";
import { formatUserName } from "../../common/utils";

const Nav = props => {
  const { user } = props;
  const [showMenu, setShowMenu] = React.useState(false);
  const toggleMenu = () => setShowMenu(() => !showMenu);
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
          <Menu showMenu={showMenu} toggleMenu={toggleMenu} user={user} />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
