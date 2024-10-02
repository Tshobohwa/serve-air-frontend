import React from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarLink = ({ to, name, icon }) => {
  const currentPathname = useLocation().pathname;
  return (
    <Link to={to}>
      <div
        className={`${
          currentPathname === to
            ? "bg-skyblue-800 text-white pl-4"
            : "bg-transparent"
        } flex gap-4 w-full h-[3rem] items-center  rounded-lg text-skyblue-800`}
      >
        {icon} {name}
      </div>
    </Link>
  );
};

export default SidebarLink;
