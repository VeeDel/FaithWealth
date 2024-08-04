import React from "react";
import bglogo from "../assets/bgline.png";
const Profile = () => {
  return (
    <div>
      <div className="flex gap-2">
        <button className="bg-primary text-white border-[1px] border-primary font-semibold active:bg-[#5746d5] rounded-xl h-full w-full my-4 p-2  ">
          Level upgrade
        </button>
        <button className="bg-black text-white border-[1px] rounded-xl h-full w-full font-semibold my-4 p-2">
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default Profile;
