import React, { useState } from 'react';
import { Container, Typography, Alert } from '@mui/material';
import FileUploader from '../components/FileUploader';
import InstructionInput from '../components/InstructionInput';
import ResultTable from '../components/ResultTable';
import DownloadButton from '../components/DownloadButton';
import { uploadFile, processData } from '../services/api';

const RegexPage = () => {
  const [tableData, setTableData] = useState([]);
  const [regex, setRegex] = useState('');
  const [error, setError] = useState('');

  const handleFileUpload = async (file) => {
    try {
      const data = await uploadFile(file);
      setTableData(data);
      setError('');
    } catch (err) {
      setError('File upload failed.');
    }
  };

  const handleProcess = async (instruction, replacement) => {
    if (!instruction || !replacement || tableData.length === 0) {
      setError('Missing input or data.');
      return;
    }
    try {
      const response = await processData(instruction, replacement, tableData);
      setTableData(response.data);
      setRegex(response.regex);
      setError('');
    } catch (err) {
      setError('Pattern replacement failed.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Regex Pattern Replacer
      </Typography>
      <FileUploader onUpload={handleFileUpload} />
      <InstructionInput onProcess={handleProcess} />
      {regex && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Recognized Regex:</strong>{' '}
          <code style={{ background: '#eee', padding: '4px 6px', borderRadius: '4px' }}>{regex}</code>
        </Typography>
      )}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <ResultTable data={tableData} />
      {tableData.length > 0 && <DownloadButton data={tableData} />}
    </Container>
  );
};

export default RegexPage;
