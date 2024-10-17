import React, { useEffect, useState } from "react";
import PopupContainer from "./PopupContainer";
import { useDispatch, useSelector } from "react-redux";
import { getStatuses } from "../redux/slices/statusesSlice";
import { IoClose } from "react-icons/io5";
import { updatePackage } from "../redux/slices/packagesSlice";
import { ClockLoader, SquareLoader } from "react-spinners";
import { toast } from "react-toastify";

const UpdatePackageStatus = ({ closeHandler, shippingPackage }) => {
  const dispatch = useDispatch();

  const { statuses } = useSelector((state) => state.statuses);

  const { isUpdatingPackage, packageUpdated } = useSelector(
    (state) => state.packages
  );

  const { token } = useSelector((state) => state.users);

  const [status_id, setStatusId] = useState(shippingPackage.status_id);

  useEffect(() => {}, [statuses]);

  useEffect(() => {
    dispatch(getStatuses({ token }));
  }, []);

  const submitHandler = (status_id) => {
    if (status_id === shippingPackage.status_id) {
      toast.warning(
        `${shippingPackage.status.name} is the currentStatus of the package!`
      );
      return;
    }
    const updates = { status_id };
    if (status_id === 3) updates.current_address_id = null;
    if (status_id === 4)
      updates.current_address_id = shippingPackage.destination_id;
    dispatch(
      updatePackage({
        token,
        package_id: shippingPackage.id,
        updates,
      })
    );
  };

  useEffect(() => {
    if (!packageUpdated) return;
    closeHandler();
  }, [packageUpdated]);
  return (
    <PopupContainer>
      <div className="w-[36rem] bg-white">
        <header className="h-[6rem] px-4 flex items-center justify-between border-b border-b-skyblue-100">
          <div>
            <h2 className="font-semibold text-2xl">Update package status</h2>
            <div className="flex gap-4">
              <p>
                package id:
                <span className="font-semibold">{shippingPackage?.id} </span>
              </p>
              <p>
                weight:{" "}
                <span className="font-semibold">
                  {shippingPackage?.weight} KG
                </span>
              </p>
            </div>
          </div>
          <button className=" text-blue-900" onClick={closeHandler}>
            <IoClose size={32} />
          </button>
        </header>
        {isUpdatingPackage ? (
          <section className="h-[20rem] text-skyblue-800 w-full flex items-center flex-col justify-center">
            <ClockLoader size={64} color="#085fab" />
            <p>Updating package ...</p>
          </section>
        ) : (
          <section className="w-full overflow-y-scroll h-[20rem]">
            {statuses.map(
              (status) =>
                status.id > shippingPackage.status_id && (
                  <div
                    className="w-full h-[5rem] border-b border-b-skyblue-200 hover:cursor-pointer hover:bg-skyblue-200 flex flex-col justify-center pl-6"
                    onClick={() => submitHandler(status.id)}
                  >
                    <p className="text-lg font-semibold">{status.name}</p>
                    <p className="text-skyblue-800 text-sm italic">
                      {status.description}
                    </p>
                  </div>
                )
            )}
          </section>
        )}
      </div>
    </PopupContainer>
  );
};

export default UpdatePackageStatus;
