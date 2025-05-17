import React, { useState } from 'react';
import axios from 'axios';
import { unparse } from 'papaparse';
import {
  Container, Typography, TextField, Button, Table, TableHead,
  TableRow, TableCell, TableBody, Paper, Box, Alert
} from '@mui/material';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [naturalLanguage, setNaturalLanguage] = useState('');
  const [replacement, setReplacement] = useState('');
  const [regex, setRegex] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTableData(response.data.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to upload or process file.');
    }
  };

  const handleProcess = async () => {
    if (tableData.length === 0) {
      setError('No uploaded data to process.');
      return;
    }

    if (!naturalLanguage || !replacement) {
      setError('Please enter natural language and replacement value.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/process/', {
        instruction: naturalLanguage,
        replacement: replacement,
        data: tableData,
      });
      setTableData(response.data.data);
      setRegex(response.data.regex);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to process data.');
    }
  };

  const handleDownloadCSV = () => {
    if (tableData.length === 0) return;

    const csv = unparse(tableData);
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
  <Container maxWidth="md" sx={{ mt: 5 }}>
    <Typography variant="h4" align="center" sx={{ mb: 4 }}>
      Regex Pattern Replacer
    </Typography>

    {/* File upload */}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
    <Box sx={{ flexGrow: 1, maxWidth: 'calc(100% - 120px)' }}>
    <input
      type="file"
      accept=".csv,.xls,.xlsx"
      onChange={handleFileChange}
      style={{
        width: '100%',
        padding: '8px 12px',
      }}
    />
    </Box>
    <Button variant="contained" onClick={handleUpload} sx={{ ml: 2, minWidth: '100px' }}>
        Upload
    </Button>
    </Box>


    {/* instruction input */}
    <TextField
      fullWidth
      label="Natural Language Instruction"
      value={naturalLanguage}
      onChange={(e) => setNaturalLanguage(e.target.value)}
      placeholder="e.g. Find email addresses"
      sx={{ mt: 3 }}
    />

    {/* replacement input */}
    <TextField
      fullWidth
      label="Replacement Text"
      value={replacement}
      onChange={(e) => setReplacement(e.target.value)}
      placeholder="e.g. REDACTED"
      sx={{ mt: 2 }}
    />

    {/* Process button */}
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
      <Button variant="contained" color="primary" onClick={handleProcess}>
        Process Pattern Replacement
      </Button>
    </Box>

    {/* Regex */}
    {regex && (
      <Typography variant="body1" sx={{ mt: 2 }}>
        <strong>Recognized Regex:</strong>{' '}
        <code style={{ background: '#eee', padding: '4px 6px', borderRadius: '4px' }}>
          {regex}
        </code>
      </Typography>
    )}

    {/* error message */}
    {error && (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    )}

    {/* results table */}
    {tableData.length > 0 && (
      <Paper elevation={3} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(tableData[0]).map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                {Object.values(row).map((value, i) => (
                  <TableCell key={i}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )}

    {/* Download button */}
    {tableData.length > 0 && (
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="success" onClick={handleDownloadCSV}>
          Download as CSV
        </Button>
      </Box>
    )}
  </Container>
);



};

export default FileUpload;
