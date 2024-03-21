import React, { useEffect, useState } from "react";
import ProductForm from "../../components/product/productForm";
import ModalComponent from "../../components/modalComponent";
import { toast } from "react-toastify";
import DataTableComponent from "../../components/dataTable/dataTable";
import ProductList from "../../components/product/ProductList";
import DataTableHeader from "../../components/dataTable/dataTableHeader";
import Button from "../../components/button";

const Product = ({ socket }) => {
  const [currentPage, setCurrentPage] = useState(1);
  console.log("🚀 ~ Employee ~ currentPage:", currentPage);
  const [products, setProducts] = useState([]);
  console.log("🚀 ~ Product ~ products:", products);
  const [total, setTotal] = useState();
  const [error, setError] = useState({});
  console.log("🚀 ~ Product ~ error:", error);
  const [modalOpen, setModalOpen] = useState(false);
  const [productData, setProductData] = useState({
    sku: `SKU${Math.random().toString(36).substring(2, 8)?.toUpperCase()}`,
  });
  console.log("🚀 ~ Product ~ productData:", productData);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    socket.emit("client:products", { page: currentPage, limit: 10 });
    socket.on("server:loadproducts", (data) => {
      console.log("🚀 ~ socket.on ~ data:", data);
      setTotal(data?.total);
      //   if (currentPage > 1)
      //     setDesignations([...(designations || []), ...(data?.data || [])]);
      //   else {
      setProducts(data);
      //   }
      console.log("🚀 ~ socket.on ~ data:", data);
    });
  }, []);

  const deleteProduct = (id) => {
    console.log("🚀 ~ deleteProduct ~ id:", id);
    // setModalOpen(false);
    // getAllEmployees();

    socket.emit("client:deleteproduct", id);
    socket.on("server:deleteproduct", (data) => {
      if (data?.status === 200) {
        toast.success(data?.message);
        socket.off("server:deleteproduct");
      } else {
        toast.error(data?.error);
        socket.off("server:deleteproduct");
      }
    });
  };

  const successCallback = (data, socketEvent) => {
    setModalOpen(false);
    toast.success(data?.message);
    setProductData({});
    socket.off(socketEvent);
  };

  const errorCallBack = (data, socketEvent) => {
    toast.error(data?.error);
    socket.off(socketEvent);
  };

  const handleSubmit = (data) => {
    let err = { ...error };
    if (!productData?.name) {
      err = { ...err, name: "Name is required" };
    }
    if (!productData?.price) {
      err = { ...err, price: "Price is required" };
    }
    if (!productData?.sku) {
      err = { ...err, sku: "Sku is required" };
    }
    if (!productData?.stockQty) {
      err = { ...err, stockQty: "StockQty is required" };
    }
    if (!productData?.category) {
      err = { ...err, category: "Category is required" };
    }
    if (!productData?.images) {
      err = { ...err, images: "Image is required" };
    }
    if (productData?.images?.length && productData?.images?.length < 5) {
      err = { ...err, images: "Please upload minimum 5 images " };
    }
    setError(err);
    if (Object.keys(err).length > 0) return;
    if (productData?._id) {
      socket.emit("client:updateproduct", productData);
      socket.on("server:updateproduct", (data) => {
        if (data?.status === 200) {
          successCallback(data, "server:updateproduct");
        } else {
          errorCallBack(data, "server:updateproduct");
        }
      });
    } else {
      socket.emit("client:newproduct", productData);
      socket.on("server:newproduct", (data) => {
        if (data?.status === 200) {
          successCallback(data, "server:newproduct");
        } else {
          errorCallBack(data, "server:newproduct");
        }
        console.log("🚀 ~ socket.on ~ data:101", data);
      });
    }
  };

  const columns = [
    {
      name: "Image",
      width: "350px",
      selector: (row) => (
        <div className="flex gap-2">
          {row?.images?.map((img) => (
            <div>
              <img
                src={img}
                alt="img"
                className="rounded-md object-cover h-[50px] w-[50px]"
              />
            </div>
          ))}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row?.price,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row?.category,
      sortable: true,
    },
    {
      name: "Discount",
      selector: (row) => `${row?.discount}%`,
      sortable: true,
    },
    {
      name: "SKU",
      selector: (row) => row.sku,
      sortable: true,
    },
    {
      name: "Stock quantity",
      selector: (row) => row?.stockQty,
      sortable: true,
    },

    {
      name: "Action",
      cell: (row) => (
        <>
          <div
            className="text-blue-900 mr-2"
            onClick={() => {
              setProductData(row);
              setModalOpen(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
              <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
            </svg>
          </div>
          <div
            className="text-rose-500"
            onClick={() => deleteProduct(row?._id)}
          >
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
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="pt-16 px-10  h-[100%]">
        <DataTableHeader setModalOpen={setModalOpen} title="Product" add={true}>
          <div className=" flex space-x-2 p-1 text-primary bg-primary rounded-md shadow-md">
            <Button
              active={activeTab === 0}
              onClick={() => setActiveTab(0)}
              title="Product"
            />
            <Button
              active={activeTab === 1}
              onClick={() => setActiveTab(1)}
              title="Table"
            />
          </div>
        </DataTableHeader>
        {activeTab === 0 ? (
          <ProductList products={products}></ProductList>
        ) : (
          <div className="my-6 shadow-md ">
            <DataTableComponent title="" columns={columns} data={products} />
          </div>
        )}

        <ModalComponent
          title={productData?._id ? "Edit Product" : "Add Product"}
          open={modalOpen}
          onClose={() => {
            setError({});
            setProductData({});
            setModalOpen(false);
          }}
          onSubmit={handleSubmit}
        >
          <ProductForm
            errors={error}
            setError={setError}
            productData={productData}
            setProductData={setProductData}
          />
        </ModalComponent>
      </div>
    </div>
  );
};

export default Product;
