import React, { useState } from "react";
import Navigation from "../Components/Navigation";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import Table from "./Table";
import bglogo from "../assets/bgline.png";
import Transacation from "./Transacation";
const HomePage = () => {
  const [navigate, setNavigate] = useState("dashboard");

  let content;

  switch (navigate) {
    case "profile":
      content = <Profile />;
      break;
    case "dashboard":
      content = <Dashboard />;
      break;
      case "transacation":
        content = <Transacation />;
        break;
    case "table":
      content = <Table setNavigate={setNavigate} />;
      break;
  }
  return (
    <div className="">
      {/* <img className=" absolute" src={bglogo} />
      <img className=" absolute" src={bglogo} />
      <img className=" absolute" src={bglogo} /> */}

      <div className="px-4">{content} </div>
      <Navigation navigate={navigate} setNavigate={setNavigate} />
    </div>
  );
};

export default HomePage;
