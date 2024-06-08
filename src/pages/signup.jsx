import { NavLink } from "react-router-dom";
import banner from "../assets/dashboard.jpg";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import React from "react";
import Select from "react-select";
import { noOfEmployees, yearOptions } from "../core/data";
import axios, { formToJSON } from "axios";
import { showToast } from "../core/hooks/alert";
import Loader from "../components/loader/_component";
import { UserSignUp } from "../core/services/auth.service";

function Signup() {
  const [showOldPasswordType, setShowOldPasswordType] = React.useState(false);
  const [showNewPasswordType, setShowNewPasswordType] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedRangeOption, setSelectedRangeOption] = React.useState(null);
  const oldPasswordToggle = () => {
    setShowOldPasswordType(!showOldPasswordType);
  };

  const newPasswordToggle = () => {
    setShowNewPasswordType(!showNewPasswordType);
  };

  const handleChange = (selectedRangeOption) => {
    setSelectedRangeOption(selectedRangeOption);
  };

  const handleSignup = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const signupForm = document.getElementById("signup-form");
    const signupData = {
      ...formToJSON(signupForm),
      company_size: selectedRangeOption.value,
    };
    UserSignUp(signupData)
      .then((res) => {
        setIsLoading(false);
        showToast(res.data.message, true);
        signupForm?.reset();
      })
      .catch((error) => {
        setIsLoading(false);
        showToast(error.response.data.error, false);
      });
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full bg-slate-200 p-9">
        <p className="mt-24 mb-8 text-3xl">Signup</p>
        <div className="flex mb-24">
          <img className="mobile:hidden h-[48rem]" src={banner} />
          <form
            id="signup-form"
            onSubmit={handleSignup}
            className="mobile:border-2 bg-white mobile:border-[#687864] mobile:p-9 flex from-laptop-to-laptop-xl:p-9 flex-col gap-2 from-laptop-to-laptop-xl:w-[30vw] h-full"
          >
            <div className="field">
              <label className="text-sm label bold">Enter First Name</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                />
              </div>
              {/* <p className="help">This is a help text</p> */}
            </div>

            <div className="field">
              <label className="text-sm label bold">Enter Last Name</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                />
              </div>
              {/* <p className="help">This is a help text</p> */}
            </div>

            <div className="field">
              <label className="text-sm label bold">Enter Company Name</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="text"
                  placeholder="Company Name"
                  name="company_name"
                />
              </div>
              {/* <p className="help">This is a help text</p> */}
            </div>

            <div className="field">
              <label className="text-sm label bold">Enter Address(GPS)</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="text"
                  placeholder="Last name"
                  name="company_address"
                />
              </div>
              {/* <p className="help">This is a help text</p> */}
            </div>
            <label className="text-sm label bold">
              Select number of employees
            </label>
            <div className="flex w-full row mobile:w-full">
              <Select
                className="w-full"
                value={selectedRangeOption}
                onChange={handleChange}
                options={noOfEmployees}
                placeholder="Number of employees"
              />
            </div>
            <div className="field">
              <label className="text-sm label bold">Enter Email</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="email"
                  placeholder="Email"
                  name="email"
                />
              </div>
              {/* <p className="help">This is a help text</p> */}
            </div>

            <div className="relative field">
              <label className="text-sm label bold">Enter Password</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type={showOldPasswordType ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                />
              </div>
              <div className="absolute top-9 right-3">
                <span onClick={oldPasswordToggle} className="cursor-pointer">
                  {showOldPasswordType ? (
                    <HiMiniEyeSlash size={20} />
                  ) : (
                    <IoEyeSharp size={20} />
                  )}
                </span>
              </div>
            </div>
            <div className="relative field">
              <label className="text-sm label bold">
                Enter Password Confirmation
              </label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type={showNewPasswordType ? "text" : "password"}
                  placeholder="Password Confirmation"
                  name="password_confirmation"
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
              className="w-full py-3 mt-8 text-white primary mobile:w-full"
            >
              {isLoading ? <Loader /> : "Signup"}
            </button>
            <small>
              Already having an accout?
              <NavLink to="/login">
                <span className="ml-1 font-bold underline">Login</span>
              </NavLink>
            </small>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
