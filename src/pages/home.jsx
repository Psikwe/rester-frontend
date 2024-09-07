import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IncomeTaxCalculator from "@/components/IncomeTaxCalculator";
import GrossIncomeCalculator from "@/components/GrossIncomeCalculator";
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
        <div className="relative">
          <img
            src={banner}
            className="w-full object-fit h-[30rem] mobile:h-[24rem] brightness-50"
          />
          <div className="flex justify-end animate-pulse mobile:hidden"></div>
          <div className="absolute top-0 flex items-center mobile:p-4 laptop-lg:px-32 laptop-xl:px-72 from-laptop-to-laptop-xl:my-16 mobile:flex-col pb-28 from-nav-laptop-to-laptop-xl:hero">
            <div className="mt-8 from-laptop-to-laptop-xl:hero-text">
              <div className="mb-8 text-5xl font-bold text-white mobile:text-2xl">
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
              </div>
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
    </>
  );
}

export default Home;
