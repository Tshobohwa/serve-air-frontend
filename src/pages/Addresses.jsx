import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import SmallRoundedButton from "../components/SmallRoundedButton";
import NewAddress from "../popups/NewAddress";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses } from "../redux/slices/addressesSlice";
import AddressCard from "../cards/AddressCard";
import { BeatLoader } from "react-spinners";

const Addresses = () => {
  const dispatch = useDispatch();
  const [addingAddress, setAddingAddress] = useState(false);
  const { addresses, isFetching } = useSelector((store) => store.addresses);
  const { token } = useSelector((state) => state.users);

  useEffect(() => {
    console.log(token);
    dispatch(getAddresses({ token }));
  }, []);

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
      {isFetching && (
        <div className="w-full flex items-center justify-center my-[124px]">
          <BeatLoader size={32} color="#00ffff" />
        </div>
      )}
      <div className="w-full grid grid-cols-4 gap-4 mt-4 pb-4">
        {!isFetching &&
          addresses.map((address) => (
            <AddressCard address={address} key={address.id} />
          ))}
      </div>
    </Sidebar>
  );
};

export default Addresses;
