import React, { useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import PackageDetails from "../components/PackageDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCurrentPackage,
  setCurrentPackage,
} from "../redux/slices/packagesSlice";

const TableRow = ({ incomingPackage, index }) => {
  const { id, origin, weight, status } = incomingPackage;
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(setCurrentPackage(id));
  };
  return (
    <tr
      className={`${
        index % 2 !== 0 ? " bg-skyblue-50" : ""
      } h-[2rem] hover:bg-skyblue-100 hover:cursor-pointer grid grid-cols-4 border-b border-skyblue-100`}
      onClick={clickHandler}
    >
      <td className=" flex items-center pl-5 ">{id}</td>
      <td className=" flex items-center pl-5 ">{weight} Kg</td>
      <td className=" flex items-center pl-5 ">{origin}</td>
      <td className=" flex items-center pl-5">{status}</td>
    </tr>
  );
};

const IncomingPackageTable = () => {
  const { incomingPackages } = useSelector((store) => store.packages);
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
            Origin
          </th>
          <th className=" flex items-center justify-center">Status</th>
        </tr>
      </thead>
      <tbody>
        {incomingPackages.map((incomingPackage, index) => (
          <TableRow index={index} incomingPackage={incomingPackage} />
        ))}
      </tbody>
    </table>
  );
};

const IncomingPackages = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentPackage } = useSelector((store) => store.packages);

  useEffect(() => {
    dispatch(removeCurrentPackage());
  }, []);

  return (
    <PageWrapper currentPath={location.pathname}>
      <div className=" flex gap-5">
        <div className=" w-[50rem] h-fit p-4 rounded-xl border-2 border-skyblue-100  bg-white">
          <div className=" w-full flex justify-between pb-4 border-b border-skyblue-300">
            <p className=" text-xl font-semibold">Incoming packages</p>
            <SearchBar />
          </div>
          <IncomingPackageTable />
        </div>

        {currentPackage && <PackageDetails />}
      </div>
    </PageWrapper>
  );
};

export default IncomingPackages;
