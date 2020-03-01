import React from "react";
import Link from "next/link";

import "./menu.scss";
import { ROUTES } from "../../common/routes";
import { useToggle } from "../../common/hooks";

const MenuItem = ({ route, text, children }) => {
  if (children) {
    return <li className="menu-item">{children}</li>;
  }
  return (
    <li className="menu-item">
      <Link href={route}>
        <a>{text}</a>
      </Link>
    </li>
  );
};

const Menu = ({ user }) => {
  const {
    toggleState: showMenu,
    handleToggle: toggleMenu,
    toggledElement: menuRef,
    triggerElement: menuButtonRef
  } = useToggle();
  function renderLoggedInMenu() {
    return (
      <ul ref={menuRef} className="menu-list">
        <MenuItem route={ROUTES.APP} text="Dashboard" />
        <MenuItem>
          <a
            onClick={e => {
              e.preventDefault();
              logout({ returnTo: process.env.HOST + ROUTES.HOME });
              toggleMenu(false);
            }}
          >
            Log Out
          </a>
        </MenuItem>
      </ul>
    );
  }
  return (
    <div className="menu">
      <button ref={menuButtonRef} className="menu-button" onClick={() => toggleMenu()}>
        <img className="menu-toggle" {...(user && { src: user.picture })} />
      </button>
      {showMenu && user && renderLoggedInMenu()}
    </div>
  );
};

export default Menu;
