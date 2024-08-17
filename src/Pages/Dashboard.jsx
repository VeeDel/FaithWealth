import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import PropTypes from "prop-types";

const Header = () => {
  return (
    <Box style={{
      backgroundColor: "#000",  // Black background
      color: "#fff",            // White text
      borderColor: "#9B5DE5",   // Purple border color
      borderBottomWidth: 2,           // Border width
      borderStyle: "solid",     // Border style
    }} className="flex items-center justify-between w-full p-3 mt-1 bg-gray-900">
     <Box
  style={{
    backgroundColor: "#9B5DE5", // Purple background
    width: "48px",              // Set width
    height: "48px",             // Set height to make it a circle
    borderRadius: "50%",        // Make it a circle
    padding: "8px",             // Adjust padding as needed
  }}
  className="flex items-center justify-center mt-1"
>
  <img 
    src="/Vectorchain.png" // Replace with your logo image URL
    alt="Logo"
    className="h-5" // Adjust the height of the logo as needed
  />
</Box>

      <Typography variant="h6" className="text-white">
        FaithWealth
      </Typography>
    </Box>
  );
};

const PageContent = ({ className = "" }) => {
  return (
    <>
     <Header />
    <Box
      className={`flex flex-col items-center mt-5 py-0 px-6 max-w-full ${className}`}
    >
     
      <Box className="flex flex-col items-center justify-start gap-5 max-w-full w-full mt-4">
        <Box className="flex flex-col items-center justify-center gap-5">
          <Typography variant="h4" className="font-kalam mb-3 text-center">
            <b>What is</b> <b className="font-k2d">FaithWealth?</b>
          </Typography>
        </Box>

        <div className="flex items-center justify-center mb-5">
          <Card
            className="max-w-sm p-1 overflow-hidden shadow-lg"
            sx={{
              backgroundColor: "#000",  // Black background
              color: "#fff",            // White text
              borderColor: "#9B5DE5",   // Purple border color
              borderWidth: 2,           // Border width
              borderStyle: "solid",     // Border style
            }}
          >
            <img
              className="w-full rounded"
              src="rectangle-39395@2x.png" // Replace with your image URL
              alt="Crypto"
            />
            <CardContent>
              <Typography variant="body2" className="text-center">
                Faithwealth is a pioneering company in the cryptocurrency and blockchain industry. We specialize in creating innovative blockchain solutions and providing secure, decentralized platforms for digital transactions. Our mission is to empower individuals and businesses by harnessing the power of blockchain technology to achieve financial freedom and transparency.
              </Typography>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-center mb-5">
          <Typography variant="h4" className="font-kalam text-center">
            <b>NFT is Upcoming?</b>
          </Typography>
        </div>

        <div className="flex items-center justify-center mb-16">
          <Card
            className="max-w-sm p-1 overflow-hidden shadow-lg"
            sx={{
              backgroundColor: "#000",  // Black background
              color: "#fff",            // White text
              borderColor: "#9B5DE5",   // Purple border color
              borderWidth: 2,           // Border width
              borderStyle: "solid",     // Border style
            }}
          >
            <img
              className="w-full rounded"
              src="rectangle-39395-1@2x.png" // Replace with your image URL
              alt="Crypto"
            />
            <CardContent>
              <Typography variant="body2" className="text-center">
                We are thrilled to announce the upcoming launch of our exclusive NFT collection, designed to seamlessly integrate with our app and elevate your digital experience. These unique, limited-edition NFTs offer more than just ownership of digital art—they unlock special features, rewards, and personalized experiences within the app, allowing you to truly stand out in our community.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Box>
    </Box>
    </>
  );
};

PageContent.propTypes = {
  className: PropTypes.string,
};

export default PageContent;
