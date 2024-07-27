import React from "react";
import Select from "react-select";

function EmployeeIncomeSectionUpdate(props) {
  return (
    <>
      {/* <Select
                  className="w-full"
                  value={to.incomeFrequency}
                  onChange={(selectedOption) =>
                    handleFrequencyChange(index, selectedOption)
                  }
                  options={options}
                  id="income-frequency"
                  placeholder="Select Frequency of Income"
                /> */}
      <input
        className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
        defaultValue={props.income}
      />
      <input
        className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
        defaultValue={props.value}
      />
      <input
        className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
        defaultValue={props.frequency}
      />
    </>
  );
}

export default EmployeeIncomeSectionUpdate;
