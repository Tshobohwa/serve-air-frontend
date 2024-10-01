import React, { useState } from "react";
import { Link } from "react-router-dom";
import RoundedButton from "../components/RoundedButton";
import AuthTextInput from "../components/AuthTextInput";
import logo from "../assets/logo.png";
import serveAirPlane from "../assets/serve-air-airplane.jpg";

const SignUp = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="w-full h-[100vh] grid grid-cols-2 bg-plane">
      <div className=" flex items-center justify-center bg-white overflow-y-scroll">
        <div className=" p-4 flex flex-col w-[34rem] items-center gap-[2rem]">
          <img src={logo} alt="" className="h-[100px]" />
          <h1 className="font-outfit text-2xl font-semibold text-black">
            Welcome
          </h1>
          <div className="w-full">
            <AuthTextInput
              placeholder={"Enter your first name"}
              onChange={(e) => setFirstName(e.target.value)}
              label={"Fist name"}
            />
            <AuthTextInput
              placeholder={"Enter your last name"}
              onChange={(e) => setLastName(e.target.value)}
              label={"Last name"}
            />
            <AuthTextInput
              placeholder={"Enter your email"}
              onChange={(e) => setEmail(e.target.value)}
              label={"Email"}
              type="email"
            />
            <AuthTextInput
              placeholder={"Enter your password"}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              label={"Password"}
            />
            <AuthTextInput
              placeholder={"Confirm your password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              label={"Password confirm"}
            />
            <RoundedButton children={"sign up"} />
          </div>
          <p>
            Already have an account?{" "}
            <span className="text-skyblue-800 underline">
              <Link to={"/login"}>Login</Link>
            </span>
          </p>
        </div>
      </div>
      <div className="w-full h-full bg-blue-950/20"></div>
    </div>
  );
};

export default SignUp;
