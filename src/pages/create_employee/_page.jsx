import React from "react";
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";

function CreateEmployee() {
  const fp = React.useRef(null);
  const handleCreateEmployeeSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleCreateEmployeeSubmit}>
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
                name="email"
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
          <div className="field">
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
                name="tin"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 text-white mt-9 primary mobile:w-full"
        >
          Add Employee
        </button>
      </form>
    </>
  );
}

export default CreateEmployee;
