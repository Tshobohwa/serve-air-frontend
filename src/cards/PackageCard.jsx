import React from "react";
import { BiUser } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import { TfiPackage } from "react-icons/tfi";
import { useSelector } from "react-redux";

const PackageCard = () => {
  const { routes } = useSelector((state) => state.routes);
  return (
    <div className="w-full bg-white p-4 border border-skyblue-200 rounded-lg">
      <div className="w-full">
        <div className="w-full">
          <div className="flex justify-between items-start">
            <div className="w-[3rem] h-[3rem] rounded-full bg-sky-100 flex items-center justify-center text-blue-800">
              <TfiPackage size={20} />
            </div>
            <p className="w-full text-end">package id: 1</p>
          </div>
          <div className="w-full my-4 p-4 bg-skyblue-50 rounded-lg">
            <div className="w-full flex justify-between">
              <p>
                weight: <span className="font-semibold">180 Kg</span>
              </p>
              <p>
                price: <span className="font-semibold">360 USD</span>
              </p>
            </div>
            <p className="">Description:</p>
            <p className="text-sm italic text-skyblue-800">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              provident, eaque perspiciatis totam enim odit ipsa modi quia nulla
              tenetur deserunt eius, nisi quisquam adipisci recusandae dolor
              quaerat qui officia.
            </p>
          </div>
          <div className="w-full grid grid-cols-2 gap-4">
            <div>
              <p>sender:</p>
              <div className="w-full flex gap-2 items-center">
                <BiUser size={16} />
                <p className="font-semibold">John Doe</p>
              </div>
              <div className="w-full flex gap-2 items-center text-skyblue-800 text-sm">
                <BsTelephone size={16} />
                <p>+243973458714</p>
              </div>
            </div>
            <div>
              <p>receiver:</p>
              <div className="w-full flex gap-2 items-center">
                <BiUser size={16} />
                <p className="font-semibold">John Doe</p>
              </div>
              <div className="w-full flex gap-2 items-center text-skyblue-800 text-sm">
                <BsTelephone size={16} />
                <p>+243973458714</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-end">
        <button className="w-[3rem] h-[3rem] bg-white rounded-full border border-skyblue-200 flex items-center justify-center text-skyblue-800 hover:text-white hover:bg-skyblue-800">
          <GrUpdate size={20} />
        </button>
      </div>
    </div>
  );
};

export default PackageCard;