import "./AppHeader.scss";

import React from "react";
import { Link } from "react-router-dom";

export interface NavItem {
  label: string;
  route: string;
}

interface Props {
  title: string;
  navItems: Array<NavItem>;
}

const AppHeader = ({ title, navItems }: Props) => {
  return (
    <div className="header-container">
      <div className="title">{title}</div>
      <div className="nav-items">
        {navItems.map(({ label, route }) => (
          <Link key={label} className="nav-item" to={route}>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AppHeader;
