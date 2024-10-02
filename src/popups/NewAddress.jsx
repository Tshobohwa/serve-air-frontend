import React, { useEffect, useState } from "react";
import PopupContainer from "./PopupContainer";
import { IoClose } from "react-icons/io5";
import TextInputWithLabel from "../components/TextInputWithLabel";
import RoundedButton from "../components/RoundedButton";
import { useDispatch, useSelector } from "react-redux";
import {
  postAddress,
  resetAddressPosted,
} from "../redux/slices/addressesSlice";

const NewAddress = ({ closeHandler }) => {
  const dispatch = useDispatch();

  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [territory, setTerritory] = useState("");

  const { addressPosted } = useSelector((state) => state.addresses);

  const submitHandler = () => {
    const address = {
      city,
      province,
      territory,
    };
    console.log(address);
    dispatch(postAddress({ address }));
  };

  useEffect(() => {
    if (!addressPosted) return;
    dispatch(resetAddressPosted());
    closeHandler();
  }, [addressPosted]);

  return (
    <PopupContainer>
      <div className="w-[36rem] bg-white">
        <header className="h-[6rem] px-4 flex items-center justify-between border-b border-b-skyblue-100">
          <h2 className="font-semibold text-2xl">New address</h2>
          <button className=" text-blue-900" onClick={closeHandler}>
            <IoClose size={32} />
          </button>
        </header>
        <section className="w-full p-4">
          <TextInputWithLabel
            label={"Province"}
            placeholder={"Enter province name"}
            onChange={(e) => setProvince(e.target.value)}
          />
          <TextInputWithLabel
            label={"Territory"}
            placeholder={"Enter territory name"}
            onChange={(e) => setTerritory(e.target.value)}
          />
          <TextInputWithLabel
            label={"City"}
            placeholder={"Enter city name"}
            onChange={(e) => setCity(e.target.value)}
          />
        </section>
        <footer className="w-full p-4 bg-skyblue-50 flex items-center justify-center">
          <RoundedButton children={"Add Address"} onClick={submitHandler} />
        </footer>
      </div>
    </PopupContainer>
  );
};

export default NewAddress;
