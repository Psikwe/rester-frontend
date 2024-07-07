import React from "react";
import { adminDashboardMenus } from "../../core/data";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { Dropdown, Ripple, initTWE } from "tw-elements";
import { CiLogout } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdCurrencyExchange } from "react-icons/md";
import { MdOutlineLanguage } from "react-icons/md";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import { BsExclamationCircle } from "react-icons/bs";
import Modal from "../../components/modal/_component";
import logo from "../../assets/rester.png";
import { IoArrowBackCircle } from "react-icons/io5";
import moment from "moment";
import { clearUserSession } from "../../core/utilities";

const SuperAdminDashboardLayout = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);
  const [selectedMenu, setSelectedMenu] = React.useState(0);
  const [showNewPasswordType, setShowNewPasswordType] = React.useState(false);
  const [showOldPasswordType, setShowOldPasswordType] = React.useState(false);

  React.useEffect(() => {
    initTWE({ Dropdown, Ripple });
  }, []);

  const d = new Date();
  let showDate = moment(d).format("lll");

  const newPasswordToggle = () => {
    setShowNewPasswordType(!showNewPasswordType);
  };
  const oldPasswordToggle = () => {
    setShowOldPasswordType(!showOldPasswordType);
  };

  const handleLogout = () => {
    clearUserSession();
    // window.location.href = "/";
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };
  const { pathname } = useLocation();
  console.log(pathname);
  const entityName = localStorage.getItem("entity_name");

  const goback = () => {
    window.history.back();
  };
  return (
    <>
      <Modal showCloseBtn={true} open={isModalOpen} close={closeModal}>
        <form className="p-16 bg-white">
          <div className="relative">
            <label className="label bold">Enter Old Password</label>
            <div className="control">
              <input
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-[30rem] pl-10 p-2.5"
                type={showNewPasswordType ? "text" : "password"}
                placeholder="New Password"
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
          <div className="relative mt-8">
            <label className="label bold">Enter New Password</label>
            <div className="control">
              <input
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-[30rem] pl-10 p-2.5 "
                type={showNewPasswordType ? "text" : "password"}
                placeholder="Old Password"
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
          <button
            type="submit"
            className="w-full py-3 text-white mt-9 primary mobile:w-full"
          >
            Submit
          </button>
        </form>
      </Modal>

      <Modal
        showCloseBtn={true}
        open={isLogoutModalOpen}
        close={closeLogoutModal}
      >
        <div className="w-full bg-white p-14">
          <div className="flex justify-center mb-2">
            <BsExclamationCircle size={70} color="red" />
          </div>

          <p>Are you sure you want to logout?</p>
          <div className="flex">
            <button
              onClick={closeLogoutModal}
              className="w-full mr-2 text-white rounded-full mt-9 primary mobile:w-full"
            >
              No
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-2 text-white bg-red-500 rounded-full mt-9 mobile:w-full"
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>

      <div className="flex w-full h-screen mb-8 overflow-x-hidden">
        <div className="px-3 pt-3 m-8 text-sm w-72">
          <img className="w-24 -mt-16 -ml-16" src={logo} />
          <ul className="mt-12 text-slate-600">
            {adminDashboardMenus.map((ad, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center mt-9">
                  <span className="mr-1">{ad.icon}</span>
                  <h2 className="font-medium text-black">{ad.title}</h2>
                </div>

                {ad.subMenu.map((sub, i) => (
                  <NavLink key={i} to={sub.url}>
                    <li
                      className="flex items-center mt-3 font-thin hover:text-black"
                      key={i}
                    >
                      <span className="mr-1">{sub.icon}</span>
                      <span
                        className={`${
                          pathname === sub.url
                            ? "bg-[#1A55E3] rounded-md w-full p-2 text-white"
                            : "w-full p-2 "
                        }`}
                      >
                        {sub.menu}
                      </span>
                    </li>
                  </NavLink>
                ))}
              </React.Fragment>
            ))}
          </ul>
          <div className="absolute bottom-2 left-3">
            <div className="cursor-pointer">
              {/* <Icons.Logout
                size={30}
                className="w-10 mx-auto -mt-8 text-red-600 cursor-pointer"
              /> */}
            </div>
          </div>
        </div>

        <div className="w-full bg-[#f5f9fe] overflow-auto h-screen">
          <div className="flex h-12 justify-between px-40 bg-[#1A55E3] laptop-lg:px-20">
            <div className="flex items-center justify-between ">
              <MdAdminPanelSettings className="text-slate-200" size={20} />
              <div className="flex items-center justify-between">
                <small className="ml-1 text-slate-200">{entityName}</small>
              </div>
            </div>
            <div className="m-auto text-sm text-slate-200">{showDate}</div>
            <div className="flex items-center cursor-pointer">
              <button
                className="flex items-center rounded pb-2 pt-2.5 text-xs font-medium text-white "
                type="button"
                id="settingsMenu"
                data-twe-dropdown-toggle-ref
                aria-expanded="false"
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                <IoMdSettings className="text-white" size={20} />

                <span className="ms-2 w-2 [&>svg]:h-5 [&>svg]:w-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
              <ul
                className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
                aria-labelledby="settingsMenu"
                data-twe-dropdown-menu-ref
              >
                <li>
                  <span
                    className="flex items-center w-full px-4 py-2 text-sm font-normal bg-white whitespace-nowrap text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none"
                    data-twe-dropdown-item-ref
                    // onClick={openModal}
                  >
                    <span className="mr-1">
                      <MdCurrencyExchange color="#687864" size={20} />
                    </span>
                    Change Currency
                  </span>
                </li>
                <li>
                  <span
                    className="flex items-center w-full px-4 py-2 text-sm font-normal bg-white whitespace-nowrap text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none"
                    data-twe-dropdown-item-ref
                    // onClick={openModal}
                  >
                    <span className="mr-1">
                      <MdOutlineLanguage color="#687864" size={20} />
                    </span>
                    Change Language
                  </span>
                </li>
              </ul>
              <div className="relative" data-twe-dropdown-ref>
                <button
                  className="flex items-center rounded px-6 pb-2 pt-2.5 text-xs font-medium text-white "
                  type="button"
                  id="dropdownMenuButton1"
                  data-twe-dropdown-toggle-ref
                  aria-expanded="false"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                >
                  <RxAvatar className="text-white" size={20} />

                  <span className="ms-2 w-2 [&>svg]:h-5 [&>svg]:w-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
                <ul
                  className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
                  aria-labelledby="dropdownMenuButton1"
                  data-twe-dropdown-menu-ref
                >
                  <li>
                    <span
                      className="flex items-center w-full px-4 py-2 text-sm font-normal bg-white whitespace-nowrap text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none"
                      data-twe-dropdown-item-ref
                      onClick={openModal}
                    >
                      <span className="mr-1">
                        <RiLockPasswordLine color="#687864" size={20} />
                      </span>
                      Change Password
                    </span>
                  </li>
                  <li>
                    <span
                      className="flex items-center w-full px-4 py-2 text-sm font-normal bg-white whitespace-nowrap text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none"
                      data-twe-dropdown-item-ref
                      onClick={openModal}
                    >
                      <span className="mr-1">
                        <RiLockPasswordLine color="#687864" size={20} />
                      </span>
                      Reset
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={openLogoutModal}
                      className="flex items-center w-full px-4 py-2 text-sm font-normal bg-white whitespace-nowrap text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none"
                      data-twe-dropdown-item-ref
                    >
                      <span className="mr-1">
                        <CiLogout color="red" size={20} />
                      </span>
                      Logout
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="px-40 mt-16 laptop-lg:px-20">
            <div
              onClick={goback}
              title="Go back"
              className="flex items-center mb-6 cursor-pointer"
            >
              <IoArrowBackCircle size={40} />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminDashboardLayout;
