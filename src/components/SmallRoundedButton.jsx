import React from "react";

const SmallRoundedButton = ({ name, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-fit px-[1.2rem] bg-skyblue-800 h-[2.4rem] text-white font-semibold flex gap-4 items-center justify-center rounded-full"
    >
      {icon} {name}
    </button>
  );
};

export default SmallRoundedButton;
