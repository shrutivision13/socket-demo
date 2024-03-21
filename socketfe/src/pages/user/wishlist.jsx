import React, { useEffect, useState } from "react";
import { socket } from "../../socketConfig";
import { toast } from "react-toastify";
import SubHeader from "../../components/userLayout/SubHeader";

const Wishlist = () => {
  const [wishlistProduct, setWishlistProduct] = useState([]);
  console.log(
    "🚀 ~ Wishlist ~ wishlistProduct:",
    wishlistProduct,
    wishlistProduct?.product?.length
  );
  useEffect(() => {
    socket.emit("client:wishlists");
    socket.on("server:wishlists", (data) => {
      console.log("🚀 ~ socket.on ~ data:", data);
      setWishlistProduct(data?.data);
    });
  }, []);

  const addToWishlist = (product_id) => {
    socket.emit("client:addtowishlist", product_id);
    socket.on("server:addtowishlist", (data) => {
      console.log("🚀 ~ socket.on ~ data:", data);
      // setTotal(data?.total);
      if (data?.status === 200) {
        setWishlistProduct({
          ...wishlistProduct,
          product: wishlistProduct?.product?.filter(
            (product) => product?._id !== product_id
          ),
        });
        socket.off("server:addtowishlist");
        toast.success(data?.message);
      }
      //   if (currentPage > 1)
      //     setDesignations([...(designations || []), ...(data?.data || [])]);
      //   else {

      // setCartProduct(data);

      //   }
      console.log("🚀 ~ socket.on ~ data:", data);
    });
  };

  return (
    <div>
      <div className="h-[100%] bg-primary ">
        <SubHeader title="Wishlists" />
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {wishlistProduct?.product?.length ? (
              wishlistProduct?.product?.map((product) => {
                return (
                  <div className="justify-between mb-6 rounded-lg  border p-6 shadow-md sm:flex sm:justify-start">
                    <img
                      src={product?.images?.[0]}
                      alt="product-image"
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        {/* <h4 className="text-xs font-medium ">{product?.sku}</h4> */}
                        <h2 className="text-lg font-bold ">{product?.name}</h2>
                        <p className="mt-1 text-xs ">{product?.category}</p>
                        <p className="text-sm my-4">${product?.price}</p>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div
                          className="flex items-center space-x-4"
                          onClick={() => addToWishlist(product?._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-primary flex justify-center h-[100px] items-center ">
                No product found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
