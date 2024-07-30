import React from "react";
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
import { showToast } from "../../core/hooks/alert";
import Loader from "../../components/loader/_component";
import {
  DeleteIncome,
  GetOneEmployee,
  SubmitUpdateEmployee,
} from "../../core/services/employee.service";
import Select from "react-select";
import { formToJSON } from "axios";
import { useParams } from "react-router-dom";
import { useIncomeType } from "../../core/hooks/income";
import moment from "moment";
import { options } from "../../core/data";
import { MdDelete } from "react-icons/md";
import Modal from "../../components/modal/_component";
import { BsExclamationCircleFill } from "react-icons/bs";

function UpdateAdminEmployee() {
  const fp = React.useRef(null);
  const entity_id = localStorage.getItem("entity_id");
  const { id } = useParams();
  const { incomeTypeQuery } = useIncomeType(entity_id);
  const [isLoading, setIsLoading] = React.useState(false);
  const [existingIncomeSelected, setIsExistingIncomeSelected] =
    React.useState(false);
  const [existingFrequencySelected, setIsExistingFrequencySelected] =
    React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [incomeId, setIncomeId] = React.useState();
  const [employeeId, setEmployeeId] = React.useState();
  const [isIncomeTypeUpdated, setIsIncomeTypeUpdated] = React.useState(false);
  const [isAmountUpdated, setIsAmountUpdated] = React.useState(false);
  const [isFrequencyUpdated, setIsFrequencyUpdated] = React.useState(false);

  const [employeeDetails, setEmployeeDetails] = React.useState({});
  const [isDependent, setIsDependent] = React.useState(false);
  const [deleteIsDone, setDeleteIsDone] = React.useState(false);
  const [isDependentChanged, setIsDependentChanged] = React.useState(false);
  const [isCertified, setIsCertified] = React.useState(false);
  const [isCertifiedChanged, setIsCertifiedChanged] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [isDisabledChanged, setIsDisabledChanged] = React.useState(false);
  const [isSponsor, setIsSponsorChild] = React.useState(false);
  const [isSponsorChanged, setIsSponsorChildChanged] = React.useState(false);
  const [isProvidesNecessities, setIsProvidesNecessities] =
    React.useState(false);
  const [isProvidesNecessitiesChanged, setIsProvidesNecessitiesChanged] =
    React.useState(false);
  const [noIncomeMessage, setNoIncomeMessage] = React.useState("");
  const [noIncomeMessageChanged, setNoIncomeMessageChanged] =
    React.useState("");
  const [incomeSection, setIncomeSection] = React.useState([
    { incomeType: null, amount: "", incomeFrequency: null },
  ]);
  const [existingIncomeSection, setExistingIncomeSection] = React.useState([
    { income_type_id: null, amount: "", frequency: null },
  ]);
  const [updateIncometypeSection, setUpdateIncomeTypeSection] =
    React.useState();

  const handleChange = (index, selectedOption) => {
    const updatedIncomeSection = [...incomeSection];
    updatedIncomeSection[index].incomeType = selectedOption;
    setIncomeSection(updatedIncomeSection);
    setIsIncomeTypeUpdated(true);
  };

  React.useEffect(() => {
    if (updateIncometypeSection) {
      setExistingIncomeSection(
        updateIncometypeSection.map((ui) => ({
          income_type_id: ui.income_type_id,
          amount: ui.amount,
          frequency: ui.frequency,
        }))
      );
    }
  }, [updateIncometypeSection]);

  const handleExistingIncomeChange = (idx, selectedOption) => {
    const updatedIncomeSection = [...existingIncomeSection];
    updatedIncomeSection[idx] = {
      ...updatedIncomeSection[idx],
      income_type_id: selectedOption.value,
    };
    setExistingIncomeSection(updatedIncomeSection);
    setIsExistingIncomeSelected(true);
  };

  const handleExistingAmountChange = (idx, amount) => {
    const updatedIncomeSection = [...existingIncomeSection];
    updatedIncomeSection[idx] = {
      ...updatedIncomeSection[idx],
      amount: amount,
    };
    setExistingIncomeSection(updatedIncomeSection);
  };

  const handleFrequencyChange = (index, selectedOption) => {
    const updatedIncomeSection = [...incomeSection];
    updatedIncomeSection[index].incomeFrequency = selectedOption;
    setIncomeSection(updatedIncomeSection);
    setIsFrequencyUpdated(true);
  };

  const handleExistingFrequencyChange = (idx, selectedOption) => {
    const updatedIncomeSection = [...existingIncomeSection];
    updatedIncomeSection[idx] = {
      ...updatedIncomeSection[idx],
      frequency: selectedOption.value,
    };
    setExistingIncomeSection(updatedIncomeSection);
    setIsExistingFrequencySelected(true);
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

  React.useEffect(() => {
    GetOneEmployee(id)
      .then((response) => {
        setEmployeeDetails(response.data.employee);
        setUpdateIncomeTypeSection(response.data.employee.incomeSection);
        setNoIncomeMessage(response.data.message);
        console.log("ee: ", response.data.employee.incomeSection);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [deleteIsDone]);

  let dateOfBirth = moment(employeeDetails.data_of_birth).format("YYYY-MM-DD");
  let startDate = moment(employeeDetails.start_date).format("YYYY-MM-DD");
  const handleUpdateEmployee = (e) => {
    let dobValue = document.getElementById("date-of-birth");
    let startDateValue = document.getElementById("start-date");
    setIsLoading(true);
    e.preventDefault();
    const employeeForm = document.getElementById("employee-form");
    const amount = document.getElementById("amount");
    const preIncomeTypes = updateIncometypeSection.map((ui, _) => {
      return ui.income_type_id;
    });

    // console.log("pre", preIncomeTypes);

    const preFrequencyTypes = updateIncometypeSection.map((ui, _) => {
      return ui.frequency;
    });

    const existingIncomes = updateIncometypeSection.map((ui, idx) => {
      const updatedIncome = existingIncomeSection[idx];
      return {
        incomeType: updatedIncome?.income_type_id ?? ui.income_type_id,
        amount: updatedIncome?.amount ?? ui.amount,
        incomeFrequency: updatedIncome?.frequency ?? ui.frequency,
      };
    });

    console.log("pre", existingIncomes);

    const transformedData = incomeSection.map((entry) => ({
      incomeType: isIncomeTypeUpdated ? entry.incomeType.value : "",
      amount: isAmountUpdated ? entry.amount : "",
      incomeFrequency: isFrequencyUpdated ? entry.incomeFrequency.value : "",
    }));

    const grandTotalIncomes = existingIncomes.concat(transformedData);

    const payload = {
      ...formToJSON(employeeForm),
      employee_id: id,
      date_of_birth: dobValue.value.length === 0 ? dateOfBirth : dobValue.value,
      start_date:
        startDateValue.value.length === 0 ? startDate : startDateValue.value,
      incomeSection: grandTotalIncomes,
      has_dependant_spouse: isDependentChanged
        ? isDependent
        : employeeDetails.has_dependant_spouse,
      is_certified_disabled: isCertifiedChanged
        ? isCertified
        : employeeDetails.is_certified_disabled,
      is_disabled: isDisabledChanged ? isDisabled : employeeDetails.is_disabled,
      sponsors_child_education: isSponsorChanged
        ? isSponsor
        : employeeDetails.sponsors_child_education,
      provides_necessities_for_children: isProvidesNecessitiesChanged
        ? isProvidesNecessities
        : employeeDetails.provides_necessities_for_children,
    };

    SubmitUpdateEmployee(payload)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        showToast(res?.data.message, true);
        setTimeout(() => {
          window.location.href = "/dashboard/manage-employees";
        }, 2000);
        companyForm?.reset();
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("err: ", error.response.data.message);
        showToast(error.response.data.error, false);
      });
  };
  const incomeTypeDropdown = incomeTypeQuery.data?.data.income_types;
  const incomeTypeOptions = incomeTypeDropdown?.map((iT) => ({
    value: iT.id,
    label: iT.income_name,
  }));

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteIncome = (incomeId, employeeId) => {
    setDeleteModalOpen(true);
    setEmployeeId(employeeId);
    setIncomeId(incomeId);
  };

  const confirmDelete = () => {
    DeleteIncome(incomeId, entity_id, employeeId)
      .then((response) => {
        setDeleteModalOpen(false);
        showToast(response.data.message, true);
        setDeleteIsDone(true);
      })
      .catch((error) => {
        setDeleteModalOpen(false);
        showToast(error.response.data.error, false);
      });
  };

  return (
    <>
      <Modal open={deleteModalOpen} close={closeDeleteModal} closeOnOverlay>
        <div className="p-10 bg-white">
          <div className="w-16 m-auto">
            <BsExclamationCircleFill size={70} color="red" />
          </div>
          <div>
            <h3 className="mt-3 text-black">
              Are you sure you want to delete this income?
            </h3>
            <div className="flex mx-2 mt-6">
              <button
                onClick={closeDeleteModal}
                className="w-full py-2 rounded-full mr-2 text-white mt-9 primary mobile:w-full"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="w-full py-2 text-white bg-red-500 mt-9 rounded-full mobile:w-full"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </Modal>

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

        <div className="grid grid-cols-3">
          <div className="mt-8 ml-6 field ">
            <label className="text-sm label">
              Check if employee has dependent spouse
            </label>
            <input
              className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
              type="checkbox"
              defaultChecked={employeeDetails.has_dependant_spouse}
              onChange={handleDependentCheck}
              onClick={() => setIsDependentChanged(true)}
            />
          </div>
          <div className="mt-8 ml-6 field">
            <label className="text-sm label">
              Check if employee is disabled
            </label>
            <input
              className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
              type="checkbox"
              defaultChecked={employeeDetails.is_disabled}
              onChange={handleDisabledCheck}
              onClick={() => setIsDisabledChanged(true)}
            />
          </div>
          <div className="mt-8 ml-6 field">
            <label className="text-sm label">
              Check if employee sponsors child education
            </label>
            <input
              className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
              type="checkbox"
              defaultChecked={employeeDetails.sponsors_child_education}
              onChange={handleSponsorChildCheck}
              onClick={() => setIsSponsorChildChanged(true)}
            />
          </div>
          <div className="mt-8 ml-6 field">
            <label className="text-sm label">
              Check if employee is certified disabled
            </label>
            <input
              className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
              type="checkbox"
              defaultChecked={employeeDetails.is_certified_disabled}
              onChange={handleCertifiedCheck}
              onClick={() => setIsCertifiedChanged(true)}
            />
          </div>
          <div className="mt-8 ml-6 field">
            <label className="text-sm label">
              Check if employee provides necessities for children
            </label>
            <input
              className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
              type="checkbox"
              defaultChecked={employeeDetails.provides_necessities_for_children}
              onChange={handleProvidesCheck}
              onClick={() => setIsProvidesNecessitiesChanged(true)}
            />
          </div>
        </div>
        <div className="border-gray-500 border-2 p-2 mt-8 border-dotted">
          <h3 className="my-8">Existing Incomes</h3>
          <div className="text-gray-400 flex justify-between">
            {["Income Type", "Amount", "Frequency of Income"].map(
              (lists, idx) => (
                <div key={idx}>{lists}</div>
              )
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {updateIncometypeSection &&
              updateIncometypeSection.map((inc, idx) => (
                <React.Fragment key={idx}>
                  <div className="mt-6 w-full mobile:w-full">
                    <Select
                      className="w-full"
                      onChange={(selectedOption) =>
                        handleExistingIncomeChange(idx, selectedOption)
                      }
                      options={incomeTypeOptions}
                      placeholder={inc.income_type_name}
                    />
                  </div>
                  <div className="w-full mr-3">
                    <label className="text-sm label bold">Enter Amount</label>
                    <div className="control">
                      <input
                        className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                        type="number"
                        required
                        placeholder="Amount"
                        defaultValue={inc.amount}
                        onChange={(e) =>
                          handleExistingAmountChange(idx, e.target.value)
                        }
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
                        onChange={(selectedOption) =>
                          handleExistingFrequencyChange(idx, selectedOption)
                        }
                        options={options}
                        id="income-frequency"
                        placeholder={inc.frequency}
                      />
                    </div>
                  </div>
                  <div
                    title="Delete"
                    onClick={() => handleDeleteIncome(inc.id, inc.employee_id)}
                    className="cursor-pointer col-span-4 w-6"
                  >
                    <MdDelete color="red" size={18} />
                  </div>
                </React.Fragment>
              ))}
          </div>
        </div>
        {noIncomeMessage === "" || !noIncomeMessage ? (
          <>
            {/* <div className="border-gray-500 border-2 p-2 mt-8 border-dotted">
              <h3 className=" mt-8">Existing Incomes</h3>
              <div className="text-gray-400 flex justify-between">
                {["Income Type", "Amount", "Frequency of Income"].map(
                  (lists, idx) => (
                    <div key={idx}>{lists}</div>
                  )
                )}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {updateIncometypeSection &&
                  updateIncometypeSection.map((inc, idx) => (
                    <React.Fragment key={idx}>
                      <EmployeeIncomeSectionUpdate
                        value={inc.amount}
                        frequency={inc.frequency}
                        income={inc.income_type_name}
                      />
                    </React.Fragment>
                  ))}
              </div>
            </div> */}
          </>
        ) : (
          <h3 className="mt-8 text-red-500">{noIncomeMessage}</h3>
        )}

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
                  placeholder="Select Income Type"
                />
              </div>
            </div>
            <div className="w-full mr-3">
              <label className="text-sm label bold">Enter Amount</label>
              <div className="control">
                <input
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                  type="number"
                  placeholder="Amount"
                  value={to.amount}
                  onChange={(e) => {
                    const updatedIncomeSection = [...incomeSection];
                    updatedIncomeSection[index].amount = e.target.value;
                    setIncomeSection(updatedIncomeSection);
                    setIsAmountUpdated(true);
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
                  placeholder="Select Frequency of Income"
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
