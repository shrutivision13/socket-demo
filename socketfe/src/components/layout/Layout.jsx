import React from "react";
import Header from "./header";
import SideBar from "./sideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className="body bg-primary ">
        <Header />
        <SideBar />
        <div className=" content ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
