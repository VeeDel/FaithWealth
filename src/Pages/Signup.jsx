import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useForm } from "react-hook-form";
import ConnectMetaMaskPage from "./ConnectMetaMaskPage";

const Signup = () => {
  const { SignUp, getUserNameBySponsorId, userAddress } = useAuth();
  const [sponsorName, setSponsorName] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      payId: userAddress,
    };
    try {
      await SignUp(payload);
      console.log(payload);
    } catch (error) {
      console.log(error);
    }
  };

  const password = watch("password");
  const Sponsor_id = watch("Sponsor_id");

  useEffect(() => {
    const fetchSponsorName = async () => {
      if (Sponsor_id?.length === 12) {
        try {
          const result = await getUserNameBySponsorId(Sponsor_id);
          setSponsorName(result.name);
        } catch (error) {
          console.error("Error fetching sponsor name:", error);
        }
      } else {
        setSponsorName("");
      }
    };

    fetchSponsorName();
  }, [Sponsor_id, getUserNameBySponsorId]);

  // If userAddress is null or empty, show the ConnectMetaMaskPage
  if (!userAddress) {
    return <ConnectMetaMaskPage />;
  }

  return (
    <div className="max-w-[480px] mx-auto">
      <div className="font-semibold tracking-widest bg-[#0a0a0a] pt-4 text-center pb-2 border-b-2 border-[#131313] sticky top-0">
        Signup
      </div>
      <div className="m-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="label-field">
            Sponsor id{" "}
            {sponsorName ? (
              <span className="text-end p-1 rounded-md bg-primary">
                {sponsorName}
              </span>
            ) : null}
            <input
              {...register("Sponsor_id", {
                required: "Sponsor ID is required",
              })}
              type="text"
              className="input-field w-full"
              placeholder="Enter your Sponsor Id"
            />
            {errors.Sponsor_id && (
              <p className="error-text">{errors.Sponsor_id.message}</p>
            )}
          </label>

          <label className="label-field">Payid</label>
          <h2 className="input-field text-[10px]">{userAddress}</h2>

          <label className="label-field">
            Full name
            <input
              {...register("name", { required: "Full name is required" })}
              type="text"
              className="input-field w-full"
              placeholder="Enter your Name"
            />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </label>

          <label className="label-field">
            Father name
            <input
              {...register("fatherName", {
                required: "Father name is required",
              })}
              type="text"
              className="input-field w-full"
              placeholder="Enter your father name"
            />
            {errors.fatherName && (
              <p className="error-text">{errors.fatherName.message}</p>
            )}
          </label>

          <label className="label-field">
            Phone No
            <input
              {...register("phoneNo", {
                required: "Phone number is required",
                minLength: {
                  value: 10,
                  message: "Phone number must be 10 digits",
                },
                maxLength: {
                  value: 10,
                  message: "Phone number must be 10 digits",
                },
              })}
              type="text"
              className="input-field w-full"
              placeholder="Enter your phone number"
            />
            {errors.phoneNo && (
              <p className="error-text">{errors.phoneNo.message}</p>
            )}
          </label>

          <label className="label-field">
            Email
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              className="input-field w-full"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </label>

          <label className="label-field">
            Password
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              type="password"
              className="input-field w-full"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
          </label>

          <label className="label-field">
            Confirm Password
            <input
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type="password"
              className="input-field w-full"
              placeholder="Confirm password"
            />
            {errors.confirmPassword && (
              <p className="error-text">{errors.confirmPassword.message}</p>
            )}
          </label>
          <input className="btn-purple" type="submit" value="Sign up" />
        </form>
        <p className="text-center tracking-wide my-1 font-medium">
          Already have an account?
          <span className="text-[#a020f0] mx-1">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
