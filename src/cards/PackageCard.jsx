import React, { useState } from "react";
import { BiUser } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { TfiPackage } from "react-icons/tfi";
import UpdatePackageStatus from "../popups/UpdatePackageStatus";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegCircleCheck } from "react-icons/fa6";

const PackageCard = ({ shippement }) => {
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  return (
    <div className="w-full bg-white p-4 border border-skyblue-200 rounded-lg">
      {isUpdatingStatus && (
        <UpdatePackageStatus
          closeHandler={() => setIsUpdatingStatus(false)}
          shippingPackage={shippement}
        />
      )}
      <div className="w-full">
        <div className="w-full">
          <div className="flex justify-between items-start">
            <div className="w-[3rem] h-[3rem] rounded-full bg-sky-100 flex items-center justify-center text-blue-800">
              <TfiPackage size={20} />
            </div>
            <div className="">
              <p className="w-full text-end">id: {shippement.id}</p>
              <p className="w-full text-end">
                sent on: {new Date(shippement.created_at).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="w-full my-4 p-4 bg-skyblue-50 rounded-lg">
            <div className="w-full flex justify-between">
              <p>
                weight:{" "}
                <span className="font-semibold">{shippement.weight} Kg</span>
              </p>
              <p>
                price:{" "}
                <span className="font-semibold">
                  {Number(shippement.price).toFixed(2)} USD
                </span>
              </p>
            </div>
            <p className="">Description:</p>
            <p className="text-sm italic text-skyblue-800">
              {shippement.description}
            </p>
          </div>
          <div className="w-full grid grid-cols-2 gap-4">
            <div>
              <p>sender:</p>
              <div className="w-full flex gap-2 items-center">
                <BiUser size={16} />
                <p className="font-semibold">{shippement.sender_name}</p>
              </div>
              <div className="w-full flex gap-2 items-center text-skyblue-800 text-sm">
                <BsTelephone size={16} />
                <p>{shippement.sender_phone_number}</p>
              </div>
            </div>
            <div>
              <p>receiver:</p>
              <div className="w-full flex gap-2 items-center">
                <BiUser size={16} />
                <p className="font-semibold">{shippement.receiver_name}</p>
              </div>
              <div className="w-full flex gap-2 items-center text-skyblue-800 text-sm">
                <BsTelephone size={16} />
                <p>{shippement.receiver_phone_number}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-4 pt-4">
        <div></div>
        <div
          className="h-[3rem] w-full bg-yellow-500 rounded-full flex items-center pl-2 gap-4 hover:cursor-pointer"
          onClick={() => setIsUpdatingStatus(true)}
        >
          <p>
            <FaRegCircleCheck size={32} />
          </p>
          <p className="font-semibold">{shippement.status.name}</p>
        </div>
        <div className="h-[3rem] w-full bg-green-500 rounded-full flex items-center pl-2 gap-4 hover:cursor-pointer">
          <IoLocationOutline size={32} />
          <p className="font-semibold">
            {shippement.status_id === 3 && "---"}
            {shippement.status_id === 6 && "unknown"}
            {shippement.status_id !== 3 && shippement.status_id !== 6
              ? shippement.current_address?.city
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
