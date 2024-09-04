import React from "react";
import Select from "react-select";
import { MdDownload } from "react-icons/md";
import { payslipDates } from "../../core/data";
import { GetEmployeePayroll } from "../../core/services/employee.service";
import { showToast } from "../../core/hooks/alert";

function Payslip() {
  const [employeePayroll, setEmployeePayroll] = React.useState();
  const [selectedPayslipDate, setSelectedPayslipDate] = React.useState(null);

  const handleCategoryNumberChange = (selectedRangeOption) => {
    setSelectedPayslipDate(selectedRangeOption);
  };

  React.useEffect(() => {
    GetEmployeePayroll()
      .then((response) => {
        setEmployeePayroll(response.data);
        console.log("aa: ", employeePayroll && employeePayroll);
      })
      .catch((error) => {
        console.log(error);
        // showToast(error.response.data.error, false);
      });
  }, []);
  return (
    <>
      <div>
        <h3>Employee Payslip</h3>
      </div>
      <div className="flex items-center w-full mobile:flex-col mt-9 row mobile:w-full">
        <div className="w-full mr-8 mobile:mr-0">
          <Select
            className="w-full"
            value={selectedPayslipDate}
            onChange={handleCategoryNumberChange}
            options={payslipDates}
            placeholder="Select month"
          />
        </div>

        <div className="w-full">
          <button className="w-1/3 py-2 text-white rounded-full mobile:mt-8 primary mobile:w-full">
            View Payslip
          </button>
        </div>
      </div>

      <div className="p-8 mt-16 bg-white">
        {/* <h1>Payslip for {selectedPayslipDate.label}</h1> */}
        <div className="grid grid-cols-2 gap-3 mobile:grid-cols-1">
          <div>
            <h3>
              <span className="mr-5 font-bold">Employee Name:</span>
              {employeePayroll && employeePayroll.employee.name}
            </h3>
            <h3>
              <span className="mr-5 font-bold">Job Title:</span> Developer
            </h3>
            <h3>
              <span className="mr-5 font-bold">Date Joined:</span> 23rd December
              2023
            </h3>
            <h3>
              <span className="mr-5 font-bold">Employee email: </span>{" "}
              {employeePayroll && employeePayroll.employee.email}
            </h3>
          </div>

          <div>
            <h3>
              <span className="mr-5 font-bold">Bank Name:</span> Access
            </h3>
            <h3>
              <span className="mr-5 font-bold">Bank Branch:</span> Accra,
              Octagon
            </h3>
            <h3>
              <span className="mr-5 font-bold">Annual Salary:</span> GHS 1000
            </h3>
            <h3>
              <span className="mr-5 font-bold">Basic Salary:</span>GHS 20
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-16 mobile:grid-cols-1">
          <div>
            <div className="flex justify-center text-white bg-green-400">
              Earnings
            </div>
            <div className="flex justify-between text-gray-500 bg-green-200">
              <div>Description</div>
              <div>Amount</div>
            </div>
            <div className="flex justify-between">
              <div>Salary Earned</div>
              <div>GHS 100</div>
            </div>
            <div className="flex justify-between">
              <div>Allowances</div>
              <div>GHS 100</div>
            </div>
            <div className="flex justify-between">
              <div>Allowances</div>
              <div>GHS 50</div>
            </div>
            <div className="flex justify-between">
              <div>Reimbursement</div>
              <div>GHS 30</div>
            </div>
            <div className="flex justify-between bg-blue-300">
              <div>TOTAL</div>
              <div>GHS 280.00</div>
            </div>
          </div>

          <div className="mobile:mt-8">
            <div className="flex justify-center text-white bg-gray-400">
              Deductions
            </div>
            {employeePayroll &&
              employeePayroll.deductions.map((value, key) => (
                <div
                  key={key}
                  className="flex justify-between text-gray-500 bg-green-200"
                >
                  <div>{value.name}</div>
                  <div>GHS {value.amount}</div>
                </div>
              ))}

            <div className="flex justify-between bg-blue-300">
              <div>TOTAL</div>
              <div>
                GHS {employeePayroll && employeePayroll.total_deductions}
              </div>
            </div>
          </div>
          <div>
            <button className="w-1/4 py-2 mt-16 text-center text-white rounded-full primary mobile:w-full">
              Download
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payslip;
