import React from "react";
import { BiSearch } from "react-icons/bi";

const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="w-[20rem] h-[3rem] pl-4 pr-2 flex justify-between items-center gap-4 bg-white border border-skyblue-200 rounded-full">
      <input
        type="text"
        value={value}
        className="focus:outline-none"
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <div className=" text-skyblue-800 h-[2.6rem] w-[2.6rem] rounded-full flex items-center justify-center mr-[0.3rem]">
        <BiSearch size={24} />
      </div>
    </div>
  );
};

export default SearchInput;
