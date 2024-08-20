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
    const url = `${BASE_URL}/Login`;
    const payload = {
      UserId: username,
      password: password,
    };

    try {
      const { data } = await axios.post(url, payload);

      if (data.success) {
        setResponse(data);
        setAuthToken(data.authtoken);
        localStorage.setItem("authtoken", data.authtoken);
        window.location.reload()
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
    const url = `${BASE_URL}/UserRegister`;
    const payload = {
      name: data.name,
      fatherName: data.fatherName,
      Sponsor_id: data.Sponsor_id,
      city: "somecity",
      State: "somestate",
      phoneNo: data.phoneNo,
      password: data.password,
      email: data.email,
      Upi_no: data.phoneNo,
      PayId: data.payId,
      t_status: data.t_status,
      transaction_id: data.transaction_id,
      to_pay: data.to_pay,
    };
    try {
      const { data } = await axios.post(url, payload);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserData = async (authToken) => {
    const url = `${BASE_URL}/me`;

    try {
      setLoading(true);
      const { data } = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          authtoken: authToken,
        },
      });

      console.log("User Data:", data);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching the user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserNameBySponsorId = async (data) => {
    const url = `GetSponsor/${data}`;
    try {
      const response = await axios.get(`${BASE_URL}/${url}`);

      return response.data;
    } catch (error) {
      showAlert(error.response?.data?.error || "Error occurred", "error");
      console.log("Error fetching user name by sponsor ID:", error);
    }
  };

  const getAmountAndAddress = async () => {
    const url = `${BASE_URL}/GetPayAmount`;
    try {
      const { data } = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          authtoken: authToken,
        },
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const LevelUpdate = async (data) => {
    const url = `${BASE_URL}/levelUpgrade`;
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          authtoken: authToken,
        },
      });

      if (response.data.success) {
        fetchUserData(authToken);
      }

      return response.data;
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
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setUserAddress(accounts[0]);
          console.log("MetaMask already connected:", accounts[0]);
          setIsConnecting(false);
          return;
        }

        await window.ethereum.request({ method: "eth_requestAccounts" });

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setUserAddress(address);
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
      chainId: 97, // BSC Testnet chain ID
      rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/", // BSC Mainnet RPC URL
    },
  };
  const startPayment = async ({ setError, setTxs, bnb, addr, setPending }) => {
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");

      setPending(true);
      const chainIdHex = `0x${supportedChains.bscMainnet.chainId.toString(16)}`;

      if (window.ethereum.chainId !== chainIdHex) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainIdHex }],
        });
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      ethers.utils.getAddress(addr);

      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseUnits(bnb.toString(), 18),
      });

      const receipt = await tx.wait();
      console.log(tx);
      if (receipt.status === 1) {
        const data = {
          transaction_id: tx.hash,
          t_status: "success",
          to_payed: tx.to,
        };

        await LevelUpdate(data);
        setTxs([tx]);
      } else {
        throw new Error("Transaction failed. Please try again.");
      }
    } catch (err) {
      if (
        err.code === -32603 &&
        err.data?.code === -32000 &&
        err.data?.message.includes("insufficient funds")
      ) {
        setError("Insufficient balance in account. Please add some amount.");
      } else {
        setError(err.message);
      }
    } finally {
      setPending(false);
    }
  };

  const SignUpPayment = async ({ payload, bnb, addr, setError }) => {
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");

      if (!addr) {
        throw new Error(
          "Invalid address provided. Please check the address input."
        );
      }

      ethers.utils.getAddress(addr);

      const chainIdHex = `0x${supportedChains.bscMainnet.chainId.toString(16)}`;

      if (window.ethereum.chainId !== chainIdHex) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainIdHex }],
        });
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseUnits(bnb.toString(), 18),
      });

      const receipt = await tx.wait();

      if (receipt.status === 1) {
        await SignUp(payload); // Make sure SignUp is an async function if it returns a promise
      } else {
        throw new Error("Transaction failed. Please try again.");
      }
    } catch (err) {
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
        SignUpPayment,
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
