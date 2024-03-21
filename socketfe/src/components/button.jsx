import React from "react";

const Button = ({
  active,
  onClick,
  title,
  children,
  classList = "",
  disabled = false,
}) => {
  return (
    <div>
      <button
        type="button"
        disabled={disabled}
        className={`${classList} ${
          active
            ? "bg-indigo-500 text-white active:bg-indigo-500 bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-purple-500 text-white"
            : ""
        }  flex-1  py-[5px] px-3 shadow-sm border rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300`}
        onClick={onClick}
      >
        {children}
        {title}
      </button>
    </div>
  );
};

export default Button;
