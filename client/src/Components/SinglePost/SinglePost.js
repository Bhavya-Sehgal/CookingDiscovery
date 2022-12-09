import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FaHandPointRight } from "react-icons/fa";
import { Context } from "../../Context/Context";
import { mainUrl } from "../../config";

function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user, token } = useContext(Context);
  // const [updateMode, setUpdateMode] = useState("true");

  // const PF = "http://localhost:5000/images/";
  const PF = `${mainUrl}/images/`;

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${mainUrl}/api/posts/get/` + path);
      setPost(res.data);
      console.log(res.data);
    };
    getPost();
  }, [path]);

  console.log(post);
  const handleDelete = async () => {
    // console.log(token);
    try {
      await axios.delete(
        `${mainUrl}/api/posts/${post._id}`,
        // {
        //   data: { username: user._id },
        // },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-[9] pb-5">
      {post && (
        <div className="px-5 xs:px-8 md:px-10 3lg/2:px-14 py-10">
          <div className="flex">
            <div className="w-3/4 sm:text-lg lg:text-2xl tracking-widest">
              {post.title} |{" "}
              <span className="text-[#7f2121]">
                <Link
                  to={`/allposts/?cuisine=${post.cuisine && post.cuisine._id}`}
                >
                  {post.cuisine && post.cuisine.name}
                </Link>
              </span>
            </div>
            {post.username &&
              user &&
              user.username &&
              post.username.username.toString() ===
                user.username.toString() && (
                <div className="w-1/4">
                  <div className="float-right sm:text-lg lg:text-2xl">
                    <Link to={`/updatepost/${post._id}`}>
                      <i
                        className="ml-2 cursor-pointer fa-solid fa-pen-to-square text-[teal]"
                        // onClick={() => setUpdateMode(true)}
                      ></i>
                    </Link>
                    <i
                      className="ml-2 cursor-pointer fa-solid fa-trash-can text-[tomato]"
                      onClick={handleDelete}
                    ></i>
                  </div>
                </div>
              )}
          </div>

          {post.photo && (
            <div className="py-5 mx-auto">
              <img
                src={PF + post.photo}
                alt=" "
                className="rounded-2xl w-[100%] mx-auto"
              />
            </div>
          )}

          <div className="md:flex mb-4 lg:mb-5 tracking-widest text-sm sm:text-base lg:text-lg text-[#b39656]">
            <div className="md:w-2/3">
              Author:{" "}
              <Link
                to={`/allposts/?user=${post.username && post.username._id}`}
              >
                {post.username && post.username.username}
              </Link>
            </div>
            <div className="md:w-1/3">
              <div className="md:float-right">
                {new Date(post.createdAt).toDateString()}
              </div>
            </div>
          </div>
          <div className="text-[#666] text-base sm:text-lg lg:text-xl text-justify leading-6 first-letter:ml-10 first-letter:text-2xl first-letter:font-bold">
            {post.desc}
          </div>
          <div className="">
            <div className="text-2xl font-bold mt-3 pb-2 text-[tomato] tracking-widest">
              Ingredients
            </div>
            <div className="flex flex-wrap">
              {post &&
                post.ingredients &&
                post.ingredients.map((val) => (
                  <div className="md:pr-10 w-full md:w-1/2">- {val}</div>
                ))}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold mt-3 pb-2 text-[teal] tracking-widest">
              Directions
            </div>
            {post &&
              post.directions &&
              post.directions.map((val, i) => (
                <div className="py-2 my-2">
                  <div className="bg-gray-100 p-5 text-justify">
                    <div className="text-lg md:text-xl pb-5 font-semibold tracking-widest">
                      <FaHandPointRight className="inline mr-5 text-xl" />
                      Step {i + 1}
                    </div>
                    <div className="text-sm md:text-base">{val}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SinglePost;
