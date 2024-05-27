import { NavLink } from "react-router-dom";
import banner from "../assets/dashboard.jpg";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import axios from "axios";
import React from "react";
import { formToJSON } from "axios";
import { showToast } from "../core/hooks/alert";

function Login() {
  const [showNewPasswordType, setShowNewPasswordType] = React.useState(false);

  const newPasswordToggle = () => {
    setShowNewPasswordType(!showNewPasswordType);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const loginForm = document.getElementById("login-form");
    const loginData = {
      ...formToJSON(loginForm),
    };

    axios
      .post("https://rester-82c60dc37022.herokuapp.com/login", loginData)
      .then((res) => {
        showToast(res.data.message, true);
        loginForm?.reset();
      })
      .catch((error) => {
        showToast(error.response.data.error, false);
      });
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
            <form
              id="login-form"
              onSubmit={handleLogin}
              className="mobile:border-2 bg-white mobile:border-[#687864] mobile:p-9 flex from-laptop-to-laptop-xl:p-9 flex-col gap-6 from-laptop-to-laptop-xl:w-[30vw] h-[31rem] mobile-h-full"
            >
              <div className="field">
                <label className="label bold">Email</label>
                <div className="control">
                  <input
                    className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                    type="email"
                    placeholder="Email"
                    name="email"
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
                    name="password"
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
