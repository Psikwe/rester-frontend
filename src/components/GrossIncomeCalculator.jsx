import { FaCediSign } from "react-icons/fa6";
import Select from "react-select";
import { ageOptions, options, yearOptions } from "../core/data";
import { useState } from "react";
import { showToast } from "../core/hooks/alert";
import { UserGrossIncomeCalculator } from "../core/services/auth.service";
import { formToJSON } from "axios";

export default function GrossIncomeCalculator() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedYearChange, setSelectedYearChange] = useState(null);
  const [selectedAgeRangeChange, setSelectedAgeRangeChange] = useState(null);

  const handleDurationChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const handleYearChange = (selectedOption) => {
    setSelectedYearChange(selectedOption);
  };
  const handleAgeRangeChange = (selectedOption) => {
    setSelectedAgeRangeChange(selectedOption);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOption === null) {
      showToast("please select duration", false);
      return;
    }
    if (selectedYearChange === null) {
      showToast("please select year", false);
      return;
    }
    if (selectedAgeRangeChange === null) {
      showToast("please select if under 65 years", false);
      return;
    }
    setLoading(true);
    const grossIncomeTaxForm = document.getElementById("gross-income-tax");

    const payload = {
      ...formToJSON(grossIncomeTaxForm),
      duration: selectedOption.value,
      year: selectedYearChange.value,
      is_under_65: selectedAgeRangeChange.value === "true" ? true : false,
    };

    UserGrossIncomeCalculator(payload)
      .then((response) => {
        setLoading(false);
        setTimeout(setLoading, 2000, false);
        setResult(response.data.gross_income);
      })
      .catch((error) => {
        console.error("Error calculating income tax", error);
        setLoading(false);
      });
  };

  return (
    <div className="flex calculator column">
      <div className="mt-12 mobile:text-[26px] smallTitle center text-[#31708E]">
        Gross Income Calculator
      </div>
      <div className="flex">
        <form className="w-full" id="gross-income-tax" onSubmit={handleSubmit}>
          <div className="flex w-1/2 mt-4 mobile:w-full row">
            {/* <div className="flex items-center w-16 h-12 p-3 border-2">
          <FaCediSign />
        </div> */}
            <div className="flex items-center justify-center w-16 h-12 p-3 text-black border-2 border-black rounded-lg">
              <FaCediSign />
            </div>
            <input
              required
              className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
              name="net_income"
              type="number"
              placeholder="Net income"
            />
          </div>
          <div className="flex w-1/2 mt-4 row mobile:w-full">
            <Select
              className="w-full"
              value={selectedOption}
              onChange={handleDurationChange}
              options={options}
              placeholder="Duration"
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
              value={selectedYearChange}
              onChange={handleYearChange}
              options={yearOptions}
              placeholder="Year"
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
              value={selectedAgeRangeChange}
              onChange={handleAgeRangeChange}
              options={ageOptions}
              placeholder="Under 65 years"
            />
          </div>
          <div className="w-1/2 mt-3 inputContainer mobile:w-full">
            <input
              required
              className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 mobile:p-2 "
              name="pension_contribution"
              type="number"
              placeholder="Pension contribution"
            />

            <div className="flex items-center justify-center w-16 h-12 p-3 mr-3 text-white rounded-lg bg-[#33b655]">
              <FaCediSign />
            </div>
            <div className="flex items-center justify-center w-16 h-12 p-3 text-black border-2 border-[primary] rounded-lg">
              %
            </div>
          </div>
          <div className="flex mt-4 row">
            <button
              disabled={loading}
              className="w-1/6 py-3 text-sm text-white rounded-full primary mobile:w-full"
            >
              Calculate Gross Income
            </button>
            {/* <button className="inverse">Calculate Gross Income</button> */}
          </div>
        </form>{" "}
        <div>
          {loading && (
            <div
              className={`loaderContainer ${loading || result ? "center" : ""}`}
            >
              <div className="loader"></div>
            </div>
          )}

          {!loading && result && (
            <div className="results">
              <div className="mt-10 smallTitle center">Results</div>
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
