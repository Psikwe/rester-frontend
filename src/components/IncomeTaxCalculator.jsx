import { useState } from "react";
import { formToJSON } from "axios";
import { UserIncomeCalculator } from "../core/services/auth.service";

export default function IncomeTaxCalculator() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [basicSalary, setBasicSalary] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setBasicSalary(value);
  };

  const formatter = new Intl.NumberFormat("en-US");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const incomeTaxForm = document.getElementById("income-tax-calculator");
    const payload = {
      ...formToJSON(incomeTaxForm),
    };

    UserIncomeCalculator(payload)
      .then((response) => {
        setTimeout(setLoading, 2000, false);
        setResult(response.data);
      })
      .catch((error) => {
        console.error("Error calculating income tax", error);
        setLoading(false);
      });
  };
  return (
    <>
      <form
        id="income-tax-calculator"
        className="flex calculator column"
        onSubmit={handleSubmit}
      >
        <div className="mobile:mt-14 mt-12 smallTitle center mobile:text-xl  text-[#25476A]">
          Monthly income tax calculator
        </div>

        <div className="flex w-1/2 mobile:w-full column">
          {/* <button className="outline "> */}
          {/*   <FaCediSign /> */}
          {/* </button> */}
          <b>Basic Salary (GHS)</b>
          <input
            name="basic_salary"
            type="number"
            min="0"
            placeholder="Basic Salary"
            value={basicSalary}
            onChange={handleChange}
            className="bg-gray-50 border outline-0 mt-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
            step="0.01"
            required
          />
        </div>
        <div className="flex w-1/2 column mobile:w-full">
          <b>Cash Allowances (GHS)</b>
          <input
            name="cash_allowances"
            type="number"
            min="0"
            placeholder="Cash Allowances"
            className="bg-gray-50 border outline-0 mt-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
            step="0.01"
          />
        </div>
        <div className="flex w-1/2 column mobile:w-full">
          <b>Bonus (GHS)</b>
          <input
            name="bonus"
            type="number"
            min="0"
            placeholder="Bonus"
            className="bg-gray-50 border outline-0 mt-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
            step="0.01"
          />
        </div>

        <div className="flex w-1/2 column mobile:w-full">
          <b>Overtime (GHS)</b>
          <input
            name="overtime"
            type="number"
            min="0"
            placeholder="Overtime"
            className="bg-gray-50 border outline-0 mt-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
            step="0.01"
          />
        </div>

        <div className="flex w-1/2 column mobile:w-full">
          <b>Social Security (SSNIT Tier 1)</b>¬
          <input
            name="tier_1"
            type="number"
            min="0"
            placeholder="SSNIT Tier 1"
            value={(parseFloat(basicSalary) * 0.055).toFixed(2)}
            className="bg-gray-50 border outline-0 mt-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
            step="0.01"
          />
        </div>
        <div className="flex w-1/2 column mobile:w-full">
          <b>Private Pension (Tier 2)</b>
          <input
            name="tier_2"
            type="number"
            min="0"
            placeholder="Tier 2"
            className="bg-gray-50 border outline-0 mt-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
            step="0.01"
          />
        </div>
        <div className="flex w-1/2 column mobile:w-full">
          <b>Voluntary Provident Fund (SNNIT Tier 3)</b>
          <input
            name="tier_3"
            type="number"
            min="0"
            placeholder="SNNIT Tier 3"
            className="bg-gray-50 border outline-0 mt-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
            step="0.01"
          />
        </div>

        {/* <div className="flex column"> */}
        {/*   <select id="" name="" placeholder="Per year"> */}
        {/*     <option value="" disabled selected> */}
        {/*       Per Year */}
        {/*     </option> */}
        {/*   </select> */}
        {/* </div> */}
        {/* <div className="flex column"> */}
        {/*   <select id="" name="" placeholder="Per year"> */}
        {/*     <option value="" disabled selected> */}
        {/*       2024/2025 */}
        {/*     </option> */}
        {/*   </select> */}
        {/* </div> */}
        {/* <div className="flex column"> */}
        {/*   <select id="" name="" placeholder="Per year"> */}
        {/*     <option value="" disabled selected> */}
        {/*       Under 65 */}
        {/*     </option> */}
        {/*   </select> */}
        {/* </div> */}
        {/* <div className="flex column"> */}
        {/*   <div className="inputContainer"> */}
        {/*     <input name="" type="text" placeholder="Pension contribution" /> */}
        {/*   </div> */}

        {/*   <button className="inverse"> */}
        {/*     <FaCediSign /> */}
        {/*   </button> */}
        {/*   <button className="outline">%</button> */}
        {/* </div> */}
        <div className="flex p-3 from-laptop-to-laptop-xl:w-1/2 column">
          <button
            disabled={loading}
            className="w-full py-3 text-white rounded-full primary"
          >
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
          <div className="mt-10 smallTitle center">Results</div>
          <div className="result">
            <p>Monthly basic Salary</p>
            GHS {formatter.format(result.basic_salary)}
          </div>

          <div className="result">
            <p>Monthly overtime tax</p>
            GHS {formatter.format(result.overtime_minimum_tax)}
          </div>
          <div className="result">
            <p>Monthly bonus tax</p>
            GHS {formatter.format(result.bonus_minimum_tax)}
          </div>
          {/* <div className="result"> */}
          {/*   {" "} */}
          {/*   <p>Tax Graduated Rates</p> */}
          {/*   {result.tax_graduated_rates} */}
          {/* </div> */}
          <div className="result bold">
            <p>Monthly PAYE tax</p>
            GHS {formatter.format(result.cumulative_tax)}
          </div>
        </div>
      )}
    </>
  );
}
