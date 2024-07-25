import React from "react";
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
import { showToast } from "../../core/hooks/alert";
import Loader from "../../components/loader/_component";
import {
  GetOneEmployee,
  SubmitUpdateEmployee,
  UpdateEmployeeProfile,
} from "../../core/services/employee.service";
import Select from "react-select";
import { formToJSON } from "axios";
import { IoAddOutline } from "react-icons/io5";
import { GrFormSubtract } from "react-icons/gr";
import { useParams } from "react-router-dom";
import { useIncomeType } from "../../core/hooks/income";
import moment from "moment";
import { options } from "../../core/data";

function UpdateAdminEmployee() {
  const fp = React.useRef(null);
  const entity_id = localStorage.getItem("entity_id");
  const { id } = useParams();
  const { incomeTypeQuery } = useIncomeType(entity_id);
  const [isLoading, setIsLoading] = React.useState(false);
  const [employeeDetails, setEmployeeDetails] = React.useState({});
  const [incomeSection, setIncomeSection] = React.useState([
    { incomeType: null, amount: "", incomeFrequency: null },
  ]);

  const handleChange = (index, selectedOption) => {
    const updatedIncomeSection = [...incomeSection];
    updatedIncomeSection[index].incomeType = selectedOption;
    setIncomeSection(updatedIncomeSection);
  };

  const handleFrequencyChange = (index, selectedOption) => {
    const updatedIncomeSection = [...incomeSection];
    updatedIncomeSection[index].incomeFrequency = selectedOption;
    setIncomeSection(updatedIncomeSection);
  };

  const handleRemoveOptionsField = (index) => {
    const updatedIncomeSection = incomeSection.filter((_, i) => i !== index);
    setIncomeSection(updatedIncomeSection);
  };

  const handleAddOptionsField = () => {
    setIncomeSection([
      ...incomeSection,
      { incomeType: null, amount: "", incomeFrequency: null },
    ]);
  };

  React.useEffect(() => {
    GetOneEmployee(id)
      .then((response) => {
        setEmployeeDetails(response.data.employee);
        console.log("ee: ", response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  let dateOfBirth = moment(employeeDetails.data_of_birth).format("YYYY-MM-DD");
  let startDate = moment(employeeDetails.start_date).format("YYYY-MM-DD");

  const handleUpdateEmployee = (e) => {
    let dobValue = document.getElementById("date-of-birth");
    let startDateValue = document.getElementById("start-date");
    setIsLoading(true);
    e.preventDefault();
    const employeeForm = document.getElementById("employee-form");
    const payload = {
      ...formToJSON(employeeForm),
      employee_id: id,
      date_of_birth: dobValue.value.length === 0 ? dateOfBirth : dobValue.value,
      start_date:
        startDateValue.value.length === 0 ? startDate : startDateValue.value,
      income_type_id: incomeTypeOptions.value,
    };

    SubmitUpdateEmployee(payload)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        showToast(res?.data.message, true);
        setTimeout(() => {
          window.location.href = "/dashboard/manage-employees";
        }, 2000);
        // companyForm?.reset();
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("err: ", error.response.data.message);
        showToast(error.response.data.message, false);
      });
  };
  const incomeTypeDropdown = incomeTypeQuery.data?.data.income_types;
  const incomeTypeOptions = incomeTypeDropdown?.map((iT) => ({
    value: iT.id,
    label: iT.income_name,
  }));

  return (
    <>
      <form id="employee-form" onSubmit={handleUpdateEmployee}>
        <h3 className="mb-3 text-sm">Basic Informations</h3>
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
                defaultValue={employeeDetails.first_name}
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
                defaultValue={employeeDetails.last_name}
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
                defaultValue={employeeDetails.other_names}
              />
            </div>
          </div>
          <div className="mt-3 field">
            <label className="text-sm label bold">Select Date Of Birth</label>
            <Flatpickr
              className="bg-gray-50 mr-2 cursor-pointer border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
              placeholder={dateOfBirth}
              ref={fp}
              name="date_of_birth"
              id="date-of-birth"
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
                defaultValue={employeeDetails.address}
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
                defaultValue={employeeDetails.permanent_address}
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
                defaultValue={employeeDetails.email}
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
                defaultValue={employeeDetails.phone}
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
                defaultValue={employeeDetails.nationality}
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
                defaultValue={employeeDetails.tin}
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
                defaultValue={employeeDetails.ghana_card_id}
              />
            </div>
          </div>
          <div className="mt-3 field">
            <label className="text-sm label bold">Select Start Date</label>
            <Flatpickr
              className="bg-gray-50 mr-2 cursor-pointer border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
              ref={fp}
              placeholder={startDate}
              name="start_date"
              id="start-date"
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
                defaultValue={employeeDetails.job_title}
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
                defaultValue={employeeDetails.nature_of_employment}
              />
            </div>
          </div>
        </div>
        {incomeSection.map((to, index) => (
          <div key={index} className="flex items-center mt-8">
            <div className="w-full mr-3">
              <label className="text-sm label bold">
                Select type of income
              </label>
              <div className="flex w-full row mobile:w-full">
                <Select
                  className="w-full"
                  value={to.incomeType}
                  onChange={(selectedOption) =>
                    handleChange(index, selectedOption)
                  }
                  options={incomeTypeOptions}
                  placeholder={employeeDetails.income_type}
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
                  name="income_amount"
                  defaultValue={employeeDetails.income_amount}
                  onChange={(e) => {
                    const updatedIncomeSection = [...incomeSection];
                    updatedIncomeSection[index].amount = e.target.value;
                    setIncomeSection(updatedIncomeSection);
                  }}
                />
              </div>
            </div>
            <div className="w-full">
              <label className="text-sm label bold">
                Select frequency of income
              </label>
              <div className="flex w-full row mobile:w-full">
                <Select
                  className="w-full"
                  value={to.incomeFrequency}
                  onChange={(selectedOption) =>
                    handleFrequencyChange(index, selectedOption)
                  }
                  options={options}
                  id="income-frequency"
                  placeholder={employeeDetails.income_frequency}
                />
              </div>
            </div>
            <div
              title="Remove fields"
              className="w-12 px-3 py-1 mt-3 ml-3 text-white bg-black cursor-pointer"
              onClick={() => handleRemoveOptionsField(index)}
            >
              <GrFormSubtract />
            </div>
          </div>
        ))}
        <div
          title="Add fields"
          className="flex items-center w-10 px-3 py-1 mt-3 text-white bg-black cursor-pointer"
          onClick={handleAddOptionsField}
        >
          <IoAddOutline />
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
          {isLoading ? <Loader /> : "Update"}
        </button>
      </form>
    </>
  );
}

export default UpdateAdminEmployee;
