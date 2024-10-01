import React from "react";

const PopupContainer = ({ children }) => {
  return (
    <div className="bg-[#00000035] backdrop-blur-sm flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 z-40">
      {children}
    </div>
  );
};

export default PopupContainer;
