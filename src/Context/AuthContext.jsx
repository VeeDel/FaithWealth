import { Alert, Snackbar } from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";
import { BASEURL } from "../services/http-Pos";
// import { Navigate } from "react-router-dom";
import { ethers } from "ethers";

import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
const AuthContext = createContext(null);

const BASE_URL = BASEURL.ENDPOINT_URL;

const AuthProvider = ({ children }) => {
  // const navigate = Navigate();

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    severity: "",
  });

  const showAlert = (message, severity) => {
    setAlert({ show: true, message, severity });
    setTimeout(
      () => setAlert({ show: false, message: "", severity: "" }),
      2000
    ); // Hide the alert after 2 seconds
  };

  const [response, setResponse] = useState(null);
  const [authToken, setAuthToken] = useState(
    localStorage?.getItem("authtoken")
  );
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const isAuthenticated = !!authToken;
  const Login = async (username, password) => {
    const url = `${BASE_URL}auth/Login`;
    const payload = {
      UserId: username,
      password: password,
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        setResponse(data);
        setAuthToken(data.authtoken);
        localStorage.setItem("authtoken", data.authtoken);

        // Show success alert
        showAlert("Login successful!", "success");
      } else {
        // Show error alert if the success flag is not true
        showAlert("Login failed. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error fetching the API:", error);
    }
  };

  const SignUp = async (data) => {
    const url = `${BASE_URL}auth/UserRegister`;
    const payload = {
      name: data.name,
      fatherName: data.fatherName,
      Sponsor_id: data.Sponsor_id,
      Address: "somewhere",
      city: "somecity",
      State: "somestate",
      phoneNo: data.phoneNo,
      password: data.password,
      email: data.email,
      Upi_no: data.phoneNo,
      PayId: data.payId,
    };
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserData = async (authToken) => {
    const url = `${BASE_URL}auth/me`;

    try {
      setLoading(true);
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authtoken: authToken,
        },
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      console.log("User Data:", data);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching the user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserNameBySponsorId = async (data) => {
    const url = "GetSponsor/";
    try {
      const response = await fetch(`${BASE_URL}/${url}${data}`);

      if (!response.ok) {
        showAlert(response.error, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      showAlert(error.response.data.error, "error");
      console.log("Error fetching user name by sponsor ID:", error);
      // Optionally, handle the error further or rethrow it
    }
  };

  const getAmountAndAddress = async () => {
    const url = `${BASE_URL}auth/GetPayAmount`;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authtoken: authToken,
        },
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const LevelUpdate = async (data) => {
    const url = `${BASE_URL}auth/levelUpgrade`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken: authToken,
        },
        body: JSON.stringify(data), // Send data in the request body
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const responseData = await res.json();
      if (responseData.success) {
        fetchUserData(authToken);
      }

      return responseData;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchUserData(authToken);
    }
  }, [authToken]);

  const [userAddress, setUserAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const connectMetaMask = async () => {
    if (isConnecting) return; // Prevent multiple connections
    setIsConnecting(true);

    if (window.ethereum) {
      try {
        // Check if MetaMask is already connected
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setUserAddress(accounts[0]);
          console.log("MetaMask already connected:", accounts[0]);
          setIsConnecting(false);
          return;
        }

        // Request access to the user's MetaMask account
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Create a new provider using ethers.js
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Get the signer (the connected MetaMask account)
        const signer = provider.getSigner();

        // Retrieve the user's MetaMask address
        const address = await signer.getAddress();
        setUserAddress(address);
        // addressId(address);
        console.log("MetaMask Address:", address);
      } catch (error) {
        console.error("Error connecting MetaMask:", error);
      } finally {
        setIsConnecting(false);
      }
    } else {
      console.error("MetaMask not detected");
      setIsConnecting(false);
    }
  };
  console.log(userAddress);

  // Start Payment:--------

  const supportedChains = {
    bscMainnet: {
      chainId: 56, // BSC Mainnet chain ID
      rpcUrl: "https://bsc-dataseed.binance.org/", // BSC Mainnet RPC URL
    },
  };
  const startPayment = async ({ setError, setTxs, bnb, addr }) => {
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");

      // Convert the chainId to a hexadecimal string with a 0x prefix
      const chainIdHex = `0x${supportedChains.bscMainnet.chainId.toString(16)}`;

      // Check if user is connected to the BSC Mainnet
      if (window.ethereum.chainId !== chainIdHex) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainIdHex }],
        });
      }

      // After network switch, reinitialize the provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request accounts if not already requested
      const signer = provider.getSigner();

      // Validate address format
      ethers.utils.getAddress(addr);

      // Send BNB on BSC Mainnet
      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseUnits(bnb.toString(), 18),
      });

      // Wait for the transaction to be mined
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        // Transaction was successful
        const data = {
          transaction_id: tx.hash,
          t_status: "success",
          to_payed: tx.from,
        };
        LevelUpdate(data);
        setTxs([tx]);
      } else {
        // Transaction failed
        throw new Error("Transaction failed. Please try again.");
      }
    } catch (err) {
      // Handle insufficient funds error
      if (
        err.code === -32603 &&
        err.data?.code === -32000 &&
        err.data?.message.includes("insufficient funds")
      ) {
        setError("Insufficient balance in account. Please add some amount.");
      } else {
        setError(err.message);
      }
    }
  };
  return (
    <AuthContext.Provider
      value={{
        response,
        showAlert,
        authToken,
        userData,
        loading,
        isAuthenticated,
        userAddress,
        Login,
        fetchUserData,
        SignUp,
        getUserNameBySponsorId,
        getAmountAndAddress,
        LevelUpdate,
        connectMetaMask,
        startPayment,
      }}
    >
      {children}
      {alert.show && (
        <Snackbar
          open={alert.show}
          autoHideDuration={2000}
          onClose={() => setAlert({ show: false, message: "", severity: "" })}
        >
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity={alert.severity}
            variant="filled"
          >
            {alert.message}
          </Alert>
        </Snackbar>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
