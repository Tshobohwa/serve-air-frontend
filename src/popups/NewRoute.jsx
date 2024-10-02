import React from "react";
import PopupContainer from "./PopupContainer";
import RoundedButton from "../components/RoundedButton";
import TextInputWithLabel from "../components/TextInputWithLabel";
import { IoClose } from "react-icons/io5";

const NewRoute = ({ closeHandler }) => {
  const submitHandler = () => {};
  return (
    <PopupContainer>
      <div className="w-[36rem] bg-white">
        <header className="h-[6rem] px-4 flex items-center justify-between border-b border-b-skyblue-100">
          <h2 className="font-semibold text-2xl">New route</h2>
          <button className=" text-blue-900" onClick={closeHandler}>
            <IoClose size={32} />
          </button>
        </header>
        <section className="w-full p-4">
          <TextInputWithLabel
            label={"Province"}
            placeholder={"Enter province name"}
          />
          <TextInputWithLabel
            label={"Territory"}
            placeholder={"Enter territory name"}
          />
          <TextInputWithLabel
            label={"Pricing (USD)"}
            placeholder={"Enter route pricing"}
            onChange={(e) => setPricing(e.target.value)}
          />
        </section>
        <footer className="w-full p-4 bg-skyblue-50 flex items-center justify-center">
          <RoundedButton children={"Add route"} onClick={submitHandler} />
        </footer>
      </div>
    </PopupContainer>
  );
};

export default NewRoute;
