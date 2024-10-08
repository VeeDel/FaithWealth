import { Settings } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "../Context/AuthContext";

const Table = ({setNavigate}) => {
  const [levelData, setLevelData] = useState([]);
  const [userData, setUserData] = useState({});
  const [isDetailView, setIsDetailView] = useState(false);
  const {authToken} = useAuth()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://103.148.165.246:9000/api/auth/getmylevel",
          {
            headers: {
              Accept: "*/*",
              authtoken:authToken
            },
          }
        );
        const { levelCounts, team } = response.data;
        const levels = Object.entries(levelCounts).map(([key, value]) => ({
          level: key,
          team: value,
        }));
        console.log("Levels:", levels); // Debugging line
        setLevelData(levels);
        setUserData(team);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleViewDetail = (level) => {
    setIsDetailView(level);
  };

  const handleBackClick = () => {
    setIsDetailView(false); // Reset to the main view
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-3xl flex justify-between items-center font-semibold text-white mb-4">
        {isDetailView === false ? (
            <IconButton className="text-white" aria-label="white" onClick={()=>setNavigate("dashboard")}>
            <ArrowBackIcon className="text-white" />
          </IconButton>
        ) : (
          <IconButton className="text-white" aria-label="white" onClick={handleBackClick}>
            <ArrowBackIcon className="text-white" />
          </IconButton>
        )}
        {isDetailView === false ? "Team" : `Level ${isDetailView} Team`}
      </h2>
      {isDetailView === false ? (
        <div className="overflow-x-auto rounded-sm">
          <MuiTable className="w-full border-collapse">
            <thead>
              <tr className="bg-dimblack text-purple-400">
                <th className="py-2 px-4 border border-gray-600">Level</th>
                <th className="py-2 px-4 border border-gray-600">Team</th>
                <th className="py-2 px-4 border border-gray-600">View</th>
              </tr>
            </thead>
            <TableBody>
              {levelData.length > 0 ? (
                levelData.map((item, index) => (
                  <TableRow key={item.level} className={index % 2 === 0 ? "bg-black" : "bg-black"}>
                    <td className="py-2 px-4 border border-gray-600 text-white text-center">
                      {item.level}
                    </td>
                    <td className="py-2 px-4 border border-gray-600 text-white text-center">
                      {item.team}
                    </td>
                    <TableCell className="py-2 px-4 border border-gray-600 text-center">
                      <a
                        href="#"
                        className="text-purple-400"
                        onClick={() => handleViewDetail(item.level)}
                      >
                        View detail
                      </a>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-white">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </MuiTable>
        </div>
      ) : (
        <TableContainer component={Paper} className="bg-black-600 text-white">
          <MuiTable>
            <thead>
              <tr className="bg-dimblack text-purple-400">
                <th className="py-2 px-4 border border-gray-600">#</th>
                <th className="py-2 px-4 border border-gray-600">User ID</th>
                <th className="py-2 px-4 border border-gray-600">Name</th>
                <th className="py-2 px-4 border border-gray-600 text-nowrap">Sponsor ID</th>
                <th className="py-2 px-4 border border-gray-600 text-nowrap">Sponsor Name</th>
                <th className="py-2 px-4 border border-gray-600 text-nowrap">Level</th>
                <th className="py-2 px-4 border border-gray-600 text-nowrap">Register Date</th>
              </tr>
            </thead>
            <TableBody>
              {userData[isDetailView].map((row, index) => (
                <TableRow key={index} className="bg-black text-purple-400">
                  <td className="py-2 px-4 border border-gray-600 text-purple-400 text-center">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border border-gray-600 text-purple-400 text-center">
                    {row.userId}
                  </td>
                  <td className="text-nowrap py-2 px-4 border border-gray-600 text-purple-400 text-center">
                    {row.name}
                  </td>
                  <td className="py-2 px-4 border border-gray-600 text-purple-400 text-center">
                    {row.Sponsor_id}
                  </td>
                  <td className="py-2 px-4 border border-gray-600 text-purple-400 text-center">
                    {row.Sponsor_Name}
                  </td>
                  <td className="py-2 px-4 border border-gray-600 text-purple-400 text-center">
                    {row.level}
                  </td>
                  <td className="py-2 px-4 border border-gray-600 text-purple-400 text-center">
                    {new Date(row.Register_date).toLocaleDateString()}
                  </td>
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
      )}
    </div>
  );
};

export default Table;
