import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { removeCurrentPackage } from "../redux/slices/packagesSlice";

const PackageDetails = () => {
  const { currentPackage } = useSelector((store) => store.packages);
  const dispatch = useDispatch();
  const {
    id,
    route_id,
    sender_name,
    sender_phone_number,
    receiver_name,
    receiver_phone_number,
    description,
    status,
    weight,
    price,
  } = currentPackage;

  const { routes } = useSelector((store) => store.routes);
  const { origins } = useSelector((store) => store.origins);
  const { destinations } = useSelector((store) => store.destinations);

  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});
  const [route, setRoute] = useState({});

  const closeHandler = () => {
    dispatch(removeCurrentPackage());
  };

  useEffect(() => {
    setRoute(routes.find((route) => route.id === route_id));
  }, [routes]);

  useEffect(() => {
    setOrigin(origins.find((or) => or.id === route.origin_id));
  }, [origins, route]);

  useEffect(() => {
    setDestination(
      destinations.find(
        (destination) => destination.id === route.destination_id
      )
    );
  }, [destinations, route]);

  return (
    <div className=" w-[20rem] p-4 rounded-lg border border-skyblue-100 bg-white h-fit">
      <div className=" flex justify-between items-center border-b-2 border-skyblue-100 pb-4">
        <p className="">Package: {id}</p>
        <button
          className=" h-[2.5rem] w-[2.5rem] rounded-lg border border-skyblue-800 text-skyblue-800 hover:text-white hover:bg-skyblue-800 flex items-center justify-center"
          onClick={closeHandler}
        >
          <IoCloseOutline size={24} />
        </button>
      </div>
      <div className=" rounded-lg border border-skyblue-100 p-3 mt-3 w-full">
        <p className=" text-center my-2">sender</p>
        <div className="flex justify-between w-full pb-1 border-b border-[#d3d3d3]">
          <p>names:</p>
          <p>{sender_name}</p>
        </div>
        <div className="flex justify-between w-full border-b py-1 border-[#d3d3d3]">
          <p>telephone:</p>
          <p>{sender_phone_number}</p>
        </div>
        <div className="flex justify-between w-full pt-1">
          <p>address:</p>
          <p>{origin?.address?.city}</p>
        </div>
      </div>
      <div className=" rounded-lg border border-skyblue-100 p-3 mt-3 w-full">
        <p className=" text-center my-2">Receiver</p>
        <div className="flex justify-between w-full pb-1 border-b border-[#d3d3d3]">
          <p>names:</p>
          <p>{receiver_name}</p>
        </div>
        <div className="flex justify-between w-full border-b py-1 border-[#d3d3d3]">
          <p>telephone:</p>
          <p>{receiver_phone_number}</p>
        </div>
        <div className="flex justify-between w-full pt-1">
          <p>address:</p>
          <p>{destination?.address?.city}</p>
        </div>
      </div>
      <div className=" rounded-lg border border-skyblue-100 p-3 mt-3 w-full">
        <p className=" text-center my-2">Package</p>
        <div className="flex justify-between w-full pb-1 border-b border-[#d3d3d3]">
          <p>weight:</p>
          <p>{weight} kg</p>
        </div>
        <div className="flex justify-between w-full border-b py-1 border-[#d3d3d3]">
          <p>price:</p>
          <p>{price} USD</p>
        </div>
        <div className="flex justify-between w-full py-1 border-b border-[#d3d3d3]">
          <p>description: {description}</p>
        </div>
        <div className="flex justify-between w-full border-b py-1 border-[#d3d3d3]">
          <p>status:</p>
          <button className="rounded-[1rem] px-[1rem] h-[2rem] bg-skyblue-100 flex items-center">
            <p className="mr-3 inline-block">{status}</p> <FaAngleDown />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
