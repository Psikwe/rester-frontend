import React from "react";
import { UserResetPassword } from "../../core/services/auth.service";
import Modal from "../../components/modal/_component";
import verify from "../../assets/verify.svg";
import Loader from "../../components/loader/_component";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import { showToast } from "../../core/hooks/alert";

function ResetPassword() {
  const [showOldPasswordType, setShowOldPasswordType] = React.useState(false);
  const [showNewPasswordType, setShowNewPasswordType] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);

  const queryParams = new URLSearchParams(location.search);
  const [verifyDone, setVerifyDone] = React.useState(false);
  const verificationKey = queryParams.get("vk");
  console.log("vk: ", verificationKey);
  const payload = {
    verification_key: verificationKey,
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    UserResetPassword(payload)
      .then((response) => {
        showToast(response?.data.message, true);
        setVerifyDone(true);
      })
      .catch((error) => {
        showToast(error.response.data.error, false);
      });
  };

  const oldPasswordToggle = () => {
    setShowOldPasswordType(!showOldPasswordType);
  };

  const newPasswordToggle = () => {
    setShowNewPasswordType(!showNewPasswordType);
  };

  return (
    <>
      <div
        className={` flex justify-center items-center mt-52 loaderContainer center`}
      >
        <div className="loader"></div>
      </div>
      <h3 className="flex justify-center mt-3"> Verifying User</h3>
      <form
        id="login-form"
        onSubmit={handleResetPassword}
        className="mobile:border-2 bg-white mobile:border-[#687864] mobile:p-9 flex from-laptop-to-laptop-xl:p-9 flex-col gap-6 from-laptop-to-laptop-xl:w-[30vw] h-[31rem] mobile-h-full"
      >
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
          disabled={!isLoading}
          className={
            isLoading
              ? "w-1/2 py-3 m-auto mt-8 text-white rounded-full primary mobile:w-full "
              : "w-1/2 py-3 m-auto mt-8 text-white rounded-full primary mobile:w-full bg-[#c9edff] cursor-not-allowed"
          }
        >
          {isLoading ? <Loader /> : "Reset Password"}
        </button>
      </form>
      {/* <div className="w-full bg-white p-14">
          <div className="flex justify-center mb-2">
            <img
              width={90}
              className="text-green-500"
              color="green"
              src={verify}
            />
          </div>

          <p>Verification Done Successfully. Please login</p>
          <div className="flex">
            <button
              onClick={handleLogin}
              className="w-full py-2 text-white bg-[#2062fe] rounded-full mt-9 mobile:w-full"
            >
              Login
            </button>
          </div>
        </div> */}
    </>
  );
}

export default ResetPassword;
