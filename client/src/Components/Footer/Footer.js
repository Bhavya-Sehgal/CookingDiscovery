import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
import logo from "../../Images/footer_logo.png";

function Footer() {
  const { user } = useContext(Context);
  return (
    <div className="bg-[#290A0A] px-5 md:px-20 text-white text-center absolute w-[100%]">
      <div className="pt-8 tracking-widest text-sm sm:text-lg md:text-xl font-semibold">
        One cannot think well, love well, sleep well if one has not dined well.
      </div>
      <div className="justify-center md:justify-around my-2 md:mx-5 py-2 md:py-6 pt-3 sm:flex flex-wrap items-center">
        <div className="mx-auto w-2/3 md:w-1/3 md:mx-2 lg:mx-0 lg:w-1/4 border-b-2 lg:border-0 pb-10 lg:pb-0 border-gray-400">
          <img
            src={logo}
            className="max-w-[150px] max-w-xl-[200px] mx-auto xs:rounded-full"
            alt=""
          />
        </div>
        <div className="mx-auto w-2/3 md:w-1/3 md:mx-2 lg:mx-0 lg:w-1/4 border-b-2 pb-8 lg:pb-0 lg:border-x-2 lg:border-b-0 border-gray-400">
          <div className="text-base pt-5 md:pt-0 md:text-lg pb-4 tracking-widest font-semibold">
            Cooking Delivery
          </div>
          <div className="py-2 md:pt-3 text-xs md:text-sm text-gray-300">
            <Link to="/">Home</Link>
          </div>
          <div className="py-2 md:pt-3 text-xs md:text-sm text-gray-300">
            <Link to="/">About</Link>
          </div>
          {!user && (
            <div className="py-2 md:pt-3 text-xs md:text-sm text-gray-300">
              <Link to="/login">Login / Register</Link>
            </div>
          )}
          {user && (
            <div className="py-2 md:pt-3 text-xs md:text-sm text-gray-300">
              <Link to="/settings">Your Profile</Link>
            </div>
          )}
        </div>
        <div className="border-b-2 md:border-b-0 pb-8 md:pb-0 mx-auto w-2/3 md:w-1/3 md:mx-2 lg:mx-0 lg:w-1/4 pt-5 md:pt-10 lg:pt-0 lg:border-r-2 border-gray-400">
          <div className="text-base md:text-lg pb-4 tracking-widest font-semibold">
            <Link to="/allposts">Explore</Link>
          </div>
          <div className="py-2 md:pt-3 text-xs md:text-sm text-gray-300">
            <Link to="/allposts">Recipes</Link>
          </div>
          <div className="py-2 md:pt-3 text-xs md:text-sm text-gray-300">
            <Link to="/allposts">Cuisines</Link>
          </div>
          <div className="py-2 md:pt-3 text-xs md:text-sm text-gray-300">
            <Link to="/allposts">My feed</Link>
          </div>
        </div>
        <div className="mx-auto w-2/3 md:w-1/3 md:mx-2 lg:mx-0 lg:w-1/4 pt-5 md:pt-10 lg:pt-0">
          <div className="text-base md:text-lg pb-4 tracking-widest font-semibold">
            Connect
          </div>
          <div className="py-2 md:pt-3 text-xs md:text-sm text-gray-300">
            Facebook
          </div>
          <div className="py-2 md:pt-3 text-xs md:text-sm text-gray-300">
            <a href="https://www.instagram.com/part_time.foodie/">Instagram</a>
          </div>
          <div className="py-2 md:pt-3 text-xs md:text-sm text-gray-300">
            Twitter
          </div>
        </div>
      </div>
      <div className="pb-10">
        <div className="mt-4">Thankyou for visiting &#9829;</div>
        <div className="mt-2">Copyright &#169; 2022 Bhavya Sehgal</div>
      </div>
    </div>
  );
}

export default Footer;
