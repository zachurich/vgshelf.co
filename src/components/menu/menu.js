import React from "react";
import Link from "next/link";

import "./menu.scss";

const Menu = ({ showMenu, toggleMenu, user }) => {
  const loggedIn = !!user;
  return (
    <div className="menu">
      <button className="menu-button" onClick={() => toggleMenu()}>
        <img className="" {...(loggedIn && { src: user.picture })} />
      </button>
      {showMenu && (
        <ul className="menu-list">
          <li className="block">
            {loggedIn ? (
              <Link href="/logout">
                <a>Logout</a>
              </Link>
            ) : (
              <Link href="/login">
                <a>Login</a>
              </Link>
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Menu;
