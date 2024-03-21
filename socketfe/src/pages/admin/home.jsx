// import React, { useEffect, useState } from 'react'
// import $ from 'jquery';
// const Home = () => {
// const [active,setActive] = useState(0)
//   console.log("🚀 ~ Home ~ active:", active)
//   var cont = 0;
//   function loopSlider() {
//   }

//   function reinitLoop(time) {

//     setTimeout(loopSlider(), time);
//   }

//   function sliderButton(index) {
//   console.log("🚀 ~ sliderButton ~ index:", index)

//     // $(`#slider-${index+1}`).fadeOut(400);
//     // $(`#slider-${index-1}`).fadeOut(400);
//     // $(`#slider-${index}`).delay(400).fadeIn(400);
//     // // $("#slider-1").delay(400).fadeIn(400);

//     // reinitLoop(4000);
//     // cont = index-1
//     setActive(index-1)
//     // $(".hidden").delay(500).fadeIn(400);
//     //   setTimeout(() => {
//     //     $(".hidden").hide();
//     //     $(".active").fadeOut(400);
//     //   }, 400);

//   }

//   function sliderButton2() {
//     $("#slider-1").fadeOut(400);
//     $("#slider-2").delay(400).fadeIn(400);
//     $("#sButton1").removeClass("bg-purple-800");
//     $("#sButton2").addClass("bg-purple-800");
//     reinitLoop(4000);
//     cont = 1

//   }

//   useEffect(() => {
//     var xx = setInterval(function () {
//       setActive(active < 2 ? active+1 : 0)

//       // $(".hidden").delay(400).fadeIn(400);
//       // setTimeout(() => {
//       //   $(".hidden").hide();
//       //   $(".active").fadeOut(400);
//       // }, 400);
//       // switch (cont) {
//       //   case 0: {
//       //     $("#slider-1").fadeOut(400);
//       //     $("#slider-2").delay(400).fadeIn(400);

//       //     cont = 1;

//       //     break;
//       //   }
//       //   case 1:
//       //     {

//       //       $("#slider-2").fadeOut(400);
//       //       $("#slider-1").delay(400).fadeIn(400);

//       //       cont = 0;

//       //       break;
//       //     }

//       // }
//     }, 5000);

//     return () => {
//       clearInterval(xx);
//     }
//   }, [])

//   const sliderImagesArray = [
//     {
//       title:"Services",
//       mainTitle:"Hello world",
//       subTitle:"Carousel with TailwindCSS and jQuery",
//       image:"https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1422&q=80"
//     },
//     {
//       title:"Services",
//       mainTitle:"Hello world",
//       subTitle:"Carousel with TailwindCSS and jQuery",
//       image:"https://images.unsplash.com/photo-1544144433-d50aff500b91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
//     },
//     {
//       title:"Service",
//       mainTitle:"Hello world",
//       subTitle:"Carousel with TailwindCSS and jQuery",
//       image:"https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1422&q=80"
//     },
//   ]

//   return (
//     <div>

//       <div className="sliderAx h-auto">
//         {
//           sliderImagesArray.map((item, index) => {
//             return (
//               <div  className={`container ${active === index ? "block delay-500" : "hidden"} mx-auto  `}>
//                 <div className="bg-cover bg-center  h-auto text-white py-24 px-10 object-fill" style={{ backgroundImage: `url(${item.image})` }}>
//                   <div className="md:w-1/2">
//                     <p className="font-bold text-sm uppercase">{item.title}</p>
//                     <p className="text-3xl font-bold">{item.mainTitle}</p>
//                     <p className="text-2xl mb-10 leading-none">{item.subTitle}</p>
//                     <a href="#" className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800">Contact us</a>
//                   </div>
//                 </div>
//                 <br />
//               </div>
//             )
//           })
//         }
//         {/* <div id="slider-1" className="container mx-auto">
//           <div className="bg-cover bg-center  h-auto text-white py-24 px-10 object-fill" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1422&q=80)` }}>
//             <div className="md:w-1/2">
//               <p className="font-bold text-sm uppercase">Services</p>
//               <p className="text-3xl font-bold">Hello world</p>
//               <p className="text-2xl mb-10 leading-none">Carousel with TailwindCSS and jQuery</p>
//               <a href="#" className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800">Contact us</a>
//             </div>
//           </div>
//           <br />
//         </div>

//         <div id="slider-2" className="container mx-auto">
//           <div className="bg-cover bg-top  h-auto text-white py-24 px-10 object-fill" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1544144433-d50aff500b91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)` }}>

//             <p className="font-bold text-sm uppercase">Services</p>
//             <p className="text-3xl font-bold">Hello world</p>
//             <p className="text-2xl mb-10 leading-none">Carousel with TailwindCSS and jQuery</p>
//             <a href="#" className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800">Contact us</a>

//           </div>
//           <br />
//         </div> */}
//       </div>
//       <div className="flex justify-between w-12 mx-auto pb-2">
//       {
//           sliderImagesArray.map((item, index) => {
//             return (

