import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import SmallRoundedButton from "../components/SmallRoundedButton";
import NewRoute from "../popups/NewRoute";
import { useDispatch, useSelector } from "react-redux";
import { getRoutes } from "../redux/slices/routesSlice";
import RouteCard from "../cards/RouteCard";

const PackageRoutes = () => {
  const dispatch = useDispatch();
  const [addingRoute, setAddingRoute] = useState(false);
  const { routes } = useSelector((state) => state.routes);

  useEffect(() => {
    dispatch(getRoutes());
  }, []);

  useEffect(() => {
    console.log(routes);
  }, [routes]);
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
      <section className="grid grid-cols-1 gap-4">
        {routes.map((route) => (
          <RouteCard route={route} key={route.id} />
        ))}
      </section>
    </Sidebar>
  );
};

export default PackageRoutes;
