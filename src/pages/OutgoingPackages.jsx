import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { useLocation } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import SearchBar from "../components/SearchBar";
import outgoingPackages from "../mockingData/outgoingPackages";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCurrentPackage,
  setCurrentPackage,
} from "../redux/slices/packagesSlice";
import NewPackageForm from "../components/NewPackageForm";
import PackageDetails from "../components/PackageDetails";

const TableRow = ({ outgoingPackage, index }) => {
  const dispatch = useDispatch();

  const { id, destination, weight, status } = outgoingPackage;

  const clickHandler = () => {
    dispatch(setCurrentPackage(id));
  };

  return (
    <tr
      className={`${
        index % 2 !== 0 ? " bg-skyblue-50" : ""
      } h-[2rem] hover:bg-skyblue-100 hover:cursor-pointer grid grid-cols-4 border-b border-b-skyblue-100`}
      onClick={clickHandler}
    >
      <td className=" flex items-center pl-5">{id}</td>
      <td className=" flex items-center pl-5">{weight} Kg</td>
      <td className=" flex items-center pl-5">{destination}</td>
      <td className=" flex items-center pl-5">{status}</td>
    </tr>
  );
};

const OutgoingPackageTable = () => {
  return (
    <table className="w-full mt-5">
      <thead className=" bg-skyblue-800 text-white">
        <tr className=" grid grid-cols-4 h-[2rem]">
          <th className=" flex items-center justify-center border-r border-white ">
            ID
          </th>
          <th className=" flex items-center justify-center border-r border-white ">
            Weight
          </th>
          <th className=" flex items-center justify-center border-r border-white ">
            destination
          </th>
          <th className=" flex items-center justify-center">Status</th>
        </tr>
      </thead>
      <tbody>
        {outgoingPackages.map((outgoingPackage, index) => (
          <TableRow index={index} outgoingPackage={outgoingPackage} />
        ))}
      </tbody>
    </table>
  );
};

const OutgoingPackages = () => {
  const location = useLocation();
  const [formOpened, setFormOpened] = useState(false);
  const dispatch = useDispatch();
  const toggleFormOpened = () => {
    setFormOpened(!formOpened);
  };
  const { currentPackage } = useSelector((store) => store.packages);

  useEffect(() => {
    dispatch(removeCurrentPackage());
  }, []);

  return (
    <PageWrapper currentPath={location.pathname}>
      <div className="w-full flex gap-5">
        <div className=" w-[45rem] h-fit p-4 rounded-xl border-2 border-skyblue-100 bg-white">
          <div className=" w-full flex justify-between pb-4 border-b border-skyblue-300">
            <p className=" text-xl font-semibold">Outgoing packages</p>
            <SearchBar />
          </div>
          <OutgoingPackageTable />
        </div>
        {currentPackage ? (
          <PackageDetails />
        ) : formOpened ? (
          <NewPackageForm closeHandler={toggleFormOpened} />
        ) : (
          <button
            className="h-[2.5rem] w-[10rem] bg-skyblue-700 rounded-md font-semibold text-white hover:bg-skyblue-500"
            onClick={toggleFormOpened}
          >
            New Package
          </button>
        )}
      </div>
    </PageWrapper>
  );
};

export default OutgoingPackages;
