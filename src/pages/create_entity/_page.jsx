import React from "react";
import Select from "react-select";
import {
  countries,
  currencies,
  industries,
  languages,
  noOfEmployees,
  regions,
} from "../../core/data";
import { PiBuildingOfficeDuotone } from "react-icons/pi";
import { formToJSON } from "axios";
import { showToast } from "../../core/hooks/alert";
import { CreateEntityForm } from "../../core/services/entity.service";

function CreateEntity() {
  const [selectedRangeOption, setSelectedRangeOption] = React.useState(null);
  const [selectedIndustry, setSelectedIndustry] = React.useState(null);
  const [selectedCurrency, setSelectedCurrency] = React.useState(null);
  const [selectedLanguage, setSelectedLanguage] = React.useState(null);
  const [selectedRegion, setSelectedRegion] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (selectedRangeOption) => {
    setSelectedRangeOption(selectedRangeOption);
  };

  const handleIndustryChange = (selectedRangeOption) => {
    setSelectedIndustry(selectedRangeOption);
  };

  const handleLanguageChange = (selectedRangeOption) => {
    setSelectedLanguage(selectedRangeOption);
  };
  const handleCurrencyChange = (selectedRangeOption) => {
    setSelectedCurrency(selectedRangeOption);
  };

  const handleRegionsChange = (selectedRangeOption) => {
    setSelectedRegion(selectedRangeOption);
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
              <label className="text-sm label">
                Enter Entity Name <span className="text-red-600">*</span>
              </label>
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
            <div className="mt-3 ">
              <label className="text-sm label">Select Industry</label>
              <div className="flex w-full row mobile:w-full">
                <Select
                  className="w-full"
                  value={selectedIndustry}
                  onChange={handleIndustryChange}
                  options={industries}
                  placeholder="Industry"
                />
              </div>
            </div>
            <div className="flex items-center w-full mt-3">
              <div className="w-full mr-2">
                <label className="text-sm label">Select Country</label>
                <div className="flex w-full row mobile:w-full">
                  <Select
                    className="w-full"
                    value={selectedRegion}
                    onChange={handleRegionsChange}
                    options={countries}
                    placeholder="Ghana"
                  />
                </div>
              </div>

              <div className="w-full">
                <label className="text-sm label">Select State/Province</label>
                <div className="flex w-full row mobile:w-full">
                  <Select
                    className="w-full"
                    value={selectedRegion}
                    onChange={handleRegionsChange}
                    options={regions}
                    placeholder="Greater Accra"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center mt-3">
              <div className="w-full mr-2 field">
                <label className="text-sm label">Enter Email</label>
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
              <div className="w-full field">
                <label className="text-sm label">Enter Address(GPS)</label>
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
            </div>
            <div className="mt-3">
              <label className="text-sm label">
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
            </div>

            <div className="mt-16 ">
              <h3 className="text-gray-300">Regional Settings</h3>
              <div className="flex ">
                <div className="w-full mt-3 mr-2">
                  <label className="text-sm label">Select Currency</label>
                  <div className="flex w-full row mobile:w-full">
                    <Select
                      className="w-full"
                      value={selectedCurrency}
                      onChange={handleCurrencyChange}
                      options={currencies}
                      placeholder="Ghanaian Cedi"
                    />
                  </div>
                </div>
                <div className="w-full mt-3">
                  <label className="text-sm label">Select Language</label>
                  <div className="flex w-full row mobile:w-full">
                    <Select
                      className="w-full"
                      isDisabled={true}
                      value={selectedLanguage}
                      onChange={handleLanguageChange}
                      options={languages}
                      placeholder="English"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-8 border-gray-300 border-1" />
          <span className="text-sm">Note: </span>
          <ul className="ml-8 text-xs text-gray-400 list-disc">
            <li>You can update some of these settings from Settings anytime</li>
            <li>
              The language you select will be the default language, you can
              change anytime.
            </li>
          </ul>
          <hr className="my-8 border-gray-300 border-1" />
          <button
            type="submit"
            className="w-1/3 py-3 my-8 text-white rounded-full primary mobile:w-full"
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
