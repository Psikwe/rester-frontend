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
import { formToJSON } from "axios";
import { showToast } from "../../core/hooks/alert";
import {
  CreateEntityForm,
  SetupOrganizationForm,
} from "../../core/services/entity.service";
import Confetti from "react-confetti";
import Modal from "../../components/modal/_component";
import Loader from "../../components/loader/_component";
import { useNavigate } from "react-router-dom";

function SetupOrganization() {
  const navigate = useNavigate();
  const [selectedCountryOption, setSelectedCountryOption] =
    React.useState(null);
  const [selectedNoOfEmployees, setSelectedNoOfEmployees] =
    React.useState(null);
  const [selectedCurrency, setSelectedCurrency] = React.useState(null);
  const [disableStateField, setDisableStateField] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState(null);
  const [selectedIndustry, setSelectedIndustry] = React.useState(null);
  const [selectedRegion, setSelectedRegion] = React.useState(null);
  const [openDurationModal, setOpenDurationModal] = React.useState(false);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleIndustryChange = (selectedOption) => {
    setSelectedIndustry(selectedOption);
  };
  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
  };
  const handleCurrencyChange = (selectedOption) => {
    setSelectedCurrency(selectedOption);
  };
  const handleRegionsChange = (selectedOption) => {
    setSelectedRegion(selectedOption);
  };
  const handleCountryChange = (selectedOption) => {
    setSelectedCountryOption(selectedOption);
    if (selectedOption.value !== "Ghana") {
      setDisableStateField(true);
    } else {
      setDisableStateField(false);
    }
  };
  const handleNoOfEmployeesChange = (selectedOption) => {
    setSelectedNoOfEmployees(selectedOption);
  };

  const handleCompanySubmit = (e) => {
    e.preventDefault();
    const admin_email = localStorage.getItem("admin_email");
    if (selectedIndustry === null) {
      showToast("please select industry", false);
      return;
    }
    if (selectedCountryOption === null) {
      showToast("please select country", false);
      return;
    }
    if (selectedCountryOption.value === "Ghana") {
      if (selectedRegion === null) {
        showToast("please select region", false);
        return;
      }
    }

    if (selectedNoOfEmployees === null) {
      showToast("please select number of employees", false);
      return;
    }
    if (selectedLanguage === null) {
      showToast("please select number of employees", false);
      return;
    }
    setIsLoading(true);
    const companyForm = document.getElementById("company-form");
    const payload = {
      ...formToJSON(companyForm),
      industry: selectedIndustry.value,
      country: selectedCountryOption.value,
      state:
        selectedCountryOption.value === "Ghana" ? selectedRegion.value : "",
      number_of_employees: selectedNoOfEmployees.value,
      currency: selectedCurrency.value,
      language: selectedLanguage.value,
      admin_email: admin_email,
    };

    SetupOrganizationForm(payload)
      .then((res) => {
        setIsLoading(false);
        setOpenDurationModal(true);
        setShowConfetti(true);
        localStorage.removeItem("admin_email");
        showToast(res?.data.message, true);
        // companyForm?.reset();
        setTimeout(() => {
          setShowConfetti(false);
        }, 10000);
      })
      .catch((error) => {
        setIsLoading(false);
        showToast(error.response.data.error, false);
      });
  };

  const closeDurationModal = () => {
    setOpenDurationModal(false);
  };

  const gotoLogin = () => {
    navigate("/login");
  };

  const show = () => {
    setOpenDurationModal(true);
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          drawShape={(ctx) => {
            ctx.beginPath();
            for (let i = 0; i < 22; i++) {
              const angle = 0.35 * i;
              const x = (0.2 + 1.5 * angle) * Math.cos(angle);
              const y = (0.2 + 1.5 * angle) * Math.sin(angle);
              ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.closePath();
          }}
        />
      )}
      {openDurationModal && (
        <>
          <Modal
            secondDiv="w-1/4"
            open={openDurationModal}
            close={closeDurationModal}
          >
            <div className="m-auto bg-white border-t-4 border-[#33b655] p-14">
              <h3 className="text-xl">Welcome On Board! 🎉 </h3>
              <div className="text-gray-400">
                <p>
                  Congratulations on setting up your organization! We're
                  thrilled to have you with us. To help you get started, would
                  you like to begin by adding your team members? Creating new
                  employee profiles will allow you to manage your team
                  efficiently and get everyone on the same page.
                </p>
                <br /> Please{" "}
                <span
                  className="font-bold text-black underline cursor-pointer"
                  onClick={gotoLogin}
                >
                  login
                </span>{" "}
                to get started🚀🚀🚀
              </div>
            </div>
          </Modal>
        </>
      )}
      <h3 className="mb-5 text-2xl text-center text-gray-500">
        Set up your organization profile
      </h3>

      <div className="flex w-1/2 p-10 m-auto my-16 bg-slate-100">
        <form
          id="company-form"
          className="w-full"
          onSubmit={handleCompanySubmit}
        >
          <div className="grid-cols-2 gap-3">
            <div className="field">
              <label className="text-sm label">
                Enter Entity Name
                {/* <span className="text-red-600">*</span> */}
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
                    value={selectedCountryOption}
                    onChange={handleCountryChange}
                    options={countries}
                    placeholder="Country"
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
                    placeholder="State/Province"
                    isDisabled={disableStateField}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center mt-3">
              <div className="w-full mr-2 field">
                <label className="text-sm label">Enter Company Email</label>
                <div className="control">
                  <input
                    required
                    className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                    type="company_email"
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
                  value={selectedNoOfEmployees}
                  onChange={handleNoOfEmployeesChange}
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
                      placeholder="Currency"
                    />
                  </div>
                </div>
                <div className="w-full mt-3">
                  <label className="text-sm label">Select Language</label>
                  <div className="flex w-full row mobile:w-full">
                    <Select
                      className="w-full"
                      value={selectedLanguage}
                      onChange={handleLanguageChange}
                      options={languages}
                      placeholder="Language"
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
            className="w-1/3 py-3 mt-8 text-white rounded-full primary mobile:w-full"
          >
            {isLoading ? <Loader /> : "Create Company"}
          </button>
        </form>
      </div>
    </>
  );
}

export default SetupOrganization;
