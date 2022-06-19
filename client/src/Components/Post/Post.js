import React from "react";
import { Link } from "react-router-dom";
import postImg from "../../Images/post_img.jpg";

function Post({ post }) {
  const PF = "http://localhost:3001/images/";
  console.log(post.cuisine);
  return (
    <Link to={`/post/${post._id}`}>
      <div className="pt-10 md:pt-20 w-full sm:mx-[25px] mb-[40px] px-10">
        <div className="w-full mx-auto">
          {post.photo && (
            <img
              className="object-cover w-full h-80 rounded-2xl"
              src={PF + post.photo}
              alt=""
            />
          )}
          {/* {!post.photo && (
            <img
              className="object-cover w-full rounded-2xl"
              src={postImg}
              alt=""
            />
          )} */}
        </div>
        <div className="flex flex-col">
          {/* <div className="sm:text-xl mt-2 sm:mt-4 cursor-pointer">
            <div className=" text-[#be9656] leading-5">
              {post.cuisine && post.cuisine.name}
            </div>
          </div> */}
          <div>
            <div className="mt-2 font-bold cursor-pointer sm:text-xl sm:text-2xl">
              <span className="">{post.title} </span> |{" "}
              <span className=" text-[#be9656] leading-5">
                {post.cuisine && post.cuisine.name}
              </span>
            </div>
          </div>
          <div className="sm:text-xl text-gray-400 italic">
            {new Date(post.createdAt).toDateString()}
          </div>
        </div>
        <p
          className="leading-5 text-sm sm:text-lg mt-2 text-justify sm:mt-4 text-gray-600 text-ellipsis overflow-hidden "
          style={{
            display: "-webkit-box",
            "-webkit-line-clamp": "4",
            "-webkit-box-orient": "vertical",
          }}
        >
          {post.desc}
        </p>
      </div>
    </Link>
  );
}

export default Post;
