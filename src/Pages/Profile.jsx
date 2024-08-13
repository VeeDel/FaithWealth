import nft0 from "../assets/nft0.jpg";
import nft1 from "../assets/nft1.png";
import nft2 from "../assets/nft2.png";
import nft3 from "../assets/nft3.png";
import nft4 from "../assets/nft4.png";
import nft5 from "../assets/nft5.png";
import nft6 from "../assets/nft8.png";
import nft7 from "../assets/nft7.png";
import nft8 from "../assets/nft6.png";
import nft9 from "../assets/nft9.png";

import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import LinearProgress from "@mui/material/LinearProgress";
import { useAuth } from "../Context/AuthContext";
import LevelUpgradeModel from "../Components/LevelUpgradeModel";

const Profile = () => {
  const { userData } = useAuth();
  console.log(userData);
  const id = userData?.user_id;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        setTransition(() => SlideTransition);
        setSnackbarOpen(true);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }
  // const imageNumber = userData?.phoneNo?.slice(9, 10);

  // const progressValue = 3000;

  return (
    <div>
      <div className="border-2 border-dimblack py-4 rounded-xl my-2 flex justify-evenly items-center">
        <div className="w-28 h-28 border-2 border-borderBlack  items-center flex justify-center rounded-full text-2xl font-semibold tracking-widest bg-dimblack  ">
          <img src={nft0} className="w-full h-full rounded-full " />{" "}
        </div>
        <div>
          <h2 className="text-sm font-semibold">Level {userData?.level}</h2>
          <h3 className="text-sm tracking-wider flex items-center gap-2">
            {id}
            <button onClick={handleCopy} className="text-[#666] cursor-pointer">
              <ContentCopyIcon fontSize="small" />
            </button>
          </h3>
        </div>
      </div>

      {/* Progress bar with label */}
      <div className="px-2 py-4 mx-1">
        <div className="flex justify-between">
          <h3 className="text-sm">Progress</h3>
          <span className="text-sm font-semibold">
            {userData && userData.total_earning}/3000
          </span>
        </div>
        <LinearProgress
          variant="determinate"
          value={(userData && userData.total_earning / 3000) * 100}
          sx={{
            height: 12,
            borderRadius: 6,
            marginTop: 1,
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#9B5DE5", // Bar color
            },
            backgroundColor: "#e0e0e0", // Background color of the track
          }}
        />

        {userData && userData.total_earning === 3000 && (
          <button className="bg-primary text-white border-[1px] border-primary font-semibold active:bg-[#5746d5] rounded-xl h-full w-full mt-4 p-2">
            Claim Money
          </button>
        )}
      </div>

      <div className="block bg-dimblack px-2 py-4 mx-1 text-lg border-b-2 border-borderBlack">
        <h3 className="text-sm">Your Name</h3>
        {userData?.name}
      </div>
      <div className="block px-2 py-4 mx-1 text-lg border-b-2 border-borderBlack">
        <h3 className="text-sm">Phone Number</h3>
        {userData?.phoneNo}
      </div>
      <div className="block bg-dimblack px-2 py-4 mx-1 text-md border-b-2 border-borderBlack">
        <h3 className="text-sm">Email</h3>
        {userData?.email}
      </div>
      <div className="block px-2 py-4 mx-1 text-lg border-b-2 border-borderBlack">
        <h3 className="text-sm">Sponsor Name</h3>
        {userData?.Sponsor_Name}
      </div>
      <div className="block bg-dimblack px-2 py-4 mx-1 text-lg border-b-2 border-borderBlack">
        <h3 className="text-sm">Sponsor ID</h3>
        {userData?.Sponsor_id}
      </div>
      <div className="block px-2 py-4 mx-1 text-[10px] border-b-2 border-borderBlack">
        <h3 className="text-sm">PayId Address</h3>
        {userData?.PayId}
      </div>

      <div className="flex gap-2">
        <button className="bg-primary text-white border-[1px] border-primary font-semibold active:bg-[#5746d5] rounded-xl h-full w-full mt-4 mb-16 p-2">
          <LevelUpgradeModel />
        </button>
      </div>

      {/* Snackbar for copy confirmation */}
      <Snackbar
        open={snackbarOpen}
        onClose={handleClose}
        TransitionComponent={transition}
        message="ID copied to clipboard!"
        key={transition ? transition.name : ""}
        autoHideDuration={3000}
      />
    </div>
  );
};

export default Profile;
