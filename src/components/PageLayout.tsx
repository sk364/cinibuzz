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
      route: "/cinibuzz",
    },
    {
      label: "TV Shows",
      route: "/cinibuzz/tv",
    },
    {
      label: "Kids",
      route: "/cinibuzz/kids",
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