//               <button  onClick={()=>sliderButton(index+1)} className={`${active === index ? "bg-purple-800":"bg-purple-400" } rounded-full w-4 pb-2 h-4 `} ></button>
//             )
//           })
//         }
//       </div>
//     </div>
//   )
// }

// export default Home

import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = (props) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    getUsers();
    props.socket.on("message", (data) => {
      console.log("🚀 ~ props.socket.on ~ data:", data);
    });
    props.socket.emit("message", "hello");
    const interval = setInterval(() => {
      setActive((prevActive) => (prevActive < 2 ? prevActive + 1 : 0));
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const getUsers = async () => {
    await axios
      .get("http://localhost:5000/")
      .then((res) => {
        console.log("🚀 ~ getUsers ~ res:", res);
      })
      .catch((err) => {
        console.log("🚀 ~ getUsers ~ err:", err);
      });
  };

  const sliderImagesArray = [
    {
      title: "Services",
      mainTitle: "Hello world",
      subTitle: "Carousel with TailwindCSS and jQuery",
      image:
        "https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1422&q=80",
    },
    {
      title: "Services",
      mainTitle: "Hello world",
      subTitle: "Carousel with TailwindCSS and jQuery",
      image:
        "https://images.unsplash.com/photo-1544144433-d50aff500b91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Service",
      mainTitle: "Hello world",
      subTitle: "Carousel with TailwindCSS and jQuery",
      image:
        "https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1422&q=80",
    },
  ];

  const sliderButtons = sliderImagesArray.map((item, index) => (
    <button
      key={index}
      onClick={() => setActive(index)}
      className={`slider-button ${active === index ? "active" : ""}`}
    ></button>
  ));

  const sliderItems = sliderImagesArray.map((item, index) => (
    <div
      key={index}
      className={`slider-item ${active === index ? "active" : "hidden"} ${
        active === index - 1 ||
        (active === 0 && index === sliderImagesArray.length - 1)
          ? "previous"
          : ""
      }`}
    >
      <div
        className="bg-cover bg-center h-auto text-white py-24 px-10 object-fill"
        style={{ backgroundImage: `url(${item.image})` }}
      >
        <div className="md:w-1/2">
          <p className="font-bold text-sm uppercase">{item.title}</p>
          <p className="text-3xl font-bold">{item.mainTitle}</p>
          <p className="text-2xl mb-10 leading-none">{item.subTitle}</p>
          <a
            href="#"
            className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800"
          >
            Contact us
          </a>
        </div>
      </div>
      <br />
    </div>
  ));

  return (
    <div className="mt-8">
      <div className="sliderAx h-auto">{sliderItems}</div>
      <div className="flex justify-between w-12 mx-auto pb-2">
        {sliderButtons}
      </div>

      <div className="my-6  flex justify-center items-center bg-slate-900 ">
        <div className="bg-slate-800 text-white rounded-lg w-full mx-5   space-y-6 p-10">
          <div className="flex space-x-4 items-center ">
            <div className="w-12 h-12">
              <img
                alt="avatar"
                src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                className="rounded-full w-full h-full object-cover "
              />
              <div></div>
            </div>
            <div className="space-y-2">
              <div className="flex space-x-2 items-center">
                <h2 className="text-base"> John Doe</h2>
                <svg
                  className="h-4 w-4 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="  text-xs text-slate-400">posted an update</div>
              </div>
              <p className=" text-xs text-slate-400">10 Monthes Ago</p>
            </div>
          </div>
          <div>
            <p className="text-sm leading-6 text-slate-300">
              Hypnosis at the parallel universe was the advice of alarm,
              commanded to a conscious ship. Processors experiment with
              paralysis!
            </p>
          </div>

          <div className="grid grid-cols-6 col-span-2   gap-2  ">
            <div className=" overflow-hidden rounded-xl col-span-3 max-h-[18rem]">
              <img
                className="h-full w-full object-cover "
                src="https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
                alt=""
              />
            </div>
            <div className=" overflow-hidden rounded-xl col-span-3 max-h-[18rem]">
              <img
                className="h-full w-full object-cover  "
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1399&q=80"
                alt=""
              />
            </div>
            <div className=" overflow-hidden rounded-xl col-span-2 max-h-[14rem]">
              <img
                className="h-full w-full object-cover "
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt=""
              />
            </div>
            <div className=" overflow-hidden rounded-xl col-span-2 max-h-[14rem]">
              <img
                className="h-full w-full object-cover "
                src="https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt=""
              />
            </div>
            <div className="relative overflow-hidden rounded-xl col-span-2 max-h-[14rem]">
              <div className="text-white text-xl absolute inset-0  bg-slate-900/80 flex justify-center items-center">
                + 23
              </div>
              <img
                className="h-full w-full object-cover "
                src="https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
                alt=""
              />
            </div>
          </div>

          <div className="flex justify-between pt-5">
            <svg
              className="h-4 w-4 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
              />
            </svg>

            <div className="text-slate-400 text-sm">
              <p>23 Comments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
