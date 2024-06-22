import Link from "next/link";
import React, { useState } from "react";

const Sidebar = () => {
  const arr: string[] = [];

  const foo = () => {
    arr.push("foo");
    return "foo";
  };

  const bar = () => {
    arr.push("bar");
    return "bar";
  };

  const data = foo() && bar();

  return (
    <div className="dashboard__sidebar__controls">
      sidebar
      <Link
        className="dashboard__sidebar__controls__item"
        href={"/dashboard/help"}
      >
        link to help
      </Link>
    </div>
  );
};

export default Sidebar;
