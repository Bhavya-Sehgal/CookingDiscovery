import React from "react";
import HeaderImg from "../../Images/header_bg.webp";

function Header() {
  return (
    <div className="header">
      <div
        className="h-[510px] sm:h-[700px] opacity-95 bg-center bg-no-repeat bg-cover mb-1"
        style={{
          backgroundImage: `url(${HeaderImg})`,
        }}
      >
        <div className="text-center sm:w-1/2 w-3/4 mx-auto sm:mx-0 sm:pt-[250px] pt-[200px]">
          <div className="backdrop-blur-xl bg-black/30 py-8 sm:ml-5 lg:ml-8">
            <div className="font-bold text-sm sm:text-xl md:text-2xl text-gray-100 tracking-widest mb-2">
              Welcome to Cooking Discovery!
            </div>
            <div className="font-bold text-sm sm:text-xl md:text-2xl text-gray-100 tracking-widest">
              COOK | EAT | SHARE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
