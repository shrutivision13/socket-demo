import React, { useContext } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { socket } from "../../socketConfig";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import Button from "../button";
import CartSvg from "../../svgs/CartSvg";
import WishlistSvg from "../../svgs/WishlistSvg";

const ProductList = ({
  products,
  addToCart = () => {},
  removeCart = () => {},
  cartProduct = [],
  wishlistProduct = [],
  setWishlistProduct,
}) => {
  const { user, setUser } = useContext(UserContext);
  console.log("🚀 ~ user:", user);

  const addToWishlist = (product_id) => {
    socket.emit("client:addtowishlist", product_id);
    socket.on("server:addtowishlist", (data) => {
      console.log("🚀 ~ socket.on ~ data:", data);
      // setTotal(data?.total);
      if (data?.status === 200) {
        socket.off("server:addtowishlist");
        setWishlistProduct(data?.data?.product);
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

  const navigate = useNavigate();
  return (
    <div>
      <section className="py-10 transition-all duration-300 ">
        <div className="mx-auto grid max-w-screen-2xl text-black font-medium grid-cols-1 gap-6 p-6 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5">
          {products?.map((product) => {
            let discountPrice =
              product?.price - (product?.price * product?.discount) / 100;

            return (
              <div
                className="relative shadow-xl rounded-lg p-2 "
                key={product?._id}
              >
                <div
                  className="absolute right-5 top-5 z-[999]"
                  onClick={() => {
                    if (!user?._id) {
                      toast.error("Please login to add product in wishlist");
                      return navigate("/user/signin");
                    }
                    addToWishlist(product?._id);
                  }}
                >
                  <WishlistSvg
                    fill={
                      wishlistProduct?.includes(product?._id) ? "red" : "none"
                    }
                  />
                </div>
                <div
                  className="rounded-xl bg-primary  hover:shadow-xl hover:transform hover:scale-105 duration-300 "
                  to={`/user/product/${product?._id}`}
                >
                  <a href="#">
                    <div className="relative flex items-end overflow-hidden rounded-xl">
                      <img
                        src={product?.images[0]}
                        alt="Hotel Photo"
                        className="h-[150px] w-full object-cover"
                      />
                    </div>

                    <div className="mt-1 p-2">
                      <h2 className="capitalize text-semibold">
                        {product?.name || ""}
                      </h2>
                      <p className="mt-1 text-sm text-slate-400">
                        {product?.category}
                      </p>
                      {product?.stockQty < 5 ? (
                        <p className="w-96 text-xs leading-3 text-gray-600 dark:text-white pt-3">
                          Hurry, only {product?.stockQty} left in stock.
                        </p>
                      ) : (
                        <p className="mt-1 text-sm text-slate-400">
                          Stock {product?.stockQty}
                        </p>
                      )}

                      <div className="mt-3 flex items-center justify-between">
                        <p className={`  text-lg font-bold text-slate-800`}>
                          {product?.discount != 0 ? `$${discountPrice}` : ""}{" "}
                          <span
                            className={` ${
                              product?.discount > 0 ? "line-through" : ""
                            } text-lg font-bold text-slate-600`}
                          >
                            ${product?.price}
                          </span>
                        </p>
                        {product?.discount > 0 ? (
                          <p className="text-xs">{product?.discount}% off</p>
                        ) : null}
                      </div>
                      <div className="my-1">
                        <Button
                          active={true}
                          // disabled={!user?._id}
                          title={
                            cartProduct?.includes(product?._id)
                              ? "Go to cart"
                              : "Add to cart"
                          }
                          onClick={() => {
                            if (!user?._id) {
                              toast.error(
                                "Please login to add product in cart"
                              );
                              return navigate("/user/signin");
                            }
                            return cartProduct?.includes(product?._id)
                              ? navigate("/user/cart")
                              : addToCart(product?._id);
                          }}
                          classList={"flex items-center justify-center gap-2"}
                        >
                          <CartSvg />
                        </Button>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ProductList;
