import { NavLink } from "react-router-dom";
import banner from "../assets/dashboard.jpg";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import React from "react";
function Login() {
  const [showNewPasswordType, setShowNewPasswordType] = React.useState(false);

  const newPasswordToggle = () => {
    setShowNewPasswordType(!showNewPasswordType);
  };
  return (
    <>
      <section className="bg-slate-200">
        <div className="login-container">
          <p className="mt-16 text-3xl mb-9 from-laptop-to-laptop-xl:title">
            Login
          </p>
          <div className="flex mb-24">
            <img className="h-[31rem] mobile:hidden" src={banner} />
            <form className="mobile:border-2 bg-white mobile:border-[primary] mobile:p-9 flex from-laptop-to-laptop-xl:p-9 flex-col gap-6 from-laptop-to-laptop-xl:w-[30vw] h-[31rem]">
              <div className="field">
                <label className="label bold">Email</label>
                <div className="control">
                  <input
                    className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                    type="email"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="relative field">
                <label className="label bold">Password</label>
                <div className="control">
                  <input
                    className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                    type={showNewPasswordType ? "text" : "password"}
                    placeholder="Password"
                  />
                </div>
                <div className="absolute top-9 right-3">
                  <span onClick={newPasswordToggle} className="cursor-pointer">
                    {showNewPasswordType ? (
                      <HiMiniEyeSlash size={20} />
                    ) : (
                      <IoEyeSharp size={20} />
                    )}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 text-white mt-9 primary mobile:w-full"
              >
                Login
              </button>
              <small>
                Don't have an account yet?
                <NavLink to="/signup">
                  <span className="ml-1 font-bold underline">Signup</span>
                </NavLink>
              </small>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
