import React from "react";
import Sidebar from "../components/Sidebar";
import SmallRoundedButton from "../components/SmallRoundedButton";

const OutgoingPackages = () => {
  return (
    <Sidebar>
      <header className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Outgoing packages</h1>
        <SmallRoundedButton name={"new package"} />
      </header>
    </Sidebar>
  );
};

export default OutgoingPackages;
