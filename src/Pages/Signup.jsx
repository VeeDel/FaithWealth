import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Signup = () => {
  const { SignUp, getUserNameBySponsorId } = useAuth();
  const [sponsorName, setSponsorName] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors ,isSubmitting},
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await SignUp(data);
    } catch (error) {
      console.log(error);
    } finally {
      // Handle any additional logic here, if needed
    }
  };

  const password = watch("password");
  const Sponsor_id = watch("Sponsor_id");
  console.log(Sponsor_id);
  useEffect(() => {
    const fetchSponsorName = async () => {
      if (Sponsor_id?.length === 12) {
        try {
          const result = await getUserNameBySponsorId(Sponsor_id);
          setSponsorName(result?.name);
        } catch (error) {
          console.error("Error fetching sponsor name:", error);
        }
      }
    };
    if (Sponsor_id?.length !== 12) {
      setSponsorName("");
    }

    fetchSponsorName();
  }, [Sponsor_id, getUserNameBySponsorId]); // Dependencies

  console.log(sponsorName);
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
              placeholder="Enter your Sponser Id"
            />
            {errors.Sponsor_id && (
              <p className="error-text text-red-500">{errors.Sponsor_id.message}</p>
            )}
          </label>

          <label className="label-field">
            Full name
            <input
              {...register("name", { required: "Full name is required" })}
              type="text"
              className="input-field w-full"
              placeholder="Enter your Name"
            />
            {errors.name && <p className="error-text text-red-500">{errors.name.message}</p>}
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
              <p className="error-text text-red-500">{errors.fatherName.message}</p>
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
              type="text" // Changed to text
              className="input-field w-full"
              placeholder="Enter your phone number"
            />
            {errors.phoneNo && (
              <p className="error-text text-red-500">{errors.phoneNo.message}</p>
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
              <p className="error-text text-red-500">{errors.email.message}</p>
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
              <p className="error-text text-red-500">{errors.password.message}</p>
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
              <p className="error-text text-red-500">{errors.confirmPassword.message}</p>
            )}
          </label>
          <input disabled={isSubmitting} className="btn-purple" type="submit" value="Sign up" />
        </form>
        <p className="text-center tracking-wide my-1 font-medium">
          Already have an account?
          <Link to='/login' className="text-[#a020f0] mx-1">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
