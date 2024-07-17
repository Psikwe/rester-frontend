import React from "react";
import {
  GetOneIncomeType,
  UpdateIncomeTypeForm,
} from "../../core/services/income.service";
import { useParams } from "react-router-dom";
import { formToJSON } from "axios";
import { showToast } from "../../core/hooks/alert";
import Loader from "../../components/loader/_component";

function UpdateIncomeType() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [incomeTypeDetails, setIncomeTypeDetails] = React.useState(false);
  const entity_id = localStorage.getItem("entity_id");

  React.useEffect(() => {
    GetOneIncomeType(id, entity_id)
      .then((response) => {
        console.log("res: ", response);
        setIncomeTypeDetails(response.data.income_type);
      })
      .catch((error) => {
        console.log("error: ", error.response.data.error);
      });
  }, []);

  const handleUpdateIncomeType = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const updateForm = document.getElementById("income-type-form");
    const payload = {
      income_type_id: id,
      entity_id,
      ...formToJSON(updateForm),
    };
    UpdateIncomeTypeForm(payload)
      .then((response) => {
        console.log("response: ", response);
        setIsLoading(false);
        showToast(response?.data.message, true);
      })
      .catch((error) => {
        showToast(error.response.data.error, false);
        setIsLoading(false);
        console.log("error: ", error.response.data.error);
      });
  };

  return (
    <>
      <div id="income-type-update" className="flex justify-between">
        <form
          id="income-type-form"
          className="p-8 bg-white"
          onSubmit={handleUpdateIncomeType}
        >
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
                  defaultValue={incomeTypeDetails.income_name}
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
                  defaultValue={incomeTypeDetails.income_description}
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
                  defaultValue={incomeTypeDetails.tax_class1}
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
                  defaultValue={incomeTypeDetails.tax_class2}
                />
              </div>
            </div>
            <div className="mt-3 field">
              <label className="text-sm label bold">Enter Tax Component</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="number"
                  placeholder="Tax component"
                  name="tax_component"
                  defaultValue={incomeTypeDetails.tax_component}
                />
              </div>
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className={
              isLoading
                ? `animate-pulse w-1/2 py-3 mb-3 text-white primary rounded-full mt-9 mobile:w-full`
                : `w-1/2 py-3 mb-3 text-white primary rounded-full mt-9 mobile:w-full`
            }
          >
            {isLoading ? <Loader /> : " Add Employee Income Type"}
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateIncomeType;
