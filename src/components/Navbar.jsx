import { NavLink } from "react-router-dom";
import styles from "@/styles/Navbar.module.scss";
import { IoMenu } from "react-icons/io5";
import { Offcanvas, Ripple, Dropdown, initTWE } from "tw-elements";
import "tw-elements";
import { CiLogin } from "react-icons/ci";
import { Tooltip } from "tw-elements";
import { IoCalculator } from "react-icons/io5";
import { MdOutlinePriceChange } from "react-icons/md";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { useEffect } from "react";

export default function Navbar() {
  const navigation = [
    { name: "About", href: "#", logo: <BsFillInfoSquareFill /> },
    {
      name: "Reverse Calculator",
      href: "#",
      logo: <IoCalculator />,
    },
    { name: "Pricing", href: "#", logo: <MdOutlinePriceChange /> },

    { name: "Mini Calculator", href: "#", logo: <IoCalculator /> },
  ];
  useEffect(() => {
    initTWE({ Offcanvas, Ripple, Dropdown });
  }, []);

  return (
    <>
      {/* ************** Desktop Nav ***************/}
      <nav
        className={`${styles.nav}  laptop-lg:px-32  laptop-xl:px-72 mobile:hidden tablet:hidden`}
      >
        <div className={styles.start}>
          <NavLink to="/" style={{ color: "#000" }}>
            <b>R</b>ester
          </NavLink>
        </div>
        <div className="flex">
          {navigation.map((link, i) => (
            <NavLink key={i} to={link.href}>
              <div className="flex items-center mr-6">
                <div className="mr-1 text-blue-400">{link.logo}</div>
                <span className="hover:text-[#f56342] duration-700">
                  {link.name}
                </span>
              </div>
            </NavLink>
          ))}
        </div>

        <div>
          <div className="flex gap-6">
            <div className="h-12 p-3 hover:bg-[#db7660] duration-700 hover:text-white cursor-pointer text-white bg-[#f67153]">
              <NavLink className="duration-700 hover:text-white" to="/signup">
                Get Started
              </NavLink>
            </div>
            <div className="inline-block -mt-12 h-[100px] w-0.5 bg-black"></div>
            <div className="flex items-center h-12 button clear">
              <CiLogin color="blue" size={50} title="Login" />
              {/* <NavLink to="/login">Login</NavLink> */}
            </div>
          </div>
        </div>
      </nav>

      {/* ************** Mobile Nav ***************/}
      <div className="from-nav-laptop-to-laptop-xl:hidden">
        <div className="flex items-center justify-between">
          <a
            className="me-1.5 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white  transition duration-150 ease-in-out  focus:outline-none focus:ring-0 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            data-twe-offcanvas-toggle
            href="#offcanvasExample"
            role="button"
            aria-controls="offcanvasExample"
            data-twe-ripple-init
            data-twe-ripple-color="light"
          >
            <IoMenu color="black" size={30} />
          </a>
          <div className={styles.start}>
            <NavLink to="/" style={{ color: "#000" }}>
              <b>R</b>ester
            </NavLink>
          </div>
        </div>

        <div
          className="invisible fixed bottom-0 left-0 top-0 z-[1045] flex w-96 max-w-full -translate-x-full flex-col border-none bg-white bg-clip-padding text-neutral-700 shadow-sm outline-none transition duration-300 ease-in-out data-[twe-offcanvas-show]:transform-none dark:bg-body-dark dark:text-white"
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
          data-twe-offcanvas-init
        >
          <div className="flex items-center justify-between p-4">
            <h5
              className="mb-0 font-semibold leading-normal"
              id="offcanvasExampleLabel"
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
                  <div className="flex items-center mr-6">
                    <div className="mr-1 text-blue-400">{link.logo}</div>
                    <span className="hover:text-[#f56342] duration-700">
                      {link.name}
                    </span>
                  </div>
                </NavLink>
              ))}
            </div>
            <div className="absolute flex items-center h-12 bottom-2 button clear">
              <CiLogin color="blue" size={50} title="Login" />
              {/* <NavLink to="/login">Login</NavLink> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
