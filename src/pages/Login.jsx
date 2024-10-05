import React, { useState } from "react";
import AuthTextInput from "../components/AuthTextInput";
import logo from "./../assets/logo.png";
import RoundedButton from "../components/RoundedButton";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/usersSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = () => {
    if (email.trim() === "" || password === "") return;
    const user = { email, password };
    dispatch(login({ user }));
  };
  return (
    <div className=" w-full h-[100vh] flex items-center justify-center bg-white">
      <div className=" p-4 flex flex-col w-[35rem] items-center gap-[2rem]">
        <img src={logo} alt="" className="h-[100px]" />
        <h1 className="font-outfit text-2xl font-semibold text-black">
          Welcome back
        </h1>
        <div className="p-4 w-[28rem] shadow-md shadow-skyblue-100">
          <AuthTextInput
            placeholder={"Enter your email"}
            onChange={(e) => setEmail(e.target.value)}
            label={"Email"}
            value={email}
          />
          <AuthTextInput
            placeholder={"Enter your password"}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            label={"Password"}
            value={password}
          />
          <RoundedButton children={"login"} onClick={submitHandler} />
        </div>
        <p>
          Don't have an account?{" "}
          <span className="text-skyblue-800 underline">
            <Link to={"/signup"}>sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
