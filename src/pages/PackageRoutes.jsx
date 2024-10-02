import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import SmallRoundedButton from "../components/SmallRoundedButton";
import NewRoute from "../popups/NewRoute";
import { useDispatch } from "react-redux";
import { getRoutes } from "../redux/slices/routesSlice";

const PackageRoutes = () => {
  const dispatch = useDispatch();
  const [addingRoute, setAddingRoute] = useState(false);

  useEffect(() => {
    dispatch(getRoutes());
  }, []);
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
