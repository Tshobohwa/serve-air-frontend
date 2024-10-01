import React from "react";
import { BeatLoader } from "react-spinners";

const RoundedButton = ({ onClick, children, isLoading }) => {
  return (
    <button
      onClick={onClick}
      className="w-full h-[56px] rounded-[28px] bg-skyblue-800 text-white font-semibold text-lg mt-4"
      disabled={!isLoading}
    >
      {isLoading ? <BeatLoader size={24} color="white" /> : children}
    </button>
  );
};

export default RoundedButton;
