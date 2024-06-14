import { formToJSON } from "axios";
import React from "react";
import { showToast } from "../../core/hooks/alert";
import { CreateIncomeTypeForm } from "../../core/services/income.service";
import Loader from "../../components/loader/_component";

function CreateIncomeType() {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleCreateEmployeeSubmit = (e) => {
    setIsLoading(true);
    const entity_id = localStorage.getItem("entity_id");
    e.preventDefault();
    const incomeForm = document.getElementById("income-type-form");
    const payload = {
      ...formToJSON(incomeForm),
      entity_id: entity_id,
    };
    CreateIncomeTypeForm(payload)
      .then((res) => {
        setIsLoading(false);
        showToast(res?.data.message, true);
        incomeForm?.reset();
      })
      .catch((error) => {
        showToast(error.response.data.error, false);
      });
  };
  return (
    <>
      <form id="income-type-form" onSubmit={handleCreateEmployeeSubmit}>
        <h3 className="text-sm mt-9">Income Type</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="field">
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
          </div>

          <div className="field">
            <label className="text-sm label bold">
              Enter Income Description
            </label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Income Description"
                name="income_description"
              />
            </div>
          </div>
          <div className="field">
            <label className="text-sm label bold">Enter Tax 1</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="number"
                placeholder="Tax 1"
                name="tax_class1"
              />
            </div>
          </div>
          <div className="mt-3 field">
            <label className="text-sm label bold">Enter Tax 2</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="number"
                placeholder="Tax 2"
                name="tax_class2"
              />
            </div>
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
          {isLoading ? <Loader /> : " Add Employee Income Type"}
        </button>
      </form>
    </>
  );
}

export default CreateIncomeType;
