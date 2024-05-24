import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import IncomeTaxCalculator from "@/components/IncomeTaxCalculator";
import GrossIncomeCalculator from "@/components/GrossIncomeCalculator";
import Footer from "@/components/Footer";

function Home() {
  const [calculator, setCalculator] = useState("incomeTax");
  const navigate = useNavigate();
  const handleSignupNavigation = () => {
    navigate("/signup");
  };
  return (
    <>
      <header style={{ backgroundColor: "#EEEEEE" }}>
        <div className="flex justify-end animate-pulse mobile:hidden">
          <div className="">
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
                  <stop stopColor="#000" stopOpacity="0"></stop>
                  <stop offset="1" stopColor="#000"></stop>
                </linearGradient>
                <linearGradient
                  id="paint1_linear_25:218"
                  x1="156.389"
                  y1="69.2405"
                  x2="156.389"
                  y2="212.24"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#000" stopOpacity="0"></stop>
                  <stop offset="1" stopColor="#000"></stop>
                </linearGradient>
                <linearGradient
                  id="paint2_linear_25:218"
                  x1="125.389"
                  y1="69.2405"
                  x2="125.389"
                  y2="212.24"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#000" stopOpacity="0"></stop>
                  <stop offset="1" stopColor="#000"></stop>
                </linearGradient>
                <linearGradient
                  id="paint3_linear_25:218"
                  x1="93.8507"
                  y1="67.2674"
                  x2="89.9278"
                  y2="210.214"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#000" stopOpacity="0"></stop>
                  <stop offset="1" stopColor="#000"></stop>
                </linearGradient>
                <linearGradient
                  id="paint4_linear_25:218"
                  x1="214.505"
                  y1="10.2849"
                  x2="212.684"
                  y2="99.5816"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#000"></stop>
                  <stop offset="1" stopColor="#000" stopOpacity="0"></stop>
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
        </div>
        <div className="mobile:hidden animate-pulse mt-72">
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
                <stop stopColor="#000" stopOpacity="0"></stop>
                <stop offset="1" stopColor="#000"></stop>
              </linearGradient>
              <linearGradient
                id="paint1_linear_25:218"
                x1="156.389"
                y1="69.2405"
                x2="156.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#000" stopOpacity="0"></stop>
                <stop offset="1" stopColor="#000"></stop>
              </linearGradient>
              <linearGradient
                id="paint2_linear_25:218"
                x1="125.389"
                y1="69.2405"
                x2="125.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#000" stopOpacity="0"></stop>
                <stop offset="1" stopColor="#000"></stop>
              </linearGradient>
              <linearGradient
                id="paint3_linear_25:218"
                x1="93.8507"
                y1="67.2674"
                x2="89.9278"
                y2="210.214"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#000" stopOpacity="0"></stop>
                <stop offset="1" stopColor="#000"></stop>
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:218"
                x1="214.505"
                y1="10.2849"
                x2="212.684"
                y2="99.5816"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#000"></stop>
                <stop offset="1" stopColor="#000" stopOpacity="0"></stop>
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
        <div className="flex items-center mobile:p-4 laptop-lg:px-32 from-laptop-to-laptop-xl:absolute from-laptop-to-laptop-xl:top-24 laptop-xl:px-72 from-laptop-to-laptop-xl:my-16 mobile:flex-col pb-28 from-nav-laptop-to-laptop-xl:hero">
          <div className="mt-8 from-laptop-to-laptop-xl:hero-text">
            <p className="mb-8 text-5xl font-bold">
              Simple Tax Calculation For
              <div className="cursive">Ghanaian Businesses</div>
            </p>
            <p className="subtitle">
              Empower your business with Rester, the ultimate tool to
              effortlessly compute PAYE and generate reports compliant with
              Ghanaian tax laws.
            </p>
            <div className="flex from-laptop-to-laptop-xl:hidden hero-image-container">
              <img alt="dashboard image" src="/african-woman.jpg" />
            </div>
            <div className="mt-8 button-group hero-buttons">
              <button
                onClick={handleSignupNavigation}
                className=" hover:bg-[#db7660] duration-700 mobile:w-full button primary"
              >
                Get Started &#8599;
              </button>
            </div>
          </div>

          <div className="flex ml-8 mobile:hidden laptop:hidden tablet:hidden hero-image-container">
            <img
              alt="dashboard image"
              className="w-[50rem] h-[30rem]"
              src="/african-woman.jpg"
            />
          </div>
        </div>
      </header>
      <section className="flex laptop-lg:px-40 laptop-xl:px-72 features mobile:p-9 column">
        <div className="flex mobile:flex-col row center">
          <button
            className={
              calculator === "incomeTax"
                ? "bg-black mobile:w-full text-white p-3"
                : "border-2 mobile:w-full border-black p-3"
            }
            onClick={() => setCalculator("incomeTax")}
          >
            Income Tax Calculator
          </button>
          <button
            className={
              calculator === "grossIncome"
                ? "bg-black mobile:mt-6 mobile:w-full text-white p-3"
                : "border-2 mobile:mt-6 mobile:w-full border-black p-3"
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

        <p className="flex mt-16 title center">Features</p>
        <hr className="flex justify-center m-auto -mt-2 border-2 border-red-400 w-36" />

        <div className="flex items-center mt-12 mobile:flex-col from-laptop-to-laptop-xl:feature">
          <div className="flex column from-laptop-to-laptop-xl:feature-text mobile:mb-4">
            <p className="smallTitle">Tax Calculation</p>
            <p>
              Streamline your HR processes by efficiently onboarding,
              offboarding, and managing your employees with our user-friendly
              tools. Keep your team organized and focused on what matters most.
            </p>
          </div>
          <div className="flex feature-image">
            <img alt="dashboard image" src="/dashboard.png" />
          </div>
        </div>

        <div className="flex items-center mobile:mt-16 mt-44 mobile:flex-col-reverse from-laptop-to-laptop-xl:feature row">
          <div className="flex mobile:mt-4 feature-image">
            <img alt="dashboard image" src="/dashboard.png" />
          </div>
          <div className="flex column from-laptop-to-laptop-xl:feature-text">
            <p className="smallTitle">Manage Employees</p>
            <p>
              Streamline your HR processes by efficiently onboarding,
              offboarding, and managing your employees with our user-friendly
              tools. Keep your team organized and focused on what matters most.
            </p>
          </div>
        </div>

        <div className="flex items-center mobile:mt-16 mt-44 mobile:flex-col from-laptop-to-laptop-xl:feature">
          <div className="flex column from-laptop-to-laptop-xl:feature-text mobile:mb-4">
            <p className="smallTitle">Collaboration</p>
            <p>
              Enhance teamwork and efficiency by inviting co-admins to entities
              for seamless collaboration and precise access control. Work
              together effortlessly, ensuring everyone has the right level of
              access.
            </p>
          </div>
          <div className="flex feature-image">
            <img alt="dashboard image" src="/dashboard.png" />
          </div>
        </div>

        <div className="flex items-center mobile:mt-16 mt-44 mobile:flex-col-reverse from-laptop-to-laptop-xl:feature row">
          <div className="flex mobile:mt-4 feature-image">
            <img alt="dashboard image" src="/dashboard.png" />
          </div>
          <div className="flex column from-laptop-to-laptop-xl:feature-text">
            <p className="smallTitle">Statutory and Financial Reporting</p>
            <p>
              Stay compliant and informed by generating statutory and financial
              reports effortlessly. Rester makes it easy to create accurate and
              compliant reports, giving you peace of mind and saving you time
              and effort.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
