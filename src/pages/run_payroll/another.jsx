import React from "react";
import {
  GenerateTaxReport,
  SaveTaxReport,
} from "../../core/services/report.service";
import moment from "moment";
import Modal from "../../components/modal/_component";
import { showToast } from "../../core/hooks/alert";
import DataGrid from "react-data-grid";
import Loader from "../../components/loader/_component";
import Flatpickr from "react-flatpickr";

const MySpreadsheet = () => {
  const entity_id = localStorage.getItem("entity_id");
  const fp = React.useRef(null);
  const [report, setReport] = React.useState([]);
  const [reportResponse, setReportResponse] = React.useState("");
  const [selectedStartDate, setSelectedStartDate] = React.useState(null);
  const [grandReport, setGrandReport] = React.useState();
  const [selectedEndDate, setSelectedEndDate] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [durationIsConfirmed, setDurationIsConfirmed] = React.useState(false);
  const [openDurationModal, setOpenDurationModal] = React.useState(true);

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
      showToast("All dates required", false);
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

  const columns = [
    // {
    //   key: "update",
    //   name: "Actions",
    //   renderCell: renderActionsRow,
    //   width: "100px",
    // },
    { key: "serial_no", name: "Serial No." },
    { key: "tin", name: "Tin" },
    { key: "name_of_employee", name: "Name Of Employee" },
    { key: "position", name: "Position" },
    { key: "non_resident", name: "Non Resident" },
    { key: "basic_salary", name: "Basic Salary" },
    { key: "secondary_employment", name: "Secondary Employment" },
    { key: "social_security_fund", name: "Social Security Fund" },
    { key: "third_tier", name: "Third Tier" },
    { key: "cash_allowances", name: "Cash Allowances" },
    { key: "bonus_income", name: "Bonus Income" },
    { key: "final_tax_on_bonus", name: "Final Tax On Bonus" },
    { key: "excess_bonus", name: "Excess Bonus" },
    { key: "total_cash_emolument", name: "Total Cash Employment" },
    { key: "accomodation_element", name: "Accomodation Element" },
    { key: "vehicle_element", name: "Vehicle Element" },
    { key: "non_cash_benefit", name: "Non Cash Benefit" },
    { key: "total_assessable_income", name: "Total Assemble Income" },
    { key: "tax_deductible", name: "Tax Deductible" },
    { key: "total_reliefs", name: "Total Reliefs" },
    { key: "chargeable_income", name: "Chargeable Income" },
    { key: "deductible_reliefs", name: "Deductible Reliefs" },
    { key: "overtime_income", name: "Overtime Income" },
    { key: "overtime_tax", name: "Overtime Tax" },
    { key: "total_tax_payable_to_gra", name: "Total Tax Payable To GRA" },
    { key: "severance_pay_paid", name: "Serverance Pay Paid" },
    { key: "remarks", name: "Remarks" },
  ];

  React.useEffect(() => {
    if (durationIsConfirmed) {
      GenerateTaxReport(entity_id, formattedStartDate, formattedEndDate)
        .then((response) => {
          setGrandReport(response?.data);
          let result = response.data.entries;
          setReport(result);
        })
        .catch((error) => {
          setReportResponse(error.response.data.error);
        });
    }
  }, [durationIsConfirmed]);

  const saveReport = () => {
    setIsLoading(true);
    const payload = {
      entity_id: entity_id,
      ...grandReport,
    };
    SaveTaxReport(payload)
      .then((response) => {
        setIsLoading(false);
        console.log(response);
        showToast(response.data.message, true);
      })
      .catch((error) => {
        setIsLoading(false);
        showToast(error.response.data.error, false);
      });
  };
  const hello = transformArray(report);
  const transposedData = reshapeArray(hello, 11);

  return (
    <>
      <Modal
        showCloseBtn={true}
        open={openDurationModal}
        close={closeDurationModal}
      >
        <div className="w-full bg-white p-14">
          <div className="flex flex-col gap-2">
            <div className="w-[20rem] mt-3 mr-5 field">
              <label className="text-sm label bold">Select Start Date</label>
              <Flatpickr
                className="bg-gray-50 mr-2 cursor-pointer border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                placeholder="Start Date"
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

            <div className="mt-3 w-[20rem] field">
              <label className="text-sm label bold">Select End Date</label>
              <Flatpickr
                className="bg-gray-50 mr-2 cursor-pointer border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                placeholder="End Date"
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
              className="w-1/2 py-2 text-white rounded-full primary mt-9 mobile:w-full"
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
      {durationIsConfirmed && report.length === 0 ? (
        <h3 className="text-red-500">{reportResponse}</h3>
      ) : (
        <>
          {durationIsConfirmed && (
            <div className="overflow-y-hidden">
              <button
                onClick={saveReport}
                className="w-1/6 h-10 py-3 mb-3 mr-4 text-sm text-white bg-blue-500 rounded-full mobile:w-full"
              >
                {isLoading ? <Loader /> : "Save Payroll"}
              </button>

              <DataGrid
                className="text-sm rdg-light grid-container"
                columns={columns}
                rows={report || []}
                rowHeight={50}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MySpreadsheet;
