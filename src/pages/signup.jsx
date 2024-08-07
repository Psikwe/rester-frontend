import { NavLink } from "react-router-dom";
import TnCsFile from "../assets/pdfs/TnCs.pdf";
import PP from "../assets/pdfs/PP.pdf";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import React from "react";
import { formToJSON } from "axios";
import { showToast } from "../core/hooks/alert";
import Loader from "../components/loader/_component";
import { UserSignUp } from "../core/services/auth.service";

function Signup() {
  const [showOldPasswordType, setShowOldPasswordType] = React.useState(false);
  const [showNewPasswordType, setShowNewPasswordType] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const [selectedIndustry, setSelectedIndustry] = React.useState(null);
  const oldPasswordToggle = () => {
    setShowOldPasswordType(!showOldPasswordType);
  };

  const newPasswordToggle = () => {
    setShowNewPasswordType(!showNewPasswordType);
  };

  const handleIndustryChange = (selectedIndustryValue) => {
    setSelectedIndustry(selectedIndustryValue);
  };

  const handleSignup = (event) => {
    event.preventDefault();

    setIsLoading(true);
    const signupForm = document.getElementById("signup-form");
    const signupData = {
      ...formToJSON(signupForm),
    };
    localStorage.setItem("admin_email", signupData.email);
    UserSignUp(signupData)
      .then((res) => {
        setIsLoading(false);
        showToast(res.data.message, true);
        signupForm?.reset();
        setTimeout(() => {
          window.location.href = "/setup-organization";
        }, 2000);
      })
      .catch((error) => {
        setIsLoading(false);
        showToast(error.response.data.error, false);
      });
  };

  const handleCheck = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full bg-slate-200 p-9">
        <div className="flex mb-2">
          {/* <img
            className="mobile:hidden w-[38rem] h-[52.8rem] brightness-75"
            src={banner}
          /> */}
          <form
            id="signup-form"
            onSubmit={handleSignup}
            className="mobile:border-2 bg-white mobile:p-9 flex from-laptop-to-laptop-xl:p-9 flex-col gap-2 from-laptop-to-laptop-xl:w-[30rem] h-full"
          >
            <div className="flex w-full">
              <div className="w-full mr-3 field">
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

              <div className="w-full field">
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
            </div>

            <div className="flex">
              <div className="w-full mr-3 field">
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
            </div>
            {/* <label className="text-sm label bold">
              Select number of employees
            </label>
            <div className="flex w-full row mobile:w-full">
              <Select
                className="w-full"
                value={selectedIndustryValue}
                onChange={handleChange}
                options={noOfEmployees}
                placeholder="Number of employees"
              />
            </div> */}

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
            <div className="m-auto">
              <input
                className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
                type="checkbox"
                value=""
                id="checkboxDefault"
                onChange={handleCheck}
              />
              <label
                className="inline-block ps-[0.15rem] text-xs hover:cursor-pointer"
                htmlFor="checkboxDefault"
              >
                I agree to the{" "}
                <span className="underline">
                  <a href={TnCsFile} target="_blank">
                    Terms of Service
                  </a>
                </span>{" "}
                and{" "}
                <span className="underline">
                  <a href={PP} target="_blank">
                    Privacy Policy
                  </a>{" "}
                </span>
              </label>
            </div>
            <button
              type="submit"
              disabled={!isChecked}
              className={
                isChecked
                  ? "w-1/2 py-2 m-auto mt-8 text-white rounded-full primary mobile:w-full "
                  : "w-1/2 py-2 m-auto mt-8 text-white rounded-full primary mobile:w-full bg-[#c9edff] cursor-not-allowed"
              }
            >
              {isLoading ? <Loader /> : "Signup"}
            </button>
            <small>
              Already having a rester accout?
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
