import React from 'react';
import { Button, Box } from '@mui/material';
import { unparse } from 'papaparse';

const DownloadButton = ({ data }) => {
  const handleDownloadCSV = () => {
    const csv = unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'processed_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="contained" color="success" onClick={handleDownloadCSV}>
        Download as CSV
      </Button>
    </Box>
  );
};

export default DownloadButton;
