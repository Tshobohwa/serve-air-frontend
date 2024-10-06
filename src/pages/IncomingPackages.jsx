import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import SearchInput from "../components/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import {
  getPackages,
  resetPackageUpdated,
} from "../redux/slices/packagesSlice";

const IncomingPackages = () => {
  const dispatch = useDispatch();
  const [searchId, setSeachId] = useState("");
  const { packageUpdated } = useSelector((state) => state.packages);
  const { token, currentUser } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getPackages({ token, address_id: currentUser.address_id }));
    dispatch(resetPackageUpdated());
  }, [packageUpdated]);
  return (
    <Sidebar>
      <header className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Incoming packages</h1>
        <SearchInput
          value={searchId}
          onChange={setSeachId}
          placeholder={"Search package by ID"}
        />
      </header>
    </Sidebar>
  );
};

export default IncomingPackages;
