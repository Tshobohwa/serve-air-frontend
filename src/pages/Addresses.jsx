import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import SmallRoundedButton from "../components/SmallRoundedButton";
import NewAddress from "../popups/NewAddress";

const Addresses = () => {
  const [addingAddress, setAddingAddress] = useState(false);
  return (
    <Sidebar>
      {addingAddress && (
        <NewAddress closeHandler={() => setAddingAddress(false)} />
      )}
      <header className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Addresses</h1>
        <SmallRoundedButton
          name={"new address"}
          onClick={() => setAddingAddress(true)}
        />
      </header>
    </Sidebar>
  );
};

export default Addresses;
