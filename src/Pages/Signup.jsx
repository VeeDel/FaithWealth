import React from "react";

const Signup = () => {
  return (
    <div className="max-w-[480px]  mx-auto">
      <div className=" font-semibold tracking-widest bg-[#0a0a0a] pt-4 text-center pb-2 border-b-2 border-[#131313] sticky top-0 ">
        Signup
      </div>
      <div className="m-4">
        <form>
          <label className="label-field ">
            Sponser id
            <input type="text" className="input-field w-full" />
          </label>
          <label className="label-field">
            full name <input type="text" className="input-field w-full" />
          </label>
          <label className="label-field">
            father name <input type="text" className="input-field w-full" />
          </label>
          <label className="label-field">
            phone NO <input type="number" className="input-field w-full" />
          </label>
          <label className="label-field">
            email <input type="email" className="input-field w-full" />
          </label>
          <label className="label-field">
            passowrd <input type="password" className="input-field w-full" />
          </label>
          <label className="label-field">
            confirm password{" "}
            <input type="password" className="input-field w-full" />
          </label>
          <input className="btn-purple " type="submit" value="sign up" />
        </form>
        <p className="text-center tracking-wide my-1 font-medium">
          Already have an account?
          <span className="text-[#a020f0] mx-1 ">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
