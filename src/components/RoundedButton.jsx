import React from "react";
import {
  BeatLoader,
  FadeLoader,
  MoonLoader,
  PulseLoader,
} from "react-spinners";

const RoundedButton = ({ onClick, children, isLoading }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full h-[56px] rounded-[28px] bg-skyblue-800 text-white font-semibold text-lg mt-4 flex items-center justify-center ${
        isLoading ? "cursor-not-allowed bg-skyblue-500" : ""
      }`}
      disabled={isLoading}
    >
      {isLoading ? (
        <div>
          <PulseLoader size={16} color="white" />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default RoundedButton;
