import React from "react";
import SidebarLink from "./SidebarLink";
import { FaLocationDot, FaRoute, FaWarehouse } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import logo from "../assets/logo.png";
import { GoPackageDependencies, GoPackageDependents } from "react-icons/go";
import { ToastContainer, Slide } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { TbShoppingCartDown } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";
import { logout } from "../redux/slices/usersSlice";

const Sidebar = ({ children }) => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.users);

  const logoutHandler = () => {
    dispatch(logout({ token }));
  };
  return (
    <div className="w-full pl-[17rem] pt-[4rem] pr-4">
      <ToastContainer
        autoClose={5000}
        // transition={Slide}
        hideProgressBar={true}
      />
      <div className="fixed top-0 left-[255px] right-0 h-[3rem] bg-white border-b border-b-skyblue-200 z-30"></div>
      <div className="w-[16rem] fixed left-0 bg-white top-0 bottom-0 px-7 border-r border-r-skyblue-200 z-20">
        <div className="w-full flex flex-col gap-4 mt-4">
          <div className="w-full flex items-center flex-col">
            <img src={logo} className="w-[6rem]" />
            <p className="text-sm italic">online shipping management</p>
          </div>
          <SidebarLink
            to={"/"}
            name={"Dashboard"}
            icon={<LuLayoutDashboard size={20} />}
          />

          <SidebarLink
            to={"/warehouse"}
            name={"Warehouse"}
            icon={<FaWarehouse size={20} />}
          />

          <SidebarLink
            to={"/incoming_packages"}
            name={"Incoming packages"}
            icon={<GoPackageDependencies size={20} />}
          />
          <SidebarLink
            to={"/outgoing_packages"}
            name={"Outgoing packages"}
            icon={<GoPackageDependents size={20} />}
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
          <button onClick={logoutHandler}>
            <div className="w-full h-[3rem] border border-skyblue-800 rounded-full font-semibold text-lg flex items-center gap-4 pl-[1.5rem] text-skyblue-800 hover:text-white hover:bg-skyblue-800">
              <CiLogout size={32} />
              <p>Logout</p>
            </div>
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
