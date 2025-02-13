import React, { useEffect, useState } from "react";
import PopupContainer from "./PopupContainer";
import { IoClose } from "react-icons/io5";
import TextInputWithLabel from "../components/TextInputWithLabel";
import RoundedButton from "../components/RoundedButton";
import { useDispatch, useSelector } from "react-redux";
import { getRoutes } from "../redux/slices/routesSlice";
import SelectWithLabel from "../components/SelectWithLabel";
import {
  postPackage,
  resetIsPackagePosted,
} from "../redux/slices/packagesSlice";

const NewPackage = ({ closeHandler }) => {
  const dispatch = useDispatch();

  const { routes } = useSelector((state) => state.routes);

  const [sender_name, setSenderName] = useState("");
  const [sender_phone_number, setSenderPhonenumber] = useState("");
  const [receiver_name, setReceiverName] = useState("");
  const [receiver_phone_number, setReceiverPhonenumber] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [currentRoute, setCurrentRoute] = useState(0);
  const [price, setprice] = useState(0);
  const [route_id, setRouteId] = useState(null);

  const { currentUser, token } = useSelector((state) => state.users);

  const { isPostingPackage, packageIsPosted } = useSelector(
    (state) => state.packages
  );

  const submitHandler = () => {
    const shippment = {
      weight: +weight,
      description,
      status_id: 1,
      route_id,
      current_address_id: currentUser.address_id,
      creator_id: currentUser.id,
      sender_name,
      sender_phone_number,
      receiver_name,
      receiver_phone_number,
      price,
      origin_id: currentUser.address_id,
      destination_id:
        currentRoute?.origin?.address.id === currentUser.address_id
          ? currentRoute?.destination?.address.id
          : currentRoute?.origin?.address.id,
    };
    dispatch(
      postPackage({
        token,
        shippment,
      })
    );
  };

  useEffect(() => {
    dispatch(getRoutes({ token }));
  }, []);

  useEffect(() => {
    setCurrentRoute(routes.find((route) => route.id === route_id));
  }, [route_id, routes]);

  useEffect(() => {
    const intweight = +weight;
    setprice(currentRoute?.pricing ? currentRoute.pricing * intweight : 0);
  }, [currentRoute, weight]);

  useEffect(() => {
    if (!packageIsPosted) return;
    dispatch(resetIsPackagePosted());
    closeHandler();
  }, [packageIsPosted]);

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
                value={sender_phone_number}
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
                value={receiver_phone_number}
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
                onChange={(e) => setRouteId(+e.target.value)}
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
            <RoundedButton
              children={"Add package"}
              onClick={submitHandler}
              isLoading={isPostingPackage}
            />
          </footer>
        </div>
      </div>
    </PopupContainer>
  );
};

export default NewPackage;
