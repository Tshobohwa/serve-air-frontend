import React from "react";
import { IoLocationOutline } from "react-icons/io5";

const AddressCard = ({ address }) => {
  const { city, territory, province } = address;
  return (
    <div className="w-full p-4 bg-white border border-skyblue-200 flex gap-2 rounded-lg">
      <div className="w-[4rem] h-[4rem] rounded-full bg-skyblue-50 flex items-center justify-center text-skyblue-800">
        <IoLocationOutline size={48} />
      </div>
      <div>
        <p className="font-semibold">{city}</p>
        <p className="text-sm text-skyblue-500">
          {territory + ", " + province}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
