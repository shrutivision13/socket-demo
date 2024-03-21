import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import LogoutSvg from "../../svgs/LogoutSvg";
import OrderSvg from "../../svgs/OrderSvg";

const Header = () => {
  let location = useLocation();
  const { setUser, user } = useContext(UserContext);
  const { count, setCount } = useContext(CartContext);
  console.log("🚀 ~ Header ~ location:", location);
  const breadCrumb = {
    "/": [{ name: "Home", link: "/" }],
    "/employee": [{ name: "Home", link: "/" }, { name: "Employee" }],
    "/higherOrder": [{ name: "Home", link: "/" }, { name: "Higher Order" }],
    "/posts": [{ name: "Home", link: "/" }, { name: "Posts" }],
  };
  return (
    <div className="fixed top-header w-full z-30 flex bg-primary shadow-md  p-2 items-center justify-center h-20 pr-24 pl-6 ml-[2rem]">
      <div className="w-full">
        <div className="flex items-center justify-center">
          <div className="logo  dark:text-white  transform ease-in-out duration-500 flex-none h-full flex items-center justify-start">
            NERVE
          </div>
          <div className="grow h-full flex items-center justify-center"></div>
          <div className="flex-none h-full text-center flex items-center justify-center">
            <div>
              <div className="relative">
                <input
                  type="checkbox"
                  id="sortbox"
                  className="hidden absolute"
                />
                <label
                  htmlFor="sortbox"
                  className="flex items-center space-x-1 cursor-pointer"
                >
                  <div className="flex space-x-3 items-center px-3">
                    <div className="flex-none flex justify-center">
                      <div className="w-8 h-8 flex ">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShta_GXR2xdnsxSzj_GTcJHcNykjVKrCBrZ9qouUl0usuJWG2Rpr_PbTDu3sA9auNUH64&usqp=CAU"
                          alt="profile"
                          className="shadow rounded-full object-cover"
                        />
                      </div>
                    </div>

                    <div className=" md:block text-sm md:text-md text-black ">
                      {user?.username}
                    </div>
                  </div>
                </label>

                <div
                  id="sortboxmenu"
                  className="absolute mt-1 right top-full min-w-max shadow rounded hidden border  transition delay-75 ease-in-out z-10"
                >
                  <ul className="block text-right text-gray-900  rounded   my-2 ">
                    <li>
                      <Link
                        to="/user/products"
                        className="block px-3 py-1.5 items-center gap-2 flex hover:bg-primarygradient hover:text-white bg-white text-slate-800 font-semibold text-sm"
                        onClick={() => {
                          setUser({});
                          setCount(0);

                          localStorage.clear();
                        }}
                      >
                        <span>
                          <LogoutSvg />
                        </span>
                        Log out
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/user/orders"
                        // onClick={()=>}
                        className="block px-3 py-1.5 items-center gap-2 flex hover:bg-primarygradient hover:text-white bg-white text-slate-800 font-semibold text-sm"
                      >
                        <span>
                          <OrderSvg />
                        </span>
                        My orders
                      </Link>
                    </li>
                    {/* <li>
                        <a href="#" className="block px-3 py-2 hover:bg-gray-200">
                          Newest
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block px-3 py-2 hover:bg-gray-200">
                          Price: Low to High
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block px-3 py-2 hover:bg-gray-200">
                          Price: High to Low
                        </a>
                      </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <nav className="flex  w-full px-5 py-3 text-gray-700  rounded-lg bg-gray-50 dark:bg-[#1E293B] " aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3" >
                    {
                        breadCrumb?.[location?.pathname]?.map((item, index) => {
                            return (
                                <li className="inline-flex items-center">
                                    <Link to={item?.link || "#"} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                        {index === 0 ? <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg> : <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>}
                                        {item?.name}
                                    </Link>
                                </li>
                            )
                        })
                    }

                </ol>
            </nav> */}
      </div>
    </div>
  );
};

export default Header;
