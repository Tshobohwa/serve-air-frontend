import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { getRoutes, setCurrentRoute } from "../redux/slices/routesSlice";
import UpdateRouteForm from "../components/UpdateRouteForm";
import NewRouteForm from "../components/NewRouteForm";

const PackageRoutes = () => {
  const dispatch = useDispatch();
  const { routes, currentRoute } = useSelector((store) => store.routes);
  const location = useLocation();
  const [addingRoute, setAddingRoute] = useState(false);
  const toggleAddingRoute = () => {
    setAddingRoute(!addingRoute);
  };
  // Selected the route that will be opened in the modify route form
  const setCurrentRouteHandler = (routeId) => {
    return () => dispatch(setCurrentRoute(routeId));
  };

  useEffect(() => {
    dispatch(getRoutes());
  }, []);

  useEffect(() => {
    setAddingRoute(false);
  }, [routes.length]);

  return (
    <PageWrapper currentPath={location.pathname}>
      <div className="w-full flex gap-5">
        <div className=" w-[52rem] h-fit p-4 rounded-xl border-2 bg-white border-skyblue-100">
          <div className=" w-full flex justify-between pb-4 border-b border-skyblue-300">
            <p className=" text-xl font-semibold">Packages routes</p>
            <SearchBar />
          </div>
          <table className=" w-full mt-4">
            <thead className=" bg-skyblue-800 text-white font-semibold">
              <tr className="w-full grid grid-1fr-1fr-7rem h-[2rem]">
                <td className="text-center flex items-center justify-center">
                  Origin
                </td>
                <td className="border-white border-l border-r flex items-center justify-center">
                  Destination
                </td>
                <td className="flex items-center justify-center">Pricing</td>
              </tr>
            </thead>
            <tbody>
              {routes.map((route, index) => (
                <tr
                  className={`w-full grid grid-1fr-1fr-7rem h-[2rem] hover:bg-skyblue-100 hover:cursor-pointer ${
                    index % 2 !== 0 ? " bg-skyblue-50" : ""
                  }`}
                  onClick={setCurrentRouteHandler(route?.id)}
                >
                  <td className="border-b border-skyblue-200 pl-4 border-t-0">
                    {route.origin.address.city} &middot;{" "}
                    {route.origin.address.territory} &middot;{" "}
                    {route.origin.address.province}
                  </td>
                  <td className="border-b border-skyblue-200 pl-4">
                    {route.destination.address.city} &middot;{" "}
                    {route.destination.address.territory} &middot;{" "}
                    {route.destination.address.province}
                  </td>
                  <td className="border-b border-skyblue-200 pl-4 border-t-0">
                    {route.pricing}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {currentRoute ? (
          <UpdateRouteForm />
        ) : addingRoute ? (
          <NewRouteForm toggleAddingRoute={toggleAddingRoute} />
        ) : (
          <button
            className="h-[2.5rem] w-[10rem] bg-skyblue-700 rounded-md font-semibold text-white hover:bg-skyblue-500"
            onClick={toggleAddingRoute}
          >
            New Route
          </button>
        )}
      </div>
    </PageWrapper>
  );
};

export default PackageRoutes;
