import React, { useEffect, useState } from "react";
import Button from "../../components/button";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../../socketConfig";
import moment from "moment";

const OrderStatus = ({ status }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [orderDetails, setOrderDetails] = useState();

  useEffect(() => {
    socket.emit("client:getcart", params?.orderId);
    socket.on("server:selectedcart", (data) => {
      setOrderDetails(data?.data);
    });
  }, [params?.orderId]);
  console.log("🚀 ~ useEffect ~ params?.orderId:", params?.orderId);

  const calculateTotal = () => {
    return orderDetails?.product_id?.reduce((sum, item) => {
      let price =
        item?.product?.discount > 0
          ? item?.product?.price -
            (item?.product?.price * item?.product?.discount) / 100
          : item?.product?.price;

      return sum + price * item?.quantity;
    }, 0);
  };

  return (
    <div className="h-full pt-[75px] flex items-center justify-center">
      <div class=" ">
        <div class="bg-white p-6 shadow-md border  w-[600px] my-12 md:mx-auto">
          {status ? (
            <svg
              viewBox="0 0 24 24"
              class={"text-green-600 w-16 h-16 mx-auto my-6"}
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class={"text-red-600 w-16 h-16 mx-auto my-6"}
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                clip-rule="evenodd"
              />
            </svg>
          )}

          <div class="text-center">
            <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
              {status ? "Payment Done!" : "Payment Failed!"}
            </h3>
            <p class="text-gray-600 my-2">
              {status
                ? "Thank you for shopping with us. We have received your payment."
                : "There is some issue while processing your payment."}
            </p>
            {status ? <p> Have a great day! </p> : null}
            {status ? (
              <div>
                <div>
                  <h2 className="my-4 text-lg">Order details</h2>
                  <div className="flex w-full justify-between text-sm font-medium">
                    <div>
                      <p className="text-left">
                        Order ID: {orderDetails?.orderId}
                      </p>
                      <p>
                        Order Date:{" "}
                        {moment(orderDetails?.createdAt).format("DD-MM-YYYY")}
                      </p>
                    </div>
                    <div>
                      <p>Payment Method: Online({orderDetails?.platform}) </p>
                    </div>
                  </div>
                </div>
                <div className="my-4">
                  {orderDetails?.product_id?.map((item) => {
                    let product = item?.product;
                    return (
                      <div className="flex border p-3 mb-4 rounded gap-4">
                        <div>
                          <img
                            src={product?.images?.[0]}
                            alt="product-image"
                            className="w-[100px] rounded-lg "
                          />
                        </div>
                        <div className="flex justify-between w-full">
                          <div>
                            <p>{product?.name}</p>
                            <p> ${product?.price}</p>
                          </div>
                          <p> Quantity: {item?.quantity}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col items-end font-medium text-sm">
                  <div>
                    <p className="text-left">Subtotal : ${calculateTotal()}</p>
                    <p className="text-left">Shipping : $ 0.00</p>
                    <p className="text-left">Total : ${calculateTotal()}</p>
                  </div>
                </div>
              </div>
            ) : null}
            <div class="py-10 text-center ">
              <Button
                title={"GO BACK"}
                onClick={() => navigate(-1)}
                active={true}
                classList="w-[140px] h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
