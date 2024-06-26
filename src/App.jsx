import "./App.css";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import IncomeTaxCalculator from "@/components/IncomeTaxCalculator";
import GrossIncomeCalculator from "@/components/GrossIncomeCalculator";
import Footer from "@/components/Footer";
import "tw-elements";

function App() {
  const [calculator, setCalculator] = useState("incomeTax");
  return (
    <>
      <section>
        <header className="flex column">
          <Navbar />
          <div className="flex row hero">
            <div className="flex column hero-text">
              <p className="title">
                Simple Tax Calculation For
                <div className="cursive">Ghanaian Businesses</div>
              </p>
              <p className="subtitle">
                Empower your business with Rester, the ultimate tool to
                effortlessly compute PAYE and generate reports compliant with
                Ghanaian tax laws.
              </p>
              <div className="button-group hero-buttons">
                <button className="button primary">Get Started &#8599;</button>
              </div>
            </div>

            <div className="flex hero-image-container">
              <img
                alt="dashboard image"
                src="/african-woman.jpg"
                className="hero-image"
              />
            </div>
          </div>
        </header>
        <section className="flex features column">
          <div className="flex row center">
            <button
              className={calculator === "incomeTax" ? "inverse" : "outline"}
              onClick={() => setCalculator("incomeTax")}
            >
              Income Tax Calculator
            </button>
            <button
              className={calculator === "grossIncome" ? "inverse" : "outline"}
              onClick={() => setCalculator("grossIncome")}
            >
              Gross Income Calculator
            </button>
          </div>
          <div className="flex calculators row">
            {calculator === "incomeTax" && <IncomeTaxCalculator />}
            {calculator === "grossIncome" && <GrossIncomeCalculator />}
          </div>

          <p className="flex title center">Features</p>

          <div className="flex feature row">
            <div className="flex column feature-text">
              <p className="smallTitle">Tax Calculation</p>
              <p>
                Streamline your HR processes by efficiently onboarding,
                offboarding, and managing your employees with our user-friendly
                tools. Keep your team organized and focused on what matters
                most.
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
                tools. Keep your team organized and focused on what matters
                most.
              </p>
            </div>
          </div>

          <div className="flex feature row">
            <div className="flex column feature-text">
              <p className="smallTitle">Collaboration</p>
              <p>
                Enhance teamwork and efficiency by inviting co-admins to
                entities for seamless collaboration and precise access control.
                Work together effortlessly, ensuring everyone has the right
                level of access.
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
                Stay compliant and informed by generating statutory and
                financial reports effortlessly. Rester makes it easy to create
                accurate and compliant reports, giving you peace of mind and
                saving you time and effort.
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </section>
    </>
  );
}

export default App;
