// import { showErrorToast, showToast } from '@/lib/utils';
// import { handleLogout } from '@/redux/reducer/auth';
// import axios from 'axios';
// import {  useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux';

// interface AxiosParams {
//     baseURL?: string;
//     headers?: any;
//     method?: "get" | "post" | "patch" | "put" | "delete";
//     data?: any;
//     params?: { [key: string]: string };
//     url: string;
//     isFormData?: boolean;
// }
// export const BASE_URL = import.meta.env.VITE_API_BASE_URL

// const useApi = () => {
//     const dispatch = useDispatch()

//     const [loader, setLoader] = useState(false)
//     //   instance.interceptors.response.use(
//     //     (res) => {
//     //       return res;
//     //     },
//     //     (error: AxiosError) => {
//     //       const err: any = {
//     //         code: error.response?.status || 0,
//     //         data: error.response?.data,
//     //       };
//     //       return Promise.reject(err);
//     //     }
//     //   );
//     useEffect(() => {
//         let ele:any = document.getElementsByClassName("loader")[0]
//         console.log("🚀 ~ useEffect ~ ele:", ele, ele.getAttribute("className"), typeof ele.getAttribute("className"))

//         if (loader) {
//             ele.setAttribute("className", ele.getAttribute("className")?.replace(/hidden/g, ""))
//         }else {
//             ele.setAttribute("className", ele.getAttribute("className")?.concat(" hidden"))
//         }

//     }, [loader])

//     const apiAction = ({
//         baseURL = BASE_URL,
//         headers = {},
//         method = "get",
//         data = null,
//         params,
//         url,
//         isFormData = false,
//     }: AxiosParams) => {
//         setLoader(true)
//         const instance = axios.create({
//             baseURL,
//         });

//         const config = {
//             url,
//             method,
//             data,
//             params,
//             headers: {
//                 "Content-Type": "application/json",
//                 ...headers,
//             },
//         };

//         if (isFormData) {
//             config.headers = {
//                 ...config.headers,
//                 "Content-Type": "multipart/form-data",
//             };
//         }

//         return instance.request(config).then(data => {
//             setLoader(false)

//             if (data?.status === 200) {
//                 return data?.data
//             } else {
//                 showToast(data?.data?.error || data?.data?.message)
//             }

//         }).catch(err => {
//             setLoader(false)

//             if (err?.response?.data?.message === "Invalid authorization token") {
//                 dispatch(handleLogout())
//                 return
//             }
//             showErrorToast(err?.response?.data?.message || err?.message)
//         });

//     }
//     return { apiAction,loader }
// }

// export default useApi

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export const BASE_URL = "http://localhost:5000/api/v1/";

const useApi = () => {
  const [loader, setLoader] = useState(false);
  //   instance.interceptors.response.use(
  //     (res) => {
  //       return res;
  //     },
  //     (error: AxiosError) => {
  //       const err: any = {
  //         code: error.response?.status || 0,
  //         data: error.response?.data,
  //       };
  //       return Promise.reject(err);
  //     }
  //   );
  // useEffect(() => {
  //     let ele= document.getElementsByClassName("loader")[0]
  //     console.log("🚀 ~ useEffect ~ ele:", ele, ele.getAttribute("className"), typeof ele.getAttribute("className"))

  //     if (loader) {
  //         ele.setAttribute("className", ele.getAttribute("className")?.replace(/hidden/g, ""))
  //     }else {
  //         ele.setAttribute("className", ele.getAttribute("className")?.concat(" hidden"))
  //     }

  // }, [loader])

  const apiAction = ({
    baseURL = BASE_URL,
    headers = {},
    method = "get",
    data = null,
    params,
    url,
    isFormData = false,
  }) => {
    setLoader(true);
    const instance = axios.create({
      baseURL,
    });

    const config = {
      url,
      method,
      data,
      params,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (isFormData) {
      config.headers = {
        ...config.headers,
        "Content-Type": "multipart/form-data",
      };
    }

    return instance
      .request(config)
      .then((data) => {
        setLoader(false);

        if (data?.status === 200) {
          return data?.data;
        } else {
          toast.error(data?.data?.error || data?.data?.message);
        }
      })
      .catch((err) => {
        setLoader(false);

        // if (err?.response?.data?.message === "Invalid authorization token") {
        //     dispatch(handleLogout())
        //     return
        // }
        toast.error(err?.response?.data?.message || err?.message);
      });
  };
  return { apiAction, loader };
};

export default useApi;
