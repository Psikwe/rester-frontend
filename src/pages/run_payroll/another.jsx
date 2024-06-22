import React from "react";
import { Spreadsheet } from "react-spreadsheet";
import { GetTaxReport } from "../../core/services/report.service";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import Modal from "../../components/modal/_component";
import { showToast } from "../../core/hooks/alert";
import DataGrid from "react-data-grid";

const MySpreadsheet = () => {
  const entity_id = localStorage.getItem("entity_id");
  const fp = React.useRef(null);
  const [report, setReport] = React.useState([]);
  const [selectedStartDate, setSelectedStartDate] = React.useState(null);
  const [selectedEndDate, setSelectedEndDate] = React.useState(null);
  const [payroll, setPayroll] = React.useState([]);
  const [durationIsConfirmed, setDurationIsConfirmed] = React.useState(false);
  const [openDurationModal, setOpenDurationModal] = React.useState(true);

  let start_date = "2024-06-05";
  let end_date = "2024-06-06";

  const anothers = [
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "asd Kwesi asd" }, { value: "0.00" }],
    [{ value: false }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "Cleaner" }],
    [{ value: "sadfas" }, { value: false }],
    [{ value: 44 }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "asd23" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "me asd me" }, { value: "0.00" }],
    [{ value: false }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "Cleaner" }],
    [{ value: "asdas" }, { value: false }],
    [{ value: 43 }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "asdf223" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }, { value: "0.00" }],
    [{ value: "0.00" }],
  ];

  const me = [
    {
      accomodation_element: "0.00",
      basic_salary: "0.00",
      bonus_income: "0.00",
      cash_allowances: "0.00",
      chargeable_income: "0.00",
      deductible_reliefs: "0.00",
      excess_bonus: "0.00",
      final_tax_on_bonus: "0.00",
      name_of_employee: "asd Kwesi asd",
      non_cash_benefit: "0.00",
      non_resident: false,
      overtime_income: "0.00",
      overtime_tax: "0.00",
      position: "Cleaner",
      remarks: "sadfas",
      secondary_employment: false,
      serial_no: 44,
      severance_pay_paid: "0.00",
      social_security_fund: "0.00",
      tax_deductible: "0.00",
      third_tier: "0.00",
      tin: "asd23",
      total_assessable_income: "0.00",
      total_cash_emolument: "0.00",
      total_reliefs: "0.00",
      total_tax_payable_to_gra: "0.00",
      vehicle_element: "0.00",
    },
    {
      accomodation_element: "0.00",
      basic_salary: "0.00",
      bonus_income: "0.00",
      cash_allowances: "0.00",
      chargeable_income: "0.00",
      deductible_reliefs: "0.00",
      excess_bonus: "0.00",
      final_tax_on_bonus: "0.00",
      name_of_employee: "me asd me",
      non_cash_benefit: "0.00",
      non_resident: false,
      overtime_income: "0.00",
      overtime_tax: "0.00",
      position: "Cleaner",
      remarks: "asdas",
      secondary_employment: false,
      serial_no: 43,
      severance_pay_paid: "0.00",
      social_security_fund: "0.00",
      tax_deductible: "0.00",
      third_tier: "0.00",
      tin: "asdf223",
      total_assessable_income: "0.00",
      total_cash_emolument: "0.00",
      total_reliefs: "0.00",
      total_tax_payable_to_gra: "0.00",
      vehicle_element: "0.00",
    },
  ];

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date[0]);
  };
  let formattedStartDate = moment(selectedStartDate).format("YYYY-MM-DD");
  let formattedEndDate = moment(selectedEndDate).format("YYYY-MM-DD");

  const closeDurationModal = () => {
    setOpenDurationModal(false);
  };

  const validate = () => {
    if (!selectedStartDate || !selectedEndDate) {
      showToast("Select a start date or end date", false);
      return;
    }
    setDurationIsConfirmed(true);
    setOpenDurationModal(false);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date[0]);
  };

  const transformArray = (arr) => {
    const result = [];

    arr.forEach((obj) => {
      const entries = Object.entries(obj);

      for (let i = 0; i < entries.length; i += 2) {
        const pair = [];

        pair.push({ value: entries[i][1] });

        if (i + 1 < entries.length) {
          pair.push({ value: entries[i + 1][1] });
        }

        result.push(pair);
      }
    });

    return result;
  };

  function reshapeArray(array, columns) {
    // Flatten the array and extract the values
    const flattened = array.flat().map((cell) => cell.value);

    // Create a new array with chunks of the specified size
    const reshaped = [];
    for (let i = 0; i < flattened.length; i += columns) {
      const chunk = flattened
        .slice(i, i + columns)
        .map((value) => ({ value, readOnly: true }));
      reshaped.push(chunk);
    }

    return reshaped;
  }
  function extendDataWithEmptyCells(data, totalColumns, totalRows) {
    // Ensure each row has the required number of columns
    const extendedData = data.map((row) => {
      const emptyCells = Array.from(
        { length: totalColumns - row.length },
        () => ({ value: "", readOnly: true })
      );
      return [...row, ...emptyCells];
    });

    // Add additional rows if needed
    const additionalRows = Array.from(
      { length: totalRows - extendedData.length },
      () => {
        return Array.from({ length: totalColumns }, () => ({
          value: "",
          readOnly: true,
        }));
      }
    );

    return [...extendedData, ...additionalRows];
  }

  const columns = [
    { key: "accomodation_element", name: "Accomodation Element" },
    { key: "basic_salary", name: "Basic Salary" },
    { key: "bonus_income", name: "Bonus Income" },
    { key: "cash_allowances", name: "Cash Allowances" },
    { key: "chargeable_income", name: "Chargeable Income" },
    { key: "deductible_reliefs", name: "Deductible Reliefs" },
    { key: "excess_bonus", name: "Excess Bonus" },
    { key: "final_tax_on_bonus", name: "Final Tax On Bonus" },
    { key: "name_of_employee", name: "Name Of Employee" },
    { key: "non_cash_benefit", name: "Non Cash Benefit" },
    { key: "non_resident", name: "Non Resident" },
    { key: "overtime_income", name: "Overtime Income" },
    { key: "overtime_tax", name: "Overtime Tax" },
    { key: "position", name: "Position" },
    { key: "remarks", name: "Remarks" },
    { key: "secondary_employment", name: "Secondary Employment" },
    { key: "serial_no", name: "Serial No." },
    { key: "severance_pay_paid", name: "Serverance Pay Paid" },
    { key: "social_security_fund", name: "Social Security Fund" },
    { key: "tax_deductible", name: "Tax Deductible" },
    { key: "third_tier", name: "Third Tier" },
    { key: "tin", name: "Tin" },
    { key: "total_assessable_income", name: "Total Assemble Income" },
    { key: "total_cash_emolument", name: "Total Cash Employment" },
    { key: "total_reliefs", name: "Total Reliefs" },
    { key: "total_tax_payable_to_gra", name: "Total Tax Payable To GRA" },
    { key: "vehicle_element", name: "Vehicle Element" },
  ];

  React.useEffect(() => {
    GetTaxReport(entity_id, formattedStartDate, formattedEndDate)
      .then((response) => {
        console.log("oh: ", response?.data.entries);
        let result = response.data.entries;
        setReport(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const hello = transformArray(report);
  console.log("hellllll", hello);
  const transposedData = reshapeArray(hello, 11);
  const extendedData = extendDataWithEmptyCells(transposedData, 5, 10);

  return (
    <>
      <Modal
        showCloseBtn={true}
        open={openDurationModal}
        close={closeDurationModal}
      >
        <div className="w-full bg-white p-14">
          <div className="flex">
            <div className="mt-3 mr-5 field">
              <label className="text-sm label bold">Select Start Date</label>
              <Flatpickr
                className="bg-gray-50 mr-2 cursor-pointer border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                placeholder="Date of Birth"
                ref={fp}
                name="start_date"
                onChange={handleStartDateChange}
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
                placeholder="Date of Birth"
                ref={fp}
                name="end_date"
                onChange={handleEndDateChange}
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
          </div>

          <div className="flex">
            <button
              onClick={validate}
              className="w-full py-2 text-white bg-red-500 mt-9 mobile:w-full"
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>

      {durationIsConfirmed && (
        <div className="overflow-y-hidden">
          {/* <Spreadsheet data={extendedData} /> */}

          <DataGrid
            className="text-sm rdg-light grid-container"
            columns={columns}
            rows={report || []}
            rowHeight={50}
          />
        </div>
      )}
    </>
  );
};

export default MySpreadsheet;
