import React from "react";
import {
  DownloadTaxReport,
  GetTaxReports,
} from "../../core/services/report.service";

import moment from "moment";
import { showToast } from "../../core/hooks/alert";
import DataGrid from "react-data-grid";
import { IoEyeOutline } from "react-icons/io5";
import TableLoader from "../../components/table_loader/_component";
import { useNavigate } from "react-router-dom";

const SavedReports = () => {
  const navigate = useNavigate();
  const entity_id = localStorage.getItem("entity_id");
  const fp = React.useRef(null);
  const [report, setReport] = React.useState([]);
  const [selectedStartDate, setSelectedStartDate] = React.useState(null);
  const [selectedEndDate, setSelectedEndDate] = React.useState(null);
  const [durationIsConfirmed, setDurationIsConfirmed] = React.useState(false);
  const [contentLoaded, setContentLoaded] = React.useState(false);
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
    console.log("dates: ", formattedStartDate, formattedEndDate);
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
  const handleNavigationToDetails = (id) => {
    navigate("/dashboard/tax-report-details/" + id);
  };
  const renderActionsRow = (data) => {
    const { id } = data.row;
    return (
      <div className="grid grid-cols-2 mt-1">
        <button
          className="mb-2 ml-3"
          title="View details"
          onClick={() => handleNavigationToDetails(id)}
        >
          <IoEyeOutline color="blue" size={18} />
        </button>
      </div>
    );
  };

  const columns = [
    {
      key: "details",
      name: "Actions",
      renderCell: renderActionsRow,
      width: "100px",
    },
    { key: "serial_no", name: "Ser. No" },
    { key: "tin", name: "Tin(11 Characters)" },
    { key: "name_of_employee", name: "Name of Employee" },
    { key: "position", name: "Position" },
    { key: "basic_salary", name: "Basic Salary" },
    { key: "secondary_employment", name: "Secondary Employment" },
    { key: "social_security_fund", name: "Social Security Fund" },
    { key: "third_tier", name: "Third Tier" },
    { key: "cash_allowances", name: "Cash Allowances" },
    { key: "bonus_income", name: "Bonus Income(up to 15% of Basic Salary)" },
    { key: "final_tax_on_bonus", name: "Final Tax On Bonus" },
    { key: "excess_bonus", name: "Excess Bonus" },
    { key: "total_cash_emolument", name: "Total Cash Employment" },
    { key: "accomodation_element", name: "Accomodation Element" },
    { key: "vehicle_element", name: "Vehicle Element" },
    { key: "non_cash_benefit", name: "Non Cash Benefit" },
    {
      key: "total_assessable_income",
      name: "Total Assemble Income(14+15+16+17)",
    },
    // { key: "deductible_reliefs", name: "Deductible Reliefs" },
    { key: "total_reliefs", name: "Total Reliefs" },
    { key: "chargeable_income", name: "Chargeable Income" },
    { key: "deductible_reliefs", name: "Tax Deductible" },
    { key: "overtime_income", name: "Overtime Income" },
    { key: "overtime_tax", name: "Overtime Tax" },
    {
      key: "total_tax_payable_to_gra",
      name: "Total Tax Payable To GRA(12+22+24)",
    },
    { key: "severance_pay_paid", name: "Serverance Pay Paid" },
    { key: "remarks", name: "Remarks" },

    // { key: "created_ats", name: "Report Id" },
    // { key: "serial_nos", name: "Report Name" },
    // { key: "start_date", name: "Start Date" },
    // { key: "created_at", name: "Date Created" },
  ];

  React.useEffect(() => {
    setContentLoaded(true);
    GetTaxReports(entity_id)
      .then((response) => {
        setContentLoaded(false);
        let result = response.data.tax_reports;
        let entries = response.data.tax_reports.flatMap((report) =>
          report.entries.map((entry) => ({
            ...entry,
            id: report.id,
          }))
        );
        let wEnt = response.data.tax_reports;
        console.log("aas: ", entries);
        setReport(entries);
        // const totalEntries = response.data.tax_reports.entries.concat(
        //   response.data.tax_reports.totals
        // );
        const transformedData = result.flatMap((report) => {
          return report.entries.map((entry) => ({
            ...entry,
            id: report.id,
            created_at: moment(report.created_at).format("lll"),
          }));
        });
        transformedData.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      })
      .catch((error) => {
        setContentLoaded(false);
        console.log(error);
      });
  }, []);

  // React.useEffect(() => {
  //   DownloadTaxReport(entity_id, formattedStartDate, formattedEndDate)
  //     .then((response) => {
  //       console.log("ffoh: ", response?.data.entries);
  //       let result = response.data.entries;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <>
      <div className="overflow-y-hidden">
        {/* <button
          // onClick={() => setIsCreateIncomeTypeModalOpen(true)}
          className="w-1/6 py-3 mb-3 text-sm text-white bg-blue-500 rounded-full mobile:w-full"
        >
          Download Payroll
        </button> */}
        {/* <Spreadsheet data={extendedData} /> */}
        {contentLoaded ? (
          <>
            <TableLoader />
          </>
        ) : (
          <>
            <DataGrid
              className="text-sm rdg-light grid-container"
              columns={columns}
              rows={report || []}
              rowHeight={50}
            />
          </>
        )}
      </div>
    </>
  );
};

export default SavedReports;
