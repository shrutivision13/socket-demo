import React, { useEffect, useState } from "react";
import { socket } from "../../socketConfig";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState();
  const [currentImage, setCurrentImage] = useState();
  console.log("🚀 ~ ProductDetails ~ productDetails:", productDetails);
  const params = useParams();
  console.log("🚀 ~ ProductDetails ~ location:", location);
  useEffect(() => {
    socket.emit("client:getproduct", params?.id);
    socket.on("server:selectedproduct", (data) => {
      console.log("🚀 ~ socket.on ~ data:", data);
      setProductDetails(data?.data);
      setCurrentImage(data?.data?.images[0]);
    });
  }, [params?.id]);
  return (
    <div>
      <main className="py-8">
        <div className="container mx-auto px-6 mt-28">
          <div className="md:flex md:items-center">
            <div className="w-full h-64 md:w-1/2 lg:h-96">
              <img
                className="h-full w-full rounded-md object-cover max-w-lg mx-auto"
                src={currentImage}
                alt="Nike Air"
              />
              <div className="md:flex-1 flex my-2 ">
                <div className=" rounded-lg  mb-4 flex gap-4">
                  {productDetails?.images?.map((image) => {
                    return (
                      <div
                        x-show="image === 1"
                        onClick={() => setCurrentImage(image)}
                        className="h-24 md:h-24 rounded-lg  mb-4 flex items-center justify-center"
                      >
                        <img
                          className="h-[80px] w-[80px] rounded-md object-cover max-w-lg mx-auto"
                          src={image}
                          alt="Nike Air"
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="flex -mx-2 mb-4"></div>
              </div>
            </div>
            <div className="w-full max-w-lg mx-auto mt-5 text-slate-300 flex flex-col md:ml-8 md:mt-0 md:w-1/2">
              <h3 className=" uppercase text-lg">{productDetails?.name}</h3>
              <span className=" mt-3">${productDetails?.price}</span>
              <hr className="my-3" />
              <div className="mt-2">
                <label className="text-slate-300 text-sm" htmlFor="count">
                  Count:
                </label>
                <div className="flex items-center mt-1">
                  <button className=" focus:outline-none focus:text-slate-300">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                  <span className="text-slate-300 text-lg mx-2">20</span>
                  <button className=" focus:outline-none focus:text-slate-300">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center mt-6">
                <button className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                  Order Now
                </button>
                <button className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
