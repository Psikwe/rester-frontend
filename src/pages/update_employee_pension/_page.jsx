import React from "react";
import Select from "react-select";
import {
  GetEmployeePension,
  UpdateEmployeePensionForm,
} from "../../core/services/employee.service";
import { calculation, contributors, pensionTypes } from "../../core/data";
import Loader from "../../components/loader/_component";
import { useParams } from "react-router-dom";
import { useTaxComponent } from "../../core/hooks/tax";
import { showToast } from "../../core/hooks/alert";
import { formToJSON } from "axios";

function UpdateEmployeePension() {
  const entity_id = localStorage.getItem("entity_id");
  const { id } = useParams();
  const { taxComponentQuery } = useTaxComponent();
  localStorage.setItem("employee_id", id);
  const [query, setQuery] = React.useState("");
  const [selectedContributor, setSelectedContributor] = React.useState(null);
  const [selectedType, setSelectedType] = React.useState(null);
  const [selectedCalculation, setSelectedCalculation] = React.useState(null);
  const [selectedComponent, setSelectedComponent] = React.useState();
  const [isContentLoading, setContentLoading] = React.useState(false);
  const [baseChanged, setBaseChanged] = React.useState(false);
  const [calculationChanged, setCalculationChanged] = React.useState(false);
  const [contributorChnaged, setContributorChanged] = React.useState(false);
  const [typeChanged, setTypeChanged] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const [employeePension, setEmployeePension] = React.useState([]);
  const [baseOptions, setBaseOptions] = React.useState([]);
  const [isOperationLoading, setOperationLoading] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);
  const [statChanged, setStatChanged] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [createLoan, setCreateLoan] = React.useState(false);
  const [isDoneAdding, setIsDoneAdding] = React.useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    setStatChanged(true);
  };

  const handleContributorChange = (selectedRangeOption) => {
    setSelectedContributor(selectedRangeOption);
    setContributorChanged(true);
  };

  const handleTypeChange = (selectedRangeOption) => {
    setSelectedType(selectedRangeOption);
    setTypeChanged(true);
  };

  const handleCalculationChnage = (selectedRangeOption) => {
    setSelectedCalculation(selectedRangeOption);
    setCalculationChanged(true);
  };

  const handleComponentChange = (selectedOptions) => {
    setSelectedComponent(selectedOptions);
    setBaseChanged(true);
  };

  const componentOptionDropdown =
    taxComponentQuery && taxComponentQuery?.data?.data?.tax_components;

  const componentOptions =
    componentOptionDropdown &&
    componentOptionDropdown.map((co, _) => ({
      value: co.id,
      label: co.name,
    }));

  const handleEmployeePension = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const pensionForm = document.getElementById("update-employee-pension-form");
    const payload = {
      ...formToJSON(pensionForm),
      pension_id: id,
      base: baseChanged ? selectedComponent.value : employeePension.base,
      calculation: calculationChanged
        ? selectedCalculation.value
        : employeePension.calculation,
      contributor: contributorChnaged
        ? selectedContributor.value
        : employeePension.contributor,
      type: typeChanged ? selectedType.value : employeePension.type,
      statutory_or_not: statChanged
        ? isChecked
        : employeePension.statutory_or_not,
    };
    UpdateEmployeePensionForm(payload)
      .then((res) => {
        setIsLoading(false);
        showToast(res?.data.message, true);
        pensionForm?.reset();
        setTimeout(() => {
          window.history.back();
        }, 2000);
      })
      .catch((error) => {
        setIsLoading(false);
        showToast(error.response.data.error, false);
      });
  };

  React.useEffect(() => {
    GetEmployeePension(id)
      .then((response) => {
        console.log(response);
        setEmployeePension(response.data.pension);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <form id="update-employee-pension-form" onSubmit={handleEmployeePension}>
        <div className="grid grid-cols-3 gap-3">
          <div className="field">
            <label className="text-sm label bold">Enter Amount</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="number"
                placeholder="Amount"
                name="amount"
                defaultValue={employeePension.amount}
              />
            </div>
          </div>
          <div className="field">
            <label className="text-sm label bold">Select Base</label>
            <Select
              className="w-full"
              value={selectedComponent}
              onChange={handleComponentChange}
              options={componentOptions}
              placeholder="Base"
            />
          </div>

          <div className="w-full mr-2">
            <label className="text-sm label">Select Calculation</label>
            <div className="flex w-full row mobile:w-full">
              <Select
                className="w-full"
                value={selectedCalculation}
                onChange={handleCalculationChnage}
                options={calculation}
                placeholder="Calculation"
              />
            </div>
          </div>
          <div className="mt-4 w-full mr-2">
            <label className="text-sm label">Select Contributor</label>
            <div className="flex w-full row mobile:w-full">
              <Select
                className="w-full"
                value={selectedContributor}
                onChange={handleContributorChange}
                options={contributors}
                placeholder="Contributor"
              />
            </div>
          </div>
          <div className="mt-4 field">
            <label className="text-sm label bold">Enter Name</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Name"
                name="name"
                defaultValue={employeePension.name}
              />
            </div>
          </div>
          <div className="mt-4 field">
            <label className="text-sm label bold">Enter Rate</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="number"
                placeholder="Rate"
                name="rate"
                defaultValue={employeePension.rate}
              />
            </div>
          </div>
          <div className="mt-7 flex flex-col field">
            <label className="mb-1 text-sm label bold">
              Toggle Statutory Or Not
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                onChange={handleCheckboxChange}
                className="sr-only peer"
                defaultChecked={employeePension.statutory_or_not}
              />
              <div className="w-11 h-6 bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00eeff]"></div>
            </label>
          </div>
          <div className="mt-4 w-full mr-2">
            <label className="text-sm label">Select Type</label>
            <div className="flex w-full row mobile:w-full">
              <Select
                className="w-full"
                value={selectedType}
                onChange={handleTypeChange}
                options={pensionTypes}
                placeholder="Contributor"
              />
            </div>
          </div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className={
            isLoading
              ? `animate-pulse w-1/3 py-2 mb-3 rounded-full text-white primary mt-9 mobile:w-full`
              : `w-1/3 py-2 mb-3 rounded-full text-white primary mt-9 mobile:w-full`
          }
        >
          {isLoading ? <Loader /> : " Update Employee Pension"}
        </button>
      </form>
    </>
  );
}

export default UpdateEmployeePension;
