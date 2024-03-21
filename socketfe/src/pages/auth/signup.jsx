import React, { useState } from "react";
import AuthLayout from "../../components/authLayout/layout";
import { toast } from "react-toastify";
import { socket } from "../../socketConfig";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";

const Signup = () => {
  const [userData, setUserData] = useState();
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const handleChange = (e, val) => {
    console.log("🚀 ~ handleChange ~ val:", val);
    setUserData({
      ...userData,
      [val ? e : e?.target?.name]: val ? val : e?.target?.value,
    });

    delete error[val ? e : e?.target?.name];
    setError({ ...error });
  };
  const handleSubmit = () => {
    // setModalOpen(false);
    // getAllEmployees();
    let err = { ...error };
    if (!userData?.username) {
      err = { ...err, username: "Name is required" };
    }
    if (!userData?.email) {
      err = { ...err, email: "Email is required" };
    }
    if (!userData?.mobile) {
      err = { ...err, mobile: "Mobile is required" };
    }
    if (!userData?.address) {
      err = { ...err, address: "Address is required" };
    }
    if (!userData?.password) {
      err = { ...err, password: "Password is required" };
    }
    if (!userData?.confirmPassword) {
      err = { ...err, confirmPassword: "Confirm password is required" };
    }

    if (
      userData?.password &&
      userData?.confirmPassword &&
      userData?.password !== userData?.confirmPassword
    ) {
      err = { ...err, confirmPassword: "Both password doesn't match" };
    }

    setError(err);
    if (Object.keys(err).length > 0) return;

    socket.emit("client:signup", userData);
    socket.on("server:signup", (data) => {
      if (data?.status === 200) {
        setUserData({});
        toast.success(data?.message);
        navigate("/user/signin");
      } else {
        toast.error(data?.error);
      }
      socket.off("server:signup");
      console.log("🚀 ~ socket.on ~ data:101", data);
    });
    // setUserData({});
  };
  return (
    <AuthLayout>
      <div className="mb-8 flex flex-col items-center">
        {/* <img
            src="https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg"
            width="150"
            alt=""
            srcset=""
          /> */}
        <h1 className="mb-2 text-2xl">Termcode</h1>
        <span className="text-lightgray">Sign Up</span>
      </div>
      <form action="#">
        <div className="h-[50vh] overflow-y-scroll text-sm scrollView">
          <div className="mb-4  flex flex-col">
            <label className="block text-lightgray text-sm font-bold mb-2">
              Name
            </label>
            <input
              //   className="rounded-3xl  border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
              className="w-full px-3 py-3 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-300/30 text-primary outline-none backdrop-blur-md"
              type="text"
              name="username"
              onChange={handleChange}
              placeholder=""
            />
            {error?.username && (
              <p className="text-red-500  text-[11px]">{error?.username}</p>
            )}
          </div>
          <div className="mb-4  flex flex-col">
            <label className="block text-lightgray text-sm font-bold mb-2">
              Email
            </label>
            <input
              //   className="rounded-3xl  border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
              className="w-full px-3 py-3 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-300/30 text-primary outline-none backdrop-blur-md"
              type="text"
              name="email"
              onChange={handleChange}
              placeholder=""
            />
            {error?.email && (
              <p className="text-red-500  text-[11px]">{error?.email}</p>
            )}
          </div>
          <div className="mb-4  flex flex-col">
            <label className="block text-lightgray text-sm font-bold mb-2">
              Mobile No
            </label>
            <input
              //   className="rounded-3xl  border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
              className="w-full px-3 py-3 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-300/30 text-primary outline-none backdrop-blur-md"
              type="text"
              name="mobile"
              onChange={handleChange}
              placeholder=""
            />
            {error?.mobile && (
              <p className="text-red-500  text-[11px]">{error?.mobile}</p>
            )}
          </div>
          <div className="mb-4  flex flex-col">
            <label className="block text-lightgray text-sm font-bold mb-2">
              Address
            </label>
            <input
              //   className="rounded-3xl  border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
              className="w-full px-3 py-3 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-300/30 text-primary outline-none backdrop-blur-md"
              type="text"
              name="address"
              onChange={handleChange}
              placeholder=""
            />
            {error?.address && (
              <p className="text-red-500  text-[11px]">{error?.address}</p>
            )}
          </div>

          <div className="mb-4  flex flex-col">
            <label className="block text-lightgray text-sm font-bold mb-2">
              Password
            </label>

            <input
              className="w-full px-3 py-3 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-300/30 text-primary outline-none backdrop-blur-md"
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
          <div className="mb-4  flex flex-col">
            <label className="block text-lightgray text-sm font-bold mb-2">
              Confirm Password
            </label>

            <input
              className="w-full px-3 py-3 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-300/30  text-primary outline-none backdrop-blur-md"
              //   className="rounded-3xl  border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
              type="Password"
              name="confirmPassword"
              onChange={handleChange}
              placeholder="*********"
            />
            {error?.confirmPassword && (
              <p className="text-red-500  text-[11px]">
                {error?.confirmPassword}
              </p>
            )}
          </div>
        </div>
        <div className="mt-8 flex justify-center  text-black gap-4">
          <Button
            // onClick={handleSubmit}
            title={"Cancel"}
            active={false}
            classList="w-[190px] py-4 h-11"
          />
          <Button
            onClick={handleSubmit}
            title={" Sign Up"}
            active={true}
            classList="w-[190px] py-4 h-11"
          />
          {/* <button
            type="button"
            onClick={handleSubmit}
            className="rounded-md active:bg-indigo-500  w-[200px] bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-purple-500  bg-blue-700  bg-opacity-50 px-10 py-2 text-primary shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
          >
            Sign Up
          </button> */}
        </div>
      </form>
    </AuthLayout>
  );
};

export default Signup;
