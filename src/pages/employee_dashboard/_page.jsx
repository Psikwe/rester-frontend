import React from "react";
import { employeeDashboardMenus } from "../../core/data";
import { NavLink, Outlet } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import { Offcanvas, Ripple, Dropdown, initTWE } from "tw-elements";
import styles from "@/styles/Navbar.module.scss";
import { RxAvatar } from "react-icons/rx";
import { CiLogin, CiLogout } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import { BsExclamationCircle, BsFillInfoSquareFill } from "react-icons/bs";
import Modal from "../../components/modal/_component";
import moment from "moment";
import { clearUserSession } from "../../core/utilities";
import { IoMdMenu } from "react-icons/io";
import { IoCalculator } from "react-icons/io5";
import logo from "../../assets/Rester.svg";

const EmployeeDashboardLayout = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);
  const [showNewPasswordType, setShowNewPasswordType] = React.useState(false);
  const [showOldPasswordType, setShowOldPasswordType] = React.useState(false);

  React.useEffect(() => {
    initTWE({ Offcanvas, Ripple, Dropdown });
  }, []);

  const d = new Date();
  let showDate = moment(d).format("lll");
  const handleLoginNavigation = () => {
    navigate("/login");
  };
  const newPasswordToggle = () => {
    setShowNewPasswordType(!showNewPasswordType);
  };
  const oldPasswordToggle = () => {
    setShowOldPasswordType(!showOldPasswordType);
  };

  const handleLogout = () => {
    clearUserSession();
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

  const navigation = [
    {
      name: "Update Details",
      href: "/employee/update-employee",
      logo: <BsFillInfoSquareFill className="icon-color" />,
    },
    {
      name: "Payslip",
      href: "#",
      logo: <IoCalculator className="icon-color" />,
    },
  ];
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
        <div className="mobile:hidden tablet:hidden text-sm w-80 pt-3 px-3 m-8 border-r-[1px] bg-[#e3f0ff] border-slate-100 rounded-2xl">
          <b>R</b>ester
          <ul className="mt-12">
            {employeeDashboardMenus.map((ad, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center mt-9">
                  <span>{ad.icon}</span>
                  <h2 className="font-medium text-[#687864]">{ad.title}</h2>
                </div>

                {ad.subMenu.map((sub, i) => (
                  <NavLink key={i} to={sub.url}>
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
          <div className="flex justify-between px-40 mt-4 mobile:hidden tablet:hidden laptop-lg:px-20">
            <div className="flex items-center justify-between ">
              <MdAdminPanelSettings color="#687864" size={30} />

              <div className="flex items-center justify-between">
                <small className="ml-1 ">Hello Employee</small>
              </div>
            </div>
            <div className="m-auto mobile:hidden tablet:hidden text-slate-400">
              {showDate}
            </div>
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

          <div className="from-nav-laptop-to-laptop-xl:hidden">
            <div className="flex items-center justify-between h-16">
              <a
                className="me-1.5 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white  transition duration-150 ease-in-out  focus:outline-none focus:ring-0 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                data-twe-offcanvas-toggle
                href="#employeeOffcanvas"
                role="button"
                aria-controls="employeeOffcanvas"
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                <IoMdMenu color="black" size={25} />
              </a>
              <div>
                <NavLink to="/" style={{ color: "#000" }}>
                  <img className="w-32" src={logo} />
                </NavLink>
              </div>
            </div>

            <div
              className="invisible w-72 fixed bottom-0 left-0 top-0 z-[1045] flex max-w-full -translate-x-full flex-col border-none bg-white bg-clip-padding text-neutral-700 shadow-sm outline-none transition duration-300 ease-in-out data-[twe-offcanvas-show]:transform-none dark:bg-body-dark dark:text-white"
              tabIndex="-1"
              id="employeeOffcanvas"
              aria-labelledby="employeeOffcanvasLabel"
              data-twe-offcanvas-init
            >
              <div className="flex items-center justify-between p-4">
                <h5
                  className="mb-0 font-semibold leading-normal"
                  id="employeeOffcanvasLabel"
                >
                  Menu
                </h5>
                <button
                  type="button"
                  className="box-content border-none rounded-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                  data-twe-offcanvas-dismiss
                  aria-label="Close"
                >
                  <span className="[&>svg]:h-6 [&>svg]:w-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="flex flex-col p-4 overflow-y-auto">
                <div className={`${styles.menu} flex flex-col`}>
                  {navigation.map((link, i) => (
                    <NavLink key={i} to={link.href}>
                      <div className="flex items-center mb-5 mr-6">
                        <div className="mr-1 text-blue-400">{link.logo}</div>
                        <span className="hover:text-[#31708E] duration-700">
                          {link.name}
                        </span>
                      </div>
                    </NavLink>
                  ))}
                </div>
                <div
                  onClick={openLogoutModal}
                  className="absolute flex items-center h-12 cursor-pointer bottom-2 button clear"
                >
                  <CiLogin color="red" size={50} title="Login" />
                  {/* <NavLink to="/login">Login</NavLink> */}
                </div>
              </div>
            </div>
          </div>
          <div className="px-40 mt-16 mobile:px-8 laptop-lg:px-20">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboardLayout;
