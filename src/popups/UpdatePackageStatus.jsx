import React, { useEffect } from "react";
import PopupContainer from "./PopupContainer";
import { useDispatch, useSelector } from "react-redux";
import { getStatuses } from "../redux/slices/statusesSlice";
import RoundedButton from "../components/RoundedButton";
import { IoClose } from "react-icons/io5";

const UpdatePackageStatus = ({ closeHandler, shippingPackage }) => {
  const dispatch = useDispatch();

  const { statuses } = useSelector((state) => state.statuses);

  const submitHandler = () => {};

  useEffect(() => {
    console.log(statuses);
  }, [statuses]);

  useEffect(() => {
    dispatch(getStatuses());
  }, []);
  return (
    <PopupContainer>
      <div className="w-[36rem] bg-white">
        <header className="h-[6rem] px-4 flex items-center justify-between border-b border-b-skyblue-100">
          <div>
            <h2 className="font-semibold text-2xl">Update package status</h2>
            <div className="flex gap-4">
              <p>package id: {shippingPackage?.id}</p>
              <p>weight: {shippingPackage?.weight}</p>
            </div>
          </div>
          <button className=" text-blue-900" onClick={closeHandler}>
            <IoClose size={32} />
          </button>
        </header>
        <section className="w-full overflow-y-scroll h-[20rem]">
          {statuses.map((status) => (
            <div className="w-full h-[5rem] border-b border-b-skyblue-200 hover:cursor-pointer hover:bg-skyblue-200 flex flex-col justify-center pl-6">
              <p className="text-lg">{status.name}</p>
              <p className="text-skyblue-800">{status.description}</p>
            </div>
          ))}
        </section>
      </div>
    </PopupContainer>
  );
};

export default UpdatePackageStatus;
