import { NavLink } from "react-router-dom";
import banner from "../assets/dashboard.jpg";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import React from "react";
import Select from "react-select";
import { noOfEmployees, yearOptions } from "../core/data";

function Signup() {
  const [showOldPasswordType, setShowOldPasswordType] = React.useState(false);
  const [showNewPasswordType, setShowNewPasswordType] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const oldPasswordToggle = () => {
    setShowOldPasswordType(!showOldPasswordType);
  };

  const newPasswordToggle = () => {
    setShowNewPasswordType(!showNewPasswordType);
  };

  const handleChange = (selectedOption) => {
    setSelectedAuthorValue(selectedOption);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full bg-slate-200 p-9">
        <p className="mt-24 mb-8 text-3xl">Signup</p>
        <div className="flex mb-24">
          <img className="mobile:hidden h-[40rem]" src={banner} />
          <form className="mobile:border-2 bg-white mobile:border-red-600 mobile:p-9 flex from-laptop-to-laptop-xl:p-9 flex-col gap-2 from-laptop-to-laptop-xl:w-[30vw] h-full mobile:h-[34rem]">
            <div className="field">
              <label className="label bold">Enter Company Name</label>
              <div className="control">
                <input
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  name=""
                  type="text"
                  placeholder="Company Name"
                />
              </div>
              {/* <p className="help">This is a help text</p> */}
            </div>

            <div className="field">
              <label className="label bold">Enter Address(GPS)</label>
              <div className="control">
                <input
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  name=""
                  type="text"
                  placeholder="Last name"
                />
              </div>
              {/* <p className="help">This is a help text</p> */}
            </div>

            <div className="field">
              <label className="label bold">Enter Email</label>
              <div className="control">
                <input
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  name=""
                  type="email"
                  placeholder="Email"
                />
              </div>
              {/* <p className="help">This is a help text</p> */}
            </div>
            <label className="label bold">Select number of employees</label>
            <div className="flex w-full mt-4 row mobile:w-full">
              <Select
                className="w-full"
                value={selectedOption}
                onChange={handleChange}
                options={noOfEmployees}
                placeholder="Number of employees"
              />
            </div>

            <div className="relative field">
              <label className="label bold">Enter Password</label>
              <div className="control">
                <input
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type={showOldPasswordType ? "text" : "password"}
                  placeholder="Password"
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
              <label className="label bold">Enter Password Confirmation</label>
              <div className="control">
                <input
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type={showNewPasswordType ? "text" : "password"}
                  placeholder="Password Confirmation"
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
              Sign up
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
