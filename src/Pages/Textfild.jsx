import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

const FileInput = ({ label, onChange }) => {
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onChange(e);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleChange}
        style={{ display: 'none' }} // Hide the native file input
        id="file-input"
        accept=".csv, .xlsx"
      />
      <label htmlFor="file-input">
        <Button variant="contained" color="primary" component="span">
          {label}
        </Button>
      </label>
      {fileName && (
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          Selected File: {fileName}
        </Typography>
      )}
    </div>
  );
};

export default FileInput;
