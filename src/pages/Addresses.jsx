import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses } from "../redux/slices/addressesSlice";
import NewAddressForm from "../components/NewAddressForm";

const TableRow = ({ address, index }) => {
  const { city, province, territory } = address;
  return (
    <tr
      className={`w-full border-b grid grid-cols-3 border-skyblue-100 h-[2rem] ${
        index % 2 !== 0 ? "bg-skyblue-50" : "bg-white"
      }`}
    >
      <td className=" pl-4">{city}</td>
      <td className=" pl-4">{territory}</td>
      <td className=" pl-4">{province}</td>
    </tr>
  );
};

const AddressesTable = ({ addresses }) => {
  return (
    <table className=" w-full mt-3">
      <thead className="w-full">
        <tr className=" grid grid-cols-3 bg-skyblue-800 text-white w-full">
          <td className=" flex items-center justify-center border-r border-white">
            City
          </td>
          <td className=" flex items-center justify-center border-r border-white">
            Territory
          </td>
          <td className=" flex items-center justify-center">Province</td>
        </tr>
      </thead>
      <tbody>
        {addresses.map((address, index) => (
          <TableRow address={address} index={index} key={address.id} />
        ))}
      </tbody>
    </table>
  );
};

const Addresses = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { addresses } = useSelector((store) => store.addresses);

  const [addFormOpened, setAddFormOpened] = useState(false);

  const toggleAddFormOpened = () => {
    setAddFormOpened(!addFormOpened);
  };

  useEffect(() => {
    dispatch(getAddresses());
  }, []);

  useEffect(() => {
    setAddFormOpened(false);
  }, [addresses.length]);

  return (
    <PageWrapper currentPath={location.pathname}>
      <div className=" w-full flex gap-[1.5rem]">
        <div className="w-[50rem] p-[1rem] bg-white rounded-lg border border-skyblue-100 h-fit">
          <div className=" w-full flex justify-between pb-3 border-b border-skyblue-100">
            <p>addresses</p>
          </div>
          <AddressesTable addresses={addresses} />
        </div>
        {addFormOpened ? (
          <NewAddressForm toggleAddingForm={toggleAddFormOpened} />
        ) : (
          <button
            className="h-[2.5rem] w-[10rem] rounded-md bg-skyblue-800 text-white font-semibold hover:bg-skyblue-500"
            onClick={toggleAddFormOpened}
          >
            add address
          </button>
        )}
      </div>
    </PageWrapper>
  );
};

export default Addresses;
