import React from "react";
import logo from "../assets/logo.png";

const LogoLoading = () => {
  return (
    <div className="flex flex-col mt-[90%] items-center justify-center gap-4">
      <div className="flex items-center gap-4 justify-center">
        <img className="w-12" src={logo} alt="logo" />
        <h2 className="text-2xl font-bold">CoinChain</h2>
      </div>
      {/* <div className="w-[200px] bg-gray-200 rounded-full h-1 dark:bg-[#131313]">
        <div
          className="bg-[#a020f0] h-1 rounded-full"
          style={{ width: " 70%" }}
        ></div>
      </div> */}
    </div>
  );
};

export default LogoLoading;
