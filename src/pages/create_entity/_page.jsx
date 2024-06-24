import React from "react";
import Select from "react-select";
import { noOfEmployees } from "../../core/data";
import { PiBuildingOfficeDuotone } from "react-icons/pi";
import { formToJSON } from "axios";
import { showToast } from "../../core/hooks/alert";
import { CreateEntityForm } from "../../core/services/entity.service";

function CreateEntity() {
  const [selectedRangeOption, setSelectedRangeOption] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleChange = (selectedRangeOption) => {
    setSelectedRangeOption(selectedRangeOption);
  };

  const handleCompanySubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const companyForm = document.getElementById("company-form");
    const payload = {
      ...formToJSON(companyForm),
      size: selectedRangeOption.value,
    };
    console.log(payload);
    CreateEntityForm(payload)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        showToast(res?.data.message, true);
        companyForm?.reset();
      })
      .catch((error) => {
        setIsLoading(false);
        showToast(error.response.data.error, false);
      });
  };
  return (
    <>
      <div className="flex">
        <form
          id="company-form"
          className="w-full"
          onSubmit={handleCompanySubmit}
        >
          <div className="grid-cols-2 gap-3">
            <div className="field">
              <label className="text-sm label bold">Enter Entity Name</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="text"
                  placeholder="Company Name"
                  name="name"
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
                  name="address"
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
            className="w-1/2 py-3 mt-8 text-white rounded-full primary mobile:w-full"
          >
            {isLoading ? <Loader /> : "Create Company"}
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

export default CreateEntity;
