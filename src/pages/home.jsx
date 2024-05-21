import { useState } from "react";
import Navbar from "@/components/Navbar";
import IncomeTaxCalculator from "@/components/IncomeTaxCalculator";
import GrossIncomeCalculator from "@/components/GrossIncomeCalculator";
import Footer from "@/components/Footer";

function Home() {
  const [calculator, setCalculator] = useState("incomeTax");
  return (
    <>
      <header
        className="from-laptop-to-laptop-xl:px-72"
        style={{ backgroundColor: "#EEEEEE" }}
      >
        <div className="container flex items-center mx-auto from-laptop-to-laptop-xl:my-16 mobile:flex-col pb-28 from-nav-laptop-to-laptop-xl:hero">
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
              <button className=" mobile:w-full button primary">
                Get Started &#8599;
              </button>
            </div>
          </div>

          <div className="flex mobile:hidden hero-image-container">
            <img
              alt="dashboard image"
              className="w-[30rem] h-[30rem]"
              src="/african-woman.jpg"
            />
          </div>
        </div>
      </header>
      <section className="flex from-laptop-to-laptop-xl:px-72 features mobile:p-9 column">
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

        <div className="flex feature row">
          <div className="flex column feature-text">
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

        <div className="flex feature row">
          <div className="flex feature-image">
            <img alt="dashboard image" src="/dashboard.png" />
          </div>
          <div className="flex column feature-text">
            <p className="smallTitle">Manage Employees</p>
            <p>
              Streamline your HR processes by efficiently onboarding,
              offboarding, and managing your employees with our user-friendly
              tools. Keep your team organized and focused on what matters most.
            </p>
          </div>
        </div>

        <div className="flex feature row">
          <div className="flex column feature-text">
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

        <div className="flex feature row">
          <div className="flex feature-image">
            <img alt="dashboard image" src="/dashboard.png" />
          </div>
          <div className="flex column feature-text">
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
