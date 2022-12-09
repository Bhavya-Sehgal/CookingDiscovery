import React, { useContext, useState } from "react";
import { RiMenuFill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import logo from "../../Images/about_logo.png";
import { Context } from "../../Context/Context";
import user_icon from "../../Images/user_icon.webp";
import { mainUrl } from "../../config";

function SideNavbar() {
  const [show, setshow] = useState(false);
  const { user, dispatch } = useContext(Context);
  // const PF = "http://localhost:3001/images/";
  const PF = `${mainUrl}/images/`;

  const handleLogout = (e) => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      {!show && (
        <RiMenuFill
          className="sm:hidden fixed text-2xl z-40 m-10 right-0 text-gray-200"
          onClick={() => setshow(true)}
        />
      )}

      {show && (
        <div className="right-0 fixed w-[200px] pl-6 h-full bg-gray-200  z-20 shadow-2xl">
          <AiOutlineClose
            className="fixed text-2xl z-40 m-10 ml-auto text-gray-800"
            onClick={() => setshow(false)}
          />
          <div className="text-center flex flex-col pt-20 pl-4">
            <div className="pb-3 mr-10 cursor-pointer font-light text-md md:text-xl">
              <img src={logo} alt="" className="rounded-full" />
            </div>
            <div className="pt-3 mr-10 cursor-pointer font-light text-md md:text-xl">
              <Link to="/" className="p-2">
                HOME
              </Link>
            </div>
            {/* <div className="pt-3 mr-10 cursor-pointer font-light text-md md:text-xl">
              <Link to="/" className="p-2">
                ABOUT
              </Link>
            </div> */}
            <div className="pt-3 mr-10 cursor-pointer font-light text-md md:text-xl">
              <Link to="/allposts" className="p-2">
                EXPLORE
              </Link>
            </div>
            <div className="pt-3 mr-10 cursor-pointer font-light text-md md:text-xl">
              <Link to="/write" className="p-2">
                WRITE
              </Link>
            </div>

            <div className="pt-3 mr-6 font-light">
              <hr className="h-1 bg-slate-300" />
            </div>
          </div>
          {user ? (
            <div className="text-center flex flex-col pt-4 pl-4 mr-10">
              <div className="pt-3 mx-auto cursor-pointer font-light text-md md:text-xl">
                <Link to="/settings">
                  {user.profilePicture ? (
                    <img
                      className="w-[80px] "
                      src={PF + user.profilePicture}
                      alt=""
                    />
                  ) : (
                    <img className="w-[40px] " src={user_icon} alt="" />
                  )}
                </Link>
              </div>
              <div
                onClick={handleLogout}
                className="pt-3 cursor-pointer font-light text-md md:text-xl"
              >
                <span className="p-2">{user && "LOGOUT"}</span>
              </div>
              <div className="pt-3 cursor-pointer font-light text-md md:text-xl">
                <Link to="/settings">
                  <span className="p-2">{user && "SETTINGS"}</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center flex flex-col pt-4 pl-4">
              <div className="pt-3 mr-10 cursor-pointer font-light text-md md:text-xl">
                <Link to="/login" className="p-2">
                  LOGIN / REGISTER
                </Link>
              </div>
              {/* <div className="pt-3 mr-10 cursor-pointer font-light text-md md:text-xl">
                <Link to="/register" className="p-2">
                  REGISTER
                </Link>
              </div> */}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default SideNavbar;
