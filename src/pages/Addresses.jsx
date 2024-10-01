import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import SmallRoundedButton from "../components/SmallRoundedButton";
import NewAddress from "../popups/NewAddress";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses } from "../redux/slices/addressesSlice";
import AddressCard from "../cards/AddressCard";

const Addresses = () => {
  const dispatch = useDispatch();
  const [addingAddress, setAddingAddress] = useState(false);
  const { addresses } = useSelector((store) => store.addresses);

  useEffect(() => {
    dispatch(getAddresses());
  }, []);

  useEffect(() => {
    console.log(addresses);
  }, [addresses]);

  return (
    <Sidebar>
      {addingAddress && (
        <NewAddress closeHandler={() => setAddingAddress(false)} />
      )}
      <header className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Addresses</h1>
        <SmallRoundedButton
          name={"new address"}
          onClick={() => setAddingAddress(true)}
        />
      </header>
      <div className="w-full grid grid-cols-4 gap-4 mt-4">
        {addresses.map((address) => (
          <AddressCard address={address} key={address.id} />
        ))}
      </div>
    </Sidebar>
  );
};

export default Addresses;
