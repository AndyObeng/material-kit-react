import React from 'react';
import { Dialog, DialogContent, CircularProgress, Typography, Box } from '@mui/material';

const ProgressDialog = ({ open, message }) => {
  return (
    <Dialog
      open={open}
      // Prevents closing the dialog by clicking the backdrop or pressing the Escape key
      disableEscapeKeyDown={true}
      // Optional: removes the backdrop for a cleaner "loading spinner" feel,
      // but a backdrop is usually preferred to disable interaction with the rest of the app
      // BackdropProps={{ invisible: true }}
      aria-labelledby="loading-dialog-title"
    >
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={2}>
          {/* Use CircularProgress for an unspecified wait time (spinner) */}
          <CircularProgress color="primary" />
          {message && (
            <Typography id="loading-dialog-title" variant="subtitle1" style={{ marginTop: 16 }}>
              {message}
            </Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProgressDialog;
