import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <div>
        <div
          className="flex h-screen w-full items-center justify-center bg-primary bg-cover bg-no-repeat"
          style={
            {
              // backgroundImage: "url(/dark-2568998_1280.jpg)",
            }
          }
        >
          <div className="rounded-xl  w-[25%] sm:w-[40%]  lg:w-[28%]  bg-opacity-50 px-16 py-10 shadow-lg border backdrop-blur-md max-sm:px-8">
            <div className="text-primary">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
