import React from "react";

const SubHeader = ({ title }) => {
  return (
    <div>
      {" "}
      <div className="pt-28 pb-12 ">
        <h1 className="text-center text-2xl font-bold ">{title}</h1>
      </div>
    </div>
  );
};

export default SubHeader;
