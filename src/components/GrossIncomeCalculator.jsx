import { FaCediSign } from "react-icons/fa6";

export default function GrossIncomeCalculator() {
  return (
    <div className="calculator flex column">
      <div className="smallTitle center"> Income Tax Calculator</div>

      <div className="flex row">
        <button className="outline ">
          <FaCediSign />
        </button>
        <input name="" type="text" placeholder="Net income" />
      </div>
      <div className="flex row">
        <select id="" name="" placeholder="Per year">
          <option value="" disabled selected>
            Per Year
          </option>
        </select>
      </div>
      <div className="flex row">
        <select id="" name="" placeholder="Per year">
          <option value="" disabled selected>
            2024/2025
          </option>
        </select>
      </div>
      <div className="flex row">
        <select id="" name="" placeholder="Per year">
          <option value="" disabled selected>
            Under 65
          </option>
        </select>
      </div>
      <div className="flex row">
        <div className="inputContainer">
          <input name="" type="text" placeholder="Pension contribution" />
        </div>

        <button className="inverse">
          <FaCediSign />
        </button>
        <button className="outline">%</button>
      </div>
      <div className="flex row">
        <button className="inverse">Calculate Gross Income</button>
      </div>
    </div>
  );
}
