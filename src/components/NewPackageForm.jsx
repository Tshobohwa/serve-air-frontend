import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  postPackage,
  resetIsPackagePosted,
} from "../redux/slices/packagesSlice";
import { ClipLoader } from "react-spinners";

const NewPackageForm = ({ closeHandler }) => {
  const dispatch = useDispatch();
  const { routes } = useSelector((store) => store.routes);
  const { currentUser } = useSelector((store) => store.users);
  const { currentOrigin } = useSelector((store) => store.origins);
  const { packageIsPosted, isPostingPackage } = useSelector(
    (store) => store.packages
  );

  const [userRoutes, setUserRoutes] = useState([]);
  const getUsersRoutes = () => {
    setUserRoutes(
      routes.filter((route) => route.origin_id === currentOrigin.id)
    );
  };

  // Declare user input variables
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [senderPhoneNumber, setSenderPhoneNumber] = useState("");
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState("");
  const [routeId, setRouteId] = useState(null);
  const [weight, setWeight] = useState(0);
  const [description, setDescription] = useState("");
  const [currentRoute, setCurrentRoute] = useState({});

  // User input change handlers
  const senderNameChangeHandler = (e) => {
    setSenderName(e.target.value);
  };

  const receiverNameChangeHandler = (e) => {
    setReceiverName(e.target.value);
  };

  const receiverPhoneNumberChangeHandler = (e) => {
    setReceiverPhoneNumber(e.target.value);
  };

  const senderPhoneNumberChangeHandler = (e) => {
    setSenderPhoneNumber(e.target.value);
  };

  const routeIdChangeHandler = (e) => {
    setRouteId(e.target.value);
  };

  const weightChangeHandler = (e) => {
    setWeight(+e.target.value);
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value.trim());
  };

  useEffect(() => {
    getUsersRoutes();
    setCurrentRoute(routes[0]);
  }, [routes]);

  useEffect(() => {
    if (!userRoutes[0]?.id) return;
    setRouteId(userRoutes[0].id);
  }, [userRoutes]);

  useEffect(() => {
    if (!routeId) return;
    setCurrentRoute(routes.find((route) => route.id == routeId));
  }, [routeId]);

  const submitHandler = () => {
    const newPackage = {
      route_id: routeId,
      weight,
      description,
      status_id: 1,
      current_address_id: currentUser.address_id,
      creator_id: currentUser.id,
      sender_name: senderName,
      sender_phone_number: senderPhoneNumber,
      receiver_name: receiverName,
      receiver_phone_number: receiverPhoneNumber,
      price: currentRoute.pricing * weight,
    };
    dispatch(postPackage({ newPackage }));
  };

  useEffect(() => {
    if (!packageIsPosted) return;
    dispatch(resetIsPackagePosted());
    closeHandler();
  }, [packageIsPosted]);

  return (
    <div className="w-[20rem] p-3 border rounded-lg bg-white border-skyblue-100 mb-5 max-h-fit z-0">
      <div className=" w-full flex justify-between pb-2 border-b-2 border-skyblue-100">
        <p className=" font-semibold text-lg">New Package</p>
        <button
          onClick={closeHandler}
          className=" h-[2rem] w-[2rem] border border-skyblue-800 rounded-md text-skyblue-800 hover:bg-skyblue-800 hover:text-white flex items-center justify-center"
        >
          <IoCloseOutline size={24} />
        </button>
      </div>
      <div className=" border border-skyblue-100 p-3 rounded-lg my-3 flex flex-col gap-2">
        <p className="text-center font-semibold text-skyblue-800">Sender</p>
        <input
          type="text"
          className="h-[2.5rem] w-full rounded-md border-2 border-skyblue-200 pl-4 focus:outline-none"
          placeholder="names"
          onChange={senderNameChangeHandler}
        />
        <input
          type="tel"
          className="h-[2.5rem] w-full rounded-md border-2 border-skyblue-200 pl-4 focus:outline-none"
          placeholder="telephone"
          onChange={senderPhoneNumberChangeHandler}
        />
      </div>
      <div className=" border border-skyblue-100 p-3 rounded-lg my-3 flex flex-col gap-2">
        <p className="text-center font-semibold text-skyblue-800">Receiver</p>
        <input
          type="text"
          className="h-[2.5rem] w-full rounded-md border-2 border-skyblue-200 pl-4 focus:outline-none"
          placeholder="names"
          onChange={receiverNameChangeHandler}
        />
        <input
          type="tel"
          className="h-[2.5rem] w-full rounded-md border-2 border-skyblue-200 pl-4 focus:outline-none"
          placeholder="telephone"
          onChange={receiverPhoneNumberChangeHandler}
        />
      </div>

      <div className=" border border-skyblue-100 p-3 rounded-lg my-3 flex flex-col gap-2">
        <p className="text-center font-semibold text-skyblue-800">
          Destination
        </p>

        <select
          className="h-[2.5rem] w-full rounded-md border-2 border-skyblue-200 pl-4 focus:outline-none"
          onChange={routeIdChangeHandler}
        >
          {userRoutes.map((route) => (
            <option value={route.id}>{route.destination.address.city}</option>
          ))}
        </select>
      </div>
      <div className=" border border-skyblue-100 p-3 rounded-lg my-3 flex flex-col gap-2">
        <p className="text-center font-semibold text-skyblue-800">Package</p>
        <input
          type="number"
          className="h-[2.5rem] w-full rounded-md border-2 border-skyblue-200 pl-4 focus:outline-none"
          placeholder="weight"
          step={0.01}
          onChange={weightChangeHandler}
        />
        <input
          type="text"
          className="h-[2.5rem] w-full rounded-md border-2 border-skyblue-200 pl-4 focus:outline-none"
          placeholder="description ..."
          onChange={descriptionChangeHandler}
        />
        <p
          type="text"
          className="h-[2.5rem] w-full rounded-md border-2 border-skyblue-200 px-4 flex justify-between items-center"
        >
          <span>Total price:</span>
          <span>{(currentRoute?.pricing * weight)?.toFixed(2) || 0} USD</span>
        </p>
      </div>
      {!isPostingPackage ? (
        <button
          className="h-[3rem] w-full bg-skyblue-700 rounded-md font-semibold text-white hover:bg-skyblue-500"
          onClick={submitHandler}
        >
          Submit package
        </button>
      ) : (
        <div className="h-[3rem] w-full bg-skyblue-700 rounded-md font-semibold text-white hover:bg-skyblue-300 flex items-center justify-center cursor-wait">
          <ClipLoader color="white" size={32} />
        </div>
      )}
    </div>
  );
};

export default NewPackageForm;
