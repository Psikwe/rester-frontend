import React from "react";
import Loader from "../../components/loader/_component";
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { taxType } from "../../core/data";

function SuperAdminDashboard() {
  const fp = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedTaxType, setSelectedTaxType] = React.useState(null);
  const [sectionOne, setSectionOne] = React.useState([
    { uid: null, type: "", chargeableIncome: null, taxRate: "" },
  ]);
  const [selectedDistributed, setSelectedDistributed] = React.useState(null);
  const [isChecked, setIsChecked] = React.useState(false);
  const [isDistributedChecked, setIsDistributedChecked] = React.useState(false);

  const handleTaxTypeChange = (index, selectedOption) => {
    const updatedSectionOne = [...sectionOne];
    updatedSectionOne[index].type = selectedOption;
    setSectionOne(updatedSectionOne);
  };
  const handleDistributedChange = (selectedOption) => {
    setSelectedDistributed(selectedOption);
  };
  const handleCheck = (e) => {
    setIsChecked(e.target.checked);
  };
  const handleDistributedCheck = (e) => {
    setIsDistributedChecked(e.target.checked);
  };

  const handleTaxSubmit = () => {};

  const handleAddSectionOneFields = () => {
    setSectionOne([
      ...sectionOne,
      { uid: null, type: "", chargeableIncome: null, taxRate: "" },
    ]);
  };

  const handleRemoveSectionOneField = (index) => {
    const updatedSectionOne = sectionOne.filter((_, i) => i !== index);
    setSectionOne(updatedSectionOne);
  };
  return (
    <>
      <div className="flex">
        <form id="tax-form" className="w-full" onSubmit={handleTaxSubmit}>
          <h3>Section 1</h3>
          {sectionOne.map((sec, i) => (
            <div key={i} className="flex items-center  mt-8">
              <div className="field w-full mr-3">
                <label className="text-sm label">Enter UID</label>
                <div className="control">
                  <input
                    required
                    className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                    type="text"
                    placeholder="UID"
                    name="name"
                  />
                </div>
                {/* <p className="help">This is a help text</p> */}
              </div>
              <div className="w-full mr-3">
                <label className="text-sm label">Select Type</label>
                <div className="flex w-full row mobile:w-full">
                  <Select
                    className="w-full"
                    value={sec.type}
                    onChange={(selectedOption) =>
                      handleTaxTypeChange(i, selectedOption)
                    }
                    options={taxType}
                    placeholder="Type"
                  />
                </div>
              </div>
              <div className="field w-full mr-3">
                <label className="text-sm label">
                  Minimum Chargeable Income
                </label>
                <div className="control">
                  <input
                    required
                    className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                    type="text"
                    placeholder="Income"
                    name="name"
                  />
                </div>
                {/* <p className="help">This is a help text</p> */}
              </div>
              <div className="field w-full mr-3">
                <label className="text-sm label">Tax Rate</label>
                <div className="control">
                  <input
                    required
                    className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                    type="text"
                    placeholder="Rate"
                    name="name"
                  />
                </div>
                {/* <p className="help">This is a help text</p> */}
              </div>
              <div
                title="Remove"
                className="w-8 h-8 flex items-center px-3 py-1 mt-3 ml-3 text-white bg-black cursor-pointer"
                onClick={() => handleRemoveSectionOneField(i)}
              >
                -
              </div>
            </div>
          ))}
          <div
            title="Add fields"
            className="flex items-center w-10 px-3 py-1 mt-3 text-white bg-black cursor-pointer"
            onClick={handleAddSectionOneFields}
          >
            +
          </div>

          <h3 className="mt-12">Section 2</h3>
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="field">
              <label className="text-sm label "> Effective From</label>
              <Flatpickr
                className="bg-gray-50 mr-2 cursor-pointer border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                placeholder="Effective From"
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
            <div className="field">
              <label className="text-sm label "> Effective To</label>
              <Flatpickr
                className="bg-gray-50 mr-2 cursor-pointer border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                placeholder="Effective To"
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
            <div className="mt-8 cursor-not-allowed ml-6 field">
              <label className="cursor-not-allowed text-sm label">
                Distributed
              </label>
              <input
                className="relative bg-slate-100 cursor-not-allowed float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
                type="checkbox"
                disabled={true}
                value=""
                id="checkboxDefault"
                onChange={handleDistributedCheck}
              />
            </div>
            <div className="flex flex-col">
              <div className="mt-8 ml-6 field">
                <label className="text-sm label">Activate</label>
                <input
                  className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
                  type="checkbox"
                  value=""
                  id="checkboxDefault"
                  onChange={handleCheck}
                />
                {/* <p className="help">This is a help text</p> */}
              </div>
              {isChecked && (
                <div className="field mt-3">
                  <label className="text-sm label">Status Message</label>
                  <div className="control">
                    <textarea
                      required
                      className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                      type="text"
                      placeholder="Message"
                      name="name"
                    />
                  </div>
                  {/* <p className="help">This is a help text</p> */}
                </div>
              )}
            </div>
          </div>
          <hr className="my-8 border-gray-300 border-1" />
          <button
            type="submit"
            className="w-1/3 py-3 my-8 text-white rounded-full primary mobile:w-full"
          >
            {isLoading ? <Loader /> : "Create Tax Rate"}
          </button>
        </form>

        {/* <div className="w-full ml-16">
          <IoCalculatorSharp
            size={400}
            color="#f0eded
"
          />
        </div> */}
      </div>
    </>
  );
}

export default SuperAdminDashboard;
