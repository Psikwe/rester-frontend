import React from "react";
import Loader from "../../components/loader/_component";
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { taxType } from "../../core/data";
import { CreateIncomeTaxRate } from "../../core/services/tax.service";
import { formToJSON } from "axios";
import { useTaxType } from "../../core/hooks/tax";

function SuperAdminDashboard() {
  const fp = React.useRef(null);
  const { taxTypeQuery } = useTaxType();
  const [isLoading, setIsLoading] = React.useState(false);
  const [typesOptions, setTyepesOptions] = React.useState([]);
  const [sectionOne, setSectionOne] = React.useState([
    {
      uid: null,
      tax_type: null,
      chargeable_income_min: null,
      chargeable_income_max: null,
      range_rate: null,
      order_no: null,
    },
  ]);
  const [selectedDistributed, setSelectedDistributed] = React.useState(null);
  const [isChecked, setIsChecked] = React.useState(false);
  const [isDistributedChecked, setIsDistributedChecked] = React.useState(false);

  const handleTaxTypeChange = (index, selectedOption) => {
    const updatedSectionOne = [...sectionOne];
    updatedSectionOne[index].tax_type = selectedOption;
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
  React.useEffect(() => {
    if (taxTypeQuery && taxTypeQuery.data && taxTypeQuery.data.data) {
      const options = taxTypeQuery.data.data.tax_types?.map((iT) => ({
        value: iT.id,
        label: iT.name,
      }));
      setTyepesOptions(options);
    }
  }, [taxTypeQuery]);

  // const taxTypeDropdown = taxTypeQuery.data.data.tax_types;

  // const taxOptions = taxTypeDropdown?.map((tt) => ({
  //   value: tt.id,
  //   label: tt.name,
  // }));

  const handleTaxSubmit = (e) => {
    e.preventDefault();
    const taxForm = document.getElementById("tax-form");
    setIsLoading(true);
    const firstSection = sectionOne.map((section) => ({
      uid: section.uid,
      tax_type: section.tax_type.value,
      chargeable_income_min: section.chargeable_income_min,
      chargeable_income_max: section.chargeable_income_max,
      range_rate: section.range_rate,
      order_no: section.order_no,
    }));
    const payload = {
      first_section: firstSection,
      ...formToJSON(taxForm),
      distributed: isDistributedChecked,
    };
    CreateIncomeTaxRate(payload)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        showToast(response.data.message, true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        console.log(error);
        showToast(error.response.data.message, false);
      });
  };

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
          <div className="p-2 border-2 border-blue-400 border-dashed">
            {sectionOne.map((sec, index) => (
              <div key={index} className="flex items-center mt-8">
                <div className="w-full mr-3 field">
                  <label className="text-sm label">Enter UID</label>
                  <div className="control">
                    <input
                      required
                      className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                      type="text"
                      placeholder="UID"
                      onChange={(e) => {
                        const updatedSectionOne = [...sectionOne];
                        updatedSectionOne[index].uid = e.target.value;
                        setSectionOne(updatedSectionOne);
                      }}
                    />
                  </div>
                  {/* <p className="help">This is a help text</p> */}
                </div>
                <div className="w-full mr-3">
                  <label className="text-sm label">Select Type</label>
                  <div className="flex w-full row mobile:w-full">
                    <Select
                      className="w-full"
                      value={sec.tax_type}
                      onChange={(selectedOption) =>
                        handleTaxTypeChange(index, selectedOption)
                      }
                      options={typesOptions}
                      placeholder="Type"
                    />
                  </div>
                </div>
                <div className="w-full mr-3 field">
                  <label className="text-sm label">Min Chargeable Income</label>
                  <div className="control">
                    <input
                      required
                      className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                      type="text"
                      placeholder="Minimum"
                      onChange={(e) => {
                        const updatedSectionOne = [...sectionOne];
                        updatedSectionOne[index].chargeable_income_min =
                          e.target.value;
                        setSectionOne(updatedSectionOne);
                      }}
                    />
                  </div>
                  {/* <p className="help">This is a help text</p> */}
                </div>
                <div className="w-full mr-3 field">
                  <label className="text-sm label">Max Chargeable Income</label>
                  <div className="control">
                    <input
                      required
                      className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                      type="text"
                      placeholder="Maximum"
                      onChange={(e) => {
                        const updatedSectionOne = [...sectionOne];
                        updatedSectionOne[index].chargeable_income_max =
                          e.target.value;
                        setSectionOne(updatedSectionOne);
                      }}
                    />
                  </div>
                  {/* <p className="help">This is a help text</p> */}
                </div>
                <div className="w-full mr-3 field">
                  <label className="text-sm label">Range Rate</label>
                  <div className="control">
                    <input
                      required
                      className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                      type="text"
                      placeholder="Rate"
                      onChange={(e) => {
                        const updatedSectionOne = [...sectionOne];
                        updatedSectionOne[index].range_rate = e.target.value;
                        setSectionOne(updatedSectionOne);
                      }}
                    />
                  </div>
                  {/* <p className="help">This is a help text</p> */}
                </div>
                <div className="w-full mr-3 field">
                  <label className="text-sm label">Order No.</label>
                  <div className="control">
                    <input
                      required
                      className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                      type="text"
                      placeholder="Order No."
                      onChange={(e) => {
                        const updatedSectionOne = [...sectionOne];
                        updatedSectionOne[index].order_no = e.target.value;
                        setSectionOne(updatedSectionOne);
                      }}
                    />
                  </div>
                  {/* <p className="help">This is a help text</p> */}
                </div>
                <div
                  title="Remove"
                  className="flex items-center w-8 h-8 px-3 py-1 mt-3 ml-3 text-white bg-black cursor-pointer"
                  onClick={() => handleRemoveSectionOneField(i)}
                >
                  -
                </div>
              </div>
            ))}
          </div>

          <div
            title="Add fields"
            className="flex items-center w-10 px-3 py-1 mt-8 mb-20 text-white bg-black cursor-pointer"
            onClick={handleAddSectionOneFields}
          >
            +
          </div>

          <div className="p-2 border-2 border-blue-400 border-dashed">
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="field">
                <label className="text-sm label "> Effective From</label>
                <Flatpickr
                  className="bg-gray-50 mr-2 cursor-pointer border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  placeholder="Effective From"
                  ref={fp}
                  name="effective_from"
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
                  name="effective_to"
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
              <div className="w-full mr-3 field">
                <label className="text-sm label">Narration</label>
                <div className="control">
                  <input
                    required
                    className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                    type="text"
                    placeholder="Naration"
                    name="narration"
                  />
                </div>
                {/* <p className="help">This is a help text</p> */}
              </div>
              <div className="mt-8 ml-6 cursor-not-allowed field">
                <label className="text-sm cursor-not-allowed label">
                  Distributed
                </label>
                <input
                  className="relative bg-slate-100 cursor-not-allowed float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
                  type="checkbox"
                  disabled={true}
                  value=""
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
                    onChange={handleCheck}
                  />
                  {/* <p className="help">This is a help text</p> */}
                </div>
                {isChecked && (
                  <div className="mt-3 field">
                    <label className="text-sm label">Status Message</label>
                    <div className="control">
                      <textarea
                        required
                        className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                        type="text"
                        placeholder="Message"
                        name="super_status_notes"
                      />
                    </div>
                    {/* <p className="help">This is a help text</p> */}
                  </div>
                )}
              </div>
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
