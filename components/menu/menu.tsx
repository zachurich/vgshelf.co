import Link from "next/link";
import React from "react";

import { useToggle } from "../../common/hooks";
import { API_ROUTES, APP_ROUTES } from "../../common/routes";

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
    triggerElement: menuButtonRef,
  } = useToggle();
  function renderLoggedInMenu() {
    return (
      <ul ref={menuRef} className="menu-list">
        <MenuItem
          route={APP_ROUTES.APP.replace("[userName]", user.nickname)}
          text="Dashboard"
        />
        <MenuItem route={API_ROUTES.LOGOUT} text="Logout" />
      </ul>
    );
  }
  return (
    <div className="menu">
      <button
        ref={menuButtonRef}
        className={`menu-button ${showMenu ? "open" : "closed"}`}
        onClick={() => toggleMenu()}
      >
        {user.nickname}
        <img className="menu-toggle" {...(user && { src: user.picture })} />
      </button>
      {showMenu && user && renderLoggedInMenu()}
    </div>
  );
};

export default Menu;
