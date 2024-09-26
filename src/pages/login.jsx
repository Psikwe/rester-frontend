import { NavLink } from "react-router-dom";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import React from "react";
import { formToJSON } from "axios";
import { showToast } from "../core/hooks/alert";
import Modal from "../components/modal/_component";
import { useDispatch } from "react-redux";
import { cacheUserRole, cacheUserSession } from "../core/utilities";
import { setUser } from "../core/stores/slices/user_slice";
import Loader from "../components/loader/_component";
import { UserForgotPassword, UserLogin } from "../core/services/auth.service";
import moment from "moment";
import { FaCircleInfo } from "react-icons/fa6";

function Login() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isForgotLoading, setForgotIsLoading] = React.useState(false);
  const [showNewPasswordType, setShowNewPasswordType] = React.useState(false);
  const [isForgotPassowrdModalOpen, setIsForgotPassowrdModalOpen] =
    React.useState(false);
  const [isResetPassowrdModalOpen, setIsResetPassowrdModalOpen] =
    React.useState(false);
  const [confirmRole, setConfirmRole] = React.useState(false);
  const [adminSuperRole, setAdminSuperRole] = React.useState(false);
  const newPasswordToggle = () => {
    setShowNewPasswordType(!showNewPasswordType);
  };

  const handleForgotPassword = (event) => {
    setForgotIsLoading(true);
    event.preventDefault();
    const forgotPasswordForm = document.getElementById("forgot-password-form");
    const forgotPasswordData = {
      ...formToJSON(forgotPasswordForm),
    };
    UserForgotPassword(forgotPasswordData)
      .then((res) => {
        setForgotIsLoading(false);
        forgotPasswordForm?.reset();
        setIsForgotPassowrdModalOpen(false);
        showToast(res?.data.message, true);
      })
      .catch((error) => {
        console.log(error);
        setForgotIsLoading(false);
        showToast(error.response.data.error, false);
      });
  };

  const handleLogin = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const loginForm = document.getElementById("login-form");
    const loginData = {
      ...formToJSON(loginForm),
    };
    UserLogin(loginData)
      .then((res) => {
        setIsLoading(false);

        let expiryTimestamp = moment.unix(res?.data.expiry).valueOf();
        cacheUserSession(res?.data.access_token, expiryTimestamp);
        cacheUserRole(res?.data.roles[0]);
        console.log("role: ", res?.data.roles);
        dispatch(setUser({ roles: [], username: res?.data.email }));
        if (res?.data.roles[0] === "") {
          showToast("Login Successful", true);
          setTimeout(() => {
            window.location.href = "/tax-operator/create-tax-rate";
          }, 2000);
        } else if (
          res?.data.roles.includes("admin") &&
          res?.data.roles.includes("employee")
        ) {
          setConfirmRole(true);
          return;
        } else if (
          res?.data.roles.includes("admin") &&
          res?.data.roles.includes("superadmin")
        ) {
          setAdminSuperRole(true);
          return;
        } else {
          if (res?.data.roles[0] === "admin" && !res?.data.roles[1]) {
            showToast("Login Successful", true);
            setTimeout(() => {
              window.location.href = "/view-entity";
            }, 2000);
          } else if (res?.data.roles[0] === "employee" && !res?.data.roles[1]) {
            showToast("Login Successful", true);
            setTimeout(() => {
              window.location.href = "employee/update-employee";
            }, 2000);
          } else if (
            res?.data.roles[0] === "superadmin" &&
            !res?.data.roles[1]
          ) {
            showToast("Login Successful", true);
            setTimeout(() => {
              window.location.href = "/super/view-tax-rate";
            }, 2000);
          }
        }

        loginForm?.reset();
      })
      .catch((error) => {
        setIsLoading(false);
        showToast(error.response.data.error, false);
      });
  };
  const openForgotPasswordModal = () => {
    setIsForgotPassowrdModalOpen(true);
  };

  const closeForgotPasswordModal = () => {
    setIsForgotPassowrdModalOpen(false);
  };

  const closeConfirmRoleModal = () => {
    setConfirmRole(false);
  };

  const handleAdminNavigation = () => {
    showToast("Login Successful", true);
    setTimeout(() => {
      window.location.href = "/view-entity";
    }, 2000);
  };
  const handleEmployeeNavigation = () => {
    showToast("Login Successful", true);
    setTimeout(() => {
      window.location.href = "/employee/update-employee";
    }, 2000);
  };

  const handleSuperAdmin = () => {
    showToast("Login Successful", true);
    setTimeout(() => {
      window.location.href = "/super/create-tax-rate";
    }, 2000);
  };

  return (
    <>
      <Modal
        showCloseBtn={true}
        open={isForgotPassowrdModalOpen}
        close={closeForgotPasswordModal}
      >
        <form
          id="forgot-password-form"
          onSubmit={handleForgotPassword}
          className="p-16 bg-white"
        >
          <div className="relative">
            <label className="text-sm label bold">Enter Email</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-[30rem] pl-10 p-2.5"
                type="email"
                placeholder="Email"
                name="email"
              />
            </div>
          </div>
          <button
            disabled={isForgotLoading}
            type="submit"
            className={
              isForgotLoading
                ? `animate-pulse rounded-full w-1/3 py-2 text-white mt-9 primary mobile:w-full`
                : `w-1/3 rounded-full py-2 flex justify-center m-auto text-white mt-9 primary mobile:w-full`
            }
          >
            {isForgotLoading ? <Loader /> : "Submit"}
          </button>
        </form>
      </Modal>

      <Modal showCloseBtn={false} open={adminSuperRole}>
        <div className="w-full bg-white p-14">
          <div className="flex justify-center mb-2">
            <FaCircleInfo color="gray" size={70} className="mr-2" />
          </div>
          <p className="text-gray-500">
            Multiple roles are detected for this user. <br /> Do you want to
            login as super admin or admin?
          </p>
          <div className="flex">
            <button
              onClick={handleSuperAdmin}
              className="w-full mr-2 rounded-full text-white mt-9 bg-[#2062fe] mobile:w-full"
            >
              As Super Admin
            </button>
            <button
              onClick={handleAdminNavigation}
              className="w-full py-2 text-white bg-[#33b655] rounded-full mt-9 mobile:w-full"
            >
              As Admin
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        showCloseBtn={false}
        open={confirmRole}
        close={closeConfirmRoleModal}
      >
        <div className="w-full bg-white p-14">
          <div className="flex justify-center mb-2">
            <FaCircleInfo color="gray" size={70} className="mr-2" />
          </div>
          <p className="text-gray-500">
            Multiple roles are detected for this user. <br /> Do you want to
            login as employee or admin?
          </p>
          <div className="flex">
            <button
              onClick={handleEmployeeNavigation}
              className="w-full mr-2 rounded-full text-white mt-9 bg-[#2062fe] mobile:w-full"
            >
              As Employee
            </button>
            <button
              onClick={handleAdminNavigation}
              className="w-full py-2 text-white bg-[#33b655] rounded-full mt-9 mobile:w-full"
            >
              As Admin
            </button>
          </div>
        </div>
      </Modal>

      <section className="bg-slate-200">
        <div className="login-container">
          <div className="flex mb-24">
            <form
              id="login-form"
              onSubmit={handleLogin}
              className="mobile:border-2 bg-white mobile:p-9 flex from-laptop-to-laptop-xl:p-9 flex-col gap-6 from-laptop-to-laptop-xl:w-[30rem] h-[31rem] mobile-h-full"
            >
              <div className="field">
                <label className="text-sm label bold">Email</label>
                <div className="control">
                  <input
                    required
                    className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                    type="email"
                    placeholder="Email"
                    name="email"
                  />
                </div>
              </div>
              <div className="relative field">
                <label className="text-sm label bold">Password</label>
                <div className="control">
                  <input
                    required
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
                disabled={isLoading}
                type="submit"
                className={
                  isLoading
                    ? `animate-pulse w-1/2 rounded-full m-auto py-2 text-white mt-3 primary mobile:w-full`
                    : `w-1/2 m-auto py-2 rounded-full text-white mt-3 primary mobile:w-full`
                }
              >
                {isLoading ? <Loader /> : "Login"}
              </button>

              <small>
                <span className="flex justify-between">
                  <div>
                    Don't have an account yet?
                    <NavLink to="/signup">
                      <span className="ml-1 font-bold underline">Signup</span>
                    </NavLink>
                  </div>

                  <span
                    className="cursor-pointer"
                    onClick={openForgotPasswordModal}
                  >
                    <span className="font-bold underline">
                      Forgot password?
                    </span>
                  </span>
                </span>
              </small>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
