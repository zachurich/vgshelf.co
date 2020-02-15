import React from "react";

import "./styles.scss";
import Link from "next/link";
import ArrowSVG from "../../assets/arrow.svg";

const Title = ({ header, breadCrumb, color, children }) => {
  return (
    <div className="title">
      <h3 className={`title-text ${color}`}>
        {breadCrumb && (
          <>
            <Link href={breadCrumb.route}>
              <a className="breadcrumb">{breadCrumb.text}</a>
            </Link>
            &nbsp;
            <ArrowSVG width="12" rotate="180deg" />
            &nbsp;
          </>
        )}
        <span>{header}</span>
        {children}
      </h3>
    </div>
  );
};

export default Title;
