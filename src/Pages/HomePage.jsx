import React, { useState } from "react";
import Navigation from "../Components/Navigation";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import Table from "./Table";
import bglogo from "../assets/bgline.png";
import Transacation from "./Transacation";
import ProtectedForNotLogin from "../Context/ProtectedForNotLogin";
const HomePage = () => {
  const [navigate, setNavigate] = useState("dashboard");

  let content;

  switch (navigate) {
    case "profile":
      content =<ProtectedForNotLogin redirectTo ='/login' >
       <Profile />
      </ProtectedForNotLogin> ;
      break;
    case "dashboard":
      content = <Dashboard />;
      break;
      case "transacation":
        content = <ProtectedForNotLogin redirectTo ='/login' ><Transacation /></ProtectedForNotLogin>;
        break;
    case "table":
      content = <ProtectedForNotLogin redirectTo ='/login' ><Table setNavigate={setNavigate} /></ProtectedForNotLogin>;
      break;
  }
  return (
    <div className="">
      {/* <img className=" absolute" src={bglogo} />
      <img className=" absolute" src={bglogo} />
      <img className=" absolute" src={bglogo} /> */}

      <div className="px-4 mb-6">{content} </div>
      <Navigation navigate={navigate} setNavigate={setNavigate} />
    </div>
  );
};

export default HomePage;
