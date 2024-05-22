import { FaCediSign } from "react-icons/fa6";
import Select from "react-select";
import { options, yearOptions } from "../core/data";
import { useState } from "react";

export default function GrossIncomeCalculator() {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleChange = (selectedOption) => {
    setSelectedAuthorValue(selectedOption);
  };
  return (
    <div className="flex calculator column">
      <div className="mt-12 mobile:text-[26px] smallTitle center">
        {" "}
        Gross Income Calculator
      </div>

      <div className="flex w-1/2 mt-4 mobile:w-full row">
        {/* <div className="flex items-center w-16 h-12 p-3 border-2">
          <FaCediSign />
        </div> */}
        <div className="flex items-center justify-center w-16 h-12 p-3 text-black border-2 border-black rounded-lg">
          <FaCediSign />
        </div>
        <input
          className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
          name=""
          type="text"
          placeholder="Net income"
        />
      </div>
      <div className="flex w-1/2 mt-4 row mobile:w-full">
        <Select
          className="w-full"
          value={selectedOption}
          onChange={handleChange}
          options={options}
          placeholder="Per Year "
        />
      </div>
      {/* <div className="flex row">
        <select id="" name="" placeholder="Per year">
          <option value="" disabled selected>
            2024/2025
          </option>
        </select>
      </div> */}
      <div className="flex w-1/2 mt-4 row mobile:w-full">
        <Select
          className="w-full"
          value={selectedOption}
          onChange={handleChange}
          options={yearOptions}
          placeholder="2025/2026"
        />
      </div>
      {/* <div className="flex row">
        <select id="" name="" placeholder="Per year">
          <option value="" disabled selected>
            Under 65
          </option>
        </select>
      </div> */}
      <div className="flex w-1/2 mt-4 row mobile:w-full">
        <Select
          className="w-full"
          value={selectedOption}
          onChange={handleChange}
          options={yearOptions}
          placeholder="Under 65"
        />
      </div>
      <div className="w-1/2 mt-3 inputContainer mobile:w-full">
        <input
          className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
          name=""
          type="text"
          placeholder="Pension contribution"
        />

        <div className="flex items-center justify-center w-16 h-12 p-3 mr-3 text-white bg-black rounded-lg">
          <FaCediSign />
        </div>
        <div className="flex items-center justify-center w-16 h-12 p-3 text-black border-2 border-black rounded-lg">
          %
        </div>
      </div>
      <div className="flex mt-4 row">
        <button className="w-1/6 py-3 text-white bg-black mobile:w-full">
          Calculate Gross Income
        </button>
        {/* <button className="inverse">Calculate Gross Income</button> */}
      </div>
    </div>
  );
}
