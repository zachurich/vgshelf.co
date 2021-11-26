import React from "react";
import Link from "next/link";
import TwitterSVG from "../../assets/twitter.svg";

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="row row-1">
        <div className="twitter-link">
          <a href="">
            <TwitterSVG />
          </a>
        </div>
      </div>
      <div className="row row-2">
        <a className="bug-report" href="">
          Report a Bug!
        </a>
      </div>
      <div className="row row-3">
        <div className="copyright">vgshelf © 2019</div>
      </div>
    </footer>
  );
};

export default Footer;
