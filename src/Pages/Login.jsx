import React, { useState } from "react";
import LogoLoading from "../Components/LogoLoading";
import DataService from "../services/requestApi"; // Ensure the path is correct

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const data = {
    UserId: "SH7357700108",
    password: "Shoaib123",
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true); // Optional: Set loading state to true
    try {
      const response = await DataService.Login(data);
      console.log(response);
      setLoading(false); // Optional: Set loading state to false after the request
    } catch (error) {
      console.error(error);
      setLoading(false); // Optional: Set loading state to false in case of error
    }
  };

  const fetchApi = async (e) => {
    e.preventDefault();

    const url = "http://103.148.165.246:9000/api/auth/Login";
    const payload = {
      UserId: "SH7357700108",
      password: "Shoaib123",
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
    } catch (error) {
      console.error("Error fetching the API:", error);
    }
  };

  return (
    <div className="">
      {loading ? (
        <LogoLoading />
      ) : (
        <>
          <div className="font-semibold tracking-widest bg-[#0a0a0a] pt-4 text-center pb-2 border-b-2 border-[#131313] sticky top-0">
            Login
          </div>
          <div className="mx-4 my-12">
            <form onSubmit={login}>
              <label className="label-field">
                user id
                <input
                  placeholder="Enter Your Username"
                  className="input-field w-full"
                  type="text"
                />
              </label>
              <label className="label-field">
                password
                <input
                  placeholder="Enter Your Password"
                  className="input-field w-full"
                  type="password"
                />
              </label>
              <input type="submit" className="btn-purple" value="login" />
            </form>
            <p className="text-center tracking-wide my-1 font-medium">
              Already have an account?
              <a className="text-[#a020f0] mx-1 ">Signup</a>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
