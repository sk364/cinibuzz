import "./PageLayout.scss";

import React from "react";

import AppHeader, { NavItem } from "./AppHeader";

interface Props {
  children: React.ReactNode;
}

const PageLayout = ({ children }: Props) => {
  const title = "Cinibuzz";
  const navItems: NavItem = [
    {
      label: "Movies",
      route: "/",
    },
    {
      label: "TV Shows",
      route: "/tv",
    },
    {
      label: "Kids",
      route: "/kids",
    }
  ];

  return (
    <div className="layout">
      <AppHeader title={title} navItems={navItems} />
      {children}
    </div>
  );
};

export default PageLayout;
