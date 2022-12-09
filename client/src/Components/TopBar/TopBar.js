import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
import logo from "../../Images/navbar_logo.png";
import user_icon from "../../Images/user-profile.jpg";
import { mainUrl } from "../../config";

function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = `${mainUrl}/images/`;
  // const PF ="http://localhost:3001/images/";

  const handleLogout = (e) => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="bg-[#7F2121] text-white hidden sm:block w-100 sticky">
      <div className="container sm:flex top-0 items-center z-[999] h-28 md:px-10 pl-10 md:pr-5">
        <div className="flex-[3] justify-center items-center">
          {/* <i className="text-white mr-2.5 text-base sm:text-2xl cursor-pointer  fa-brands fa-facebook-square"></i>
          <i className="text-white mr-2.5 text-base sm:text-2xl cursor-pointer  fa-brands fa-twitter-square"></i>
          <i className="text-white mr-2.5 text-base sm:text-2xl cursor-pointer  fa-brands fa-instagram-square"></i> */}
          <img src={logo} alt="" className="" />
        </div>
        <div className="flex-[6]">
          <ul className="flex justify-end m-0 p-0 list-none">
            <li className="mr-1.25 cursor-pointer font-light text-lg md:text-xl">
              <Link to="/" className="p-2">
                Home
              </Link>
            </li>
            {/* <li className="mr-1.25 cursor-pointer font-light text-lg md:text-xl">
              <Link to="/" className="p-2">
                About
              </Link>
            </li> */}
            <li className="mr-1.25 cursor-pointer font-light text-lg md:text-xl">
              <Link to="/allposts" className="p-2">
                Explore
              </Link>
            </li>
            <li className="mr-1.25 cursor-pointer font-light text-lg md:text-xl">
              <Link to="/write" className="p-2">
                Write
              </Link>
            </li>
            <li
              onClick={handleLogout}
              className="mr-1.25 cursor-pointer font-light text-lg md:text-xl"
            >
              <span className="p-2">{user && "Logout"}</span>
            </li>
            <li>
              <div className="flex-[2] justify-center items-center">
                {user ? (
                  <Link to="/settings">
                    {user.profilePicture ? (
                      <img
                        className="w-8 h-8 lg:w-10 lg:h-10 object-cover rounded-[50%]"
                        src={PF + user.profilePicture}
                        alt=""
                      />
                    ) : (
                      <img
                        className="w-8 h-8 lg:w-10 lg:h-10 object-cover rounded-[50%]"
                        src={user_icon}
                        alt=""
                      />
                    )}
                  </Link>
                ) : (
                  <ul className="flex justify-center m-0 p-0 list-none">
                    <li className="mr-1.25 cursor-pointer font-light text-lg md:text-xl">
                      <Link className="p-2" to="/login">
                        Login / Register
                      </Link>
                    </li>
                    {/* <li className="mr-1.25 cursor-pointer font-light text-lg md:text-xl">
              <Link className="p-2" to="/register">
                Register
              </Link>
            </li> */}
                    {/* <li className="mr-1.25 cursor-pointer font-light text-lg md:text-xl">
                      <i className="text[#666] cursor-pointer text-lg ml-[15px] fa-solid fa-magnifying-glass"></i>
                    </li> */}
                  </ul>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
