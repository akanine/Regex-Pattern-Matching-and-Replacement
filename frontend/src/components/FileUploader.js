import React, { useRef, useState } from 'react';
import { Box, Button } from '@mui/material';

const FileUploader = ({ onUpload }) => {
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file || null);
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ flexGrow: 1, maxWidth: 'calc(100% - 120px)' }}>
        <input
          type="file"
          accept=".csv,.xls,.xlsx"
          onChange={handleFileChange}
          style={{
            width: '100%',
            padding: '8px 12px',
            borderRadius: '4px'
          }}
        />
      </Box>
      <Button
        variant="contained"
        onClick={handleUploadClick}
        sx={{ ml: 2, minWidth: '100px' }}
        disabled={!selectedFile} 
      >
        Upload
      </Button>
    </Box>
  );
};

export default FileUploader;
