import React from "react";
import connectmetamasImage from "../assets/connectMetaMask.png";
import { useAuth } from "../Context/AuthContext";

const ConnectMetaMaskPage = () => {
  const { connectMetaMask } = useAuth();
  return (
    <div className="mx-4">
      <div className="flex flex-col justify-around  h-screen">
        <div className="flex items-center justify-center">
          <img src={connectmetamasImage} />
        </div>
        <div>
          <h3 className="text-3xl font-bold">
            Connect Your Account With MetaMask,
          </h3>
          <p className="text-gray-400">
            Authorize the connection in the MetaMask
          </p>
          <button
            onClick={connectMetaMask}
            className="bg-primary text-white font-semibold text-lg w-full p-4 rounded-lg my-4 "
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectMetaMaskPage;
