import React, { useEffect, useState } from "react";
import PopupContainer from "./PopupContainer";
import RoundedButton from "../components/RoundedButton";
import TextInputWithLabel from "../components/TextInputWithLabel";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { resetHasUpdatedRoute, updateRoute } from "../redux/slices/routesSlice";

const UpdateRoute = ({ closeHandler, initialPricing, route }) => {
  const dispatch = useDispatch();
  const { origin, destination, id } = route;
  const [pricing, setPricing] = useState(initialPricing);

  const { hasUpdatedRoute } = useSelector((state) => state.routes);
  const submitHandler = () => {
    const route = { pricing };
    dispatch(updateRoute({ route, id }));
  };
  useEffect(() => {
    if (!hasUpdatedRoute) return;
    dispatch(resetHasUpdatedRoute());
    closeHandler();
  }, [hasUpdatedRoute]);
  return (
    <PopupContainer>
      <div className="w-[36rem] bg-white">
        <header className="h-[6rem] px-4 flex items-center justify-between border-b border-b-skyblue-100">
          <h2 className="font-semibold text-2xl">Update route</h2>
          <button className=" text-blue-900" onClick={closeHandler}>
            <IoClose size={32} />
          </button>
        </header>
        <section className="w-full p-4">
          <div className="w-full grid grid-cols-2">
            <div>
              <p>Origin:</p>
              <p className="font-semibold">{origin.address.city}</p>
              <p className="text-sm text-skyblue-500">
                {origin.address.province} {origin.address.territory}
              </p>
            </div>
            <div>
              <p>Destination:</p>
              <p className="font-semibold">{destination.address.city}</p>
              <p className="text-sm text-skyblue-500">
                {destination.address.province} {destination.address.territory}
              </p>
            </div>
          </div>
          <TextInputWithLabel
            label={"Pricing (USD)"}
            placeholder={"Enter route pricing"}
            onChange={(e) => setPricing(e.target.value)}
            type="number"
            step={0.1}
            value={pricing}
          />
        </section>
        <footer className="w-full p-4 bg-skyblue-50 flex items-center justify-center">
          <RoundedButton children={"save updates"} onClick={submitHandler} />
        </footer>
      </div>
    </PopupContainer>
  );
};

export default UpdateRoute;
