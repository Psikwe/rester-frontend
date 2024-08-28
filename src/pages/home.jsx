import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import IncomeTaxCalculator from "@/components/IncomeTaxCalculator";
import GrossIncomeCalculator from "@/components/GrossIncomeCalculator";
import Footer from "@/components/Footer";
import banner from "../assets/banner.webp";
import { Typewriter } from "react-simple-typewriter";

function Home() {
  const [calculator, setCalculator] = useState("incomeTax");
  const navigate = useNavigate();
  const handleSignupNavigation = () => {
    navigate("/signup");
  };
  return (
    <>
      <div style={{ backgroundColor: "#EEEEEE" }}>
        {/* <div className="absolute top-[5rem] right-0 z-50">
          <div>
            <svg
              width="364"
              height="201"
              viewBox="0 0 364 201"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="animate-pulse"
                d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
                stroke="url(#paint0_linear_25:218)"
              ></path>
              <path
                d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
                stroke="url(#paint1_linear_25:218)"
              ></path>
              <path
                className="animate-pulse"
                d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
                stroke="url(#paint2_linear_25:218)"
              ></path>
              <path
                d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
                stroke="url(#paint3_linear_25:218)"
              ></path>
              <circle
                opacity="0.8"
                cx="214.505"
                cy="60.5054"
                r="49.7205"
                transform="rotate(-13.421 214.505 60.5054)"
                stroke="url(#paint4_linear_25:218)"
              ></circle>
              <circle
                className="animate-pulse"
                cx="220"
                cy="63"
                r="43"
                fill="url(#paint5_radial_25:218)"
              ></circle>
              <defs>
                <linearGradient
                  id="paint0_linear_25:218"
                  x1="184.389"
                  y1="69.2405"
                  x2="184.389"
                  y2="212.24"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#ffcc00" stopOpacity="0"></stop>
                  <stop offset="1" stopColor="#ffcc00"></stop>
                </linearGradient>
                <linearGradient
                  id="paint1_linear_25:218"
                  x1="156.389"
                  y1="69.2405"
                  x2="156.389"
                  y2="212.24"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#ffcc00" stopOpacity="0"></stop>
                  <stop offset="1" stopColor="#ffcc00"></stop>
                </linearGradient>
                <linearGradient
                  id="paint2_linear_25:218"
                  x1="125.389"
                  y1="69.2405"
                  x2="125.389"
                  y2="212.24"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#ffcc00" stopOpacity="0"></stop>
                  <stop offset="1" stopColor="#ffcc00"></stop>
                </linearGradient>
                <linearGradient
                  id="paint3_linear_25:218"
                  x1="93.8507"
                  y1="67.2674"
                  x2="89.9278"
                  y2="210.214"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#ffcc00" stopOpacity="0"></stop>
                  <stop offset="1" stopColor="#ffcc00"></stop>
                </linearGradient>
                <linearGradient
                  id="paint4_linear_25:218"
                  x1="214.505"
                  y1="10.2849"
                  x2="212.684"
                  y2="99.5816"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#ffcc00"></stop>
                  <stop offset="1" stopColor="#ffcc00" stopOpacity="0"></stop>
                </linearGradient>
                <radialGradient
                  id="paint5_radial_25:218"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(220 63) rotate(90) scale(43)"
                >
                  <stop
                    offset="0.145833"
                    stopColor="white"
                    stopOpacity="0"
                  ></stop>
                  <stop offset="1" stopColor="white" stopOpacity="0.08"></stop>
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div> */}
        <div className="relative">
          <img
            src={banner}
            className="w-full object-fit h-[30rem] mobile:h-[24rem] brightness-50"
          />
          <div className="flex justify-end animate-pulse mobile:hidden"></div>
          <div className="absolute top-0 flex items-center mobile:p-4 laptop-lg:px-32 laptop-xl:px-72 from-laptop-to-laptop-xl:my-16 mobile:flex-col pb-28 from-nav-laptop-to-laptop-xl:hero">
            <div className="mt-8 from-laptop-to-laptop-xl:hero-text">
              <p className="mb-8 text-5xl font-bold text-white mobile:text-2xl">
                {
                  <Typewriter
                    words={[
                      "Welcome To Rester Application For",
                      "A Simple Tax Calculation For",
                      "A Great Application To Help Boost",
                    ]}
                    cursor
                    loop={true}
                    cursorStyle="_"
                    cursorColor="#31708E"
                    color
                    typeSpeed={50}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                }

                <div className="cursive">Ghanaian Businesses!</div>
              </p>
              <p className="text-[#F7F9FB] mobile:text-base subtitle">
                Empower your business with Rester, the ultimate tool to
                effortlessly compute PAYE and generate reports compliant with
                Ghanaian tax laws.
              </p>
              {/* <div className="flex from-laptop-to-laptop-xl:hidden hero-image-container">
                <img alt="dashboard image" src="/african-woman.jpg" />
              </div> */}
              <div className="mt-8 rounded-full hero-buttons">
                <button
                  onClick={handleSignupNavigation}
                  className="text-sm duration-700 rounded-full mobile:w-1/2 button primary"
                >
                  Get Starte &#8599;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="bg-[#f0f6ff] laptop-lg:px-40 laptop-xl:px-72 features mobile:p-9 flex flex-col justify-center text-4xl">
        <div className="flex justify-center">
          Find the ideal payroll solution for your business:
        </div>
        <div className="flex justify-center">
          <ul className="text-lg list-disc">
            <li>Create up to 1 company for free</li>
            <li>Onboard up to 10 employees for free</li>
          </ul>
        </div>
      </section>
      <section className="flex laptop-lg:px-40 laptop-xl:px-72 features mobile:p-9 column">
        <div
          id="calculator-section"
          className="flex mobile:flex-col row center"
        >
          <button
            className={
              calculator === "incomeTax"
                ? "border-[#33b655] border-2 rounded-full mobile:w-full text-black p-3"
                : "border-2 rounded-full mobile:w-full border-[primary] p-3"
            }
            onClick={() => setCalculator("incomeTax")}
          >
            PAYE Tax Calculator
          </button>
          <button
            className={
              calculator === "grossIncome"
                ? "border-[#33b655] border-2 rounded-full mobile:mt-6 mobile:w-full text-black p-3"
                : "border-2 rounded-full mobile:mt-6 mobile:w-full border-[primary] p-3"
            }
            onClick={() => setCalculator("grossIncome")}
          >
            Gross Income Calculator
          </button>
        </div>
        <div className="flex from-laptop-to-laptop-xl:calculators row">
          {calculator === "incomeTax" && <IncomeTaxCalculator />}
          {calculator === "grossIncome" && <GrossIncomeCalculator />}
        </div>
      </section>
      {/* <div className="absolute top-[21rem]">
        <div>
          <svg
            width="364"
            height="201"
            viewBox="0 0 364 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="animate-pulse"
              d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
              stroke="url(#paint0_linear_25:218)"
            ></path>
            <path
              d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
              stroke="url(#paint1_linear_25:218)"
            ></path>
            <path
              className="animate-pulse"
              d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
              stroke="url(#paint2_linear_25:218)"
            ></path>
            <path
              d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
              stroke="url(#paint3_linear_25:218)"
            ></path>
            <circle
              opacity="0.8"
              cx="214.505"
              cy="60.5054"
              r="49.7205"
              transform="rotate(-13.421 214.505 60.5054)"
              stroke="url(#paint4_linear_25:218)"
            ></circle>
            <circle
              className="animate-pulse"
              cx="220"
              cy="63"
              r="43"
              fill="url(#paint5_radial_25:218)"
            ></circle>
            <defs>
              <linearGradient
                id="paint0_linear_25:218"
                x1="184.389"
                y1="69.2405"
                x2="184.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ffcc00" stopOpacity="0"></stop>
                <stop offset="1" stopColor="#ffcc00"></stop>
              </linearGradient>
              <linearGradient
                id="paint1_linear_25:218"
                x1="156.389"
                y1="69.2405"
                x2="156.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ffcc00" stopOpacity="0"></stop>
                <stop offset="1" stopColor="#ffcc00"></stop>
              </linearGradient>
              <linearGradient
                id="paint2_linear_25:218"
                x1="125.389"
                y1="69.2405"
                x2="125.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ffcc00" stopOpacity="0"></stop>
                <stop offset="1" stopColor="#ffcc00"></stop>
              </linearGradient>
              <linearGradient
                id="paint3_linear_25:218"
                x1="93.8507"
                y1="67.2674"
                x2="89.9278"
                y2="210.214"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ffcc00" stopOpacity="0"></stop>
                <stop offset="1" stopColor="#ffcc00"></stop>
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:218"
                x1="214.505"
                y1="10.2849"
                x2="212.684"
                y2="99.5816"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ffcc00"></stop>
                <stop offset="1" stopColor="#ffcc00" stopOpacity="0"></stop>
              </linearGradient>
              <radialGradient
                id="paint5_radial_25:218"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(220 63) rotate(90) scale(43)"
              >
                <stop
                  offset="0.145833"
                  stopColor="white"
                  stopOpacity="0"
                ></stop>
                <stop offset="1" stopColor="white" stopOpacity="0.08"></stop>
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div> */}
    </>
  );
}

export default Home;
