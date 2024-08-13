import React from "react";
import { Dashboard, TableChart, AccountCircle, AttachMoney } from "@mui/icons-material"; // Importing MUI icons
import { Box } from "@mui/material"; // MUI Box component for layout

const Navigation = ({ navigate, setNavigate }) => {
  const handleNavigation = (navigation) => {
    setNavigate(navigation);
  };

  return (
    <Box
      className="fixed bottom-0 right-0 w-full flex justify-between items-center py-4 px-8 bg-dimblack border-t-2 border-borderBlack text-white"
    >
      <Box onClick={() => handleNavigation("dashboard")}>
        <Dashboard
          style={{
            color: navigate === "dashboard" ? "#9B5DE5" : "#fff", // Purple-400 for active, white for inactive
            fontSize: 30, // Icon size
          }}
        />
      </Box>
      <Box onClick={() => handleNavigation("table")}>
        <TableChart
          style={{
            color: navigate === "table" ? "#9B5DE5" : "#fff", // Purple-400 for active, white for inactive
            fontSize: 30, // Icon size
          }}
        />
      </Box>
      <Box onClick={() => handleNavigation("transacation")}>
        <AttachMoney
          style={{
            color: navigate === "transacation" ? "#9B5DE5" : "#fff", // Purple-400 for active, white for inactive
            fontSize: 30, // Icon size
          }}
        />
      </Box>
      <Box onClick={() => handleNavigation("profile")}>
        <AccountCircle
          style={{
            color: navigate === "profile" ? "#9B5DE5" : "#fff", // Purple-400 for active, white for inactive
            fontSize: 30, // Icon size
          }}
        />
      </Box>
    </Box>
  );
};

export default Navigation;
