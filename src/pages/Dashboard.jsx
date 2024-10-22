import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { LuWarehouse } from "react-icons/lu";
import { GoPackageDependencies, GoPackageDependents } from "react-icons/go";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPackages } from "../redux/slices/packagesSlice";
import PackagesOriginisAndDestinationBarChart from "../charts/PackagesOriginisAndDestinationBarChart";
import PackageStatusesPieChart from "../charts/PackageStatusesPieChart";
import { getRoutes } from "../redux/slices/routesSlice";
import { CiLocationArrow1 } from "react-icons/ci";
import {
  getAddresses,
  setCurrentAddress,
} from "../redux/slices/addressesSlice";
import { FaLocationDot } from "react-icons/fa6";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.users);
  const { incomingPackages, outgoingPackages, warehouse } = useSelector(
    (state) => state.packages
  );
  const { addresses, currentAddress } = useSelector((state) => state.addresses);
  const { routes } = useSelector((state) => state.routes);

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

    let outgoingPackagesPrice = 0;
    outgoingPackages.forEach(
      (shippment) => (outgoingPackagesPrice += Number(shippment.price))
    );
    setoutgoingPackagesPrice(outgoingPackagesPrice);
  }, [incomingPackages, outgoingPackages, warehouse]);

  useEffect(() => {
    dispatch(getPackages({ address_id: currentUser.address_id, token }));
    dispatch(getRoutes({ token }));
    dispatch(getAddresses());
    console.log(currentUser);
  }, []);

  useEffect(() => {
    console.log(addresses);
    if (!addresses) return;
    dispatch(setCurrentAddress(currentUser.id));
  }, [addresses]);

  return (
    <Sidebar>
      <header className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="flex justify-between gap-4">
          <FaLocationDot />
          <p className="font-semibold">{currentAddress?.city}</p>
        </div>
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
      <section className="grid grid-cols-1-2 mt-4 gap-4 pb-4">
        <div className="w-full p-4 bg-white border border-skyblue-200 rounded-lg">
          <p>Packages status</p>
          <div>
            <PackageStatusesPieChart />
          </div>
        </div>
        <div className="w-full p-4 bg-white border border-skyblue-200 rounded-lg overflow-y-scroll">
          <p className="pb-4">Routes pricings</p>
          <table className="w-full">
            <thead>
              <tr className="h-[2.5rem] border border-skyblue-600 text-white bg-sky-600">
                <th className="w-[35%]">Origin</th>
                <th className="border-white border border-t-0 border-b-0 w-[35%]">
                  Destination
                </th>
                <th>Pricing</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route, index) => (
                <tr
                  className={`${
                    index % 2 === 1 ? "bg-skyblue-100" : ""
                  } h-[2.5rem] border-l border-r border-skyblue-600 ${
                    index === routes.length - 1 ? "border-b" : "border-b-0"
                  }`}
                >
                  <td className="pl-4">{route.origin.address.city}</td>
                  <td className="pl-4">{route.destination.address.city}</td>
                  <td className="text-center">{route.pricing} USD / Kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Sidebar>
  );
};

export default Dashboard;
