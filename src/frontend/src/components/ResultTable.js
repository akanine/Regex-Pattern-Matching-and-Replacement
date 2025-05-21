import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

const ResultTable = ({ data }) => {
  if (!data.length) return null;
  return (
    <Paper elevation={3} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(data[0]).map((key) => (
              <TableCell key={key}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {Object.values(row).map((value, i) => (
                <TableCell key={i}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ResultTable;
