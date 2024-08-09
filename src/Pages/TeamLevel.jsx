import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const data = [
  { id: 1, userId: 'BH63117028834', name: 'VIJENDRA JAIMAN' },
  { id: 2, userId: 'BH63117028834', name: 'VIJENDRA JAIMAN' },
  { id: 3, userId: 'BH63117028834', name: 'VIJENDRA JAIMAN' },
];

const TeamLevel = () => {
  return (
    <TableContainer component={Paper} className="bg-black text-white">
      <Table>
        <TableHead>
          <TableRow className="bg-gray-800">
            <TableCell className="text-purple-400">#</TableCell>
            <TableCell className="text-purple-400">User id</TableCell>
            <TableCell className="text-purple-400">Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} className="hover:bg-gray-700">
              <TableCell className="text-white">{row.id}</TableCell>
              <TableCell className="text-white">{row.userId}</TableCell>
              <TableCell className="text-white">{row.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamLevel;
