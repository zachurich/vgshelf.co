import React from "react";
import Link from "next/link";

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/api">Api</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
