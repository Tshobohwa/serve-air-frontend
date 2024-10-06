import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { LuWarehouse } from "react-icons/lu";
import PackageCard from "../cards/PackageCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getPackages,
  resetPackageUpdated,
} from "../redux/slices/packagesSlice";
import SearchInput from "../components/SearchInput";

const Warehouse = () => {
  const dispatch = useDispatch();

  const [searchId, setSearchId] = useState("");
  const [filteredPackages, setFilteredPackages] = useState([]);

  const { warehouse, packageUpdated } = useSelector((state) => state.packages);

  const { currentUser, token } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getPackages({ token, address_id: currentUser.address_id }));
    dispatch(resetPackageUpdated());
  }, [packageUpdated]);

  useEffect(() => {
    setFilteredPackages(
      warehouse.filter((warehousePackage) =>
        `${warehousePackage.id}`.includes(searchId)
      )
    );
  }, [warehouse, searchId]);

  return (
    <Sidebar>
      <header className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Warehouse</h1>
        <SearchInput
          value={searchId}
          onChange={setSearchId}
          placeholder={"Search package by ID"}
        />
      </header>
      <section className="w-full grid grid-cols-2 gap-4 my-4">
        {filteredPackages.map((warehousePackage) => (
          <PackageCard shippement={warehousePackage} />
        ))}
      </section>
    </Sidebar>
  );
};

export default Warehouse;
