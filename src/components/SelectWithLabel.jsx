import React from "react";

const SelectWithLabel = ({
  options,
  label,
  valueExtractor = () => {},
  optionExtractor = () => {},
  keyExtractor = () => {},
  onChange,
  value,
  defaultOption,
}) => {
  return (
    <div>
      <p>{label}</p>
      <select
        className={`h-[56px] rounded-[12px] border border-skyblue-300 px-4 w-full focus:outline-none placeholder:text-primary-500`}
        onChange={onChange}
        value={value}
      >
        {defaultOption && <option value={null}>{defaultOption}</option>}
        {options.map((option) => (
          <option value={valueExtractor(option)} key={keyExtractor(option)}>
            {optionExtractor(option)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectWithLabel;
