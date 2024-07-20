import React from "react";
import { useParams } from "react-router-dom";
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { formToJSON } from "axios";
import { showToast } from "../../core/hooks/alert";
import {
  GetOneIncomeTaxRate,
  UpdateIncomeTaxRateForm,
} from "../../core/services/tax.service";
import Loader from "../../components/loader/_component";
import { useTaxType } from "../../core/hooks/tax";
import moment from "moment";

function SuperUpdateTaxRate() {
  const fp = React.useRef(null);
  const { id } = useParams();
  const { taxTypeQuery } = useTaxType();
  const [incomeTaxRate, setIncomeTaxRate] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDistributedChecked, setIsDistributedChecked] = React.useState(false);
  const [typesOptions, setTyepesOptions] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);
  const [sectionOne, setSectionOne] = React.useState([
    {
      uid: null,
      tax_type: null,
      chargeable_income_min: 0,
      chargeable_income_max: null,
      range_rate: null,
      order_no: 1,
    },
  ]);

  React.useEffect(() => {
    GetOneIncomeTaxRate(id)
      .then((response) => {
        console.log("rrr: ", response.data.income_tax_rates[0].uid);
        setIncomeTaxRate(response.data.income_tax_rates);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    if (taxTypeQuery && taxTypeQuery.data && taxTypeQuery.data.data) {
      const options = taxTypeQuery.data.data.tax_types?.map((iT) => ({
        value: iT.id,
        label: iT.name,
      }));
      setTyepesOptions(options);
    }
  }, [taxTypeQuery]);

  const handleCheck = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleDistributedCheck = (e) => {
    setIsDistributedChecked(e.target.checked);
  };

  const handleTaxTypeChange = (index, selectedOption) => {
    const updatedSectionOne = sectionOne.map((item) => ({
      ...item,
      tax_type: selectedOption,
    }));
    setSectionOne(updatedSectionOne);
  };

  const handleAddSectionOneFields = () => {
    setSectionOne((prevSectionOne) => [
      ...prevSectionOne,
      {
        uid: null,
        tax_type: prevSectionOne[0]?.tax_type || null,
        chargeable_income_min: null,
        chargeable_income_max: null,
        range_rate: null,
        order_no: prevSectionOne.length + 1,
      },
    ]);
  };

  const handleRemoveSectionOneField = (index) => {
    const updatedSectionOne = sectionOne.filter((_, i) => i !== index);
    setSectionOne(updatedSectionOne);
  };

  const handleUpdateIncomeTax = (e) => {
    e.preventDefault();

    const updateTaxForm = document.getElementById("update-tax-form");
    // if (isChecked) {
    //   let statusMessageField = document.getElementById("status-message").value;

    //   if (statusMessageField === "") {
    //     showToast("Status message field is required", false);
    //     return;
    //   }
    // }
    setIsLoading(true);
    // const firstSection = sectionOne.map((section) => ({
    //   uid: section.uid,
    //   tax_type: section.tax_type.value,
    //   chargeable_income_min: section.chargeable_income_min,
    //   chargeable_income_max: section.chargeable_income_max,
    //   range_rate: section.range_rate,
    //   order_no: section.order_no,
    //   id: id,
    // }));

    const payload = {
      ...formToJSON(updateTaxForm),
      first_section: [
        {
          uid: incomeTaxRate[0].uid,
          tax_type: incomeTaxRate[0].tax_type.value,
          chargeable_income_min: incomeTaxRate[0].chargeable_income_min,
          chargeable_income_max: incomeTaxRate[0].chargeable_income_max,
          range_rate: incomeTaxRate[0].range_rate,
          order_no: incomeTaxRate[0].order_no,
        },
      ],
      effective_from: incomeTaxRate[0].effective_from,
      effective_to: incomeTaxRate[0].effective_to,
      distributed: isDistributedChecked,
      activate: isChecked,
    };

    console.log("pay: ", payload);
    UpdateIncomeTaxRateForm(payload)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        showToast(response.data.message, true);
        updateTaxForm.reset();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        console.log(error);
        showToast(error.response.data.error, false);
      });
  };

  return (
    <>
      <form
        id="update-tax-form"
        className="w-full"
        onSubmit={handleUpdateIncomeTax}
      >
        <div className="p-2 border-2 border-blue-400 border-dashed">
          <div className="flex items-center mt-8">
            <div className="w-full mr-3 field">
              <label className="text-sm label">Enter UID</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="text"
                  disabled
                  defaultValue={incomeTaxRate && incomeTaxRate[0].uid}
                  placeholder="UID"
                />
              </div>
              {/* <p className="help">This is a help text</p> */}
            </div>
            <div className="w-full mr-3">
              <label className="text-sm label">Select Type</label>
              <div className="flex w-full row mobile:w-full">
                <Select
                  className="w-full"
                  options={typesOptions}
                  isDisabled
                  placeholder={incomeTaxRate && incomeTaxRate[0].tax_type}
                />
              </div>
            </div>
            <div className="w-full mr-3 field">
              <label className="text-sm label">Min Chargeable Income</label>
              <div className="control">
                <input
                  required
                  disabled
                  defaultValue={
                    incomeTaxRate && incomeTaxRate[0].chargeable_income_min
                  }
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="text"
                  placeholder="Minimum"
                />
              </div>
            </div>
            {/* <p className="help">This is a help text</p> */}
            <div className="w-full mr-3 field">
              <label className="text-sm label">Max Chargeable Income</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="text"
                  disabled
                  defaultValue={
                    incomeTaxRate && incomeTaxRate[0].chargeable_income_max
                  }
                  placeholder="Maximum"
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
                  disabled
                  defaultValue={incomeTaxRate && incomeTaxRate[0].range_rate}
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
                  id="order-no"
                  placeholder="Order No."
                  disabled
                  defaultValue={incomeTaxRate && incomeTaxRate[0].order_no}
                  // onChange={(e) => {
                  //   const updatedSectionOne = [...sectionOne];
                  //   updatedSectionOne[index].order_no = e.target.value;
                  //   setSectionOne(updatedSectionOne);
                  // }}
                />
              </div>
              {/* <p className="help">This is a help text</p> */}
            </div>
          </div>
        </div>

        <div className="p-2 mt-12 border-2 border-blue-400 border-dashed">
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="field">
              <label className="text-sm label "> Effective From</label>
              <Flatpickr
                className="bg-gray-50 mr-2 cursor-pointer border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                ref={fp}
                name="effective_from"
                disabled
                placeholder={moment(
                  incomeTaxRate && incomeTaxRate[0].effective_from
                ).format("YYYY-MM-DD")}
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
                placeholder={moment(
                  incomeTaxRate && incomeTaxRate[0].effective_to
                ).format("YYYY-MM-DD")}
                ref={fp}
                disabled
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
                  disabled
                  defaultValue={incomeTaxRate && incomeTaxRate[0].narration}
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
                  defaultChecked={
                    incomeTaxRate && incomeTaxRate[0].activate === true
                      ? true
                      : false
                  }
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
                      id="status-message"
                      name="super_status_notes"
                      defaultValue={
                        incomeTaxRate && incomeTaxRate[0].super_status_notes
                      }
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
          {isLoading ? <Loader /> : "Update Tax Rate"}
        </button>
      </form>
    </>
  );
}

export default SuperUpdateTaxRate;
