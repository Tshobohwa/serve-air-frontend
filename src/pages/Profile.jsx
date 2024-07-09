import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import emptyProfile from "../assets/empty-profile.png";

const Profile = () => {
  const navigate = useNavigate();
  const backHandler = () => {
    navigate(-1);
  };
  const { currentUser } = useSelector((store) => store.users);
  return (
    <div>
      <header className="h-[3rem] mb-3 flex items-center justify-between px-[2rem] absolute top-0 left-0 right-0 bg-white border-b border-b-skyblue-300">
        <button onClick={backHandler}>
          <BsArrowLeft size={32} color="#085fab" />
        </button>
        <h1 className=" text-md font-semibold text-skyblue-800">Profile</h1>
        <h2 className=" text-xl font-semibold italic text-skyblue-800">
          Serve Air Cargo
        </h2>
      </header>
      <section className=" h-[100vh] w-full flex items-center justify-center">
        <div className=" flex gap-3 w-fit h-fit bg-white p-4 border border-skyblue-200 rounded-md">
          <div>
            <img
              src={emptyProfile}
              alt="profile"
              className=" w-[25rem] border border-skyblue-100 p-2 bg-skyblue-50"
            />
          </div>
          <div className=" flex flex-col justify-center w-[30rem]">
            <div className="flex flex-col gap-2 px-2">
              <div className=" w-full relative h-[3.5rem] border-b border-b-skyblue-300 flex items-center">
                <p>
                  name: {currentUser?.first_name + " " + currentUser?.last_name}
                </p>
              </div>
              <div className=" w-full relative h-[3.5rem] border-b border-b-skyblue-300 flex items-center">
                <p>email adress: {currentUser?.email}</p>
              </div>
              <div className=" w-full relative h-[3.5rem] border-b border-b-skyblue-300 flex items-center">
                <p>phone number: +243773399004</p>
              </div>
              <div className=" w-full relative h-[3.5rem] border-b border-b-skyblue-300 flex items-center">
                <p>address: Kinshasa</p>
              </div>
            </div>
            <div className=" w-full">
              <button className=" bg-skyblue-500 border border-skyblue-800 w-[50%] h-[3rem] items-center justify-center flex mt-3 font-semibold text-white">
                Log out
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
