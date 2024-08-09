import { Box, Typography, Avatar, IconButton, Paper, Card, CardContent } from "@mui/material";
import PropTypes from "prop-types";

const PageContent = ({ className = "" }) => {
  return (
    <>
    <Box
      className={`flex flex-row items-start mt-5 justify-start py-0 pl-5 pr-6 box-border max-w-full text-left ${className}`}
    >
      <Box className="flex-1 flex flex-col items-end justify-start gap-1 max-w-full">
        <Box className="flex flex-row items-start justify-between gap-5 w-full">
          <Box className="flex flex-col items-start justify-start gap-5">
            <Box className="flex flex-row items-center gap-1">
              <Avatar
                alt="Profile Image"
                src="/unsplashpata8xe-ivm@2x.png"
                sx={{ width: 48, height: 48 }}
              />
              <Box className="flex flex-col items-start justify-start">
                <Paper
                  elevation={3}
                  className="flex flex-row items-center gap-1 rounded-full px-2 py-1 bg-gray-200"
                >
                  <Avatar
                    alt="Ethereum Logo"
                    src="/logo--24--ethereum.svg"
                    sx={{ width: 24, height: 24 }}
                  />
                  <Typography variant="body2" fontWeight="medium">
                    Level 10
                  </Typography>
                </Paper>
              </Box>
            </Box>
            <Typography variant="h2" className="font-kalam">
              <b>What is</b> <b className="font-k2d">FaithWealth?</b>
            </Typography>
          </Box>
          <IconButton>
            <img
              src="/settings3line.svg"
              alt="Settings"
              className="w-6 h-6"
            />
          </IconButton>
        </Box>
        <div className="flex items-center justify-center bg-black mb-5  ">
      <Card className="max-w-sm border-r-2 p-1 overflow-hidden shadow-lg bg-black text-white">
        <img
          className="w-full rounded bg-black"
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
    <Typography variant="h2" className="font-kalam">
            <b> NFT is</b> <b className="font-k2d"> Upcoming?</b>
            </Typography>
            <div className="flex items-center justify-center bg-black mb-5 ">
      <Card className="max-w-sm border-r-2 p-1 mb-16 overflow-hidden shadow-lg bg-black text-white">
        <img
          className=" rounded bg-black"
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
