import { formToJSON } from "axios";
import React from "react";
import { showToast } from "../../core/hooks/alert";
import { CreateIncomeTypeForm } from "../../core/services/income.service";
import Loader from "../../components/loader/_component";
import {
  GetOneEmployeeLoan,
  SubmitEmployeeLoan,
  UpdateEmployeeLoanForm,
} from "../../core/services/employee.service";
import { useParams } from "react-router-dom";

function UpdateEmployeeLoan() {
  const { id } = useParams();
  const entity_id = localStorage.getItem("entity_id");
  const employee_id = localStorage.getItem("employee_id");
  const [isChecked, setIsChecked] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [employeeLoan, setEmployeeLoan] = React.useState([]);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  React.useEffect(() => {
    GetOneEmployeeLoan(id, entity_id, employee_id)
      .then((response) => {
        setEmployeeLoan(response.data.employee_loan);
        console.log("ee: ", response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleUpdateEmployeeLoan = (e) => {
    setIsLoading(true);
    const entity_id = localStorage.getItem("entity_id");
    e.preventDefault();
    const loanForm = document.getElementById("employee-loan-form");
    const payload = {
      ...formToJSON(loanForm),
      employee_id: employee_id,
      employee_loan_id: id,
      entity_id: entity_id,
      is_compounding_interest: isChecked,
    };
    UpdateEmployeeLoanForm(payload)
      .then((res) => {
        setIsLoading(false);
        showToast(res?.data.message, true);
        loanForm?.reset();
      })
      .catch((error) => {
        setIsLoading(false);
        showToast(error.response.data.error, false);
      });
  };
  return (
    <>
      <form id="employee-loan-form" onSubmit={handleUpdateEmployeeLoan}>
        <h3 className="text-sm mt-9">Income Type</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="field">
            <label className="text-sm label bold">
              Enter Annual Interest Rate
            </label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="number"
                placeholder="Annual Interest Rate"
                name="annual_interest_rate"
                defaultValue={employeeLoan.annual_interest_rate}
              />
            </div>
          </div>
          {/* <div className="field">
            <label className="text-sm label bold">Enter Income Name</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Income Name"
                name="income_name"
              />
            </div>
          </div> */}
          <div className=" field">
            <label className="text-sm label bold">Enter Loan Amount</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="number"
                placeholder="Loan Amount"
                name="loan_amount"
                defaultValue={employeeLoan.loan_amount}
              />
            </div>
          </div>
          <div className=" field">
            <label className="text-sm label bold">Enter Loan Provider</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Loan Provider"
                name="loan_provider"
                defaultValue={employeeLoan.loan_provider}
              />
            </div>
          </div>
          <div className="mt-3 field">
            <label className="text-sm label bold">Enter Loan Term</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="number"
                placeholder="Loan Term"
                name="loan_term"
                defaultValue={employeeLoan.loan_term}
              />
            </div>
          </div>
          <div className="mt-3 field">
            <label className="text-sm label bold">Enter Monthly Interest</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="number"
                placeholder="Monthly Interest"
                name="monthly_interest"
                defaultValue={employeeLoan.monthly_interest}
              />
            </div>
          </div>
          <div className="flex flex-col mt-3 field">
            <label className="mb-1 text-sm label bold">
              Toggle If Compound Interest
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={employeeLoan.is_compounded_interest}
                onChange={handleCheckboxChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00eeff]"></div>
            </label>
          </div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className={
            isLoading
              ? `animate-pulse w-full py-3 mb-3 text-white bg-[#0DCAF0] mt-9 mobile:w-full`
              : `w-full py-3 mb-3 text-white bg-[#0DCAF0] mt-9 mobile:w-full`
          }
        >
          {isLoading ? <Loader /> : " Update Employee Loan"}
        </button>
      </form>
    </>
  );
}

export default UpdateEmployeeLoan;
