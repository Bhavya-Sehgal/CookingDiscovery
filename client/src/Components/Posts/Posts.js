import React from "react";
import Post from "../Post/Post";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

function Posts({ posts, fullwidth }) {
  return (
    <div
      className={
        fullwidth
          ? `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 sm:pr-10 mb-5`
          : `grid grid-cols-1 xl:grid-cols-2 md:w-2/3 xl:w-3/4 flex-wrap overflow-y-scroll sm:pr-10 mb-5`
      }
    >
      {posts.map((p) => (
        <Post post={p} />
      ))}
      {!fullwidth && (
        <div className="my-5 m-2 sm:m-5 px-5 sm:px-10 py-4 sm:py-5">
          <Link to="/allposts">
            <button className="p-4 sm:px-8 sm:py-5 sm:text-xl bg-gray-200 hover:bg-gray-400 hover:text-white rounded-xl">
              View more <BsArrowRight className="inline ml-3 text-2xl" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Posts;
