import React from "react";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

const AvailablePackages = () => {
  const { addresses } = useSelector((store) => store.addresses);
  const { statuses } = useSelector((store) => store.statuses);

  return (
    <div className="p-4 bg-white border border-skyblue-100 rounded-lg mr-[1rem] gap-[1rem] mt-4">
      <div className=" w-full flex justify-between items-center">
        <p className=" font-semibold text-lg">Available Packages</p>
        <div className=" flex gap-4">
          <div className=" flex gap-2 items-center">
            <p>address:</p>
            <select
              name="addresses"
              className=" h-[2.5rem] rounded-lg bg-white border border-skyblue-100 pl-3 focus:outline-none"
            >
              <option value="all">all</option>
              {addresses.map((address) => (
                <option value={address.id}>{address.city}</option>
              ))}
            </select>
          </div>
          <div className=" flex gap-2 items-center">
            <p>status:</p>
            <select
              name="statuses"
              className=" h-[2.5rem] rounded-lg bg-white border border-skyblue-100 pl-3 focus:outline-none"
            >
              <option value="all">all</option>
              {statuses.map((status) => (
                <option value={status.id}>{status.name}</option>
              ))}
            </select>
          </div>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default AvailablePackages;
