import React from "react";
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
import { showToast } from "../../core/hooks/alert";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";
import { GrFormSubtract } from "react-icons/gr";
import Select from "react-select";
import { options } from "../../core/data";
import { CreateEmployeeForm } from "../../core/services/employee.service";
import { formToJSON } from "axios";
import { useIncomeType } from "../../core/hooks/income";
import Loader from "../../components/loader/_component";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function CreateEmployee() {
  const fp = React.useRef(null);
  const navigate = useNavigate();
  const entity_id = localStorage.getItem("entity_id");
  const { incomeTypeQuery } = useIncomeType(entity_id);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDependent, setIsDependent] = React.useState(false);
  const [isCertified, setIsCertified] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [isSponsor, setIsSponsorChild] = React.useState(false);
  const [isProvidesNecessities, setIsProvidesNecessities] =
    React.useState(false);
  const [showNewPasswordType, setShowNewPasswordType] = React.useState(false);
  const newPasswordToggle = () => {
    setShowNewPasswordType(!showNewPasswordType);
  };
  const [incomeSection, setIncomeSection] = React.useState([
    {
      income_type: null,
      amount: "",
      effective_from: null,
      effective_to: null,
      income_frequency: null,
    },
  ]);

  const handleChange = (index, selectedOption) => {
    const updatedIncomeSection = [...incomeSection];
    updatedIncomeSection[index].income_type = selectedOption;
    setIncomeSection(updatedIncomeSection);
  };

  const handleFrequencyChange = (index, selectedOption) => {
    const updatedIncomeSection = [...incomeSection];
    updatedIncomeSection[index].income_frequency = selectedOption;
    setIncomeSection(updatedIncomeSection);
  };

  const handleRemoveOptionsField = (index) => {
    const updatedIncomeSection = incomeSection.filter((_, i) => i !== index);
    setIncomeSection(updatedIncomeSection);
  };

  // const handleDependentCheckboxChange = (e) => {
  //   setIsDependent(e.target.checked);
  // };

  const handleDependentCheck = (e) => {
    setIsDependent(e.target.checked);
  };
  const handleDisabledCheck = (e) => {
    setIsDisabled(e.target.checked);
  };
  const handleSponsorChildCheck = (e) => {
    setIsSponsorChild(e.target.checked);
  };
  const handleCertifiedCheck = (e) => {
    setIsCertified(e.target.checked);
  };
  const handleProvidesCheck = (e) => {
    setIsProvidesNecessities(e.target.checked);
  };

  const handleAddOptionsField = () => {
    setIncomeSection([
      ...incomeSection,
      {
        income_type: null,
        amount: "",
        effective_from: "",
        effective_to: "",
        income_frequency: null,
      },
    ]);
  };

  const handleCreateEmployeeSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    const transformedData = incomeSection.map((entry) => ({
      income_type: entry.income_type.value,
      effective_from: entry.effective_from,
      effective_to: entry.effective_to,
      amount: entry.amount,
      frequency: entry.income_frequency.value,
    }));

    const employeeForm = document.getElementById("employee-form");
    const payload = {
      ...formToJSON(employeeForm),
      entity_id: entity_id,
      income_section: transformedData,
      has_dependant_spouse: isDependent,
      is_certified_disabled: isCertified,
      is_disabled: isDisabled,
      sponsors_child_education: isSponsor,
      provides_necessities_for_children: isProvidesNecessities,
    };

    CreateEmployeeForm(payload)
      .then((res) => {
        setIsLoading(false);
        console.log("reees: ", res);
        showToast(res?.data.message, true);
        employeeForm?.reset();
        setIncomeSection([
          { incomeType: null, amount: "", incomeFrequency: null },
        ]);
        setTimeout(() => {
          navigate("/dashboard/manage-employees");
        }, 2000);
      })
      .catch((error) => {
        showToast(error.response.data.error, false);
        setIsLoading(false);
      });
  };
  const incomeTypeDropdown = incomeTypeQuery.data?.data.income_types;

  const incomeTypeOptions = incomeTypeDropdown?.map((iT) => ({
    value: iT.id,
    label: iT.income_name,
  }));
  return (
    <>
      <form id="employee-form" onSubmit={handleCreateEmployeeSubmit}>
        <h3 className="mb-3 text-sm">Basic Information</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="field">
            <label className="text-sm label bold">Enter First Name</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="First Name"
                name="first_name"
              />
            </div>
          </div>
          <div className="field">
            <label className="text-sm label bold">Enter Last Name</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Last Name"
                name="last_name"
              />
            </div>
          </div>
          <div className="field">
            <label className="text-sm label bold">Enter Other Names</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Other Names"
                name="other_names"
              />
            </div>
          </div>
          <div className="mt-3 field">
            <label className="text-sm label bold">Select Date Of Birth</label>
            <Flatpickr
              className="bg-gray-50 mr-2 cursor-pointer border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
              placeholder="Date of Birth"
              ref={fp}
              name="date_of_birth"
            />
            <button
              type="button"
              className="text-xs"
              onClick={() => {
                if (!fp?.current?.flatpickr) return;
                fp.current.flatpickr.clear();
              }}
            >
              Clear
            </button>
          </div>
          <div className="mt-3 field">
            <label className="text-sm label bold">Enter Address</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Address"
                name="address"
              />
            </div>
          </div>
          <div className="mt-3 field">
            <label className="text-sm label bold">
              Enter Permanent Address
            </label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Permanent Address"
                name="permanent_address"
              />
            </div>
          </div>

          <div className=" field">
            <label className="text-sm label bold">Enter Email</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="email"
                placeholder="Email"
                name="email"
              />
            </div>
          </div>
          <div className="field">
            <label className="text-sm label bold">Enter Phone Number</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="number"
                placeholder="Phone Number"
                name="phone"
              />
            </div>
          </div>
          <div className="field">
            <label className="text-sm label bold">Enter Nationality</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="nationality"
                name="nationality"
              />
            </div>
          </div>
          <div className="mt-3 field">
            <label className="text-sm label bold">Enter Tin</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Tin"
                name="tin"
              />
            </div>
          </div>
          <div className="mt-3 field">
            <label className="text-sm label bold">
              Enter Ghana Card Number
            </label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Ghana Card Number"
                name="ghana_card_id"
              />
            </div>
          </div>
          <div className="relative mt-3 field">
            <label className="label bold">Password</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type={showNewPasswordType ? "text" : "password"}
                placeholder="Password"
                name="password"
              />
            </div>
            <div className="absolute top-9 right-3">
              <span onClick={newPasswordToggle} className="cursor-pointer">
                {showNewPasswordType ? (
                  <HiMiniEyeSlash size={20} />
                ) : (
                  <IoEyeSharp size={20} />
                )}
              </span>
            </div>
          </div>
          <div className="mt-3 field">
            <label className="text-sm label bold">Enter remarks</label>
            <div className="control">
              <textarea
                rows={5}
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Remarks"
                name="remarks"
              />
            </div>
          </div>
        </div>
        <h3 className="text-sm mt-9">Details</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="mt-3 field">
            <label className="text-sm label bold">Select Start Date</label>
            <Flatpickr
              className="bg-gray-50 mr-2 cursor-pointer border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
              placeholder="Start Date"
              ref={fp}
              name="start_date"
            />
            <button
              type="button"
              className="text-xs"
              onClick={() => {
                if (!fp?.current?.flatpickr) return;
                fp.current.flatpickr.clear();
              }}
            >
              Clear
            </button>
          </div>
          <div className="mt-3 field">
            <label className="text-sm label bold">Job Title</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Job Title"
                name="job_title"
              />
            </div>
          </div>
          <div className="mt-3 field">
            <label className="text-sm label bold">Nature of Employment</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Other Names"
                name="nature_of_employment"
              />
            </div>
          </div>
          <div className="mt-8 ml-6 field">
            <label className="text-sm label">
              Check if employee has dependent spouse
            </label>
            <input
              className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
              type="checkbox"
              onChange={handleDependentCheck}
            />
          </div>
          <div className="mt-8 ml-6 field">
            <label className="text-sm label">
              Check if employee is disabled
            </label>
            <input
              className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
              type="checkbox"
              onChange={handleDisabledCheck}
            />
          </div>
          <div className="mt-8 ml-6 field">
            <label className="text-sm label">
              Check if employee sponsors child education
            </label>
            <input
              className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
              type="checkbox"
              onChange={handleSponsorChildCheck}
            />
          </div>
          <div className="mt-8 ml-6 field">
            <label className="text-sm label">
              Check if employee is certified disabled
            </label>
            <input
              className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
              type="checkbox"
              onChange={handleCertifiedCheck}
            />
          </div>
          <div className="mt-8 ml-6 field">
            <label className="text-sm label">
              Check if employee provides necessities for children
            </label>
            <input
              className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
              type="checkbox"
              onChange={handleProvidesCheck}
            />
          </div>
        </div>
        {incomeSection.map((to, index) => (
          <div key={index} className="flex items-center mt-8">
            <div className="w-full mr-3">
              <label className="text-sm label bold">
                Select type of incomes
              </label>
              <div className="flex w-full row mobile:w-full">
                <Select
                  className="w-full"
                  value={to.income_type}
                  onChange={(selectedOption) =>
                    handleChange(index, selectedOption)
                  }
                  options={incomeTypeOptions}
                  placeholder="Select Income Type"
                />
              </div>
            </div>
            <div className="w-full mr-3">
              <label className="text-sm label bold">Enter Amount</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                  type="number"
                  placeholder="Amount"
                  value={to.amount}
                  onChange={(e) => {
                    const updatedIncomeSection = [...incomeSection];
                    updatedIncomeSection[index].amount = e.target.value;
                    setIncomeSection(updatedIncomeSection);
                  }}
                />
              </div>
            </div>

            <div className="w-full mt-5 mr-3">
              <label className="text-sm label bold">Effective From</label>
              <Flatpickr
                className="bg-gray-50 mr-2 cursor-pointer border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                placeholder="Effective From"
                id="effective_from"
                ref={fp}
                onChange={(e) => {
                  const updatedIncomeSection = [...incomeSection];
                  updatedIncomeSection[index].effective_from = e[0];
                  setIncomeSection(updatedIncomeSection);
                }}
              />
              <button
                type="button"
                className="text-xs"
                onClick={() => {
                  if (!fp?.current?.flatpickr) return;
                  fp.current.flatpickr.clear();
                }}
              >
                Clear
              </button>
            </div>

            <div className="w-full mt-5 mr-3">
              <label className="text-sm label bold">Effective To</label>
              <Flatpickr
                className="bg-gray-50 mr-2 cursor-pointer border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                placeholder="Effective To"
                id="effective_to"
                ref={fp}
                onChange={(e) => {
                  const updatedIncomeSection = [...incomeSection];
                  updatedIncomeSection[index].effective_to = e[0];
                  setIncomeSection(updatedIncomeSection);
                }}
              />
              <button
                type="button"
                className="text-xs"
                onClick={() => {
                  if (!fp?.current?.flatpickr) return;
                  fp.current.flatpickr.clear();
                }}
              >
                Clear
              </button>
            </div>

            <div className="w-full">
              <label className="text-sm label bold">
                Select frequency of income
              </label>
              <div className="flex w-full row mobile:w-full">
                <Select
                  className="w-full"
                  value={to.income_frequency}
                  onChange={(selectedOption) =>
                    handleFrequencyChange(index, selectedOption)
                  }
                  options={options}
                  id="income-frequency"
                  placeholder="Select Frequency"
                />
              </div>
            </div>
            <div
              title="Remove fields"
              className="w-12 px-3 py-1 mt-3 ml-3 text-white bg-black cursor-pointer"
              onClick={() => handleRemoveOptionsField(index)}
            >
              -
            </div>
          </div>
        ))}
        <div
          title="Add fields"
          className="flex items-center w-10 px-3 py-1 mt-3 text-white bg-black cursor-pointer"
          onClick={handleAddOptionsField}
        >
          +
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className={
            isLoading
              ? `animate-pulse rounded-full w-1/2 m-auto py-3 mb-3 text-white bg-[#0DCAF0] mt-9 mobile:w-full`
              : `w-1/2 m-auto rounded-full py-3 mb-3 text-white primary mt-9 mobile:w-full`
          }
        >
          {isLoading ? <Loader /> : "Create Employee"}
        </button>
      </form>
    </>
  );
}

export default CreateEmployee;
