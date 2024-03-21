import React from "react";
import Button from "../components/button";

const UnAuthenticated = () => {
  return (
    <div>
      <div class="bg-gray-100 pt-[70px]">
        <div class="bg-white p-6  w-[600px] shadow-md border my-8 flex flex-col items-center md:mx-auto">
          <div className="mx-auto w-full flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className=" h-25 w-15 text-blue-500 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
              />
            </svg>
          </div>
          <div class="text-center">
            <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center"></h3>
            <p class="text-gray-600 my-3">
              Please login to explore all features
            </p>
            <div class="py-6 text-center">
              <Button></Button>
              <a
                href="#"
                class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              >
                GO TO LOGIN
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnAuthenticated;
