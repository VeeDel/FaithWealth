import React, { useState } from "react";
import LogoLoading from "../Components/LogoLoading";
import DataService from "../services/requestApi"; // Ensure the path is correct
import { useAuth } from "../Context/AuthContext";
import { useForm } from "react-hook-form";

const Login = () => {
  const { Login, userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await Login(data.userId, data.password);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="label-field">
                user id
                <input
                  placeholder="Enter Your Username"
                  className="input-field w-full"
                  type="text"
                  {...register("userId")}
                />
              </label>
              <label className="label-field">
                password
                <input
                  placeholder="Enter Your Password"
                  className="input-field w-full"
                  type="password"
                  {...register("password")}
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
