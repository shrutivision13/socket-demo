import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";

const Header = () => {
  let location = useLocation();
  const { setUser } = useContext(UserContext);
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
                      John Doe
                    </div>
                  </div>
                  {/* <span className="text-lg">Sort By</span>
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg> */}
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
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.5 1C4.22386 1 4 1.22386 4 1.5C4 1.77614 4.22386 2 4.5 2H12V13H4.5C4.22386 13 4 13.2239 4 13.5C4 13.7761 4.22386 14 4.5 14H12C12.5523 14 13 13.5523 13 13V2C13 1.44772 12.5523 1 12 1H4.5ZM6.60355 4.89645C6.40829 4.70118 6.09171 4.70118 5.89645 4.89645C5.70118 5.09171 5.70118 5.40829 5.89645 5.60355L7.29289 7H0.5C0.223858 7 0 7.22386 0 7.5C0 7.77614 0.223858 8 0.5 8H7.29289L5.89645 9.39645C5.70118 9.59171 5.70118 9.90829 5.89645 10.1036C6.09171 10.2988 6.40829 10.2988 6.60355 10.1036L8.85355 7.85355C9.04882 7.65829 9.04882 7.34171 8.85355 7.14645L6.60355 4.89645Z"
                              fill="currentColor"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            ></path>
                          </svg>
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
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 15 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 1C5 0.447715 5.44772 0 6 0H9C9.55228 0 10 0.447715 10 1V2H14C14.5523 2 15 2.44772 15 3V6C15 6.8888 14.6131 7.68734 14 8.23608V11.5C14 12.3284 13.3284 13 12.5 13H2.5C1.67157 13 1 12.3284 1 11.5V8.2359C0.38697 7.68721 0 6.88883 0 6V3C0 2.44772 0.447716 2 1 2H5V1ZM9 1V2H6V1H9ZM1 3H5H5.5H9.5H10H14V6C14 6.654 13.6866 7.23467 13.1997 7.6004C12.8655 7.85144 12.4508 8 12 8H8V7.5C8 7.22386 7.77614 7 7.5 7C7.22386 7 7 7.22386 7 7.5V8H3C2.5493 8 2.1346 7.85133 1.80029 7.60022C1.31335 7.23446 1 6.65396 1 6V3ZM7 9H3C2.64961 9 2.31292 8.93972 2 8.82905V11.5C2 11.7761 2.22386 12 2.5 12H12.5C12.7761 12 13 11.7761 13 11.5V8.82915C12.6871 8.93978 12.3504 9 12 9H8V9.5C8 9.77614 7.77614 10 7.5 10C7.22386 10 7 9.77614 7 9.5V9Z"
                              fill="currentColor"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            ></path>
                          </svg>
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
