import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HigherOrderUse from "./pages/admin/hIgherOrderUse.jsx";
import Employee from "./pages/admin/employee.jsx";
import SideBar from "./components/layout/sideBar.jsx";
import Layout from "./components/layout/Layout.jsx";
import Home from "./pages/admin/home.jsx";
import Posts from "./pages/admin/posts.jsx";

import Modal from 'react-modal';
import { socket } from "./socketConfig.js";
import Department from "./pages/admin/department.jsx";
import Designation from "./pages/admin/designation.jsx";
import Product from "./pages/admin/product.jsx";
import Products from "./pages/user/productList.jsx";
import UserLayout from "./components/userLayout/layout.jsx";
import Login from "./pages/auth/login.jsx";
import Cart from "./pages/user/cart.jsx";
import { CartContext } from "./context/CartContext.jsx";
import { useEffect, useState } from "react";
import Signup from "./pages/auth/signup.jsx";
import ProductDetails from "./pages/user/productDetails.jsx";
import { UserContext } from "./context/UserContext.jsx";
import Wishlist from "./pages/user/wishlist.jsx";
import Orders from "./pages/user/Orders.jsx";
import TransactionHistory from "./pages/admin/transactionHistory.jsx";
Modal.setAppElement('#root');
function App() {
  const [count, setCount] = useState()
  const [user, setUser] = useState()

  useEffect(() => {




    socket.on("receive_message", (data) => {
      console.log("🚀 ~ socket.on ~ data  : ", data)

    })
    let user = JSON.parse(localStorage.getItem("user"))
    setUser(user)
    // return () => {
    //   socket.off("receive_message")
    // }
  }, [])

  const joinRoom = () => {
    socket.emit("join_room", `socket_room-${localStorage.getItem("user_id")}`)

  }

  const ProtectedRoute = ({ element, user }) => {
    // Check if user is authenticated
    const isAuthenticated = !!user;

    if (isAuthenticated) {
      return <Route element={element} />;
    } else {
      // Redirect to login page if user is not authenticated
      return <Navigate to="/user/signin" />;
    }
  };

  return (
    <div className="App">
      <ToastContainer />
      <CartContext.Provider value={{ count, setCount }} >
        <UserContext.Provider value={{ user, setUser }} >

          <BrowserRouter>
            <Routes>
              {user?.role === "admin" && <Route path="/" element={<Layout />}>
                <Route path="/" element={<Employee socket={socket} />} />
                <Route path="/home" element={<Home socket={socket} />} />
                <Route path="/designation" element={<Designation socket={socket} />} />
                <Route path="/department" element={<Department socket={socket} />} />
                <Route path="/transaction-history" element={<TransactionHistory socket={socket} />} />
                <Route path="/product" element={<Product socket={socket} />} />
                <Route
                  path="/higherOrder"
                  element={<HigherOrderUse socket={socket} />}
                />
                <Route path="/posts" element={<Posts socket={socket} />} />
                {/* <Route path="/sidebar" element={<SideBar socket={socket} />} /> */}
              </Route>}
              <Route Route path="/user" element={<UserLayout socket={socket} />}>

                <Route path="/user/products" element={<Products socket={socket} />} />
                <Route path="/user/cart" element={<Cart />} />
                <Route path="/user/wishlist" element={<Wishlist />} />
                <Route path="/user/orders" element={<Orders />} />
                {user?.role === "user" &&
                  <>
                  </>
                }
                <Route path="/user/signin" element={<Login socket={socket} />} />
                <Route path="/user/signup" element={<Signup socket={socket} />} />
                <Route path="/user/product/:id" element={<ProductDetails />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </CartContext.Provider>
      {/* <button onClick={joinRoom} className="text-white absolute z-[999]">Join room </button> */}

    </div >
  );
}

export default App;
