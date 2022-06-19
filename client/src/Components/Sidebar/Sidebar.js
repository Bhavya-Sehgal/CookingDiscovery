import React, { useEffect, useState } from "react";
import logo from "../../Images/about_logo.png";
import axios from "axios";
import { Link } from "react-router-dom";

function Sidebar() {
  const [cuisines, setCuisine] = useState([]);

  useEffect(() => {
    const getCuisine = async () => {
      try {
        const res = await axios.get("/api/cuisine/");
        console.log(res);
        setCuisine(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCuisine();
  }, []);

  return (
    <div className="hidden sm:w-2/5 md:w-1/3 xl:w-1/4 md:flex mx-4 rounded-lg bg-gray-100 px-5 items-center flex-col">
      <div className="flex items-center flex-col">
        <div className="mx-4 my-5 py-3 px-1 text-xl text-[#222] text-center font-thin">
          ABOUT ME
        </div>
        <img className="mt-6 w-[200px]" src={logo} alt="" />
        <p className="py-8 px-4 text-justify">
          One cannot think well, love well, sleep well if one has not dined
          well.
        </p>
      </div>
      <div className="flex items-center flex-col">
        <span className="mx-4 my-5 py-3 px-1 text-xl text-[#222] text-center font-thin">
          CUISINE
        </span>
        <ul className="list-none mb-10 text-center">
          {cuisines.map((c) => (
            <li className="inline-block w-[50%] cursor-pointer mt-4">
              <Link to={`/allposts/?cuisine=${c._id}`}>{c.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center flex-col">
        <span className="my-5 mx-4 py-3 px-1 text-xl text-[#222] text-center leading-4 font-thin">
          FOLLOW US
        </span>
        <div className="flex items-center justify-center mt-4 w-1/4 mb-5">
          <i className="text-3xl cursor-pointer ml-5 fa-brands fa-facebook-square"></i>
          <i className="text-3xl cursor-pointer ml-5 fa-brands fa-twitter-square"></i>
          <a href="https://www.instagram.com/part_time.foodie/">
            <i className="text-3xl cursor-pointer ml-5 fa-brands fa-instagram-square"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
