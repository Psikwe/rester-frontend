import React from "react";
import Select from "react-select";
import { noOfEmployees } from "../../core/data";
import { PiBuildingOfficeDuotone } from "react-icons/pi";

function CreateCompany() {
  const [selectedRangeOption, setSelectedRangeOption] = React.useState(null);
  const handleChange = (selectedRangeOption) => {
    setSelectedRangeOption(selectedRangeOption);
  };

  const handleCompanySubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="flex">
        <form className="w-full" onSubmit={handleCompanySubmit}>
          <div className="grid-cols-2 gap-3">
            <div className="9field">
              <label className="text-sm label bold">Enter Company Name</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="text"
                  placeholder="Company Name"
                  name="company_name"
                />
              </div>
              {/* <p className="help">This is a help text</p> */}
            </div>

            <div className="my-6 field">
              <label className="text-sm label bold">Enter Address(GPS)</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="text"
                  placeholder="Address"
                  name="company_address"
                />
              </div>
              {/* <p className="help">This is a help text</p> */}
            </div>
            <label className="text-sm label bold">
              Select number of employees
            </label>
            <div className="flex w-full row mobile:w-full">
              <Select
                className="w-full"
                value={selectedRangeOption}
                onChange={handleChange}
                options={noOfEmployees}
                placeholder="Number of employees"
              />
            </div>
            <div className="mt-6 field">
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
              {/* <p className="help">This is a help text</p> */}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-8 text-white primary mobile:w-full"
          >
            Add Company
          </button>
        </form>

        <div className="w-full ml-16">
          <PiBuildingOfficeDuotone
            size={400}
            color="#f0eded
"
          />
        </div>
      </div>
    </>
  );
}

export default CreateCompany;
