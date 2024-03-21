import React from "react";

const FormInput = ({
  label,
  onChange,
  value,
  error,
  placeholder,
  name,
  type = "string",
}) => {
  return (
    <div>
      <div className="mb-4">
        <label
          htmlFor={name}
          className="block text-primary text-sm font-bold mb-2"
        >
          {label}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-primary text-primary"
        />
        {error && <p className="text-red-500 mt-2 text-[11px]">{error}</p>}
      </div>
    </div>
  );
};

export default FormInput;
