import React, { useState } from "react";
import profilewhite from "../assets/profilewhite.svg";
import profileColored from "../assets/profileColored.svg";
import tablecolored from "../assets/tableColored.svg";
import tablewhite from "../assets/tablewhite.svg";
import DashboardColored from "../assets/DashboardColored.svg";
import Dashboardwhite from "../assets/dashboardwhite.svg";
const Navigation = ({ navigate, setNavigate }) => {
  const handleNavigation = (navigation) => {
    setNavigate(navigation);
  };

  console.log(navigate);
  return (
    <div className="fixed  bottom-0 right-0 w-full flex  justify-between items-center py-4 px-8 bg-dimblack border-t-2 border-borderBlack text-white ">
      <div onClick={() => handleNavigation("dashboard")}>
        {navigate === "dashboard" ? (
          <img src={DashboardColored} alt="dashboard" />
        ) : (
          <img src={Dashboardwhite} alt="dashboard" />
        )}
      </div>
      <div className="" onClick={() => handleNavigation("table")}>
        {navigate === "table" ? (
          <img src={tablecolored} alt="table" />
        ) : (
          <img src={tablewhite} alt="table" />
        )}
      </div>
      <div onClick={() => handleNavigation("profile")}>
        {navigate === "profile" ? (
          <img src={profileColored} alt="profile" />
        ) : (
          <img src={profilewhite} alt="profile" />
        )}
      </div>
    </div>
  );
};

export default Navigation;
