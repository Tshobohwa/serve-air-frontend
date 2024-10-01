import React from "react";

const RoundedButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="w-full h-[56px] rounded-[28px] bg-skyblue-800 text-white font-semibold text-lg mt-4"
    >
      {children}
    </button>
  );
};

export default RoundedButton;
