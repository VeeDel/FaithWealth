import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';

const RegistrationModal = ({ modal, toggle ,userCredentials}) => {
  const navigate = useNavigate();

  return (
    <Dialog    open={modal} onClose={toggle} fullWidth maxWidth="sm">
      <DialogTitle  style={{backgroundColor:"black",   border: '1px solid #9B5DE5',}}   className='text-primary' sx={{ textAlign: 'center' }}>
        Membership Status Success
      </DialogTitle>
      <DialogContent style={{backgroundColor:"black", border: '1px solid #9B5DE5'}}  dividers>
        <Box textAlign="center" style={{backgroundColor:"black"}} className='text-white ' mb={4}>
          <Typography variant="body1" gutterBottom>
            Thanks for registering to become a member of{' '}
            <span className='text-primary'>Faith Wealth </span>
          </Typography>
          <Box mb={4}>
            <Typography className='text-white' variant="body2">User Id</Typography>
            <Typography variant="h6"> {userCredentials.userId}</Typography>
          </Box>
          <Box mb={4}>
            <Typography variant="body2">Password</Typography>
            <Typography variant="h6">{userCredentials.password}</Typography>
          </Box>
          <Box mb={4}>
            <svg
              className="mx-auto h-10 w-10 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              
              style={{ height: 40, width: 40, margin: 'auto' }}
            >
              <circle cx="12" cy="12" r="10" strokeWidth="4" />
            </svg>
            <Typography variant="h5"  className='text-primary' sx={{ fontWeight: 'bold' }}>
              Registration Successful
            </Typography>

            <Typography variant="body1" gutterBottom>
         Plz Take ScreenShot {' '}
            <span  className='text-primary'>Save Your id and Password</span>
          </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions style={{backgroundColor:"black", border: '1px solid #9B5DE5'}} >
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate('/login')}
          sx={{ backgroundColor: '#9B5DE5', '&:hover': { backgroundColor: '#9B5DE1' } }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={toggle}
          sx={{ backgroundColor: '#9B5DE5', '&:hover': { backgroundColor: '#9B5DE1' } }}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegistrationModal;
