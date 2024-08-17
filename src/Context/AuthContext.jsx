import { Alert, Snackbar } from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";
import { BASEURL } from "../services/http-Pos";
// import { Navigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
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
      PayId: "payId will give from metamask",
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
    try {
      const response = await fetch(`${BASE_URL}/GetSponsor/${data}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result; // Return the result if you need to use it
    } catch (error) {
      console.error("Error fetching user name by sponsor ID:", error);
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
        method: "POST", // Use POST method to send data
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
      if(responseData.success){
        fetchUserData(authToken);
        
      }
      
      return responseData;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // getUserNameBySponsorId("SH7357700100");
    if (authToken) {
      fetchUserData(authToken);
      // getAmountAndAddress();
      // LevelUpdate(data);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{
        response,
        showAlert,
        authToken,
        userData,
        loading,
        isAuthenticated,
        Login,
        fetchUserData,
        SignUp,
        getUserNameBySponsorId,
        getAmountAndAddress,
        LevelUpdate,
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
