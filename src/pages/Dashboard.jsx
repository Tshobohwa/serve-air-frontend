import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { useLocation } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";
import AvailablePackages from "../components/AvailablePackages";

const Dashboard = () => {
  const location = useLocation();
  const [date, setDate] = useState(Date.now());
  const calculateDate = () => {
    setInterval(() => {
      setDate(Date.now);
    }, 1000);
  };

  useEffect(() => {
    calculateDate();
  }, []);
  return (
    <PageWrapper currentPath={location.pathname}>
      <div className="p-4 bg-white border border-skyblue-100 rounded-lg mr-[1rem] grid grid-cols-4 gap-[1rem]">
        <div className=" h-full flex flex-col justify-between border-r border-skyblue-200">
          <h1 className=" font-semibold text-2xl text-black-200">
            Dashboard overview
          </h1>
          <div className=" flex gap-3 items-center">
            <FaLocationDot size={16} />
            <h2>Kinshasa,</h2>

            <div className=" text-sm text-black-200 flex gap-3 items-center">
              <FaCalendarAlt size={16} />
              <p>{new Date(date).toDateString()}</p>
            </div>
          </div>
        </div>
        <div className=" border-r border-skyblue-200">
          <h2 className=" font-semibold">Incoming packages</h2>
          <p>Weight: 45600 Kg</p>
          <p>Price: 56 732 USD</p>
        </div>
        <div className=" border-r border-skyblue-200">
          <h2 className=" font-semibold">Outgoing packages</h2>
          <p>Weight: 32 300 Kg</p>
          <p>Price: 67 345 USD</p>
        </div>
        <div>
          <h2 className=" font-semibold">In warehouse</h2>
          <p>Weight: 28 500 Kg</p>
          <p>Price: 45 345 USD</p>
        </div>
      </div>
      <div className="mr-[1rem] grid grid-cols-3 gap-[1rem] mt-[1rem]">
        <div className="p-4 bg-white border border-skyblue-100 rounded-lg h-[10rem]">
          <p>Package metrics</p>
        </div>
        <div className="p-4 bg-white border border-skyblue-100 rounded-lg h-[10rem]">
          <p>Origins and destinations</p>
        </div>
        <div className="p-4 bg-white border border-skyblue-100 rounded-lg h-[10rem]">
          <p>Packages statuses</p>
        </div>
      </div>
      <AvailablePackages />
    </PageWrapper>
  );
};

export default Dashboard;
