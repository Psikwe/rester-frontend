import { formToJSON } from "axios";
import React from "react";
import { CreateEmployeeForm } from "../../core/services/employee.service";
import { showToast } from "../../core/hooks/alert";
import Loader from "../../components/loader/_component";

function CreateAllowableDeductions() {
  const [isLoading, setIsLoading] = React.useState(false);
  const handleCreateEmployeeSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const entity_id = localStorage.getItem("entity_id");
    const incomeForm = document.getElementById("income-form");
    const payload = {
      ...formToJSON(incomeForm),
      entity_id: entity_id,
    };

    CreateEmployeeForm(payload)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        showToast(res?.data.message, true);
        // companyForm?.reset();
      })
      .catch((error) => {
        setIsLoading(false);
        showToast(error.response.data.error, false);
      });
  };
  return (
    <>
      <form id="income-form" onSubmit={handleCreateEmployeeSubmit}>
        <h3 className="text-sm mt-9">Allowable Deductions</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="field">
            <label className="text-sm label bold">Enter Deduction Name</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Deduction Name"
                name="income_name"
              />
            </div>
          </div>

          <div className="field">
            <label className="text-sm label bold">
              Enter Deduction Description
            </label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Deduction Description"
                name="income_description"
              />
            </div>
          </div>
          <div className="field">
            <label className="text-sm label bold">Enter Cat 1</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Tax 1"
                name="tax_1"
              />
            </div>
          </div>
          <div className="mt-3 field">
            <label className="text-sm label bold">Enter Cat 2</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Tax 2"
                name="tax_2"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-1/2 py-3 mb-3 text-white rounded-full primary mt-9 mobile:w-full"
        >
          {isLoading ? <Loader /> : "  Create Allowable Deduction"}
        </button>
      </form>
    </>
  );
}

export default CreateAllowableDeductions;
