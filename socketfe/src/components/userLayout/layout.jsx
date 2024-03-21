import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

const UserLayout = () => {
  return (
    <div className="h-screen  bg-primary text-black flex">
      <div className="flex flex-col w-full ">
        <div className="flex-1">
          <Navbar />
          <div className="mt-[0px]">
            <Outlet />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
