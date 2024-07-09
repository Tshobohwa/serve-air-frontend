import React from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className=" bg-white border-b border-skyblue-200 h-[3rem] mb-3 flex items-center justify-between px-[2rem] fixed top-0 left-[15rem] right-0 z-10">
      <h1 className="font-semibold text-skyblue-800">Serve Air Cargo</h1>
      <Link to="/profile">
        <CgProfile size={32} color="#085fab" />
      </Link>
    </header>
  );
};

export default Header;
