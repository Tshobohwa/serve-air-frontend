import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaWarehouse } from "react-icons/fa6";
import { FaRoute, FaLocationDot } from "react-icons/fa6";
import { GoPackageDependencies, GoPackageDependents } from "react-icons/go";
import serveAirIcon from "../assets/logo.png";
import { MdOutlineDashboard } from "react-icons/md";

const links = [
  { id: 1, name: "dashboard", path: "/", Icon: MdOutlineDashboard },
  { id: 2, name: "warehouse", path: "/warehouse", Icon: FaWarehouse },
  {
    id: 3,
    name: "Incoming packages",
    path: "/incoming-packages",
    Icon: GoPackageDependencies,
  },
  {
    id: 4,
    name: "Outgoing packages",
    path: "/outgoing-packages",
    Icon: GoPackageDependents,
  },
  { id: 5, name: "routes", path: "/routes", Icon: FaRoute },
  { id: 6, name: "addresses", path: "/addresses", Icon: FaLocationDot },
];

const SideBarLink = ({ name, path, currentPath, Icon }) => {
  return (
    <Link to={path}>
      <div
        className={` h-[2.8rem] w-full  rounded-md flex items-center pl-[1.5rem] mb-3 text-[#000] text-[0.8rem] ${
          currentPath === path
            ? "bg-skyblue-100 text-skyblue-800 font-semibold"
            : "hover:bg-skyblue-50"
        }`}
      >
        <Icon size={18} /> <p className=" ml-3"> {name}</p>
      </div>
    </Link>
  );
};

const SideNavBar = ({ currentPath }) => {
  return (
    <nav className=" border-r  border-skyblue-200 w-[15rem] left-0 fixed top-0 bottom-0 p-3 overflow-y-scroll bg-white">
      <div className="w-full flex items-center justify-center mt-5 mb-3 pb-3 border-b-[2px] border-skyblue-100">
        <div className="h-[4rem] w-[4rem] border-[2px] border-skyblue-800 bg-white flex items-center justify-center rounded-lg">
          <img src={serveAirIcon} alt="" className=" h-[3rem] w-[3rem] " />
        </div>
        <div className="ml-2">
          <h1 className="font-semibold text-skyblue-800">Serve Air Cargo</h1>
          <h2 className=" text-[0.6rem] italic">Airlines and aviation</h2>
        </div>
      </div>
      <ul>
        {links.map((link) => {
          const { path, name, Icon, id } = link;
          return (
            <li>
              <SideBarLink
                name={name}
                path={path}
                currentPath={currentPath}
                Icon={Icon}
                key={id}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideNavBar;
