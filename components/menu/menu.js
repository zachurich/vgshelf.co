import React from "react";
import Link from "next/link";

import "./menu.scss";
import { ROUTES } from "../../common/routes";

const MenuItem = ({ route, text }) => {
  return (
    <li className="menu-item">
      <Link href={route}>
        <a>{text}</a>
      </Link>
    </li>
  );
};

const Menu = ({ showMenu, toggleMenu, user }) => {
  const loggedIn = !!user;

  function renderLoggedInMenu() {
    return (
      <>
        <MenuItem route={ROUTES.APP} text="Dashboard" />
        <MenuItem route={ROUTES.LOGOUT} text="Log Out" />
      </>
    );
  }
  return (
    <div className="menu">
      <button className="menu-button">
        <img className="menu-toggle" {...(loggedIn && { src: user.picture })} />
      </button>
      {showMenu && (
        <ul className="menu-list">
          {loggedIn ? (
            renderLoggedInMenu()
          ) : (
            <MenuItem route={ROUTES.LOGIN} text="Log In" />
          )}
        </ul>
      )}
    </div>
  );
};

export default Menu;
