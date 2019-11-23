import React from "react";
import Link from "next/link";

import "./menu.css";

const Menu = ({ showMenu, toggleMenu, user }) => {
  const loggedIn = !!user;
  return (
    <>
      <button className="menu-button" onClick={() => toggleMenu()}>
        <img
          className="w-10 h-10 bg-gray-200 rounded-full mr-4"
          {...(loggedIn && { src: user.picture })}
        />
      </button>
      {showMenu && (
        <div className="menu-list absolute p-6 shadow rounded z-10">
          <ul className="flex flex-no-wrap flex-col items-center">
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
        </div>
      )}
    </>
  );
};

export default Menu;
