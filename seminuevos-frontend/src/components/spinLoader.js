import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const SpinLoader = ({ isLoading, text }) => {
  if (!isLoading) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
        backdropFilter: 'blur(1px)',
        flexDirection: 'column'
      }}
    >
      <CircularProgress 
        size={90}
        thickness={4}
        sx={{
          color: '#3498db'
        }}
      />
      {
        text && (
          <Typography variant="body1" color="white" fontWeight="bold" mt={2}>
            {text}
          </Typography>
        )
      }
    </Box>
  );
};

export default SpinLoader;
