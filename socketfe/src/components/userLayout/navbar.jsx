import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
  const { count, setCount } = useContext(CartContext);
  const { user, setUser } = useContext(UserContext);
  console.log("🚀 ~ Navbar ~ user:", user);

  return (
    <div>
      <nav className="fixed top-0 left-0 z-20 w-full border-b border-gray-200 bg-white shadow-md text-primary py-2.5 px-6 sm:px-4">
        <div className="container mx-auto flex  flex-wrap items-center justify-between max-w-7xl mx-auto">
          <a href="#" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mr-3 h-6 text-blue-500 sm:h-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
              />
            </svg>

            <span className="self-center whitespace-nowrap text-xl font-semibold">
              Termcode
            </span>
          </a>
          <div className="mt-2 sm:mt-0 sm:flex md:order-2 gap-2 flex items-center">
            <Link to={"/user/wishlist"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </Link>
            <Link to="/user/cart" className="mr-5 relative">
              <div className="t-0 absolute left-3 -top-2">
                {count > 0 && (
                  <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-[10px] text-primary">
                    {count}
                  </p>
                )}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </Link>
            {!user?._id ? (
              <>
                <Link to="/user/signin">
                  <button
                    type="button"
                    className="rounde mr-3  border border-blue-700 py-1.5 px-6 text-center text-sm font-medium bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent focus:outline-none focus:ring-4 focus:ring-blue-300 md:inline-block rounded-lg"
                  >
                    Login
                  </button>
                </Link>
                <Link to="/user/signup">
                  <button
                    type="button"
                    className="rounde mr-3 active:bg-indigo-500 bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-purple-500  bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg"
                  >
                    Register
                  </button>
                </Link>
              </>
            ) : (
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
                    <img
                      src="/dummy-user.jpg"
                      className="rounded-full w-8 h-8"
                    />
                  </label>

                  <div
                    id="sortboxmenu"
                    className="absolute mt-1 right top-full min-w-max shadow rounded hidden border  transition delay-75 ease-in-out z-10"
                  >
                    <ul className="block text-right text-gray-900  rounded   my-2 ">
                      <li>
                        <a
                          href="/user/products"
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
                        </a>
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
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className=" w-full items-center justify-between md:order-1 md:flex md:w-auto"
            id="navbar-sticky"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100  p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0  md:text-sm md:font-medium">
              <li>
                <a
                  href="#"
                  className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-blue-700"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/user/products"
                  className="block rounded py-2 pl-3 pr-4 text-primary hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded py-2 pl-3 pr-4  hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded py-2 pl-3 pr-4  hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
