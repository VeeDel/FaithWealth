// src/components/ServiceSwiper.jsx
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Core Swiper styles
import 'swiper/css/navigation'; // Navigation module styles
import { Navigation } from 'swiper/modules'; // Importing Navigation from swiper/modules
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import swiper1 from '../assets/swipe1.png'; 
import swiper2 from '../assets/swipe2.png'; // Import the image
import swiper3 from '../assets/swipe3.png'; // Import the image
import swiper4 from '../assets/swipe4.png'; // Import the image

const services = [
  {
    title: 'Execution',
    description: 'Eget nibh cursus sit ut fames posuere dictum adipiscing enim commodo est duis aliquet diam.',
    icon: swiper4, // Replace with actual image URL
  },
  {
    title: 'Accountability',
    description: 'Eget nibh cursus sit ut fames posuere dictum adipiscing enim commodo est duis aliquet diam.',
    icon:swiper2, // Replace with actual image URL
  },
  {
    title: 'Growth',
    description: 'Eget nibh cursus sit ut fames posuere dictum adipiscing enim commodo est duis aliquet diam.',
    icon:swiper3, // Replace with actual image URL
  },
];

const ServiceSwiper = () => {
  return (
    <Box className="p-8 mb-10 bg-white relative" style={{ zIndex: 0 }}>
      <Box className="flex justify-center space-x-4">
      <Typography variant="h5" className="mb-5 text-center text-black relative z-0">
          High-impact social media marketing services
        </Typography>
        <IconButton
        size="small"
          className="swiper-button-prev absolute left-0 top-0 z-10"
          style={{ transform: 'translateY(-50%)', marginTop: '24px',  }}
        >
          {/* <ArrowBackIos /> */}
        </IconButton>
        
        <IconButton
        size="small"
          className="swiper-button-next absolute right-0 top-0 z-10"
          style={{ transform: 'translateY(-50%)', marginTop: '24px' }}
        >
          {/* <ArrowForwardIos /> */}
        </IconButton>
      </Box>
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 1,
          },
        }}
      >
        {services.map((service, index) => (
          <SwiperSlide key={index}>
            <Box className="bg-white p-6 rounded-xl shadow-md text-center">
              <img src={service.icon} alt={service.title} className="mx-auto mb-4" />
              <Typography className='text-black' variant="h6">{service.title}</Typography>
              <Typography className='text-black mt-2' variant="body2" >
                {service.description}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ServiceSwiper;
