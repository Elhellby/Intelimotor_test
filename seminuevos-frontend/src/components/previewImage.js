import React from 'react';
import { Dialog, DialogContent } from '@mui/material';

const PreviewImage = ({ open, onClose, imageBase64 }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      slotProps={{
        paper: {
          sx: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            boxShadow: 'none'
          }
        }
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <img
          src={`data:image/png;base64,${imageBase64}`}
          alt="Vista previa"
          style={{
            width: '550px',
            height: '550px',
            objectFit: 'contain'
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PreviewImage;
