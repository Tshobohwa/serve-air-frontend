import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import SmallRoundedButton from "../components/SmallRoundedButton";
import NewPackage from "../popups/NewPackage";
import { useDispatch, useSelector } from "react-redux";
import {
  getPackages,
  resetPackageUpdated,
} from "../redux/slices/packagesSlice";
import PackageCard from "../cards/PackageCard";
import SearchInput from "../components/SearchInput";

const OutgoingPackages = () => {
  const dispatch = useDispatch();

  const [isAddingPackage, setIsAddingPackage] = useState(false);

  const { currentUser, token } = useSelector((state) => state.users);
  const { outgoingPackages, packageUpdated } = useSelector(
    (state) => state.packages
  );

  const [searchId, setSeachId] = useState("");
  const [filteredPackages, setFilteredPackages] = useState([]);

  useEffect(() => {
    dispatch(getPackages({ address_id: currentUser.address_id, token }));
    dispatch(resetPackageUpdated());
  }, [packageUpdated]);

  useEffect(() => {
    setFilteredPackages(
      outgoingPackages.filter((outgoingPackage) =>
        `${outgoingPackage.id}`.includes(searchId)
      )
    );
  }, [outgoingPackages, searchId]);

  return (
    <Sidebar>
      {isAddingPackage && (
        <NewPackage closeHandler={() => setIsAddingPackage(false)} />
      )}
      <header className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Outgoing packages</h1>
        <div className="flex gap-4 items-center">
          <SearchInput
            value={searchId}
            onChange={setSeachId}
            placeholder={"Search by package ID"}
          />
          <SmallRoundedButton
            name={"new package"}
            onClick={() => setIsAddingPackage(true)}
          />
        </div>
      </header>
      <section className="w-full grid grid-cols-2 gap-4 py-4">
        {filteredPackages.map((outgoingPackage) => (
          <PackageCard key={outgoingPackage.id} shippement={outgoingPackage} />
        ))}
      </section>
    </Sidebar>
  );
};

export default OutgoingPackages;
