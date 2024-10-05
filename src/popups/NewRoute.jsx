import React, { useEffect, useState } from "react";
import PopupContainer from "./PopupContainer";
import RoundedButton from "../components/RoundedButton";
import TextInputWithLabel from "../components/TextInputWithLabel";
import { IoClose } from "react-icons/io5";
import SelectWithLabel from "../components/SelectWithLabel";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses } from "../redux/slices/addressesSlice";
import { postRoute, resetRoutePosted } from "../redux/slices/routesSlice";

const NewRoute = ({ closeHandler }) => {
  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.addresses);
  const [origin_id, setOriginId] = useState(null);
  const [destination_id, setDestinationId] = useState(null);
  const [destinationAddresses, setDestinationAddresses] = useState([]);
  const [pricing, setPricing] = useState(0);

  const { token } = useSelector((state) => state.users);

  const { routePosted, isPostingRoute } = useSelector((state) => state.routes);

  const submitHandler = () => {
    dispatch(
      postRoute({
        route: { origin_id, destination_id, pricing: +pricing },
        token,
      })
    );
  };

  useEffect(() => {
    setDestinationAddresses(
      addresses.filter((address) => address.id !== origin_id)
    );
    if (origin_id === destination_id)
      setDestinationId(destinationAddresses[0]?.id);
  }, [origin_id, addresses]);

  useEffect(() => {
    setOriginId(addresses[0]?.id);
  }, [addresses]);

  useEffect(() => {
    console.table({ origin_id, destination_id });
  }, [origin_id, destination_id]);

  useEffect(() => {
    dispatch(getAddresses());
  }, []);

  useEffect(() => {
    if (!routePosted) return;
    closeHandler();
    dispatch(resetRoutePosted());
  }, [routePosted]);
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
          <SelectWithLabel
            label={"Origin"}
            options={addresses}
            valueExtractor={(address) => address.id}
            optionExtractor={(address) => address.city}
            onChange={(e) => setOriginId(+e.target.value)}
            keyExtractor={(address) => address.id}
            value={origin_id}
          />
          <SelectWithLabel
            label={"Destination"}
            options={destinationAddresses}
            valueExtractor={(address) => address.id}
            optionExtractor={(address) => address.city}
            onChange={(e) => setDestinationId(+e.target.value)}
            value={destination_id}
            keyExtractor={(address) => address.id}
          />
          <TextInputWithLabel
            label={"Pricing (USD)"}
            placeholder={"Enter route pricing"}
            onChange={(e) => setPricing(e.target.value)}
            value={pricing}
            type="number"
          />
        </section>
        <footer className="w-full p-4 bg-skyblue-50 flex items-center justify-center">
          <RoundedButton
            children={"Add route"}
            onClick={submitHandler}
            isLoading={isPostingRoute}
          />
        </footer>
      </div>
    </PopupContainer>
  );
};

export default NewRoute;
