import React from "react";
import Link from "next/link";

import "./menu.css";

const Menu = ({ showMenu, toggleMenu }) => {
  return (
    <>
      <button className="menu-button" onClick={() => toggleMenu()}>
        <img className="w-10 h-10 bg-gray-200 rounded-full mr-4" />
      </button>
      {showMenu && (
        <div className="menu-list absolute p-6 shadow-md">
          <ul className="flex flex-no-wrap flex-col items-center">
            <li className="mb-2 block">
              <Link href="/">Option 1</Link>
            </li>
            <li className="mb-2 block">
              <Link href="/">Option 2</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Menu;
