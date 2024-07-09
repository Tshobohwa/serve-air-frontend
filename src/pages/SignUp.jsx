import React from "react";
import logo from "./../assets/logo.png";
import background from "../assets/serve-air-airplane.jpg";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className=" h-full w-full relative">
      <img src={background} className=" h-full w-full object-cover" />
      <div className=" w-full h-full flex items-center justify-center bg-skyblue-500/50 absolute top-0 left-0">
        <form
          action="#"
          className=" w-[35rem] border-[3px] p-4 rounded-3xl border-skyblue-800 bg-white flex flex-col"
        >
          <div className=" w-full flex justify-between items-center">
            <h2 className=" text-2xl font-semibold text-skyblue-800">
              sign up
            </h2>
            <img src={logo} alt="logo" className=" h-[4rem]" />
          </div>
          <input
            type="text"
            className="w-full h-[4rem] rounded-lg bg-skyblue-100/50 pl-4 focus:outline-none my-3"
            placeholder="names"
          />
          <input
            type="email"
            className="w-full h-[4rem] rounded-lg bg-skyblue-100/50 pl-4 focus:outline-none my-3"
            placeholder="email address"
          />
          <input
            type="password"
            className="w-full h-[4rem] rounded-lg bg-skyblue-100/50 pl-4 focus:outline-none my-3"
            placeholder="password"
          />
          <input
            type="password"
            className="w-full h-[4rem] rounded-lg bg-skyblue-100/50 pl-4 focus:outline-none my-3"
            placeholder="confirm password"
          />
          <button className=" w-[15rem] self-center bg-skyblue-500 text-white h-[4rem] rounded-lg my-4 flex items-center justify-center text-xl font-semibold">
            sign up
          </button>
          <div className="w-full mb-3 flex justify-between">
            <p>Already registered?</p>
            <Link to={"/login"} className=" text-skyblue-700 font-bold">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
