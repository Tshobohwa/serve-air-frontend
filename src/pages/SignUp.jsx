import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RoundedButton from "../components/RoundedButton";
import AuthTextInput from "../components/AuthTextInput";
import logo from "../assets/logo.png";
import SelectWithLabel from "../components/SelectWithLabel";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses } from "../redux/slices/addressesSlice";
import { signup } from "../redux/slices/usersSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address_id, setAddressId] = useState(null);
  const [error, setError] = useState("");

  const { addresses } = useSelector((state) => state.addresses);

  const submitHandler = () => {
    setError("");
    if (!email || !first_name || !last_name || !password || !address_id) {
      setError("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    const user = {
      email,
      first_name,
      last_name,
      password,
      address_id: +address_id,
    };
    dispatch(signup({ user }));
  };

  useEffect(() => {
    dispatch(getAddresses());
  }, []);

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
              value={first_name}
            />
            <AuthTextInput
              placeholder={"Enter your last name"}
              onChange={(e) => setLastName(e.target.value)}
              label={"Last name"}
              value={last_name}
            />
            <SelectWithLabel
              label={"Address"}
              keyExtractor={(address) => address.id}
              valueExtractor={(address) => address.id}
              optionExtractor={(address) => address.city}
              options={addresses}
              defaultOption={"Select address"}
              onChange={(e) => setAddressId(e.target.value)}
            />
            <AuthTextInput
              placeholder={"Enter your email"}
              onChange={(e) => setEmail(e.target.value)}
              label={"Email"}
              type="email"
              value={email}
            />
            <AuthTextInput
              placeholder={"Enter your password"}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              label={"Password"}
              value={password}
            />
            <AuthTextInput
              placeholder={"Confirm your password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              label={"Password confirm"}
              value={confirmPassword}
            />
            <p className="text-red font-semibold text-center">{error}</p>
            <RoundedButton children={"sign up"} onClick={submitHandler} />
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
