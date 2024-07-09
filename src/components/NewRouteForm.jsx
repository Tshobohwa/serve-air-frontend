import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getDestinations, getOrigins } from "../redux/slices/addressesSlice";
import { postRoute } from "../redux/slices/routesSlice";

const NewRouteForm = ({ toggleAddingRoute }) => {
  const dispatch = useDispatch();
  const { origins, destinations } = useSelector((store) => store.addresses);

  const [currentOrigin, setCurrentOrigin] = useState(undefined);
  const [currentDestination, setCurrentDestination] = useState(undefined);
  const [pricing, setPricing] = useState(0);

  useEffect(() => {
    dispatch(getDestinations());
    dispatch(getOrigins());
  }, []);

  const changeCurrentOriginHandler = (e) => {
    setCurrentOrigin(e.target.value);
  };

  const changeCurrentDestinationHandler = (e) => {
    setCurrentDestination(e.target.value);
  };

  const pricingChangeHandler = (e) => {
    setPricing(+e.target.value);
  };

  const submitHandler = () => {
    const route = {
      origin_id: currentOrigin,
      destination_id: currentDestination,
      pricing,
    };
    dispatch(postRoute(route));
  };

  useEffect(() => {
    if (!origins[0] || !destinations[0]) return;
    setCurrentOrigin(origins[0].id);
    setCurrentDestination(destinations[0].id);
  }, [origins, destinations]);

  return (
    <div className="w-[23rem] p-3 border rounded-lg border-skyblue-100 mb-5 h-fit bg-white">
      <div className=" w-full flex justify-between pb-2 border-b-2 border-skyblue-100">
        <p className=" font-semibold text-lg">New Route</p>
        <button
          onClick={toggleAddingRoute}
          className=" h-[2rem] w-[2rem] border border-skyblue-100 rounded-md text-skyblue-800 hover:bg-skyblue-800 hover:text-white flex items-center justify-center"
        >
          <IoCloseOutline size={24} />
        </button>
      </div>
      <div className=" border border-skyblue-100 p-3 rounded-lg my-3 flex flex-col gap-2">
        <select
          type="text"
          className="h-[2.2rem] w-full rounded-md border-2 border-skyblue-200 pl-4 focus:outline-none"
          onChange={changeCurrentOriginHandler}
        >
          {origins &&
            origins.map((origin) => (
              <option value={origin.id} key={origin.id}>
                {origin.address.city}
              </option>
            ))}
        </select>
        <select
          type="text"
          className="h-[2.2rem] w-full rounded-md border-2 border-skyblue-200 pl-4 focus:outline-none"
          onChange={changeCurrentDestinationHandler}
        >
          {destinations &&
            destinations.map((destination) => (
              <option value={destination.id} key={destination.id}>
                {destination.address.city}
              </option>
            ))}
        </select>
        <input
          type="text"
          className="h-[2.2rem] w-full rounded-md border-2 border-skyblue-200 pl-4 focus:outline-none"
          placeholder="pricing"
          onChange={pricingChangeHandler}
        />
      </div>
      {
        <button
          className="h-[2.5rem] w-full bg-skyblue-700 rounded-md font-semibold text-white hover:bg-skyblue-500"
          onClick={submitHandler}
        >
          Add Route
        </button>
      }
    </div>
  );
};

export default NewRouteForm;
