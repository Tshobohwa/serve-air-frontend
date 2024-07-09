import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCurrentRoute, updateRoute } from "../redux/slices/routesSlice";
import { IoCloseOutline } from "react-icons/io5";

const UpdateRouteForm = () => {
  const dispatch = useDispatch();
  const { currentRoute } = useSelector((store) => store.routes);
  const [pricing, setPricing] = useState(currentRoute.pricing);

  // Remove the selected route for update and close the form
  const toggleUpdatingRoute = () => {
    dispatch(removeCurrentRoute());
  };

  const pricingChangeHandler = (e) => {
    setPricing(e.target.value);
  };

  const submitHandler = () => {
    const route = { pricing };
    dispatch(updateRoute({ id: currentRoute.id, route }));
  };

  useEffect(() => {
    setPricing(currentRoute.pricing);
  }, [currentRoute]);

  return (
    <div className="w-[23rem] bg-white p-3 border rounded-lg border-skyblue-100 mb-5 h-fit">
      <div className=" w-full flex justify-between pb-2 border-b-2 border-skyblue-100">
        <p className=" font-semibold text-lg">Update Route</p>
        <button
          onClick={toggleUpdatingRoute}
          className=" h-[2rem] w-[2rem] border border-skyblue-800 rounded-md text-skyblue-800 hover:bg-skyblue-800 hover:text-white flex items-center justify-center"
        >
          <IoCloseOutline size={24} />
        </button>
      </div>
      <div className=" border border-skyblue-100 p-3 rounded-lg my-3 flex flex-col gap-2">
        <div className=" w-full py-1 border-b border-[#d3d3d3] flex justify-between">
          <p>origin:</p> <p>{currentRoute.origin.address.city}</p>
        </div>
        <div className=" w-full py-1 border-b border-[#d3d3d3] flex justify-between">
          <p>destination:</p> <p>{currentRoute.destination.address.city}</p>
        </div>

        <div className=" w-full py-1 border-b border-[#d3d3d3] flex justify-between items-center">
          <p>pricing(USD):</p>
          <input
            type="text"
            className="h-[2.2rem] w-[7rem] rounded-md border-2 border-skyblue-200 pl-4 focus:outline-none"
            placeholder="pricing"
            value={pricing}
            onChange={pricingChangeHandler}
          />
        </div>
      </div>
      <button
        className="h-[2.5rem] w-full bg-skyblue-700 rounded-md font-semibold text-white hover:bg-skyblue-500"
        onClick={submitHandler}
      >
        Update Route
      </button>
    </div>
  );
};

export default UpdateRouteForm;
