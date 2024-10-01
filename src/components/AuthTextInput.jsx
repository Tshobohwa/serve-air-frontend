import React from "react";

const AuthTextInput = ({
  icon,
  placeholder,
  onChange,
  type = "text",
  label,
}) => {
  return (
    <div className=" w-full my-3 font-outfit">
      <p>{label}</p>
      <div className="flex">
        {icon}
        <input
          className="h-[56px] rounded-[12px] border border-skyblue-300 px-4 w-full focus:outline-none placeholder:text-primary-500"
          type={type}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default AuthTextInput;
