import React from "react";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Import the default styles

const TextInputWithLabel = ({
  label,
  type = "text",
  onChange,
  placeholder,
  value = "",
  step = "",
  readOnly = false,
}) => {
  return (
    <div className=" w-full my-3 font-outfit">
      <p>{label}</p>
      {type === "tel" ? (
        <PhoneInputWithCountrySelect
          international
          numberInputProps={{
            className: "focus:outline-none",
          }}
          className={
            "h-[56px] rounded-[12px] border border-skyblue-300 px-4 w-full focus:outline-none placeholder:text-primary-500"
          }
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          readOnly={readOnly}
          defaultCountry="CD"
          countrySelectProps={{
            unicodeFlags: true,
            // Custom rendering for the country select dropdown
            renderCountrySelect: ({ country, flags }) => (
              <div className="flex items-center">
                {flags[country]}
                <span className="sr-only">{country}</span>{" "}
                {/* Hides the country code text */}
              </div>
            ),
          }}
        />
      ) : (
        <input
          className="h-[56px] rounded-[12px] border border-skyblue-300 px-4 w-full focus:outline-none placeholder:text-primary-500"
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          step={step}
          readOnly={readOnly}
        />
      )}
    </div>
  );
};

export default TextInputWithLabel;
