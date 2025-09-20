import React from 'react';
import { Modal, Box, IconButton, Typography, TextField, Grid } from '@mui/material';
import GridCloseIcon from '@mui/icons-material/Close'; 

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth:"60%",
  minHeight: "60%",
  maxHeight: "100%",
  bgcolor: '#F4FAFF',
  boxShadow: 10,
  borderRadius: '10px', 
  overFlowY: 'auto',
  overFlowX:'auto',
  p:3,
   
};

const titleStyle = {
  flex: 1,
  textAlign: 'center',
};

const CustomModal = ({ open, handleClose, title, children, icon }) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{
            position: 'absolute',
            right: -7,
            top: -7,
            backgroundColor: '#f2f2f2',
            color: "#174090",
           
            
          }}>
          <GridCloseIcon />
        </IconButton>
        <Grid sx={{textAlign:"center",color:"#174090"}}>
  {icon && React.cloneElement(icon, { style: { color:"#174090" } })}
</Grid>
        
        <Typography  style={{textAlign:"center",color:"#174090",fontSize:20}} >
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
};

export default  CustomModal
