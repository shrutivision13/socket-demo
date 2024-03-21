import React, { useContext, useEffect, useState } from "react";
import ProductList from "../../components/product/ProductList";
import { toast } from "react-toastify";
import { CartContext } from "../../context/CartContext";
import { socket } from "../../socketConfig";
import SubHeader from "../../components/userLayout/SubHeader";

function MenuItem({ setCategory, category, item }) {
  return (
    <div className="relative flex justify-between items-center w-full py-6 border-b border-stone-200 px-10">
      <div
        className="flex h-full items-center gap-3 cursor-pointer"
        onClick={() => setCategory(item?.value)}
      >
        <div className="block"></div>
        <div className="mb-0 block flex-col">
          <b>{item?.name}</b>
        </div>
        {category === item?.value && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="green"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

const Products = () => {
  const [products, setProducts] = useState([]);
  console.log("🚀 ~ Products ~ products:", products);
  const [currentPage, setCurrentPage] = useState(1);
  const [cartProduct, setCartProduct] = useState();
  const [wishlistProduct, setWishlistProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  console.log("🚀 ~ Products ~ cartProduct:", cartProduct);
  const [total, setTotal] = useState();
  const user_id = localStorage.getItem("user_id");
  const { setCount } = useContext(CartContext);
  useEffect(() => {
    setTimeout(() => {
      socket.emit("client:products", {
        page: currentPage,
        limit: 10,
        search: search,
        category: category,
      });
      socket.on("server:loadproducts", (data) => {
        console.log("🚀 ~ socket.on ~ data:", data);
        setTotal(data?.total);
        socket.off("server:loadproducts");
        //   if (currentPage > 1)
        //     setDesignations([...(designations || []), ...(data?.data || [])]);
        //   else {
        setProducts(data || []);

        //   }
        console.log("🚀 ~ socket.on ~ data:", data);
      });
      socket.emit("client:wishlists", user_id);
      socket.on("server:wishlists", (data) => {
        console.log("🚀 ~ socket.on ~ wishlists data:", data);
        // setTotal(data?.total);
        if (data?.status === 200)
          setWishlistProduct(
            data?.data?.product?.map((product) => product?._id) || []
          );
        socket.off("server:wishlists");
        //   if (currentPage > 1)
        //     setDesignations([...(designations || []), ...(data?.data || [])]);
        //   else {

        // setCartProduct(data);

        //   }
        console.log("🚀 ~ socket.on ~ data:", data);
      });
      socket.emit("client:carts", user_id);
      socket.on("server:loadcarts", (data) => {
        console.log("🚀 ~ socket.on ~ data:", data);
        // setTotal(data?.total);
        socket.off("server:loadcarts");
        //   if (currentPage > 1)
        //     setDesignations([...(designations || []), ...(data?.data || [])]);
        //   else {

        setCartProduct(data);

        //   }
        console.log("🚀 ~ socket.on ~ data:", data);
      });
    }, 1000);
  }, [search, category]);

  useEffect(() => {
    setCount(cartProduct?.product_id?.length);
  }, [cartProduct]);

  const addToCart = (id) => {
    socket.emit("client:addcart", {
      product_id: id,
      user_id: user_id,
    });
    socket.on("server:addcart", (data) => {
      console.log("🚀 ~ socket.on ~ data:", data);
      if (data?.status === 200) {
        setCartProduct(data?.data);

        toast.success(data?.message);
        socket.off("server:addcart");
      } else {
        toast.error(data?.error);
        socket.off("server:addcart");
      }
    });
  };
  const deleteCart = (id) => {
    const user_id = localStorage.getItem("user_id");
    socket.emit("client:deletecart", {
      product_id: id,
      user_id: user_id,
    });
    socket.on("server:deletecart", (data) => {
      if (data?.status === 200) {
        toast.success(data?.message);
        socket.off("server:deletecart");
      } else {
        toast.error(data?.error);
        socket.off("server:deletecart");
      }
    });
  };

  const categoryMenu = [
    {
      name: "All",
      value: "",
    },
    {
      name: "Electronics",
      value: "Electronics",
    },

    {
      name: "Clothing",
      value: "Clothing",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <SubHeader title="All Products" />
      <div className="relative w-[800px] mx-auto flex gap-2">
        <div className="w-[500px]">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <svg
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <input
            className="w-full border text-black rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e?.target?.value)}
          />
        </div>
        <div>
          <div id="bouton" className="relative group/bouton w-[300px]">
            <button className="bg-stone-100 py-3 pr-12 min-w-44 relative w-full">
              Filter by category
              <span className="absolute flex items-center justify-center bg-stone-200 w-12 top-0 h-full right-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 group-hover/bouton:rotate-90"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            </button>
            <div className="absolute w-full bg-white top-full bg-stone-50 origine-top opacity-0 hidden flex-col group-hover/bouton:flex group-hover/bouton:opacity-100 transition-all">
              {categoryMenu?.map((item, index) => (
                <MenuItem
                  key={index}
                  category={category}
                  setCategory={setCategory}
                  item={item}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ProductList
        products={products || []}
        addToCart={addToCart}
        removeCart={deleteCart}
        wishlistProduct={wishlistProduct}
        setWishlistProduct={setWishlistProduct}
        cartProduct={cartProduct?.product_id?.map(
          (item) => item?.product?._id || item?.product
        )}
      />
    </div>
  );
};

export default Products;
