import React from "react";
import PopupContainer from "./PopupContainer";
import { IoClose } from "react-icons/io5";
import TextInputWithLabel from "../components/TextInputWithLabel";
import RoundedButton from "../components/RoundedButton";

const NewPackage = ({ closeHandler }) => {
  const submitHandler = () => {};
  return (
    <PopupContainer>
      <div className=" pt-[30rem] pb-[10rem] flex items-center justify-center w-full h-full">
        <div className="w-[48rem] bg-white">
          <header className="h-[6rem] px-4 flex items-center justify-between border-b border-b-skyblue-100">
            <h2 className="font-semibold text-2xl">New package</h2>
            <button className=" text-blue-900" onClick={closeHandler}>
              <IoClose size={32} />
            </button>
          </header>
          <section className="w-full p-4 grid grid-cols-2 gap-4">
            <div className="w-full p-4 border border-skyblue-200">
              <p className="text-xl font-semibold">Sender</p>
              <TextInputWithLabel
                label={"Name"}
                placeholder={"Enter sender name"}
              />
              <TextInputWithLabel
                label={"Phone number"}
                placeholder={"Enter sender phone number"}
                type="tel"
              />
            </div>
            <div className="w-full p-4 border border-skyblue-200">
              <p className="text-xl font-semibold">Receiver</p>
              <TextInputWithLabel
                label={"Name"}
                placeholder={"Enter receiver name"}
              />
              <TextInputWithLabel
                label={"Phone number"}
                placeholder={"Enter receiver phone number"}
                type="tel"
              />
            </div>
            <div className="w-full p-4 border border-skyblue-200">
              <p className="text-xl font-semibold">Package</p>
              <TextInputWithLabel
                label={"Weight"}
                placeholder={"Enter package weight"}
                type="number"
              />
              <TextInputWithLabel
                label={"Description"}
                placeholder={"Enter package description"}
              />
            </div>
            <div className="w-full p-4 border border-skyblue-200">
              <p className="text-xl font-semibold">Route and pricing</p>
              <TextInputWithLabel
                label={"Route"}
                placeholder={"Enter package route"}
              />
              <TextInputWithLabel
                label={"Pricing(USD)"}
                placeholder={"Package pricing"}
                readOnly={true}
              />
            </div>
          </section>
          <footer className="w-full p-4 bg-skyblue-50 flex items-center justify-center">
            <RoundedButton children={"Add package"} onClick={submitHandler} />
          </footer>
        </div>
      </div>
    </PopupContainer>
  );
};

export default NewPackage;
