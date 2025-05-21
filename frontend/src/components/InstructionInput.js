import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const InstructionInput = ({ onProcess }) => {
  const [instruction, setInstruction] = useState('');
  const [replacement, setReplacement] = useState('');

  const handleSubmit = () => {
    onProcess(instruction, replacement);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <TextField
        fullWidth
        label="Natural Language Instruction"
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
        placeholder="e.g. Find email addresses"
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        label="Replacement Text"
        value={replacement}
        onChange={(e) => setReplacement(e.target.value)}
        placeholder="e.g. REDACTED"
        sx={{ mt: 2 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Process Pattern Replacement
        </Button>
      </Box>
    </Box>
  );
};

export default InstructionInput;
