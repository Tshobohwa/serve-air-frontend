import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaLocationDot, FaPen, FaRoute } from "react-icons/fa6";
import UpdateRoute from "../popups/UpdateRoute";

const Address = ({ address, type }) => {
  const { city, territory, province } = address;
  return (
    <div className="flex gap-4 items-start">
      <div className="w-[2rem] h-[2rem] rounded-full flex items-center justify-center bg-skyblue-50 text-skyblue-600">
        <FaLocationDot size={20} />
      </div>
      <div>
        <p>{type}</p>
        <p className="font-semibold">{city}</p>
        <p className="text-sm text-skyblue-500">
          {territory + ", " + province}
        </p>
      </div>
    </div>
  );
};

const RouteCard = ({ route }) => {
  const { origin, destination, pricing } = route;
  const [isUpdatingRoute, setIsUpdatingRoute] = useState(false);
  return (
    <div className="w-full border border-skyblue-200 bg-white rounded-md grid grid-cols-4rem-cols-3 gap-4 p-4">
      {isUpdatingRoute && (
        <UpdateRoute
          closeHandler={() => setIsUpdatingRoute(false)}
          initialPricing={pricing}
          route={route}
        />
      )}
      <div className="h-[4rem] w-[4rem] bg-skyblue-50 rounded-full flex items-center justify-center text-skyblue-600">
        <FaRoute />
      </div>
      <Address address={origin.address} type={"Origin"} />
      <Address address={destination.address} type={"Destination"} />
      <div className="flex items-end gap-2">
        <div>
          <p>pricing:</p>
          <p className="font-semibold text-3xl">
            {pricing} <span className="text-sm">USD / KG</span>
          </p>
        </div>
        <button
          className="w-[2rem] border border-sky-400 h-[2rem] rounded-full flex items-center justify-center"
          onClick={() => setIsUpdatingRoute(true)}
        >
          <FaPen size={16} />
        </button>
      </div>
    </div>
  );
};

export default RouteCard;
