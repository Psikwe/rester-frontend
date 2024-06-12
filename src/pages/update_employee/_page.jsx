import React from "react";
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
import { showToast } from "../../core/hooks/alert";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import Select from "react-select";
import { options } from "../../core/data";
import { CreateEmployeeForm } from "../../core/services/employee.service";
import { formToJSON } from "axios";

function UpdateEmployee() {
  const fp = React.useRef(null);
  const [showNewPasswordType, setShowNewPasswordType] = React.useState(false);
  const newPasswordToggle = () => {
    setShowNewPasswordType(!showNewPasswordType);
  };
  const [selectedOption, setSelectedOption] = React.useState(null);
  const handleChange = (selectedOption) => {
    setSelectedAuthorValue(selectedOption);
  };
  const handleCreateEmployeeSubmit = (e) => {
    e.preventDefault();
    const entity_id = localStorage.getItem("entity_id");
    const employeeForm = document.getElementById("employee-form");
    const payload = {
      ...formToJSON(employeeForm),
      entity_id: entity_id,
    };

    CreateEmployeeForm(payload)
      .then((res) => {
        console.log(res);
        showToast(res?.data.message, true);
        // companyForm?.reset();
      })
      .catch((error) => {
        showToast(error.response.data.error, false);
      });
  };

  //   {
  //     label: "Basic Information",
  //     content: (
  //       <>
  //         <form id="employee-form" onSubmit={handleCreateEmployeeSubmit}>
  //           <div className="grid grid-cols-3 gap-3">
  //             <div className="field">
  //               <label className="text-sm label bold">Enter First Name</label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="text"
  //                   placeholder="First Name"
  //                   name="first_name"
  //                 />
  //               </div>
  //             </div>
  //             <div className="field">
  //               <label className="text-sm label bold">Enter Last Name</label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="text"
  //                   placeholder="Last Name"
  //                   name="last_name"
  //                 />
  //               </div>
  //             </div>
  //             <div className="field">
  //               <label className="text-sm label bold">Enter Other Names</label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="text"
  //                   placeholder="Other Names"
  //                   name="other_names"
  //                 />
  //               </div>
  //             </div>
  //             <div className="mt-3 field">
  //               <label className="text-sm label bold">
  //                 Select Date Of Birth
  //               </label>
  //               <Flatpickr
  //                 className="bg-gray-50 mr-2 cursor-pointer border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                 placeholder="Date of Birth"
  //                 ref={fp}
  //               />
  //               <button
  //                 type="button"
  //                 className="text-xs"
  //                 onClick={() => {
  //                   if (!fp?.current?.flatpickr) return;
  //                   fp.current.flatpickr.clear();
  //                 }}
  //               >
  //                 Clear
  //               </button>
  //             </div>
  //             <div className="mt-3 field">
  //               <label className="text-sm label bold">Enter Address</label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="text"
  //                   placeholder="Address"
  //                   name="address"
  //                 />
  //               </div>
  //             </div>
  //             <div className="mt-3 field">
  //               <label className="text-sm label bold">
  //                 Enter Permanent Address
  //               </label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="text"
  //                   placeholder="Permanent Address"
  //                   name="permanent_address"
  //                 />
  //               </div>
  //             </div>
  //             <div className=" field">
  //               <label className="text-sm label bold">Enter Email</label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="email"
  //                   placeholder="Email"
  //                   name="email"
  //                 />
  //               </div>
  //             </div>
  //             <div className="field">
  //               <label className="text-sm label bold">Enter Phone Number</label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="number"
  //                   placeholder="Phone Number"
  //                   name="phone"
  //                 />
  //               </div>
  //             </div>
  //             <div className="field">
  //               <label className="text-sm label bold">Enter Nationality</label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="text"
  //                   placeholder="nationality"
  //                   name="nationality"
  //                 />
  //               </div>
  //             </div>
  //             <div className="mt-3 field">
  //               <label className="text-sm label bold">Enter Tin</label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="text"
  //                   placeholder="nationality"
  //                   name="tin"
  //                 />
  //               </div>
  //             </div>
  //             <div className="mt-3 field">
  //               <label className="text-sm label bold">
  //                 Enter Ghana Card Number
  //               </label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="text"
  //                   placeholder="Ghana Card Number"
  //                   name="ghana_card_id"
  //                 />
  //               </div>
  //             </div>
  //             <div className="relative mt-3 field">
  //               <label className="label bold">Password</label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type={showNewPasswordType ? "text" : "password"}
  //                   placeholder="Password"
  //                   name="password"
  //                 />
  //               </div>
  //               <div className="absolute top-9 right-3">
  //                 <span onClick={newPasswordToggle} className="cursor-pointer">
  //                   {showNewPasswordType ? (
  //                     <HiMiniEyeSlash size={20} />
  //                   ) : (
  //                     <IoEyeSharp size={20} />
  //                   )}
  //                 </span>
  //               </div>
  //             </div>
  //           </div>
  //           <button
  //             type="submit"
  //             className="w-full py-3 text-white bg-purple-400 mt-9 mobile:w-full"
  //           >
  //             Add Employee
  //           </button>
  //         </form>
  //       </>
  //     ),
  //   },
  //   {
  //     label: "Details",
  //     content: (
  //       <>
  //         <form id="employee-form" onSubmit={handleCreateEmployeeSubmit}>
  //           <div className="grid grid-cols-3 gap-3">
  //             <div className="mt-3 field">
  //               <label className="text-sm label bold">Enter Employee</label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="text"
  //                   placeholder="First Name"
  //                   name="first_name"
  //                 />
  //               </div>
  //             </div>
  //             <div className="mt-3 field">
  //               <label className="text-sm label bold">Select Start Date</label>
  //               <Flatpickr
  //                 className="bg-gray-50 mr-2 cursor-pointer border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                 placeholder="Date of Birth"
  //                 ref={fp}
  //               />
  //               <button
  //                 type="button"
  //                 className="text-xs"
  //                 onClick={() => {
  //                   if (!fp?.current?.flatpickr) return;
  //                   fp.current.flatpickr.clear();
  //                 }}
  //               >
  //                 Clear
  //               </button>
  //             </div>
  //             <div className="mt-3 field">
  //               <label className="text-sm label bold">Select End Date</label>
  //               <Flatpickr
  //                 className="bg-gray-50 mr-2 cursor-pointer border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                 placeholder="End Date"
  //                 ref={fp}
  //               />
  //               <button
  //                 type="button"
  //                 className="text-xs"
  //                 onClick={() => {
  //                   if (!fp?.current?.flatpickr) return;
  //                   fp.current.flatpickr.clear();
  //                 }}
  //               >
  //                 Clear
  //               </button>
  //             </div>
  //             <div className="field">
  //               <label className="text-sm label bold">Job Title</label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="text"
  //                   placeholder="Other Names"
  //                   name="other_names"
  //                 />
  //               </div>
  //             </div>
  //             <div className="field">
  //               <label className="text-sm label bold">
  //                 Nature of Employment
  //               </label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="text"
  //                   placeholder="Other Names"
  //                   name="other_names"
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //           <button
  //             type="submit"
  //             className="w-full py-3 text-white mt-9 primary mobile:w-full"
  //           >
  //             Submit
  //           </button>
  //         </form>
  //       </>
  //     ),
  //   },
  //   {
  //     label: "Income",
  //     content: (
  //       <>
  //         <form id="employee-form" onSubmit={handleCreateEmployeeSubmit}>
  //           <div className="grid grid-cols-3 gap-3">
  //             <div className="field">
  //               <label className="text-sm label bold">Employee</label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="text"
  //                   placeholder="Full Name"
  //                   name="first_name"
  //                 />
  //               </div>
  //             </div>
  //             <div>
  //               <label className="text-sm label bold">
  //                 Select type of income
  //               </label>
  //               <div className="flex w-full row mobile:w-full">
  //                 <Select
  //                   className="w-full"
  //                   value={selectedOption}
  //                   onChange={handleChange}
  //                   options={options}
  //                   placeholder="Income Type"
  //                 />
  //               </div>
  //             </div>

  //             <div className="field">
  //               <label className="text-sm label bold">Enter Amount</label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="text"
  //                   placeholder="Amount"
  //                   name="amount"
  //                 />
  //               </div>
  //             </div>
  //             <div className="mt-3 field">
  //               <label className="text-sm label bold">
  //                 Enter Frequency of Income
  //               </label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="text"
  //                   placeholder="Frequency of Income"
  //                   name="frequency_of_income"
  //                 />
  //               </div>
  //             </div>
  //             <div className="mt-3 field">
  //               <label className="text-sm label bold">
  //                 Nature of Employment
  //               </label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="text"
  //                   placeholder="Other Names"
  //                   name="other_names"
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //           <button
  //             type="submit"
  //             className="w-full py-3 text-white mt-9 primary mobile:w-full"
  //           >
  //             Submit
  //           </button>
  //         </form>
  //       </>
  //     ),
  //   },
  //   {
  //     label: "Income Type",
  //     content: (
  //       <>
  //         <form id="employee-form" onSubmit={handleCreateEmployeeSubmit}>
  //           <div className="grid grid-cols-3 gap-3">
  //             <div className="field">
  //               <label className="text-sm label bold">Enter Income Name</label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="text"
  //                   placeholder="Income Name"
  //                   name="income_name"
  //                 />
  //               </div>
  //             </div>

  //             <div className="field">
  //               <label className="text-sm label bold">
  //                 Enter Income Description
  //               </label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="text"
  //                   placeholder="Income Description"
  //                   name="income_description"
  //                 />
  //               </div>
  //             </div>
  //             <div className="field">
  //               <label className="text-sm label bold">Enter Tax 1</label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="text"
  //                   placeholder="Tax 1"
  //                   name="tax_1"
  //                 />
  //               </div>
  //             </div>
  //             <div className="mt-3 field">
  //               <label className="text-sm label bold">Enter Tax 2</label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="text"
  //                   placeholder="Tax 2"
  //                   name="tax_2"
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //           <button
  //             type="submit"
  //             className="w-full py-3 text-white mt-9 primary mobile:w-full"
  //           >
  //             Submit
  //           </button>
  //         </form>
  //       </>
  //     ),
  //   },
  //   {
  //     label: "Allowable Deducations",
  //     content: (
  //       <>
  //         <form id="employee-form" onSubmit={handleCreateEmployeeSubmit}>
  //           <div className="grid grid-cols-3 gap-3">
  //             <div className="field">
  //               <label className="text-sm label bold">
  //                 Enter Deduction Name
  //               </label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="text"
  //                   placeholder="Deduction Name"
  //                   name="income_name"
  //                 />
  //               </div>
  //             </div>

  //             <div className="field">
  //               <label className="text-sm label bold">
  //                 Enter Deduction Description
  //               </label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="text"
  //                   placeholder="Deduction Description"
  //                   name="income_description"
  //                 />
  //               </div>
  //             </div>
  //             <div className="field">
  //               <label className="text-sm label bold">Enter Tax 1</label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="text"
  //                   placeholder="Tax 1"
  //                   name="tax_1"
  //                 />
  //               </div>
  //             </div>
  //             <div className="mt-3 field">
  //               <label className="text-sm label bold">Enter Tax 2</label>
  //               <div className="control">
  //                 <input
  //                   required
  //                   className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
  //                   type="text"
  //                   placeholder="Tax 2"
  //                   name="tax_2"
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //           <button
  //             type="submit"
  //             className="w-full py-3 text-white mt-9 primary mobile:w-full"
  //           >
  //             Submit
  //           </button>
  //         </form>
  //       </>
  //     ),
  //   },
  // ];
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
                placeholder="nationality"
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
        </div>
        <h3 className="text-sm mt-9">Details</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="mt-3 field">
            <label className="text-sm label bold">Enter Employee</label>
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
          <div className="mt-3 field">
            <label className="text-sm label bold">Select Start Date</label>
            <Flatpickr
              className="bg-gray-50 mr-2 cursor-pointer border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
              placeholder="Date of Birth"
              ref={fp}
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
            <label className="text-sm label bold">Select End Date</label>
            <Flatpickr
              className="bg-gray-50 mr-2 cursor-pointer border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
              placeholder="End Date"
              ref={fp}
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
          <div className="field">
            <label className="text-sm label bold">Job Title</label>
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
          <div className="field">
            <label className="text-sm label bold">Nature of Employment</label>
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
        </div>

        <h3 className="text-sm mt-9">Income</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="field">
            <label className="text-sm label bold">Employee</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Full Name"
                name="first_name"
              />
            </div>
          </div>
          <div>
            <label className="text-sm label bold">Select type of income</label>
            <div className="flex w-full row mobile:w-full">
              <Select
                className="w-full"
                value={selectedOption}
                onChange={handleChange}
                options={options}
                placeholder="Income Type"
              />
            </div>
          </div>

          <div className="field">
            <label className="text-sm label bold">Enter Amount</label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Amount"
                name="amount"
              />
            </div>
          </div>
          <div className="mt-3 field">
            <label className="text-sm label bold">
              Enter Frequency of Income
            </label>
            <div className="control">
              <input
                required
                className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                type="text"
                placeholder="Frequency of Income"
                name="frequency_of_income"
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
                name="other_names"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 mb-3 text-white bg-[#0DCAF0] mt-9 mobile:w-full"
        >
          Update
        </button>
      </form>
    </>
  );
}

export default UpdateEmployee;
