import React from "react";
import Header from "./Header";
import SideNavBar from "./SideNavBar";

const PageWrapper = ({ children, currentPath }) => {
  return (
    <>
      <Header />
      <div className=" pl-[16rem] pt-[4rem] h-full w-full">{children}</div>
      <SideNavBar currentPath={currentPath} />
    </>
  );
};

export default PageWrapper;
