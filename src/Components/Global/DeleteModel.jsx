import React from 'react';
import { Modal, Box, IconButton, Typography,  Grid } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
const styleDelete = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:"auto",
    height: "auto",
    bgcolor: '#fff4f4',
    boxShadow: 10,
    borderRadius: '10px', 
    p:3,
  };
  const DeleteModel = ({ open, handleClose, title, children, icon }) => {
    return (
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box sx={styleDelete} >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{
              position: 'absolute',
              right: -7,
              top: -7,
              backgroundColor: '#f9e5e4',
              color: "red",
            
              
            }}>
            <GridCloseIcon />
          </IconButton>
          <Grid >
    
  </Grid>
          <Typography  style={{textAlign:"center",color:"red",fontSize:18}} >
              <Grid  >
                {title}
              </Grid>
            
          </Typography>
          <Box>
            {children}
          </Box>
        </Box>
      </Modal>
    );
  }
  export default  DeleteModel