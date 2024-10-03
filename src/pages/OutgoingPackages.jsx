import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import SmallRoundedButton from "../components/SmallRoundedButton";
import NewPackage from "../popups/NewPackage";

const OutgoingPackages = () => {
  const [isAddingPackage, setIsAddingPackage] = useState(false);
  return (
    <Sidebar>
      {isAddingPackage && (
        <NewPackage closeHandler={() => setIsAddingPackage(false)} />
      )}
      <header className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Outgoing packages</h1>
        <SmallRoundedButton
          name={"new package"}
          onClick={() => setIsAddingPackage(true)}
        />
      </header>
    </Sidebar>
  );
};

export default OutgoingPackages;
