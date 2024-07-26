import React from "react";

function EmployeeIncomeSectionUpdate(props) {
  return (
    <>
      <input
        className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
        disabled
        placeholder={props.income}
      />
      <input
        className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
        disabled
        placeholder={props.value}
      />

      <input
        className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
        disabled
        placeholder={props.frequency}
      />
    </>
  );
}

export default EmployeeIncomeSectionUpdate;
