import React, { useContext, useEffect, useState } from "react";
import { socket } from "../../socketConfig";
import { toast } from "react-toastify";
import Payment from "../../components/payment/payment";
import { CartContext } from "../../context/CartContext";
import ConfirmPopup from "../../components/confirmPopup";
const Cart = () => {
  // useState
  const [cartProduct, setCartProduct] = useState(null);
  console.log("🚀 ~ Cart ~ cartProduct:", cartProduct);
  const [open, setOpen] = useState(false);
  console.log("🚀 ~ Cart ~ open:", open);
  const [product, setProduct] = useState(false);
  const { setCount, count } = useContext(CartContext);
  console.log("🚀 ~ Cart ~ count:", count);
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchCartData = () => {
      socket.emit("client:carts", user_id);
      socket.on("server:loadcarts", (data) => {
        console.log("🚀 ~ socket.on ~ data:", data);
        setCartProduct(data);
        socket.off("server:loadcarts");
      });
    };

    const timer = setTimeout(fetchCartData, 1000);
  }, []);

  useEffect(() => {
    if (
      cartProduct?.product_id?.length !== count &&
      cartProduct?.product_id?.length
    ) {
      setCount(cartProduct?.product_id?.length || 0);
    }
  }, [cartProduct?.product_id?.length]);

  const updateCart = (data) => {
    setCartProduct(data);
  };
  const addToCart = (id, quantity) => {
    socket.emit("client:addcart", {
      product_id: id,
      user_id: user_id,
      quantity,
    });
    socket.on("server:addcart", (data) => {
      console.log("🚀 ~ socket.on ~ data:", data);
      if (data?.status === 200) {
        setCartProduct(data?.data);

        toast.success(data?.message);
      } else {
        toast.error(data?.error);
      }
      socket.off("server:addcart");
    });
  };

  const removeFromCart = (id, cart_id) => {
    socket.emit("client:deletecart", {
      product_id: id,
      user_id,
      cart_id: cartProduct?._id,
    });
    socket.on("server:deletecart", (data) => {
      if (data?.status === 200) {
        updateCart(data?.data);
        setOpen(false);
        toast.success(data?.message);
      } else {
        toast.error(data?.error);
      }
      socket.off("server:deletecart");
    });
  };

  const handleAddToWishlist = () => {
    socket.emit("client:addtowishlist", product?._id);
    socket.on("server:addtowishlist", (data) => {
      if (data?.status === 200) {
        setOpen(false);
        toast.success(data?.message);
      } else {
        toast.error(data?.error);
      }
      socket.off("server:addtowishlist");
    });
  };

  const calculateTotal = () => {
    return cartProduct?.product_id?.reduce((sum, item) => {
      console.log("🚀 ~ returncartProduct?.product_id?.reduce ~ item:", item);
      let price =
        parseInt(item?.product?.discount) > 0
          ? item?.product?.price -
            (item?.product?.price * parseInt(item?.product?.discount)) / 100
          : item?.product?.price;
      console.log("🚀 ~ returncartProduct?.product_id?.reduce ~ price:", price);

      return sum + price * (item?.quantity || 1);
    }, 0);
  };
  console.log("🚀 ~ calculateTotal ~ calculateTotal:", calculateTotal());

  return (
    <div className="  ">
      {/* <div className="flex items-center justify-center py-8">
        <button
          onClick={() => checkoutHandler(false)}
          className="py-2 px-10  rounded bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Open Modal
        </button>
      </div> */}
      <div
        className="w-full h-full bg-primary   mt-[75px]  overflow-y-auto  "
        id="chec-div"
      >
        <div
          className="w-full h-full  mt-8 right-0  overflow-x-hidden transform flex justify-center translate-x-0 transition ease-in-out duration-700"
          id="checkout"
        >
          <div
            className="flex shadow-md border lg:min-w-[1000px] max-w-[950px] md:min-w-[700px] flex-col w-full xs:flex-col md:flex-row lg:flex-row  justify-end mb-20 "
            id="cart"
          >
            <div
              className="lg:w-3/4 md:w-8/12 w-full lg:px-8 lg:py-2 md:px-6 px-4 md:py-8 py-4 mb-4 bg-white  rounded overflow-y-auto overflow-x-hidden "
              id="scroll"
              style={{ height: "-webkit-fill-available" }}
            >
              <p className="lg:text-xl text-xl font-black leading-10 text-gray-800  pt-10">
                Bag
              </p>
              {cartProduct?.product_id?.map((item) => {
                let discountPrice =
                  item?.product?.price -
                  (item?.product?.price * item?.product?.discount) / 100;

                return (
                  <div className="md:flex items-strech py-8 md:py-10 lg:py-8">
                    <div className="md:w-4/12 2xl:w-1/4 w-full">
                      <img
                        src={item?.product?.images?.[0]}
                        alt="Black Leather Bag"
                        className="h-full object-center object-cover md:block rounded  "
                      />
                    </div>
                    <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                      <p className="text-xs leading-3 text-gray-800  md:pt-0 pt-4">
                        {item?.product?.sku}
                      </p>
                      <div className="flex items-center justify-between w-full pt-1">
                        <p className="text-base font-semibold leading-none text-gray-800 ">
                          {item?.product?.name}
                        </p>
                        <div className="flex items-center gap-3">
                          <button
                            className="text-xs leading-3  text-gray-800  p-1  px-[6px] cursor-pointer rounded border "
                            disabled={item?.quantity <= 1}
                            onClick={() =>
                              addToCart(item?.product?._id, item?.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <p>{item?.quantity}</p>
                          <button
                            onClick={() =>
                              addToCart(item?.product?._id, item?.quantity + 1)
                            }
                            className="text-xs leading-3  text-grey-500 p-1 px-[7px]    cursor-pointer border rounded "
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <p className="text-xs leading-3 text-gray-600  pt-2 ">
                        {item?.product?.category}
                      </p>

                      {item?.product?.stockQty < 10 ? (
                        <p className="w-96 text-xs leading-3 text-gray-600  pt-3">
                          Hurry, only {item?.product?.stockQty} left in stock.
                        </p>
                      ) : null}
                      <div className="flex items-center justify-between pt-3">
                        <div className="flex items-center">
                          <button
                            onClick={
                              () => {
                                setProduct(item);
                                setOpen(true);
                              }
                              // removeCart(item?.product?._id, item?._id)
                            }
                            className="text-xs leading-3 underline text-red-500  cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="flex items-center gap-2 text-md">
                          <p className={`   font-bold text-slate-800`}>
                            {item?.product?.discount != 0
                              ? `$${discountPrice}`
                              : ""}{" "}
                            <span
                              className={` ${
                                item?.product?.discount > 0
                                  ? "line-through"
                                  : ""
                              } text-md font-bold text-slate-600`}
                            >
                              ${item?.product?.price}
                            </span>
                          </p>
                          {item?.product?.discount > 0 ? (
                            <p className="text-xs">
                              {item?.product?.discount}% off
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {(!cartProduct || cartProduct?.product_id?.length === 0) && (
                <p className="text-base font-black leading-none text-gray-800  pt-10">
                  Your cart is empty
                </p>
              )}
            </div>
            <div
              className="lg:w-96 md:w-8/12 w-full bg-gray-100  mb-4"
              style={{ height: "-webkit-fill-available" }}
            >
              <div className="flex flex-col lg:h-[84vh] h-auto lg:px-8 md:px-7 px-4 lg:py-10 md:py-10 py-6 gap-4 overflow-y-auto">
                <div>
                  <p className="lg:text-2xl text-xl font-black leading-9 text-gray-800 ">
                    Summary
                  </p>
                  <div className="flex items-center justify-between pt-16">
                    <p className="text-base leading-none text-gray-800 ">
                      Subtotal
                    </p>
                    <p className="text-base leading-none text-gray-800 ">
                      ${calculateTotal()}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-5">
                    <p className="text-base leading-none text-gray-800 ">
                      Shipping
                    </p>
                    <p className="text-base leading-none text-gray-800 ">
                      Free
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                    <p className="text-xl leading-normal text-gray-800 ">
                      Total
                    </p>
                    <p className="text-xl font-bold leading-normal text-right text-gray-800 ">
                      ${calculateTotal()}
                    </p>
                  </div>

                  {cartProduct ? (
                    <Payment
                      amount={calculateTotal()}
                      setCartProduct={setCartProduct}
                      cartProduct={cartProduct}
                      buttonStyle={{
                        width: "100%",
                        borderRadius: "5px",
                        padding: "7px 0",
                        backgroundImage:
                          "linear-gradient(to right,  #06b6d4, #3b82f6)",
                        // backgroundColor:
                        //   "linear-gradient(to right, ##06b6d4, #805ad5, ##3b82f6)",
                      }}
                    />
                  ) : (
                    <button
                      disabled
                      onclick="checkoutHandler1(true)"
                      className="text-base bg-indigo-500 bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-purple-500  bg-blue-700 rounded-lg leading-none w-full py-3 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700"
                    >
                      Pay
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <ConfirmPopup
          setOpen={setOpen}
          open={open}
          addToWishlist={handleAddToWishlist}
          onRemove={() => removeFromCart(product?.product?._id)}
        />
      )}
    </div>
  );
};

export default Cart;
