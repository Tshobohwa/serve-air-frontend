import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import SmallRoundedButton from "../components/SmallRoundedButton";
import NewRoute from "../popups/NewRoute";

const PackageRoutes = () => {
  const [addingRoute, setAddingRoute] = useState(false);
  return (
    <Sidebar>
      {addingRoute && <NewRoute closeHandler={() => setAddingRoute(false)} />}
      <header className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Routes</h1>
        <SmallRoundedButton
          name={"new route"}
          onClick={() => setAddingRoute(true)}
        />
      </header>
    </Sidebar>
  );
};

export default PackageRoutes;
