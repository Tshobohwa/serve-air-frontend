import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { postAddress } from "../redux/slices/addressesSlice";
import { ClipLoader } from "react-spinners";

const NewAddressForm = ({ toggleAddingForm }) => {
  const dispatch = useDispatch();

  const { isPosting } = useSelector((store) => store.addresses);

  const [city, setCity] = useState("");
  const [territory, setTerritory] = useState("");
  const [province, setProvince] = useState("");
  const [error, setError] = useState("");

  // City input change handler
  const cityChangeHandler = (e) => {
    setCity(e.target.value);
  };

  // Territory input change handler
  const territoryChangeHandler = (e) => {
    setTerritory(e.target.value);
  };

  // Province input change handler
  const provinceChangeHandler = (e) => {
    setProvince(e.target.value);
  };

  const submitHandler = () => {
    setError("");
    if (!city || !province || !territory) {
      setError("Please fill all the inputs");
      return;
    }

    const address = { city, province, territory };

    dispatch(postAddress(address));
  };

  return (
    <div className="w-[20rem] bg-white p-3 border rounded-lg border-skyblue-100 mb-5 h-fit">
      <div className=" w-full flex justify-between pb-2 border-b-2 border-skyblue-100">
        <p className=" font-semibold text-lg">New address</p>
        <button
          onClick={toggleAddingForm}
          className=" h-[2rem] w-[2rem] border border-skyblue-800 rounded-md text-skyblue-800 hover:bg-skyblue-800 hover:text-white flex items-center justify-center"
        >
          <IoCloseOutline size={24} />
        </button>
      </div>
      <div className=" border border-skyblue-100 p-3 rounded-lg my-3 flex flex-col gap-2">
        <input
          type="text"
          className="h-[2.2rem] w-full rounded-md border-2 border-skyblue-200 pl-4 focus:outline-none"
          placeholder="city"
          onChange={cityChangeHandler}
        />
        <input
          type="text"
          className="h-[2.2rem] w-full rounded-md border-2 border-skyblue-200 pl-4 focus:outline-none"
          placeholder="territory"
          onChange={territoryChangeHandler}
        />
        <input
          type="text"
          className="h-[2.2rem] w-full rounded-md border-2 border-skyblue-200 pl-4 focus:outline-none"
          placeholder="province"
          onChange={provinceChangeHandler}
        />
      </div>
      {!isPosting ? (
        <button
          className={`h-[2.5rem] w-full bg-skyblue-700 rounded-md font-semibold text-white hover:bg-skyblue-500 ${
            isPosting ? "bg-skyblue-300 hover:bg-skyblue-300" : "bg-skyblue-700"
          }`}
          onClick={submitHandler}
        >
          add address
        </button>
      ) : (
        <div
          className={
            "h-[2.5rem] w-full rounded-md font-semibold text-white bg-skyblue-300 hover:bg-skyblue-300 flex items-center justify-center"
          }
        >
          <ClipLoader color="#fff" size={24} />
        </div>
      )}
    </div>
  );
};

export default NewAddressForm;
