import React from "react";

const TextInputWithLabel = ({
  label,
  type = "text",
  onChange,
  placeholder,
  value = "",
  step = "",
}) => {
  return (
    <div className=" w-full my-3 font-outfit">
      <p>{label}</p>
      <input
        className="h-[56px] rounded-[12px] border border-skyblue-300 px-4 w-full focus:outline-none placeholder:text-primary-500"
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        step={step}
      />
    </div>
  );
};

export default TextInputWithLabel;
