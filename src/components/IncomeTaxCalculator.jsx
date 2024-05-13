import { FaCediSign } from "react-icons/fa6";
import { useState } from "react";

export default function IncomeTaxCalculator() {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [basicSalary, setBasicSalary] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setBasicSalary(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    const basic_salary = formData.get("basic_salary");
    const cash_allowances = formData.get("cash_allowances");
    const bonus = formData.get("bonus");
    const overtime = formData.get("overtime");
    const tier_1 = formData.get("tier_1");
    const tier_2 = formData.get("tier_2");
    const tier_3 = formData.get("tier_3");

    const res = await fetch(`${SERVER_URL}/calculate/income_tax`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        basic_salary,
        cash_allowances,
        bonus,
        overtime,
        tier_1,
        tier_2,
        tier_3,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("Income tax calculated successfully");
      setTimeout(setLoading, 2000, false);

      setResult(data);
    } else {
      console.error("Error calculating income tax", data);
    }
  };
  // console.log("server url", import.meta.env.VITE_SERVER_URL);
  return (
    <>
      <form className="calculator flex column" onSubmit={handleSubmit}>
        <div className="smallTitle center"> Income Tax Calculator</div>

        <div className="flex row">
          {/* <button className="outline "> */}
          {/*   <FaCediSign /> */}
          {/* </button> */}
          <input
            name="basic_salary"
            type="number"
            min="0"
            placeholder="Basic Salary"
            value={basicSalary}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>
        <div className="flex row">
          <input
            name="cash_allowances"
            type="number"
            min="0"
            placeholder="Cash Allowances"
            step="0.01"
          />
        </div>
        <div className="flex row">
          <input
            name="bonus"
            type="number"
            min="0"
            placeholder="Bonus"
            step="0.01"
          />
        </div>

        <div className="flex row">
          <input
            name="overtime"
            type="number"
            min="0"
            placeholder="Overtime"
            step="0.01"
          />
        </div>

        <div className="flex row">
          <input
            name="tier_1"
            type="number"
            min="0"
            placeholder="Tier 1"
            value={(parseFloat(basicSalary) * 0.05).toFixed(2)}
            step="0.01"
          />
        </div>
        <div className="flex row">
          <input
            name="tier_2"
            type="number"
            min="0"
            placeholder="Tier 2"
            step="0.01"
          />
        </div>
        <div className="flex row">
          <input
            name="tier_3"
            type="number"
            min="0"
            placeholder="Tier 3"
            step="0.01"
          />
        </div>

        {/* <div className="flex row"> */}
        {/*   <select id="" name="" placeholder="Per year"> */}
        {/*     <option value="" disabled selected> */}
        {/*       Per Year */}
        {/*     </option> */}
        {/*   </select> */}
        {/* </div> */}
        {/* <div className="flex row"> */}
        {/*   <select id="" name="" placeholder="Per year"> */}
        {/*     <option value="" disabled selected> */}
        {/*       2024/2025 */}
        {/*     </option> */}
        {/*   </select> */}
        {/* </div> */}
        {/* <div className="flex row"> */}
        {/*   <select id="" name="" placeholder="Per year"> */}
        {/*     <option value="" disabled selected> */}
        {/*       Under 65 */}
        {/*     </option> */}
        {/*   </select> */}
        {/* </div> */}
        {/* <div className="flex row"> */}
        {/*   <div className="inputContainer"> */}
        {/*     <input name="" type="text" placeholder="Pension contribution" /> */}
        {/*   </div> */}

        {/*   <button className="inverse"> */}
        {/*     <FaCediSign /> */}
        {/*   </button> */}
        {/*   <button className="outline">%</button> */}
        {/* </div> */}
        <div className="flex row">
          <button type="submit" className="inverse">
            Calculate Income Tax
          </button>
        </div>
      </form>

      {loading && (
        <div className={`loaderContainer ${loading || result ? "center" : ""}`}>
          <div className="loader"></div>
        </div>
      )}

      {!loading && result && (
        <div className="results">
          <div className="smallTitle center">Results</div>
          <div className="result">
            <p>Overtime Minimum Tax</p>
            {result.overtime_minimum_tax}
          </div>
          <div className="result">
            <p>Bonus Minimum Tax</p>
            {result.bonus_minimum_tax}
          </div>
          <div className="result">
            {" "}
            <p>Tax Graduated Rates</p>
            {result.tax_graduated_rates}
          </div>
          <div className="result bold">
            <p> Total Tax</p>
            {result.total_tax}
          </div>
        </div>
      )}
    </>
  );
}
