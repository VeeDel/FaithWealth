import { Settings } from "@mui/icons-material";
import React from "react";

const Table = () => {
  const data = [
    { level: 1, team: 2 },
    { level: 2, team: 4 },
    { level: 3, team: 8 },
    { level: 4, team: 16 },
    { level: 5, team: 32 },
    { level: 6, team: 64 },
    { level: 7, team: 128 },
    { level: 8, team: 256 },
    { level: 9, team: 512 },
    { level: 10, team: 1024 },
  ];

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-3xl flex justify-between items-center font-semibold text-white mb-4">
        Team <Settings />
      </h2>
      <div className="overflow-x-auto rounded-sm">
        <table className="w-full border-collapse ">
          <thead>
            <tr className="bg-dimblack text-purple-400">
              <th className="py-2 px-4 border border-gray-600">Level</th>
              <th className="py-2 px-4 border border-gray-600">Team</th>
              <th className="py-2 px-4 border border-gray-600">View</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.level}
                className={index % 2 === 0 ? "bg-dimblack" : "bg-black"}
              >
                <td className="py-2 px-4 border border-gray-600 text-white text-center">
                  {item.level}
                </td>
                <td className="py-2 px-4 border border-gray-600 text-white text-center">
                  {item.team}
                </td>
                <td className="py-2 px-4 border border-gray-600 text-center">
                  <a href="#" className="text-purple-400">
                    view detail
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
