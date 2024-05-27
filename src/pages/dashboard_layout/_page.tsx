import React from "react";
import { adminDashboardMenus } from "../../core/data";
import { NavLink, Outlet } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { Dropdown, Ripple, initTWE } from "tw-elements";
import { CiLogout } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import { BsExclamationCircle } from "react-icons/bs";
import Modal from "../../components/modal/_component";
import moment from "moment";

type Props = {};

const DashboardLayout = (props: Props) => {
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
    alert("not implemented yet");
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
  return (
    <>
      <Modal open={isModalOpen} close={closeModal}>
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

      <Modal open={isLogoutModalOpen} close={closeLogoutModal}>
        <div className="w-full bg-white p-14">
          <div className="flex justify-center mb-2">
            <BsExclamationCircle size={70} color="red" />
          </div>

          <p>Are you sure you want to logout?</p>
          <div className="flex">
            <button
              onClick={closeLogoutModal}
              className="w-full py-3 mr-2 text-white mt-9 primary mobile:w-full"
            >
              No
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-3 text-white bg-red-500 mt-9 mobile:w-full"
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>

      <div className="flex w-full h-screen mb-8 overflow-x-hidden">
        <div className="w-80 px-3 m-8 border-r-[1px] bg-[#e3f0ff] border-slate-100 rounded-2xl">
          <b>R</b>ester
          <ul className="mt-12">
            {adminDashboardMenus.map((ad, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center mt-9">
                  <span>{ad.icon}</span>
                  <h2 className="font-medium text-[#687864]">{ad.title}</h2>
                </div>

                {ad.subMenu.map((sub, i) => (
                  <NavLink to={sub.url}>
                    <li
                      className="flex items-center mt-3 font-thin hover:text-black"
                      key={i}
                    >
                      {sub.icon}
                      {sub.menu}
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
          <div className="flex justify-between px-40 mt-4 laptop-lg:px-20">
            <div className="flex items-center justify-between ">
              <MdAdminPanelSettings color="#687864" size={30} />

              <div className="flex items-center justify-between">
                <small className="ml-1 ">Hello Admin</small>
              </div>
            </div>
            <div className="m-auto text-slate-400">{showDate}</div>
            <div className="flex items-center cursor-pointer">
              <div className="relative" data-twe-dropdown-ref>
                <button
                  className="flex items-center rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out motion-reduce:transition-none"
                  type="button"
                  id="dropdownMenuButton1"
                  data-twe-dropdown-toggle-ref
                  aria-expanded="false"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                >
                  <RxAvatar color="#687864" size={30} />
                  <span className="ms-2 w-2 [&>svg]:h-5 [&>svg]:w-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
                <ul
                  className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
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
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
