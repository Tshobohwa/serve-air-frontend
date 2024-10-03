import React from "react";
import Sidebar from "../components/Sidebar";
import { LuWarehouse } from "react-icons/lu";
import { GoPackageDependencies, GoPackageDependents } from "react-icons/go";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Sidebar>
      <header className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
      </header>
      <section className="w-full grid grid-cols-3 gap-4 mt-4">
        <Link to={"/warehouse"}>
          <div className="w-full p-4 bg-white rounded-xl border border-skyblue-200 flex gap-4 items-start">
            <div className="w-[4rem] h-[4rem] bg-skyblue-100 rounded-full flex items-center justify-center">
              <LuWarehouse size={32} />
            </div>
            <div>
              <p>In warehouse</p>
              <p className="text-2xl font-semibold">500 pkgs</p>
              <p className="text-sm text-skyblue-800">Total weight: 3500 KG</p>
              <p className="text-sm text-skyblue-800">Total price: 4800 USD</p>
            </div>
          </div>
        </Link>
        <Link to={"/incoming_packages"}>
          <div className="w-full p-4 bg-white rounded-xl border border-skyblue-200 flex gap-4 items-start">
            <div className="w-[4rem] h-[4rem] bg-skyblue-100 rounded-full flex items-center justify-center">
              <GoPackageDependencies size={32} />
            </div>
            <div>
              <p>Incoming packages</p>
              <p className="text-2xl font-semibold">500 pkgs</p>
              <p className="text-sm text-skyblue-800">Total weight: 3500 KG</p>
              <p className="text-sm text-skyblue-800">Total price: 4800 USD</p>
            </div>
          </div>
        </Link>
        <Link to={"/outgoing_packages"}>
          <div className="w-full p-4 bg-white rounded-xl border border-skyblue-200 flex gap-4 items-start">
            <div className="w-[4rem] h-[4rem] bg-skyblue-100 rounded-full flex items-center justify-center">
              <GoPackageDependents size={32} />
            </div>
            <div>
              <p>Outgoing packages</p>
              <p className="text-2xl font-semibold">500 pkgs</p>
              <p className="text-sm text-skyblue-800">Total weight: 3500 KG</p>
              <p className="text-sm text-skyblue-800">Total price: 4800 USD</p>
            </div>
          </div>
        </Link>
      </section>
      <section className="grid grid-cols-1-2 mt-4 gap-4">
        <div className="w-full p-4 bg-white border border-skyblue-200 rounded-lg">
          <p>Packages status</p>
        </div>
        <div className="w-full p-4 bg-white border border-skyblue-200 rounded-lg">
          packages origins
        </div>
      </section>
    </Sidebar>
  );
};

export default Dashboard;
