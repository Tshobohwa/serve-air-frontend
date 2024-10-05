import React, { useEffect, useState } from "react";
import PopupContainer from "./PopupContainer";
import { IoClose } from "react-icons/io5";
import TextInputWithLabel from "../components/TextInputWithLabel";
import RoundedButton from "../components/RoundedButton";
import { useDispatch, useSelector } from "react-redux";
import { getRoutes } from "../redux/slices/routesSlice";
import SelectWithLabel from "../components/SelectWithLabel";

const NewPackage = ({ closeHandler }) => {
  const dispatch = useDispatch();

  const { routes } = useSelector((state) => state.routes);

  const [sender_name, setSenderName] = useState("");
  const [sender_phonenumber, setSenderPhonenumber] = useState("");
  const [receiver_name, setReceiverName] = useState("");
  const [receiver_phonenumber, setReceiverPhonenumber] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [currentRouteId, setCurrentRouteId] = useState(0);
  const [currentRoute, setCurrentRoute] = useState(0);
  const [price, setprice] = useState(0);

  const submitHandler = () => {};

  useEffect(() => {
    dispatch(getRoutes());
  }, []);

  useEffect(() => {
    setCurrentRoute(routes.find((route) => route.id === currentRouteId));
  }, [currentRouteId, routes]);

  useEffect(() => {
    const intweight = +weight;
    setprice(currentRoute?.price ? currentRoute.price * intweight : 0);
  }, [currentRoute, weight]);

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
                value={sender_name}
                onChange={(e) => setSenderName(e.target.value)}
              />
              <TextInputWithLabel
                label={"Phone number"}
                placeholder={"Enter sender phone number"}
                type="tel"
                onChange={setSenderPhonenumber}
                value={sender_phonenumber}
              />
            </div>
            <div className="w-full p-4 border border-skyblue-200">
              <p className="text-xl font-semibold">Receiver</p>
              <TextInputWithLabel
                label={"Name"}
                placeholder={"Enter receiver name"}
                onChange={(e) => setReceiverName(e.target.value)}
                value={receiver_name}
              />
              <TextInputWithLabel
                label={"Phone number"}
                placeholder={"Enter receiver phone number"}
                type="tel"
                onChange={setReceiverPhonenumber}
                value={receiver_phonenumber}
              />
            </div>
            <div className="w-full p-4 border border-skyblue-200">
              <p className="text-xl font-semibold">Package</p>
              <TextInputWithLabel
                label={"Weight (KG)"}
                placeholder={"Enter package weight"}
                type="number"
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
              />
              <TextInputWithLabel
                label={"Description"}
                placeholder={"Enter package description"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="w-full p-4 border border-skyblue-200">
              <p className="text-xl font-semibold">Route and price</p>
              <SelectWithLabel
                label={"Route"}
                options={routes}
                valueExtractor={(route) => route.id}
                placeholder={"Enter package route"}
                optionExtractor={(route) =>
                  `from ${route.origin.address.city} to ${route.destination.address.city}`
                }
                defaultOption={"Select package route"}
                onChange={(e) => setCurrentRouteId(+e.target.value)}
                keyExtractor={(route) => route.id}
              />
              <TextInputWithLabel
                label={"price(USD)"}
                placeholder={"Package price"}
                readOnly={true}
                value={price.toFixed(2) + " USD"}
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
