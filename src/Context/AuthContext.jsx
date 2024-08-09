import React, { createContext, useContext, useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";

const AuthContext = createContext(null);

const BASE_URL = "http://103.148.165.246:9000/api/";

const AuthProvider = ({ children }) => {
  //   const navigate = Navigate();
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
      setResponse(data);
      setAuthToken(data.authtoken);
      localStorage.setItem("authtoken", data.authtoken);
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
    const url = "";
    try {
      const response = await fetch(`${BASE_URL}${url}/${data}`);

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

  useEffect(() => {
    // getUserNameBySponsorId("SH7357700100");
    if (authToken) {
      fetchUserData(authToken);
      // getAmountAndAddress();
    }
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{
        response,
        authToken,
        Login,
        fetchUserData,
        userData,
        loading,
        isAuthenticated,
        SignUp,
        getUserNameBySponsorId,
        getAmountAndAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
