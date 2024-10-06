import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { LuWarehouse } from "react-icons/lu";
import { GoPackageDependencies, GoPackageDependents } from "react-icons/go";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPackages } from "../redux/slices/packagesSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.users);
  const { incomingPackages, outgoingPackages, warehouse } = useSelector(
    (state) => state.packages
  );

  const [warehouseWeight, setwarehouseWeight] = useState(0);
  const [warehousePrice, setwarehousePrice] = useState(0);

  const [incomingPackagesWeight, setincomingPackagesWeight] = useState(0);
  const [incomingPackagesPrice, setincomingPackagesPrice] = useState(0);

  const [outgoingPackagesWeight, setoutgoingPackagesWeight] = useState(0);
  const [outgoingPackagesPrice, setoutgoingPackagesPrice] = useState(0);

  useEffect(() => {
    let warehouseWeight = 0;
    warehouse.forEach((shippment) => (warehouseWeight += shippment.weight));
    setwarehouseWeight(warehouseWeight);

    let warehousePrice = 0;
    warehouse.forEach(
      (shippment) => (warehousePrice += Number(shippment.price))
    );
    setwarehousePrice(warehousePrice);

    let incomingPackagesWeight = 0;
    incomingPackages.forEach(
      (shippment) => (incomingPackagesWeight += shippment.weight)
    );
    setincomingPackagesWeight(incomingPackagesWeight);

    let incomingPackagesPrice = 0;
    incomingPackages.forEach(
      (shippment) => (incomingPackagesPrice += Number(shippment.price))
    );
    setincomingPackagesPrice(incomingPackagesPrice);

    let outgoingPackagesWeight = 0;
    outgoingPackages.forEach(
      (shippment) => (outgoingPackagesWeight += shippment.weight)
    );
    setoutgoingPackagesWeight(outgoingPackagesWeight);

    console.log(outgoingPackages);
    let outgoingPackagesPrice = 0;
    outgoingPackages.forEach(
      (shippment) => (outgoingPackagesPrice += Number(shippment.price))
    );
    setoutgoingPackagesPrice(outgoingPackagesPrice);
  }, [incomingPackages, outgoingPackages, warehouse]);

  useEffect(() => {
    dispatch(getPackages({ address_id: currentUser.address_id, token }));
  }, []);
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
              <p className="text-2xl font-semibold">{warehouse.length} pkgs</p>
              <p className="text-sm text-skyblue-800">
                Total weight: {warehouseWeight} KG
              </p>
              <p className="text-sm text-skyblue-800">
                Total price: {warehousePrice.toFixed(2)} USD
              </p>
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
              <p className="text-2xl font-semibold">
                {incomingPackages.length} pkgs
              </p>
              <p className="text-sm text-skyblue-800">
                Total weight: {incomingPackagesWeight} KG
              </p>
              <p className="text-sm text-skyblue-800">
                Total price: {incomingPackagesPrice.toFixed(2)} USD
              </p>
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
              <p className="text-2xl font-semibold">
                {outgoingPackages.length} pkgs
              </p>
              <p className="text-sm text-skyblue-800">
                Total weight: {outgoingPackagesWeight} KG
              </p>
              <p className="text-sm text-skyblue-800">
                Total price: {outgoingPackagesPrice.toFixed(2)} USD
              </p>
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
