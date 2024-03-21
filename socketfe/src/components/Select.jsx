import React from "react";
import ReactSelect from "react-select";

const Select = ({ options, onChange, value, placeholder, error }) => {
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      // backgroundColor: "#374151",
      color: "black",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundImage: isDisabled
          ? undefined
          : isSelected
          ? "linear-gradient(to right,  #06b6d4, #3b82f6)"
          : isFocused
          ? "linear-gradient(to right,  #06b6d4, #3b82f6)"
          : "white",

        color: isDisabled
          ? "#ccc"
          : isSelected
          ? "white"
          : isFocused
          ? "white"
          : "black",

        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: "#1e293b",
        },
      };
    },
    input: (styles) => ({ ...styles, color: "black " }),
    // placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
    singleValue: (styles, { data }) => ({ ...styles, color: "black " }),
  };

  return (
    <div className="">
      <ReactSelect
        value={value}
        onChange={onChange}
        // menuIsOpen={true}
        options={options}
        styles={colourStyles}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 mt-2 text-[11px]">{error}</p>}
    </div>
  );
};

export default Select;
