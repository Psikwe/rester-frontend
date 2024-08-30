import React from "react";
import { UserResetPassword } from "../../core/services/auth.service";
import Modal from "../../components/modal/_component";
import verify from "../../assets/verify.svg";
import Loader from "../../components/loader/_component";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import { showToast } from "../../core/hooks/alert";
import { formToJSON } from "axios";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const [showOldPasswordType, setShowOldPasswordType] = React.useState(false);
  const [showNewPasswordType, setShowNewPasswordType] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const queryParams = new URLSearchParams(location.search);
  const verificationKey = queryParams.get("vk");
  const resetForm = document.getElementById("reset-password-form");
  const payload = {
    ...formToJSON(resetForm),
    verification_key: verificationKey,
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    UserResetPassword(payload)
      .then((response) => {
        showToast(response?.data.message, true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
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
      <form
        id="reset-password-form"
        onSubmit={handleResetPassword}
        className="mobile:border-2 mt-32 mb-80 bg-slate-200 m-auto flex justify-center mobile:border-[#687864] mobile:p-9 from-laptop-to-laptop-xl:p-9 flex-col gap-6 from-laptop-to-laptop-xl:w-[30vw] h-[31rem] mobile-h-full"
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
          disabled={isLoading}
          className={
            isLoading
              ? "w-1/2 py-3 m-auto mt-8 text-white rounded-full primary mobile:w-full bg-[#c9edff] cursor-not-allowed"
              : "w-1/2 py-3 m-auto mt-8 text-white rounded-full primary mobile:w-full"
          }
        >
          {isLoading ? <Loader /> : "Reset Password"}
        </button>
      </form>
    </>
  );
}

export default ResetPassword;
