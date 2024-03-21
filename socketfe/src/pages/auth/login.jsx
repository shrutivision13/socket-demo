import React, { useContext, useState } from "react";
import AuthLayout from "../../components/authLayout/layout";
import { socket } from "../../socketConfig";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import useSocket from "../../hooks/useSocket";
import Button from "../../components/button";

const Login = () => {
  const [userData, setUserData] = useState();
  const [error, setError] = useState({});
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleChange = (e, val) => {
    setUserData({
      ...userData,
      [val ? e : e?.target?.name]: val ? val : e?.target?.value,
    });

    delete error[val ? e : e?.target?.name];
    setError({ ...error });
  };
  const handleSubmit = () => {
    let err = { ...error };
    if (!userData?.password) {
      err = { ...err, password: "password is required" };
    }
    if (!userData?.email) {
      err = { ...err, email: "email is required" };
    }

    setError(err);
    if (Object.keys(err).length > 0) return;

    socket.emit("client:signin", userData);
    socket.on("server:signin", (data) => {
      if (data?.status === 200) {
        // socket.disconnect();
        socket.auth.token = data?.data?.token;
        socket.connect();
        setUserData({});
        localStorage.setItem("user", JSON.stringify(data?.data?.user));
        localStorage.setItem("token", data?.data?.token);
        setUser(data?.data?.user);
        setTimeout(() => {
          toast.success(data?.message);
          if (data?.data?.user?.role === "admin") {
            navigate("/");
            return;
          }
          navigate("/user/products", { replace: true });
        }, 500);

        // socket.handshake.auth.token = data?.data?.token;
      } else {
        toast.error(data?.error);
      }
      socket.off("server:signin");
    });
    // setUserData({});
  };
  return (
    <AuthLayout>
      <div className="mb-8 flex flex-col items-center">
        <h1 className="mb-2 text-2xl">Termcode</h1>
        <span className="text-primary">Enter Login Details</span>
      </div>
      <form action="#">
        <div className="mb-4 text-sm   ">
          <label className="block text-lightgray text-sm font-bold mb-2">
            Email
          </label>
          <input
            //   className="rounded-3xl  border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
            className="w-full px-3 py-3 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-300/50  text-primary outline-none  backdrop-blur-md"
            type="text"
            name="email"
            onChange={handleChange}
            placeholder=""
          />
          {error?.email && (
            <p className="text-red-500  text-[11px]">{error?.email}</p>
          )}
        </div>

        <div className="mb-4 text-lg flex flex-col">
          <label className="block text-lightgray text-sm font-bold mb-2">
            Password
          </label>

          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-300/50 text-primary outline-none backdrop-blur-md"
            //   className="rounded-3xl  border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
            type="Password"
            name="password"
            onChange={handleChange}
            placeholder="*********"
          />
          {error?.password && (
            <p className="text-red-500  text-[11px]">{error?.password}</p>
          )}
        </div>
        <div className="mt-8 flex justify-center text-lg text-black gap-4">
          {/* <button
            type="submit"
            className="rounded-md w-[200px]    border-lightgray  border  bg-opacity-50 px-10 py-2 text-gradientblue shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-slate-400"
          >
            Cancel
          </button> */}
          <Button
            // onClick={handleSubmit}
            title={"Cancel"}
            active={false}
            classList="w-[190px] py-4 h-11"
          />
          <Button
            onClick={handleSubmit}
            title={"Login"}
            active={true}
            classList="w-[190px] py-4 h-11"
          />
          {/* <button
            type="button"
            onClick={handleSubmit}
            className="rounded-md active:bg-indigo-500  w-[200px] bg-gradient-to-r shadow-xl dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-purple-500  bg-blue-700  bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
          >
            Login
          </button> */}
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
