import React from "react";
import SidebarLink from "./SidebarLink";
import { FaLocationDot, FaRoute } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";

const Sidebar = ({ children }) => {
  return (
    <div className="w-full pl-[17rem]">
      <div className="w-[16rem] fixed left-0 bg-blue-950 top-0 bottom-0 px-4">
        <div className="w-full flex flex-col gap-4 mt-4">
          <SidebarLink
            to={"/"}
            name={"Dashboard"}
            icon={<LuLayoutDashboard size={20} />}
          />

          <SidebarLink
            to={"/routes"}
            name={"Routes"}
            icon={<FaRoute size={20} />}
          />

          <SidebarLink
            to={"/addresses"}
            name={"Adresses"}
            icon={<FaLocationDot size={20} />}
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
