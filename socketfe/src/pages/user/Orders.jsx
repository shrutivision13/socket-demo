import React, { useEffect, useState } from "react";
import { socket } from "../../socketConfig";
import moment from "moment";
import { toast } from "react-toastify";
import SubHeader from "../../components/userLayout/SubHeader";

function Product(props) {
  return (
    <div className="justify-between mb-6 rounded-lg  p-6 border my-2 sm:flex sm:justify-start">
      <img
        src={props.product?.images?.[0]}
        alt="product-image"
        className="w-full rounded-lg sm:w-40"
      />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          {/* <h4 className="text-xs font-medium ">{product?.sku}</h4> */}
          <h2 className="text-lg font-bold ">{props.product?.name}</h2>
          <p className="mt-1 text-xs ">{props.product?.category}</p>
          <p className="text-sm my-4">${props.product?.price}</p>
        </div>
        <div className="  sm:space-y-6 sm:mt-0 sm:block sm:space-x-6 flex flex-col justify-between items-end my-4">
          <p className="text-sm mt-2      text-right">
            Quantity: {props.item?.quantity}
          </p>
          {props.order?.status !== "Cancelled" && (
            <div className="flex gap-2 text-sm ">
              {props.order?.status === "Ordered" ? (
                <button
                  className="bg-red-700  text-white  rounded px-3 py-[3px]"
                  onClick={() =>
                    props.onCancleOrRefund(
                      {
                        id: props.order?._id,
                        payment_id: props.order?.transactionId,
                        platform: props.order?.platform,
                      },
                      "Cancelled"
                    )
                  }
                >
                  Cancel
                </button>
              ) : (
                <button
                  className="border border-[#22d3ee] text-[#22d3ee] px-3 py-[3px] rounded"
                  onClick={() =>
                    props.onCancleOrRefund(
                      {
                        id: props.order?._id,
                        payment_id: props.order?.transactionId,
                      },
                      "Returned"
                    )
                  }
                >
                  Return
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      socket.emit("client:orders");
      socket.on("server:orders", (data) => {
        setOrders(data?.data);
        socket.off("server:orders");
        console.log("🚀 ~ Orders ~ data", data);
      });
    }, 1000);
  }, []);

  const orderStatusColor = {
    Ordered: "#f59e0b",
    Cancelled: "#dc2626",
    Delivered: "#22c55e",
  };

  const onCancleOrRefund = (data, status) => {
    socket.emit("client:refund", { ...data, status });
    socket.on("server:refund", (data) => {
      if (data?.status === 200) {
        socket.emit("client:orders");
        socket.on("server:orders", (data) => {
          setOrders(data?.data);
          socket.off("server:orders");
          console.log("🚀 ~ Orders ~ data", data);
        });
        toast.success(data?.message);
      } else {
        toast.error(data?.error);
      }
      socket.off("server:refund");
    });
  };

  return (
    <div>
      <div className="h-[100%] bg-primary text-primary ">
        <SubHeader title="Orders" />

        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {orders?.map((order) => {
              return (
                <div className="justify-between mb-6 rounded-lg bg-primary border p-6 shadow-md sm:flex  flex-col sm:justify-start">
                  <div className="flex justify-between">
                    <p className={`text-sm   p-1 rounded`}>
                      Order status :
                      <span
                        className={`text-xs font-medium mx-2 bg-[${
                          orderStatusColor[order?.status]
                        }] p-1 rounded`}
                        style={{
                          background: `${orderStatusColor[order?.status]}63`,
                          color: orderStatusColor[order?.status],
                        }}
                      >
                        {order?.status}
                      </span>
                    </p>
                    <p className="text-xs">
                      {moment(order?.updatedAt).format("MMMM Do YYYY")}
                    </p>
                  </div>
                  <p className="text-sm p-1">
                    Transaction : {order?.transactionId}
                  </p>
                  {order?.product_id?.map((item) => {
                    let product = item?.product;
                    return (
                      <Product
                        product={product}
                        onCancleOrRefund={onCancleOrRefund}
                        item={item}
                        order={order}
                      />
                    );
                  })}
                </div>
              );
            })}
            {(orders?.length === 0 || !orders) && (
              <div className=" flex justify-center h-[100px] items-center ">
                No product found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Orders;
