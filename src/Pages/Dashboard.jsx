import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, InputBase, Box } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import ServiceSwiper from './ServiceSwiper';
import nftLogo from '../assets/nftlogo.png'; // Import the image


const Hero = () => {
  return (
    <>
    <div className="bg-black min-h-screen flex flex-col text-white text-center p-2">
      <AppBar position="static"   style={{  background:" rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  boxShadow:" 0 4px 6px rgba(0, 0, 0, 0.1)"}}  className=" shadow-none rounded">
        <Toolbar className="flex justify-between">
          <Box className="flex items-center space-x-2">
            {/* <img src="/path-to-your-logo.png" alt="Logo" className="h-10 w-10" /> */}
            <Typography variant="h6" className="font-bold">Company Name</Typography>
          </Box>
          <Box className="flex items-center space-x-2">
            <InputBase
              placeholder="Search..."
              startAdornment={<SearchIcon className="text-white" />}
              className="bg-white text-black rounded-full px-3 py-1"
            />
          </Box>
        </Toolbar>
      </AppBar>

      <div className="flex flex-col justify-center items-center flex-grow">
        <div className="max-w-4xl mt-12 px-4 md:px-0">
        <div className='rounded' style={{ backgroundImage: `url(${nftLogo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">A great company has a great team behind</h3>
          <p className="text-base md:text-lg mb-8">
            Lorem ipsum dolor sit amet consectetur adipiscing elit mattis sit
            phasellus mollis sit aliquam sit nullam neque ultrices.
          </p>
          <Button variant="contained" color="primary" className="bg-white text-black rounded-full px-8 py-4">
            Join our team
          </Button>
          </div>
      
          <div className="flex flex-wrap justify-around mt-12 space-x-0 md:space-x-4">
            {[
              { number: '360+', text: 'Clients worldwide' },
              { number: '50+', text: 'Team members' },
              { number: '480+', text: 'Projects completed' },
              { number: '150M', text: 'Revenue generated' },
            ].map((stat, index) => (
              <div
                key={index}
                className="glass-card text-center p-4 rounded-lg transform transition-transform duration-300 hover:scale-105 mb-4 w-full md:w-auto"
              >
                <h2 className="text-xl md:text-2xl font-bold">{stat.number}</h2>
                <p className="text-sm md:text-base">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

<ServiceSwiper />
    </>
  );
};

export default Hero;
