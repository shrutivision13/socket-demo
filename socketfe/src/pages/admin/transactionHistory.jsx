import React, { useEffect, useState } from "react";
import { socket } from "../../socketConfig";
import DataTableComponent from "../../components/dataTable/dataTable";
import moment from "moment";
import DataTableHeader from "../../components/dataTable/dataTableHeader";

const ExpandComponent = ({ data }) => {
  console.log("🚀 ~ ExpandComponent ~ data:", data);
  const columns = [
    {
      name: "Image",
      width: "350px",
      selector: (row) => (
        <div className="flex gap-2">
          {row?.product?.images?.map((img) => (
            <div>
              <img
                src={img}
                alt="img"
                className="rounded-md object-cover h-[50px] w-[70px]"
              />
            </div>
          ))}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => {
        console.log("🚀 ~ ExpandComponent ~ row:", row);
        return row?.product?.name;
      },
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row?.product?.price,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row?.product?.category,
      sortable: true,
    },

    {
      name: "Stock quantity",
      width: "300px",
      selector: (row) => row?.product?.stockQty,
      sortable: true,
    },
  ];
  return (
    <div className="w-full flex justify-center">
      <DataTableComponent title="" columns={columns} data={data?.product_id} />
    </div>
  );
};

const TransactionHistory = () => {
  const [allTransactions, setAllTransactions] = useState([]);
  useEffect(() => {
    socket.emit("client:transactions");
    socket.on("server:transactions", (data) => {
      console.log(data);
      if (data?.status === 200) setAllTransactions(data?.data);
      socket.off("server:transactions");
    });
  }, []);
  const orderStatusColor = {
    Ordered: "#f59e0b",
    Cancelled: "#dc2626",
    Delivered: "#22c55e",
  };
  const transactionStatusColor = {
    Success: "#22c55e",
    Failed: "#dc2626",
    Refund: "#f59e0b",
  };

  const columns = [
    {
      name: "Transaction Id",
      selector: (row) => row?.transactionId,
      sortable: true,
    },
    {
      name: " Status",
      selector: (row) => (
        <p
          className={`text-xs font-medium mx-2 rounded bg-[${
            transactionStatusColor[row?.transactionStatus]
          }] py-[2px]  px-1 rounded`}
          style={{
            background: `${transactionStatusColor[row?.transactionStatus]}63`,
            color: transactionStatusColor[row?.transactionStatus],
          }}
        >
          {row?.transactionStatus}
        </p>
      ),
      //   row?.status,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => moment(row?.updatedAt).format("DD-MM-YYYY"),
      sortable: true,
    },
    {
      name: "Total amount",
      selector: (row) =>
        row?.product_id?.reduce((a, b) => a + b?.product?.price, 0),
      sortable: true,
    },
    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <>
    //       <div
    //         className="border rounded px-2 py-[3px] border-cyan-500 text-cyan-500 cursor-pointer"
    //         onClick={() => {
    //           setProductData(row);
    //           setModalOpen(true);
    //         }}
    //       >
    //         Refund
    //       </div>
    //     </>
    //   ),
    // },
  ];

  return (
    <div>
      <div className="pt-16 px-10  h-[100%]">
        <DataTableHeader title="Transaction History" add={false} />

        <div className="">
          <div className="my-6 shadow-md ">
            <DataTableComponent
              title=""
              columns={columns}
              expandableRowsComponent={ExpandComponent}
              data={allTransactions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
