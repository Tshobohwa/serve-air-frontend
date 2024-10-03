import React from "react";
import Sidebar from "../components/Sidebar";
import SmallRoundedButton from "../components/SmallRoundedButton";

const IncomingPackages = () => {
  return (
    <Sidebar>
      <header className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Incoming packages</h1>
      </header>
    </Sidebar>
  );
};

export default IncomingPackages;
