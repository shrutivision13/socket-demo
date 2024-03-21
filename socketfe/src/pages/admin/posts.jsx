import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";

const Posts = () => {
  const { apiAction } = useApi();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        const content = document.getElementsByClassName("animation-menu")[0];
        // content.classList.add("-top-[3rem]")
        // content.classList.remove("top-0")
      }, 300);
    }
  }, [open]);

  const getAllPosts = async () => {
    let data = await apiAction({
      url: `post`,
      method: "get",
    });
    setPosts(data?.posts);
    console.log("🚀 ~ getAllPosts ~ data:", data);
  };
  function toggleOpen() {
    const content = document.getElementById("content");
    content.classList.toggle("hidden");
    content.classList.toggle("slide-up");
  }

  const getCommentsForPosts = async (post) => {
    let data = await apiAction({
      url: `comment/${post?._id}`,
      method: "get",
    });
    setComments(data?.comments);
  };

  return (
    <div>
      <div className="bg-primary p-4 ">
        {posts?.map((post) => {
          return (
            <div className=" text-white bg-slate-800 shadow-lg rounded-lg max-w-md mt-4 p-4 pt-2">
              <div className="flex items-center px-4 rounded-lg py-3">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://picsum.photos/id/1027/150/150"
                />
                <div className="ml-3 ">
                  <span className="text-sm font-semibold antialiased block leading-tight flex justify-start">
                    {post?.user_id?.username}
                  </span>
                  <span className="text-gray-400 text-xs block">
                    {post?.title}
                  </span>
                </div>
              </div>
              <img
                src={`${"http://localhost:3000/"}${post?.image}`}
                className="max-h-[300px] w-full object-cover"
              />
              <div className="flex items-center justify-between mx-4 mt-3 mb-2">
                <div className="flex gap-5">
                  <svg
                    fill="#999eac"
                    height="24"
                    viewBox="0 0 48 48"
                    width="24"
                  >
                    <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                  </svg>
                  {/* <div className=' '>
                                            <div className="flex space-x-40">
                                                <div className="relative group">
                                                    <div
                                                    onClick={() => setOpen(!open)}
                                                        className="relative z-10 middle none  font-sans text-xs font-bold uppercase  transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"     >
                                                        <svg fill="#999eac" height="24" viewBox="0 0 48 48" width="24"><path clipRule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fillRule="evenodd"></path></svg>

                                                    </div>
                                                   {open && <div className="absolute top-0 group-hover:-top-[3rem] transition-all ease-in-out duration-1000">
                                                        <div
                                                            className="z-0 w-max whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white   text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
                                                            <h3 className="font-sans font-normal text-sm py-2 px-5">Awesome ❤</h3>
                                                        </div>
                                                    </div>}
                                                </div>
                                            </div>
                                        </div> */}
                  <div className="">
                    <div className="flex space-x-40">
                      <div className="relative group">
                        <div
                          onClick={() => {
                            getCommentsForPosts(post);
                            setOpen(!open);
                          }}
                          className="relative  middle none font-sans text-xs font-bold uppercase transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                          <svg
                            fill="#999eac"
                            height="24"
                            viewBox="0 0 48 48"
                            width="24"
                          >
                            <path
                              clipRule="evenodd"
                              d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
                              fillRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        {open && (
                          <div className="absolute  transition-all ease-in-out duration-500 animation-menu bottom-[3rem]">
                            <div
                              className="z-0 w-max max-h-[15rem] whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-slate-800 text-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
                              style={{
                                transformOrigin: "top",
                                transform: "scaleY(1)",
                              }}
                            >
                              {comments.map((comment) => {
                                return (
                                  <div>
                                    <div className="flex items-center space-x-2 p-2">
                                      <div className="flex flex-shrink-0 self-start cursor-pointer mt-1">
                                        <img
                                          src="https://images.unsplash.com/photo-1551122089-4e3e72477432?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cnVieXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                                          alt=""
                                          className="h-8 w-8 object-fill rounded-full"
                                        />
                                      </div>

                                      <div className="flex items-center justify-start space-x-2">
                                        <div className="block">
                                          <div className="bg-slate-800 w-auto rounded-xl px-2 flex flex-col justify-start pb-2">
                                            <div className="font-medium flex flex-col justify-start ">
                                              <a
                                                href="#"
                                                className="hover:underline text-sm flex"
                                              >
                                                <small>
                                                  {comment?.user_id?.username}
                                                </small>
                                              </a>
                                            </div>
                                            <div className="text-xs flex">
                                              {comment.comment}
                                            </div>
                                          </div>
                                          <div className="flex justify-start items-center text-xs w-full">
                                            <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                                              <a
                                                href="#"
                                                className="hover:underline"
                                              >
                                                <small>Like</small>
                                              </a>
                                              <small className="self-center">
                                                .
                                              </small>
                                              <a
                                                href="#"
                                                className="hover:underline"
                                              >
                                                <small>Reply</small>
                                              </a>
                                              <small className="self-center">
                                                .
                                              </small>
                                              <a
                                                href="#"
                                                className="hover:underline"
                                              >
                                                <small>15 hour</small>
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="self-stretch flex justify-center items-center transform transition-opacity duration-200 opacity-0 translate -translate-y-2 hover:opacity-100">
                                        <a href="#" className="">
                                          <div className="text-xs cursor-pointer flex h-6 w-6 transform transition-colors duration-200 hover:bg-gray-100 rounded-full items-center justify-center">
                                            <svg
                                              className="w-4 h-6"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                              ></path>
                                            </svg>
                                          </div>
                                        </a>
                                      </div>
                                    </div>
                                    {comment?.child.map((innerComment) => {
                                      return (
                                        <div>
                                          <div className="flex items-center space-x-2 p-2 ml-6">
                                            <div className="flex flex-shrink-0 self-start cursor-pointer mt-1">
                                              <img
                                                src="https://images.unsplash.com/photo-1551122089-4e3e72477432?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cnVieXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                                                alt=""
                                                className="h-8 w-8 object-fill rounded-full"
                                              />
                                            </div>

                                            <div className="flex items-center justify-start space-x-2">
                                              <div className="block">
                                                <div className="bg-slate-800 w-auto rounded-xl px-2 flex flex-col justify-start pb-2">
                                                  <div className="font-medium flex flex-col justify-start ">
                                                    <a
                                                      href="#"
                                                      className="hover:underline text-sm flex"
                                                    >
                                                      <small>
                                                        {
                                                          innerComment?.user_id
                                                            ?.username
                                                        }
                                                      </small>
                                                    </a>
                                                  </div>
                                                  <div className="text-xs flex">
                                                    {innerComment.comment}
                                                  </div>
                                                </div>
                                                <div className="flex justify-start items-center text-xs w-full">
                                                  <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                                                    <a
                                                      href="#"
                                                      className="hover:underline"
                                                    >
                                                      <small>Like</small>
                                                    </a>
                                                    <small className="self-center">
                                                      .
                                                    </small>
                                                    <a
                                                      href="#"
                                                      className="hover:underline"
                                                    >
                                                      <small>Reply</small>
                                                    </a>
                                                    <small className="self-center">
                                                      .
                                                    </small>
                                                    <a
                                                      href="#"
                                                      className="hover:underline"
                                                    >
                                                      <small>15 hour</small>
                                                    </a>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>

                                            <div className="self-stretch flex justify-center items-center transform transition-opacity duration-200 opacity-0 translate -translate-y-2 hover:opacity-100">
                                              <a href="#" className="">
                                                <div className="text-xs cursor-pointer flex h-6 w-6 transform transition-colors duration-200 hover:bg-gray-100 rounded-full items-center justify-center">
                                                  <svg
                                                    className="w-4 h-6"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth="2"
                                                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                                    ></path>
                                                  </svg>
                                                </div>
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <svg
                    fill="#999eac"
                    height="24"
                    viewBox="0 0 48 48"
                    width="24"
                  >
                    <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                  </svg>
                </div>
                <div className="flex">
                  <svg
                    fill="#999eac"
                    height="24"
                    viewBox="0 0 48 48"
                    width="24"
                  >
                    <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
                  </svg>
                </div>
              </div>
              <div className="font-semibold text-sm mx-4 mt-2 mb-4 flex justify-start">
                {post?.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
